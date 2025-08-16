<template>
  <div class="invoice-container">
    <!-- 第一张 -->
    <div
      class="invoice-body text-[#ab6226] w-[814px] h-[526px] bg-white p-[10px_24px_30px_30px] text-[10px] font-['宋体'] mx-auto">
      <div class="invoice-body-up flex flex-row mx-auto mb-[12px] w-[760px] h-[100px]">
        <div class="invoice-body-up-left w-[230px] h-full flex-shrink-0">
          <dl>
            <dt class="invoice-body-up-left-img p-[0_0_6px_16px]">
              <!-- <img width="70" height="70" src="/images/1561108150.png" alt="二维码" /> -->
              <qr-code :value="invoiceData.machineNumber" :qrSize="70" :width="70" :height="70" />
            </dt>
            <dd class="text-black">
              <span class="tracking-wider text-[#ab6226]">机器编号：</span>{{ invoiceData.machineNumber }}
            </dd>
          </dl>
        </div>
        <div class="invoice-body-up-center text-center w-[298px] flex-shrink-0">
          <p class="invoice-body-up-center-title tracking-widest text-[24px] mt-6 mb-3">
            深圳电子普通发票
          </p>
          <div class="invoice-body-up-center-border border-t-2 border-b-2  border-[#b46a6a] h-[5px]">
          </div>
        </div>
        <div class="invoice-body-up-right leading-[24px] w-[210px] pl-[20px] flex-shrink-0">
          <p>
            <span
              class="invoice-right-label inline-block text-justify text-last-justify w-[50px]">发票代码</span><span>：</span>
            <span class="text-black">{{ invoiceData.invoiceCode }}</span>
          </p>
          <p>
            <span
              class="invoice-right-label inline-block text-justify text-last-justify w-[50px]">发票号码</span><span>：</span>
            <span class="text-black">{{ invoiceData.invoiceNumber }}</span>
          </p>
          <p>
            <span
              class="invoice-right-label inline-block text-justify text-last-justify w-[50px]">开票日期</span><span>：</span>
            <span class="text-black">
              {{ invoiceData.invoiceDate.year }} <span class="text-[#ab6226]">年</span> {{ invoiceData.invoiceDate.month
              }}
              <span class="text-[#ab6226]">月</span> {{ invoiceData.invoiceDate.day }}
              <span class="text-[#ab6226]">日</span></span>
          </p>
          <p>
            <span
              class="invoice-right-label inline-block text-justify text-last-justify w-[50px]">校验码</span><span>：</span>
            <span class="text-black">{{ invoiceData.verificationCode }}</span>
          </p>
        </div>
      </div>
      <div class="invoice-table border border-[#902121] w-[758px] h-[353px] mx-auto">
        <div class="invoice-table-header flex flex-row border-b border-[#902121] w-full h-[78px]">
          <div
            class="invoice-table-header-left text-center tracking-widest leading-[20px] w-[24px] border-r border-[#902121] text-[#ab6226] h-[72px] pt-[6px] pl-[2px] flex-shrink-0">
            购买方</div>
          <div
            class="invoice-table-header-center1 overflow-hidden leading-[19px] w-[398px] border-r border-[#902121] h-[78px] pl-[8px] flex-shrink-0">
            <p>
              <span
                class="invoice-right-label inline-block text-justify text-last-justify w-[88px]">名称</span><span>：</span>
              <span class="text-black">{{ invoiceData.buyer.name }}</span>
            </p>
            <p>
              <span class="invoice-right-label inline-block text-justify text-last-justify w-[88px]">纳税人识别号</span>
              <span>：</span>
              <span class="text-black">{{ invoiceData.buyer.taxId }}</span>
            </p>
            <p>
              <span class="invoice-right-label inline-block text-justify text-last-justify w-[88px]">地址、电话</span>
              <span>：</span>
              <span class="text-black">{{ invoiceData.buyer.addressPhone }}</span>
            </p>
            <p>
              <span class="invoice-right-label inline-block text-justify text-last-justify w-[88px]">开户行及账号</span>
              <span>：</span>
              <span class="text-black">{{ invoiceData.buyer.bankAccount }}</span>
            </p>
          </div>
          <div
            class="invoice-table-header-left text-center tracking-widest leading-[20px] w-[24px] border-r border-[#902121] text-[#ab6226] h-[72px] pt-[6px] pl-[2px] flex-shrink-0">
            密码区</div>
          <div
            class="invoice-table-header-right overflow-hidden tracking-wider text-black leading-[20px] text-[16px] w-[252px] h-[78px] px-[24px_20px_0_24px] break-all flex-shrink-0">
            {{ invoiceData.passwordArea }}
          </div>
        </div>
        <div class="invoice-table-content relative h-[166px]">
          <div class="border-right-height absolute bottom-0 left-[203px] border-r border-[#902121] h-full"></div>
          <div class="border-right-height absolute bottom-0 left-[260px] border-r border-[#902121] h-full"></div>
          <div class="border-right-height absolute bottom-0 left-[306px] border-r border-[#902121] h-full"></div>
          <div class="border-right-height absolute bottom-0 left-[394px] border-r border-[#902121] h-full"></div>
          <div class="border-right-height absolute bottom-0 left-[489px] border-r border-[#902121] h-full"></div>
          <div class="border-right-height absolute bottom-0 left-[607px] border-r border-[#902121] h-full"></div>
          <div class="border-right-height absolute bottom-0 left-[638px] border-r border-[#902121] h-full"></div>
          <div class="invoice-table-content-header flex flex-row text-center leading-[20px] w-full h-[20px]">
            <div class="w-[204px] flex-shrink-0">货物或应税劳务、服务名称</div>
            <div class="w-[57px] flex-shrink-0">规格型号</div>
            <div class="w-[46px] flex-shrink-0">单位</div>
            <div class="w-[88px] flex-shrink-0">数量</div>
            <div class="w-[95px] flex-shrink-0">单 价</div>
            <div class="w-[118px] flex-shrink-0">金 额</div>
            <div class="w-[31px] flex-shrink-0">税率</div>
            <div class="w-[117px] flex-shrink-0">税 额</div>
          </div>
          <div class="invoice-map overflow-hidden h-[128px]">
            <div v-for="(item, index) in invoiceData.items" :key="index"
              class="invoice-table-content-center flex flex-row overflow-hidden text-black text-right leading-[16px]">
              <div class="w-[204px] text-left flex-shrink-0">{{ item.name }}</div>
              <div class="w-[57px] flex-shrink-0">{{ item.specification }}</div>
              <div class="w-[46px] flex-shrink-0">{{ item.unit }}</div>
              <div class="w-[88px] flex-shrink-0">{{ item.quantity }}</div>
              <div class="w-[95px] flex-shrink-0">{{ item.unitPrice }}</div>
              <div class="w-[118px] flex-shrink-0">{{ item.amount }}</div>
              <div class="w-[31px] text-right flex-shrink-0">{{ item.taxRate }}</div>
              <div class="w-[117px] flex-shrink-0">{{ item.taxAmount }}</div>
            </div>
          </div>
          <div class="invoice-table-content-bottom text-right overflow-hidden text-black w-full h-[18px]">
            <div class="w-[204px] text-center tracking-[38px] text-[#ab6226] flex-shrink-0">合计</div>
            <div class="w-[57px] flex-shrink-0"></div>
            <div class="w-[46px] flex-shrink-0"></div>
            <div class="w-[88px] flex-shrink-0"></div>
            <div class="w-[95px] flex-shrink-0"></div>
            <div class="w-[118px] flex-shrink-0">&yen;{{ invoiceData.totals.amount }}</div>
            <div class="w-[31px] flex-shrink-0"></div>
            <div class="w-[117px] flex-shrink-0">&yen;{{ invoiceData.totals.taxAmount }}</div>
          </div>
        </div>
        <div class="invoice-table-content2 flex flex-row overflow-hidden border-y border-[#902121] w-full h-[29px]">
          <div class="text-center leading-[29px] w-[203px] border-r border-[#902121] flex-shrink-0">
            价税合计（大写）
          </div>
          <div class="overflow-hidden leading-[29px] w-[552px] flex-shrink-0">
            <p class="text-black pl-[4px] w-[360px] flex-shrink-0">
              <span>ⓧ </span>{{ invoiceData.totals.grandTotalText }}
            </p>
            <p class="text-black w-[192px] flex-shrink-0">
              <span class="text-[#ab6226]">（小写）</span> &yen;{{ invoiceData.totals.grandTotal }}
            </p>
          </div>
        </div>
        <div class="invoice-table-bottom flex flex-row overflow-hidden w-full h-[78px]">
          <div
            class="invoice-table-header-left text-center tracking-widest leading-[20px] w-[24px] border-r border-[#902121] text-[#ab6226] h-[72px] pt-[6px] pl-[2px] flex-shrink-0">
            销售方</div>
          <div
            class="invoice-table-header-center1 overflow-hidden leading-[19px] w-[398px] border-r border-[#902121] h-[78px] pl-[8px] flex-shrink-0">
            <p>
              <span
                class="invoice-right-label inline-block text-justify text-last-justify w-[88px]">名称</span><span>：</span>
              <span class="text-black">{{ invoiceData.seller.name }}</span>
            </p>
            <p>
              <span class="invoice-right-label inline-block text-justify text-last-justify w-[88px]">纳税人识别号</span>
              <span>：</span>
              <span class="text-black">{{ invoiceData.seller.taxId }}</span>
            </p>
            <p>
              <span class="invoice-right-label inline-block text-justify text-last-justify w-[88px]">地址、电话</span>
              <span>：</span>
              <span class="text-black">{{ invoiceData.seller.addressPhone }}</span>
            </p>
            <p>
              <span class="invoice-right-label inline-block text-justify text-last-justify w-[88px]">开户行及账号</span>
              <span>：</span>
              <span class="text-black">{{ invoiceData.seller.bankAccount }}</span>
            </p>
          </div>
          <div
            class="invoice-table-header-left text-center tracking-widest leading-[34px] w-[24px] border-r border-[#902121] text-[#ab6226] h-[72px] pt-[6px] pl-[2px] flex-shrink-0">
            备 注</div>
          <div
            class="invoice-table-header-right overflow-hidden tracking-wider text-black leading-[20px] text-[12px] w-[252px] h-[78px] px-[24px_20px_0_24px] break-all flex-shrink-0">
            {{ invoiceData.remark }}
          </div>
        </div>
      </div>
      <div class="invoice-table-footer flex flex-row text-black w-[758px] mx-auto mt-[10px]">
        <div class="ml-[14px] w-[212px] flex-shrink-0">
          <span class="text-[#ab6226]">收款人：</span>{{ invoiceData.personnel.payee }}
        </div>
        <div class="ml-[14px] w-[160px] flex-shrink-0">
          <span class="text-[#ab6226]">复核：</span>{{ invoiceData.personnel.reviewer }}
        </div>
        <div class="ml-[14px] w-[150px] flex-shrink-0">
          <span class="text-[#ab6226]">开票人：</span>{{ invoiceData.personnel.drawer }}
        </div>
        <div class="ml-[14px] w-[150px] flex-shrink-0">
          <span class="text-[#ab6226]">销售方：（章）</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import QrCode from './QrCode.vue';
// 发票数据
const invoiceData = {
  machineNumber: '661611953410',
  invoiceCode: '044031800211',
  invoiceNumber: '805421210',
  invoiceDate: {
    year: '2019',
    month: '05',
    day: '23'
  },
  verificationCode: '73165 09840 76544 48548',
  buyer: {
    name: '044031800211',
    taxId: '805421210',
    addressPhone: '重庆开票',
    bankAccount: '73165 09840 76544 48548'
  },
  passwordArea: '/2/75+<311+54*3667<<>>5<++9+/<7-4+18-//0*12*25-1*9/17975203<601*00<2+84*3625>6>**<-+/3>17-4+18-//0*12*25/8>*5/',
  items: [{
    name: '(详见销货清单)',
    specification: '',
    unit: '位',
    quantity: '1',
    unitPrice: '1',
    amount: '4287.17',
    taxRate: '13%',
    taxAmount: '557.33'
  }],
  totals: {
    amount: '4287.17',
    taxAmount: '557.33',
    grandTotal: '4844.50',
    grandTotalText: '肆仟捌佰肆拾肆圆五角'
  },
  seller: {
    name: '044031800211',
    taxId: '805421210',
    addressPhone: '重庆开票',
    bankAccount: '73165 09840 76544 48548'
  },
  remark: '订单C1182451210021215540',
  personnel: {
    payee: '沈俊涛',
    reviewer: '沈俊涛',
    drawer: '沈俊涛'
  }
}
</script>

<style scoped>
/* 保留一些无法直接转换为Tailwind的样式 */
.invoice-right-label {
  text-align-last: justify;
  text-align: justify;
}

/* 自定义样式类 */
.content-auto {
  content-visibility: auto;
}
</style>