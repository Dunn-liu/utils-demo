<template>
  <div class="w-full">
    <div>
      {{ progress }}
    </div>
    <button @click="end">结束</button>
    <button @click="stop">停止</button>
    <button @click="start">开始</button>
    <div class="flex">
      <ImpExcel @success="loadDataSuccess" dateFormat="YYYY-MM-DD">
        <button class="m-3"> 导入Excel </button>
      </ImpExcel>
      <div>
        <button class="m-3" @click="downloadAll">downloadAll</button>
      </div>
    </div>
    <div class="m-2 border h-[500px] w-[600px]">
      <VirtualList :listData="data" :itemSize="100" />
    </div>
    <QRcode v-for="(item, index) in qrcodeList" ref="qrcode" :key="index" :qr-url="item.label" :qr-text1="item.text1"
      :qr-text2="item.text2" :qr-text3="item.text3" />
  </div>
  <div class="demo">
    <at-input :queryOptions="queryOptions" placeholder="请输入" :wrap="wrapAble" ref="inputRef" height="200px"
      :disabled="isDisabled"></at-input>
    <div style="margin-top: 16px;">
      <button @click="wrapAble = !wrapAble">{{ wrapAble ? '禁止换行' : '开启换行' }}</button>
      <button @click="isDisabled = !isDisabled">{{ isDisabled ? '启用' : '禁用' }}</button>
      <button @click="setFocus">聚焦</button>
      <button @click="getText">获取文本</button>
      <button @click="getAtList">获取@数组</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import QRcode from '@/components/QrCode.vue'
import ImpExcel from '@/components/EXCEL.vue'
import VirtualList from '@/components/VirtualList.vue'
import { parallelTask } from '@/utils/common';
import { ref } from "vue";
import useFakeProgress from './hooks/useFakeProgress';
import { AtInput } from '@/components/at-input';
interface ExcelData<T = any> {
  header: string[];
  results: T[];
  meta: { sheetName: string };
}
let d: Record<string, any>[] = [];
for (let i = 0; i < 1000; i++) {
  d.push({ id: i, value: i });
}
const { end, progress, start, stop } = useFakeProgress({ autoStart: true, timeConstant: 10000 })
const data = ref(d);
const qrcode = ref();
const qrcodeList = ref<any[]>([]);
const list = [...Array(12)].map(_item => {
  return function () {
    return new Promise(resolve => {
      const timeNow = new Date().getTime()
      const duration = (Math.random() * 10)
      setTimeout(() => {
        const end = new Date().getTime()
        console.log('耗时' + (end - timeNow));
        resolve({ duration })
      }, 1000)
    })
  }
})
parallelTask<any>(list, 2).then(res => {
  console.log('结束了');
  console.log(res);
})
const downloadAll = async () => {
  for (let index = 0; index < qrcode.value.length; index++) {
    const element = qrcode.value[index];
    await element.savePic();
  }
};
const loadDataSuccess = (res: ExcelData[]) => {
  const result = res[0].results.map(item => {
    return {
      label: item['设备编码'],
      text1: `设备编码: ${item['设备编码'] || ''}`,
      text2: `设备名称: ${item['设备名称'] || ''}`,
      text3: `车间位置: ${item['车间辅助列'] || ''}`,

    }
  })
  qrcodeList.value = result
}

function queryOptions(key: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { key: 1, label: '星期一' },
        { key: 2, label: '星期二' },
        { key: 3, label: '星期三' },
        { key: 4, label: '星期四' },
        { key: 5, label: '12313123123' },
        { key: 6, label: 'asdasdqwe' },
      ].filter((item) => item.label.includes(key)))
    }, 500)
  })
}
const inputRef = ref();

let wrapAble = ref(true)
let isDisabled = ref(false)

function setFocus() {
  inputRef.value.setFocus()
}

function getText() {
  console.log(inputRef.value.getText())
}
function getAtList() {
  console.log(inputRef.value.getAtList())
}
</script>