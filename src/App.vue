<template>
  <!-- 这是项目初始化自带的，不使用
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Hello Vue 3 + Vite" />
  -->

  <!-- 添加首页展示信息 -->
  <!-- <index/> -->

  <!-- 添加路由规则 -->
  <router-view></router-view>
</template>


<script setup>
import { useStore } from 'vuex'

// 验证Token
const store = useStore();
// console.log(store.state.user)
</script>

<style>

</style>
