<template>
  <!-- 我的页面-->
  <div class="my-container">
    <!-- 未登录 -->
    <div v-if="!user">
      <!-- 顶部区域 -->
      <div class="header not-login">
        <div class="login-btn" @click="$router.push('/login')">
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
            <van-grid :column-num="4" clickable>
              <van-grid-item icon="star-o" text="我的收藏" @click="onQuickAction('favorites')" />
              <van-grid-item icon="clock-o" text="浏览历史" @click="onQuickAction('history')" />
              <van-grid-item icon="orders-o" text="我的订单" @click="onQuickAction('orders')" />
              <van-grid-item icon="chat-o" text="消息中心" @click="onQuickAction('messages')" />
            </van-grid>
          </div>
        </div>        
      </div>
    </div>

    <!-- 已登录 -->
    <div v-else class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
              :src="userInfo.photo || require('@/assets/images/user.png')"
              class="avatar"
              round
              fit="cover"
          ></van-image>
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
      <van-grid :column-num="4" clickable>
        <van-grid-item icon="star-o" text="我的收藏" @click="goToPage('favorites')" />
        <van-grid-item icon="clock-o" text="浏览历史" @click="goToPage('history')" />
        <van-grid-item icon="orders-o" text="我的订单" @click="goToPage('orders')" />
        <van-grid-item icon="heart-o" text="我的点赞" @click="goToPage('likes')" />
      </van-grid>

      <div class="menu-list">
        <van-cell title="消息通知" is-link @click="goToPage('notifications')">
          <template #right-icon>
            <van-badge :content="3" class="message-badge" />
          </template>
        </van-cell>
        <van-cell title="设置" is-link @click="goToPage('settings')" />
        <van-cell title="帮助与反馈" is-link @click="goToPage('help')" />
        <van-cell
            @click="onLogout"
            title="退出登录"
            class="logout-cell"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog, Toast } from 'vant';
import {createRouter as $router} from "vue-router";

export default {
  name: 'My',
  components: {
    Dialog
  },
  data () {
    return {
      userInfo: {
        userName: "",
        art_count: 0,
        follow_count: 0,
        fans_count: 0,
        like_count: 0,
        photo: ''
      },

    }
  },
  mounted () {
    // 获取用户详细信息
    this.getUserInfo()
  },
  computed: {
    user () {
      // 模拟用户登录状态
      // 实际项目中应该使用store中的状态
      // return this.$store.state.userStore.user
      return localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    }
  },
  methods: {
    $router,
    // 跳转到对应页面
    goToPage(page) {
      // 模拟页面跳转，实际项目中应使用路由
      Toast(`跳转到${page}页面`);
      console.log(`Navigate to ${page}`);
    },
    
    // 快速操作处理
    onQuickAction(action) {
      // 未登录状态下，点击这些操作提示用户登录
      Toast({
        message: '请先登录',
        position: 'middle',
        duration: 2000
      });
      // 延迟跳转到登录页
      setTimeout(() => {
        this.$router.push('/login');
      }, 1500);
    },
    


    // 退出登录
    onLogout () {
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
    },

    // 获取用户详细信息
    async getUserInfo () {
      // 模拟获取用户信息
      if (this.user) {
        // 实际项目中应该调用API获取用户信息
        // const userId = this.user.data.userId
        // const { data } = await getUserInfo(userId)
        // this.userInfo = data.data[0]

        // 模拟用户数据
        this.userInfo = {
          userName: "电影爱好者",
          art_count: 12,
          follow_count: 56,
          fans_count: 128,
          like_count: 256,
          photo: ''
        };
      }
    }
  }
}
</script>

<style scoped>
.my-container {
  min-height: 100vh;
  background-color: #f8f8f8;
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
</style>
