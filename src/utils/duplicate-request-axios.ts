import { AxiosStatic, InternalAxiosRequestConfig, Canceler } from "axios";
import { isEqual } from "lodash-es";

export interface repeatCbType {
  (
    cancel: Canceler,
    config: InternalAxiosRequestConfig,
    requestQueue: InternalAxiosRequestConfig[]
  ): void;
}
export interface removedSuccessCbType {
  (
    config: InternalAxiosRequestConfig,
    requestQueue: InternalAxiosRequestConfig[]
  ): void;
}

// st-no-duplicate-request-axios
export function useStDuplicateRequestAxios(axios: AxiosStatic) {
  const requestQueue: InternalAxiosRequestConfig[] = [];

  type DataType = object | string;
  /**
   * 数据归一化
   * @param data
   * @returns
   */
  const _formatData = (data: DataType) => {
    if (typeof data === "string") {
      try {
        return JSON.parse(data);
      } catch (error) {
        return {};
      }
    } else if (typeof data === "object") {
      return data;
    } else {
      return {};
    }
  };

  /**
   * 获取请求队列中存在的索引
   * @param config
   * @returns
   */
  const _getArrayIndex = (config: InternalAxiosRequestConfig) => {
    if (!requestQueue.length) return -1;
    else
      return requestQueue.findIndex(
        (queueConfig: InternalAxiosRequestConfig) => {
          return (
            queueConfig.url === config.url &&
            isEqual(_formatData(config.data), _formatData(queueConfig.data))
          );
        }
      );
  };

  /**
   * 如果请求队列中没有一样的请求,就加入到请求队列中,否则则取消请求
   * @param config
   * @param repeatCb Function
   */
  const addRequest = (
    config: InternalAxiosRequestConfig,
    repeatCb?: repeatCbType
  ) => {
    if (!requestQueue.length || _getArrayIndex(config) === -1) {
      requestQueue.push(config);
    } else {
      config.cancelToken = new axios.CancelToken((cancel: Canceler) => {
        if (repeatCb) repeatCb(cancel, config, requestQueue);
        else cancel(`请求重复,请求地址:${config.url}`);
      });
    }
  };

  /**
   * 请求完成,把请求从队列中移除
   * @param config
   * @param removedSuccessCb 移除成功的回调函数
   */
  const removeRequest = (
    config: InternalAxiosRequestConfig,
    removedSuccessCb?: removedSuccessCbType
  ) => {
    if (requestQueue.length) {
      const index = _getArrayIndex(config);
      if (index !== -1) requestQueue.splice(index, 1);
      removedSuccessCb && removedSuccessCb(config, requestQueue);
    }
  };

  return {
    addRequest,
    removeRequest,
  };
}
