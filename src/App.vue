<template>
  <div class="w-full">
    <!-- 路由导航 -->
    <nav class="p-4 bg-gray-100">
      <router-link to="/" class="mr-4">首页</router-link>
      <router-link to="/about" class="mr-4">关于</router-link>
      <router-link to="/demo1" class="mr-4">Demo1</router-link>
      <router-link to="/demo2">Demo2</router-link>
    </nav>

    <!-- 路由视图 -->
    <router-view />
  </div>
</template>

<script lang="ts" setup>
// 清理后的App.vue只保留路由相关内容
</script>
<style>
:root {
  --inv-red: #b1432c;
  --line: 0.32mm;
}
</style>