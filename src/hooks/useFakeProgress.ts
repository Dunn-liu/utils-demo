import { ref } from "vue";
interface Options {
  timeConstant?: number;
  autoStart?: boolean;
}

export default function useFakeProgress(
  opts: Options = {
    autoStart: false,
  }
) {
  let timeConstant = opts.timeConstant || 1000;
  let progress = ref(0);
  let intervalFrequency = 100;
  let time = 0;
  let intervalId;
  let running = false;
  if (opts.autoStart) {
    start();
  }
  function start() {
    if (running) {
      return;
    }
    time = 0;
    running = true;
    intervalId = setInterval(onInterval, intervalFrequency);
  }
  function onInterval() {
    time += intervalFrequency;
    setProgress(1 - Math.exp((-1 * time) / timeConstant));
  }
  function end() {
    stop();
    setProgress(1);
  }
  function stop() {
    clearInterval(intervalId);
    running = false;
    intervalId = null;
  }
  function setProgress(_progress: any) {
    console.log("progress: " + _progress);
    progress.value = _progress;
  }
  return {
    stop,
    end,
    start,
    progress,
  };
}
