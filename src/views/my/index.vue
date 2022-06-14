<template>
  <!--    我的页面-->
  <div class="my-container">
    <div class="header not-login">
      <div class="login-btn" @click="this.$router.push('/login')">
        <img class="mobile-img" src="src/assets/images/user.png" alt=""/>
        <span class="text">注册 / 登录</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my"
}
</script>

<style scoped>
.my-container .header {
  height: 800px;
  background: skyblue;
  background-size: cover;
}
.my-container .not-login {
  /* 没有登录的效果样式 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.my-container .not-login .login-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.mobile-img {
  width: 132px;
  height: 132px;
  margin-bottom: 15px;
}
.my-container .text {
  font-size: 18px;
  color: #fff;
}
</style>