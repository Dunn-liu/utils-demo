<template>
    <canvas id="canvas" ref="canvas" :width="width" :height="height"></canvas>
</template>
  
<script lang="ts" setup>
import { resolve } from "path";
import QRCode from "qrcode";
import { onMounted, ref } from "vue";

const props = defineProps({
    //二维码存储内容
    qrUrl: {
        type: String,
        default: "Hello World"
    },
    // canvas width
    width: {
        type: Number,
        default: 300
    },
    // canvas height
    height: {
        type: Number,
        default: 360
    },
    // 二维码尺寸（正方形 长宽相同）
    qrSize: {
        type: Number,
        default: 300
    },
    // 二维码底部文字
    qrText1: {
        type: String,
        default: "Hello World"
    },
    qrText2: {
        type: String,
        default: "Hello World"
    },
    qrText3: {
        type: String,
        default: "Hello World"
    },
    //底部说明文字字号
    qrTextSize: {
        type: Number,
        default: 16
    }
});

const canvas = ref<HTMLCanvasElement>();
/**
 * @argument qrUrl        二维码内容
 * @argument qrSize       二维码大小
 * @argument qrText       二维码中间显示文字
 * @argument qrTextSize   二维码中间显示文字大小(默认16px)
 */
const handleQrcode = () => {
    let dom = canvas.value as HTMLCanvasElement;
    QRCode.toDataURL(props.qrUrl, {
        errorCorrectionLevel: "H",
        width: props.qrSize,
        version: 7,
        type: 'image/jpeg'
    })
        .then((url: string) => {
            // 画二维码里的logo// 在canvas里进行拼接
            const ctx = dom.getContext("2d") as CanvasRenderingContext2D;
            const image = new Image();
            image.src = url;
            new Promise<HTMLImageElement>((resolve) => {
                image.onload = () => {
                    resolve(image);
                };
            }).then((img: HTMLImageElement) => {
                // console.log(img, ctx)
                ctx.drawImage(img, (props.width - props.qrSize) / 2, 0, props.qrSize, props.qrSize);
                if (props.qrText1) {
                    //设置字体
                    ctx.font = props.qrTextSize + "px Arial";
                    let tw = ctx.measureText(props.qrText1).width; // 文字真实宽度
                    let ftop = props.qrSize - props.qrTextSize + 10; // 根据字体大小计算文字top
                    let fleft = (props.width - tw) / 2; // 根据字体大小计算文字left
                    ctx.fillStyle = "#fff";
                    ctx.fillRect(0, props.qrSize, props.width, props.height);
                    ctx.textBaseline = "top"; //设置绘制文本时的文本基线。
                    ctx.fillStyle = "#333";
                    ctx.fillText(props.qrText1, 20, ftop);
                    props.qrText2 && ctx.fillText(props.qrText2, 20, ftop + 20);
                    props.qrText3 && ctx.fillText(props.qrText3, 20, ftop + 40);
                }
            });
        })
        .catch((err: Error) => {
            console.error(err);
        });
};
const savePic = () => {
    return new Promise(resolve => {
        let dom = canvas.value as HTMLCanvasElement;
        let a = document.createElement("a");
        //将二维码面板处理为图片
        a.href = dom.toDataURL("image/png", 0.9);
        a.download = props.qrUrl + ".png";
        a.click();
        setTimeout(resolve, 500)
    })
};

defineExpose({ savePic });

onMounted(() => {
    handleQrcode();
});
</script>
  
<style scoped></style>