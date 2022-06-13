<template>
  <!-- NavBar 导航栏 -->
  <van-nav-bar
      title="登录"
      class="page-nav-bar"
  />
  <!-- 表单 -->
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="userRules.username"
      />
      <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="userRules.password"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>

</template>

<script setup>
import { ref } from 'vue';
import { Toast } from 'vant';
// 模拟登录请求
// 1.构建登录请求
// 2.获取用户名和密码并发送到服务器端
const username = ref('');
const password = ref('');
const onSubmit = (values) => {
  // vant 自带
  // console.log('submit', values);

  // 如果请求慢，添加加载信息
  Toast.loading({
    message: '登录中...',
    forbidClick: true,
    loadingType: 'spinner',
  });
  // 模拟登录
  if(values.username == "zs" && values.password == "123"){
    Toast.success('登录成功');
    // console.log("登录成功")
  }else {
    Toast.fail('用户名或密码错误！！！');
    // console.log("用户名或密码错误！！！")
  }
};

// 添加表单校验规则
const userRules = {
  username: [{required: true, message: "请填写用户名" }],
  password: [{required: true, message: "请填写密码" }]
}
</script>

<style scoped>

</style>