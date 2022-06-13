<template>
  <div>
    <!-- 子路由的出口   -->
    <router-view></router-view>
    <!-- 构建标签导航栏   -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/order">订单</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// ref(0) 默认选中第一个
const active = ref(0);

</script>

<style scoped>

</style>