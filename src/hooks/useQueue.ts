import { ref, Ref } from 'vue';

interface Queue<T, R, P> {
  enqueue(item: (params: P) => Promise<T>, params: P, callback: (result: T | undefined, error: any) => void): void;
  dequeue(): { task: (params: P) => Promise<T>; params: P; callback: (result: T | undefined, error: any) => void } | undefined;
  peek(): { task: (params: P) => Promise<T>; params: P; callback: (result: T | undefined, error: any) => void } | undefined;
  size(): number;
  isEmpty(): boolean;
  clear(): void;
}

export function useQueue<T, R, P>(maxConcurrency: number = 1): {
  enqueue: (item: (params: P) => Promise<T>, params: P, callback: (result: T | undefined, error: any) => void) => void;
  dequeue: () => { task: (params: P) => Promise<T>; params: P; callback: (result: T | undefined, error: any) => void } | undefined;
  peek: () => { task: (params: P) => Promise<T>; params: P; callback: (result: T | undefined, error: any) => void } | undefined;
  size: () => number;
  isEmpty: () => boolean;
  clear: () => void;
} {
  const items: Ref<{ task: (params: P) => Promise<T>; params: P; callback: (result: T | undefined, error: any) => void }[]> = ref([]);
  let executing = 0;

  const enqueue = (item: (params: P) => Promise<T>, params: P, callback: (result: T | undefined, error: any) => void): void => {
    items.value.push({ task: item, params, callback });
    executeTasks();
  };

  const dequeue = (): { task: (params: P) => Promise<T>; params: P; callback: (result: T | undefined, error: any) => void } | undefined => {
    return items.value.shift();
  };

  const peek = (): { task: (params: P) => Promise<T>; params: P; callback: (result: T | undefined, error: any) => void } | undefined => {
    return items.value.length > 0 ? items.value[0] : undefined;
  };

  const size = (): number => {
    return items.value.length;
  };

  const isEmpty = (): boolean => {
    return items.value.length === 0;
  };

  const clear = (): void => {
    items.value.length = 0;
  };

  const executeTasks = (): void => {
    while (executing < maxConcurrency && !isEmpty()) {
      executing++;
      const { task, params, callback } = dequeue()!;
      task(params).then((result: T) => {
        callback(result, undefined);
        executing--;
        executeTasks(); // 继续执行下一个任务
      }).catch((error: any) => {
        callback(undefined, error);
        executing--;
        executeTasks(); // 继续执行下一个任务
      });
    }
  };

  return {
    enqueue,
    dequeue,
    peek,
    size,
    isEmpty,
    clear
  };
}