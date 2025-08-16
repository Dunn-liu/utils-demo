// invoiceData.ts
export const sampleInvoice = {
  qrcode: "data:image/png;base64,REPLACE_WITH_YOUR_QR_BASE64", // 你也可以用 URL
  invoiceCode: "144032509110",
  invoiceNumber: "23715053",
  date: "2025年08月09日",
  checkCode: "8c054",
  codes: [
    "01bdde4753c39e785e860b",
    "e29c40e2e92c8bf3320698",
    "cbd2c8dd8f001cfe88c054",
  ],
  buyer: {
    name: "深圳华秋电子有限公司",
    taxId: "91440300581577931W",
    address: "",
  },
  seller: {
    name: "深圳市可咏餐饮管理有限公司",
    taxId: "91440300MACUJP9D1N",
    address:
      "深圳市南山区粤海街道粤海社区粤海路929号下沙村京基滨河时代广场L316 075582765365",
    bank: "平安银行深圳江苏大厦支行 15156902170062",
  },
  items: [
    {
      name: "*餐饮服务*餐费",
      qty: 1,
      price: 298.11,
      amount: 298.11,
      taxRate: "6%",
      taxAmount: 17.89,
    },
  ],
  totalAmount: 298.11,
  totalTax: 17.89,
  amountCN: "叁佰壹拾陆元整",
  grandTotal: 316.0,
  payee: "王东建",
  reviewer: "黄佳顺",
  drawer: "王东建",
};
