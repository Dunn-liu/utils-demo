/**
 * 控制异步任务并发函数
 * @param tasks 任务数组
 * @param parallelCount 并发数
 * @returns 成功的数据
 */
export function parallelTask<T>(tasks: Function[], parallelCount = 2) {
    return new Promise<T[]>(resolve => {
        if(tasks.length === 0) {
            resolve([])
            return
        }
        let nextIndex = 0;
        let finishCount = 0;
        const result = []
        function _run() {
            const task = tasks[nextIndex]
            nextIndex++
            task().then((res) => {
                finishCount++
                result.push(res)
                if(nextIndex < tasks.length) {
                    _run()
                }else if(finishCount === tasks.length) {
                    resolve(result)
                }
            })
        }
        for (let i = 0; i < parallelCount && i < tasks.length; i++) {
            _run()
        }

    })
}
