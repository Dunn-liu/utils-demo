<template>
  <div class="w-full">
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
</template>

<script lang="ts" setup>
import QRcode from '@/components/QrCode.vue'
import ImpExcel from '@/components/EXCEL.vue'
import VirtualList from '@/components/VirtualList.vue'
import { parallelTask } from '@/utils/common';
import { ref } from "vue";
interface ExcelData<T = any> {
  header: string[];
  results: T[];
  meta: { sheetName: string };
}
let d: Record<string, any>[] = [];
for (let i = 0; i < 1000; i++) {
  d.push({ id: i, value: i });
}
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
</script>