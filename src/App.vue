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
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import index from "./views/index.vue";
import { useStore } from 'vuex'

// 验证Token
const store = useStore();
console.log(store.state.user)
</script>

<style>

</style>
