"use strict";
exports.__esModule = true;
exports.useStDuplicateRequestAxios = void 0;
var lodash_es_1 = require("lodash-es");
// st-no-duplicate-request-axios
function useStDuplicateRequestAxios(axios) {
    var requestQueue = [];
    /**
     * 数据归一化
     * @param data
     * @returns
     */
    var _formatData = function (data) {
        if (typeof data === "string") {
            try {
                return JSON.parse(data);
            }
            catch (error) {
                return {};
            }
        }
        else if (typeof data === "object") {
            return data;
        }
        else {
            return {};
        }
    };
    /**
     * 获取请求队列中存在的索引
     * @param config
     * @returns
     */
    var _getArrayIndex = function (config) {
        if (!requestQueue.length)
            return -1;
        else
            return requestQueue.findIndex(function (queueConfig) {
                return (queueConfig.url === config.url && (0, lodash_es_1.isEqual)(_formatData(config.data), _formatData(queueConfig.data)));
            });
    };
    /**
     * 如果请求队列中没有一样的请求,就加入到请求队列中,否则则取消请求
     * @param config
     * @param repeatCb Function
     */
    var addRequest = function (config, repeatCb) {
        if (!requestQueue.length || _getArrayIndex(config) === -1) {
            requestQueue.push(config);
        }
        else {
            config.cancelToken = new axios.CancelToken(function (cancel) {
                if (repeatCb)
                    repeatCb(cancel, config, requestQueue);
                else
                    cancel("\u8BF7\u6C42\u91CD\u590D,\u8BF7\u6C42\u5730\u5740:".concat(config.url));
            });
        }
    };
    /**
     * 请求完成,把请求从队列中移除
     * @param config
     * @param removedSuccessCb 移除成功的回调函数
     */
    var removeRequest = function (config, removedSuccessCb) {
        if (requestQueue.length) {
            var index = _getArrayIndex(config);
            if (index !== -1)
                requestQueue.splice(index, 1);
            removedSuccessCb && removedSuccessCb(config, requestQueue);
        }
    };
    return {
        addRequest: addRequest,
        removeRequest: removeRequest
    };
}
exports.useStDuplicateRequestAxios = useStDuplicateRequestAxios;