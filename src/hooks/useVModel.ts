import { computed } from "vue";
/**
 * 根据传入props包装一个可修改的value
 * @param props props属性
 * @param propName 属性名
 * @param emit 事件触发器
 * @returns
 */
export default function useVModel(props, propName, emit) {
  return computed({
    get() {
      return new Proxy(props[propName], {
        set(target, key, value) {
          emit("update:" + propName, {
            ...target,
            [key]: value,
          });
          return true;
        },
      });
    },
    set(value) {
      emit("update:" + propName, value);
    },
  });
}
