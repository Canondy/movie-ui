<template>
  <!-- 我的页面-->
  <div class="my-container">
    <!-- 手机号登录弹窗 -->
    <van-popup
      v-model:show="showPhoneLogin"
      position="bottom"
      round
      transition="slide-up"
      class="phone-login-popup"
    >
      <div class="phone-login-container">
        <h2>手机号登录/注册</h2>

        <!-- 关闭按钮 -->
        <div class="close-btn">
          <van-icon name="cross" size="24" @click="showPhoneLogin = false"></van-icon>
        </div>

        <!-- 手机号输入 -->
        <van-field
          v-model="phoneNumber"
          type="tel"
          placeholder="请输入手机号码"
          maxlength="11"
          class="phone-input"
        >
          <template #left>
            <span style="margin-right: 8px;">+86</span>
          </template>
        </van-field>

        <!-- 验证码输入 -->
        <van-field
          v-model="verificationCode"
          type="number"
          placeholder="请输入验证码"
          maxlength="6"
          class="verification-input"
        >
          <template #right>
            <van-button
              size="small"
              :disabled="countdown > 0"
              @click="sendVerificationCode"
              :type="countdown > 0 ? 'default' : 'primary'"
            >
              {{ countdown > 0 ? `${countdown}秒后重发` : '获取验证码' }}
            </van-button>
          </template>
        </van-field>

        <!-- 登录按钮 -->
        <van-button
          type="primary"
          block
          size="large"
          class="submit-button"
          :loading="isLoading"
          @click="onPhoneLogin"
        >
          登录/注册
        </van-button>

        <!-- 服务协议 -->
        <div class="agreement">
          <p>登录即代表您同意
            <span @click="showAgreement('privacy')">《隐私政策》</span>和
            <span @click="showAgreement('terms')">《用户协议》</span>
          </p>
        </div>
      </div>
    </van-popup>
    <!-- 未登录 -->
    <div v-if="!user">
      <!-- 顶部区域 -->
      <div class="header not-login">
        <div class="login-btn" @click="showPhoneLogin = true">
          <img class="mobile-img" src="@/assets/images/user.png" alt="用户头像" />
          <span class="login-text">注册 / 登录</span>
        </div>
        <p class="login-desc">登录后享受更多专属服务</p>
      </div>

      <!-- 内容区域 -->
      <div class="content-section">
        <!-- 快速操作卡片 -->
        <div class="quick-actions-card">
          <h3 class="section-title">快速入口</h3>
          <div class="quick-actions">
            <div class="grid-container" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
               <div class="grid-item" style="text-align: center; padding: 10px;" @click="onQuickAction('favorites')">
                <div style="font-size: 24px; margin-bottom: 5px;">☆</div>
                <div style="font-size: 14px; width: 60px; text-align: center; margin: 0 auto;">我的收藏</div>
              </div>
              <div class="grid-item" style="text-align: center; padding: 10px;" @click="onQuickAction('history')">
                <div style="font-size: 24px; margin-bottom: 5px;">🕐</div>
                <div style="font-size: 14px; width: 60px; text-align: center; margin: 0 auto;">浏览历史</div>
              </div>
              <div class="grid-item" style="text-align: center; padding: 10px;" @click="onQuickAction('orders')">
                <div style="font-size: 24px; margin-bottom: 5px;">📋</div>
                <div style="font-size: 14px; width: 60px; text-align: center; margin: 0 auto;">我的订单</div>
              </div>
              <div class="grid-item" style="text-align: center; padding: 10px;" @click="onQuickAction('messages')">
                <div style="font-size: 24px; margin-bottom: 5px;">💬</div>
                <div style="font-size: 14px; width: 60px; text-align: center; margin: 0 auto;">消息中心</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 已登录 -->
    <div v-else class="header user-info">
      <div class="base-info">
        <div class="left">
          <img
            :src="userInfo.photo || require('@/assets/images/user.png')"
            class="avatar"
            style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover;"
          >
          <span class="name">{{ userInfo.userName || '用户' }}</span>
        </div>
        <div class="right">
          <van-button size="small" round type="primary" plain>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item" @click="goToPage('myContent')">
          <div class="count">{{ userInfo.art_count || 0 }}</div>
          <div class="text">内容</div>
        </div>
        <div class="divider"></div>
        <div class="data-item" @click="goToPage('following')">
          <div class="count">{{ userInfo.follow_count || 0 }}</div>
          <div class="text">关注</div>
        </div>
        <div class="divider"></div>
        <div class="data-item" @click="goToPage('followers')">
          <div class="count">{{ userInfo.fans_count || 0 }}</div>
          <div class="text">粉丝</div>
        </div>
        <div class="divider"></div>
        <div class="data-item" @click="goToPage('likes')">
          <div class="count">{{ userInfo.like_count || 0 }}</div>
          <div class="text">点赞</div>
        </div>
      </div>
    </div>

    <!-- 功能菜单 -->
    <div v-if="user" class="menu-section">
      <div class="grid-container" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
              <div class="grid-item" style="text-align: center; padding: 10px;" @click="goToPage('favorites')">
                <div style="font-size: 24px; margin-bottom: 5px;">☆</div>
                <div style="font-size: 14px;">我的收藏</div>
              </div>
              <div class="grid-item" style="text-align: center; padding: 10px;" @click="goToPage('history')">
                <div style="font-size: 24px; margin-bottom: 5px;">🕐</div>
                <div style="font-size: 14px;">浏览历史</div>
              </div>
              <div class="grid-item" style="text-align: center; padding: 10px;" @click="goToPage('orders')">
                <div style="font-size: 24px; margin-bottom: 5px;">📋</div>
                <div style="font-size: 14px;">我的订单</div>
              </div>
              <div class="grid-item" style="text-align: center; padding: 10px;" @click="goToPage('likes')">
                <div style="font-size: 24px; margin-bottom: 5px;">❤️</div>
                <div style="font-size: 14px;">我的点赞</div>
              </div>
            </div>

      <div class="menu-list">
        <div class="cell" style="display: flex; justify-content: space-between; align-items: center; padding: 15px; border-bottom: 1px solid #f0f0f0;" @click="goToPage('notifications')">
          <span>消息通知</span>
          <div class="message-badge" style="display: inline-block; min-width: 20px; height: 20px; line-height: 20px; text-align: center; background-color: #ee0a24; color: white; font-size: 12px; border-radius: 10px; padding: 0 6px;">3</div>
        </div>
        <div class="cell" style="display: flex; justify-content: space-between; align-items: center; padding: 15px; border-bottom: 1px solid #f0f0f0;" @click="goToPage('settings')">
          <span>设置</span>
          <div style="font-size: 16px; color: #999;">›</div>
        </div>
        <div class="cell" style="display: flex; justify-content: space-between; align-items: center; padding: 15px; border-bottom: 1px solid #f0f0f0;" @click="goToPage('help')">
          <span>帮助与反馈</span>
          <div style="font-size: 16px; color: #999;">›</div>
        </div>
        <div
          class="cell logout-cell"
          style="display: flex; justify-content: center; align-items: center; padding: 15px;"
          @click="onLogout"
        >
          <span style="color: #ee0a24;">退出登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { Dialog, Toast } from 'vant'

// 用户信息
const userInfo = reactive({
  userName: "",
  art_count: 0,
  follow_count: 0,
  fans_count: 0,
  like_count: 0,
  photo: ''
})

// 登录弹窗相关状态
const showPhoneLogin = ref(false)
const phoneNumber = ref('')
const verificationCode = ref('')
const countdown = ref(0)
const isLoading = ref(false)
let countdownTimer = null

// 计算属性：用户登录状态
const user = computed(() => {
  // 模拟用户登录状态
  // 实际项目中应该使用store中的状态
  // return this.$store.state.userStore.user
  return localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
})

// 跳转到对应页面
const goToPage = (page) => {
  // 模拟页面跳转，实际项目中应使用路由
  Toast(`跳转到${page}页面`);
  console.log(`Navigate to ${page}`);
}

// 快速操作处理
const onQuickAction = (action) => {
  // 未登录状态下，点击这些操作提示用户登录
  Toast({
    message: '请先登录',
    position: 'middle',
    duration: 1500
  });
  // 延迟显示登录弹窗
  setTimeout(() => {
    showPhoneLogin.value = true;
  }, 1500);
}

// 退出登录
const onLogout = () => {
  Dialog.confirm({
    title: '确认退出',
    message: '确定要退出登录吗？',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(() => {
    // 清除用户信息
    localStorage.removeItem('userInfo');
    Toast('已退出登录');

    // 实际项目中应该清除store中的用户信息
    // this.$store.commit('userStore/setUser', null)
  }).catch(() => {
    // 用户取消操作
  });
}

// 获取用户详细信息
const getUserInfo = async () => {
  // 模拟获取用户信息
  if (user.value) {
    // 实际项目中应该调用API获取用户信息
    // const userId = this.user.data.userId
    // const { data } = await getUserInfo(userId)
    // this.userInfo = data.data[0]

    // 模拟用户数据
    Object.assign(userInfo, {
      userName: user.value.userName || "电影爱好者",
      art_count: 12,
      follow_count: 56,
      fans_count: 128,
      like_count: 256,
      photo: ''
    });
  }
}

// 发送验证码
const sendVerificationCode = () => {
  // 手机号格式校验
  if (!/^1[3-9]\d{9}$/.test(phoneNumber.value)) {
    Toast.fail('请输入正确的手机号码');
    return;
  }

  // 开始倒计时
  countdown.value = 60;
  countdownTimer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(countdownTimer);
    }
  }, 1000);

  // 模拟发送验证码
  Toast.success('验证码已发送到 ' + phoneNumber.value);
  console.log('向手机号', phoneNumber.value, '发送验证码');
}

// 手机号登录/注册
const onPhoneLogin = () => {
  // 表单校验
  if (!/^1[3-9]\d{9}$/.test(phoneNumber.value)) {
    Toast.fail('请输入正确的手机号码');
    return;
  }

  if (!verificationCode.value || verificationCode.value.length !== 6) {
    Toast.fail('请输入6位验证码');
    return;
  }

  // 显示加载状态
  isLoading.value = true;

  // 模拟登录请求
  setTimeout(() => {
    isLoading.value = false;

    // 模拟登录成功
    Toast.success('登录成功');

    // 保存用户信息
    const userInfo = {
      userId: 'phone_' + Date.now(),
      userName: '用户' + phoneNumber.value.slice(-4),
      phone: phoneNumber.value,
      token: 'mock_token_' + Date.now()
    };

    // 保存到本地存储
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    // 关闭弹窗
    showPhoneLogin.value = false;

    // 更新用户信息
    getUserInfo();
  }, 1500);
}

// 显示协议
const showAgreement = (type) => {
  const content = type === 'privacy'
    ? '隐私政策内容...'
    : '用户协议内容...';

  Dialog.alert({
    title: type === 'privacy' ? '隐私政策' : '用户协议',
    message: content,
    confirmButtonText: '我知道了'
  });
}

// 生命周期钩子
onMounted(() => {
  // 获取用户详细信息
  getUserInfo()
})

onBeforeUnmount(() => {
  // 清理倒计时定时器
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
})
</script>

<style scoped>
.my-container {
  min-height: 100vh;
  background-color: #f8f8f8 !important;
}

/* 头部样式 */
.my-container .header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-size: cover;
  position: relative;
  overflow: hidden;
}

/* 未登录状态 */
.my-container .not-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  position: relative;
  min-height: 500px;
}

.my-container .not-login .login-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  width: 100%;
}

.my-container .not-login .login-btn:active {
  transform: scale(0.95);
}

.mobile-img {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 6px solid rgba(255, 255, 255, 0.9);
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  transition: all 0.3s ease;
}

.my-container .login-text {
  font-size: 32px;
  color: #fff;
  font-weight: 700;
  margin-bottom: 25px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.my-container .login-desc {
  font-size: 22px;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  padding: 15px 30px;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 40px;
  backdrop-filter: blur(5px);
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
}

/* 内容区域 */
.content-section {
  padding: 20px 15px;
}

/* 区块标题 */
.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin: 0 0 18px 0;
  padding-left: 6px;
  border-left: 4px solid #667eea;
}

/* 卡片样式 */
.quick-actions-card {
  background-color: #fff;
  border-radius: 15px;
  padding: 35px 25px;
  margin-bottom: 25px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
}

/* 已登录状态 */
.user-info .base-info {
  padding: 60px 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info .left {
  display: flex;
  align-items: center;
}

.user-info .left .avatar {
  width: 70px;
  height: 70px;
  margin-right: 13px;
  border: 2px solid #fff;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
}

.user-info .left .name {
  font-size: 18px;
  color: #fff;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* 数据统计区域 */
.user-info .data-stats {
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.95);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 15px 0 10px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.user-info .data-stats .data-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #333;
  padding: 5px 0;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin: 0 5px;
}

.user-info .data-stats .data-item:hover {
  background-color: rgba(0, 0, 0, 0.03);
  transform: translateY(-2px);
}

.user-info .data-stats .count {
  font-size: 20px;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 3px;
}

.user-info .data-stats .text {
  font-size: 13px;
  color: #666;
}

.user-info .data-stats .divider {
  width: 1px;
  background-color: #eee;
  margin: 0 5px;
}
/* 登录弹窗样式 */
.phone-login-popup {
  padding-bottom: env(safe-area-inset-bottom);
}

.phone-login-container {
  padding: 30px 20px;
  position: relative;
  min-height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.phone-login-container h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 50px;
  color: #333;
  text-align: center;
  line-height: 1.2;
  width: 100%;
  box-sizing: border-box;
}

.phone-input,
.verification-input {
  width: 100%;
  margin-bottom: 20px;
}

.phone-input .van-field__control,
.verification-input .van-field__control {
  font-size: 16px;
  height: 48px;
}

.submit-button {
  width: 100%;
  margin: 40px 0;
  border-radius: 25px;
  padding: 14px;
  font-size: 24px !important;
  font-weight: 700 !important;
  background: linear-gradient(135deg, #07c160 0%, #05a554 100%);
  border: none;
}

/* 直接在按钮组件上设置文本样式 */
.van-button.submit-button {
  font-size: 24px !important;
  font-weight: 700 !important;
}

/* 确保按钮内文本样式正确 */
.van-button.submit-button .van-button__text {
  font-size: 24px !important;
  font-weight: 700 !important;
}

.phone-login-container p {
  font-size: 14px;
  color: #666;
  text-align: center;
  line-height: 1.6;
  margin: 0;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  padding: 4px;
}

.agreement {
  text-align: center;
  font-size: 12px;
  color: #718096;
}

.agreement span {
  color: #3182ce;
  cursor: pointer;
}
</style>
