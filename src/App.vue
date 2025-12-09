<template>
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
