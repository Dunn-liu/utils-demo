<template>
  <div ref="listRef" class="infinite-list-container" @scroll="scrollEvent()">
    <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }"></div>
    <div class="infinite-list" :style="{ transform: getTransform }">
      <div ref="items" class="infinite-list-item" v-for="item in visibleData" :key="item.id"
        :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }">{{ item.value }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, ref, onMounted, unref } from 'vue';
interface IProps {
  listData: any[]
  itemSize: number
}
const props = withDefaults(defineProps<IProps>(), {
  listData: () => [],
  itemSize: 200
})
const state = reactive({
  //可视区域高度
  screenHeight: 0,
  //偏移量
  startOffset: 0,
  //起始索引
  start: 0,
  //结束索引
  end: 0,
})
const listRef = ref()
const listHeight = computed(() => props.listData.length * props.itemSize) //列表总高度
const visibleCount = computed(() => Math.ceil(state.screenHeight / props.itemSize))//可显示的列表项数
const getTransform = computed(() => `translate3d(0,${state.startOffset}px,0)`)//偏移量对应的style
const visibleData = computed(() => props.listData.slice(state.start, Math.min(state.end as number, props.listData.length)))//获取真实显示列表数据
const scrollEvent = () => {
  //当前滚动位置
  let scrollTop = listRef.value?.scrollTop;
  //此时的开始索引
  state.start = Math.floor(scrollTop / props.itemSize);
  //此时的结束索引
  state.end = state.start + unref(visibleCount)
  //此时的偏移量
  state.startOffset = scrollTop - (scrollTop % props.itemSize);
}
onMounted(() => {
  state.screenHeight = listRef.value?.clientHeight;
  state.start = 0;
  state.end = state.start + unref(visibleCount)
})
</script>
<!-- vue2 -->
<!-- <script>
export default {
  name: 'VirtualList',
  props: {
    //所有列表数据
    listData: {
      type: Array,
      default: () => []
    },
    //每项高度
    itemSize: {
      type: Number,
      default: 200
    }
  },
  computed: {
    //列表总高度
    listHeight() {
      return this.listData.length * this.itemSize;
    },
    //可显示的列表项数
    visibleCount() {
      return Math.ceil(this.screenHeight / this.itemSize)
    },
    //偏移量对应的style
    getTransform() {
      return `translate3d(0,${this.startOffset}px,0)`;
    },
    //获取真实显示列表数据
    visibleData() {
      return this.listData.slice(this.start, Math.min(this.end, this.listData.length));
    }
  },
  mounted() {
    console.log(this.$el)
    this.screenHeight = this.$el.clientHeight;
    this.start = 0;
    this.end = this.start + this.visibleCount;
  },
  data() {
    return {
      //可视区域高度
      screenHeight: 0,
      //偏移量
      startOffset: 0,
      //起始索引
      start: 0,
      //结束索引
      end: null,
    };
  },
  methods: {
    scrollEvent() {
      //当前滚动位置
      let scrollTop = this.$refs.listRef.scrollTop;
      //此时的开始索引
      this.start = Math.floor(scrollTop / this.itemSize);
      //此时的结束索引
      this.end = this.start + this.visibleCount;
      //此时的偏移量
      this.startOffset = scrollTop - (scrollTop % this.itemSize);
    }
  }
};
</script> -->


<style scoped>
.infinite-list-container {
  height: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}

.infinite-list-item {
  padding: 10px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
</style>