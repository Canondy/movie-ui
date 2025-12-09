<template>
  <div>
    <!-- 子路由的出口   -->
    <router-view></router-view>
    <!-- 构建标签导航栏 - 当路由不是电影详情页时显示 -->
    <van-tabbar v-if="!isMovieDetail" v-model="active" fixed>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/order">订单</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

// ref(0) 默认选中第一个
const active = ref(0);
const route = useRoute();

// 计算属性，判断当前是否为电影详情页路由
const isMovieDetail = computed(() => {
  return route.path.includes('/movie/');
});
</script>

<style scoped>

</style>
