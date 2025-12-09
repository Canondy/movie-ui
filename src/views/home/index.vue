<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <van-nav-bar title="发现" fixed />
    <!-- 内容区域 -->
    <div class="content-wrapper" ref="contentWrapper" @scroll="handleScroll">
      <div class="content-list">
        <ContentItem v-for="item in contentList" :key="item.id"  :item="item" />
      </div>
      <!-- 加载提示 -->
      <div class="loading-more" v-if="loading">
        <van-loading type="spinner" color="#1989fa" />
        <span>加载中...</span>
      </div>
      <!-- 没有更多数据提示 -->
      <div class="no-more" v-if="finished && contentList.length > 0">
        <span>没有更多数据了</span>
      </div>
      <!-- 空状态提示 -->
      <div class="empty-state" v-if="!loading && contentList.length === 0">
        <van-empty description="暂无电影数据" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, reactive, ref, toRefs} from 'vue';
import ContentItem from '.@/components/movie/MovieItem.vue';
import { NavBar, Tabbar, TabbarItem, Toast, Loading, Empty } from 'vant';
import { listMovie } from '@/api/home/home';

const components = {
  ContentItem,
  [NavBar.name]: NavBar,
  [Tabbar.name]: Tabbar,
  [TabbarItem.name]: TabbarItem,
  [Loading.name]: Loading,
  [Empty.name]: Empty,
};

const url = ref("/src/assets/images/p4807474924.jpg");
const contentWrapper = ref(null);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10
  },
  loading: false,
  finished: false
})

const { queryParams, loading, finished } = toRefs(data);
const contentList = ref([]);
const active = ref(1); // 默认选中“发现”标签

// 获取电影列表
function getList() {
  // 防止重复加载和无更多数据时继续请求
  if (loading.value || finished.value) return;

  // console.log('开始加载电影列表，页码:', queryParams.value.pageNum);
  loading.value = true;

  // 使用实际API调用
  // console.log('准备调用listMovie API，请求参数:', queryParams.value);
  listMovie(queryParams.value).then(response => {
    // console.log('API请求成功返回:', response);
    // 检查响应数据格式
    if (response && response.data && response.data.rows) {
      // 为没有图片的电影添加默认海报
      const formattedData = response.data.rows.map(item => {
        // console.log('Movie item:', item);
        return {
          ...item,
          // 使用movieCoverImageUrl作为主要图片源，如果不存在则使用imageUrl或默认图片
          imageUrl: item.imageUrl || url.value,
          // 保留原始的movieCoverImageUrl字段
          movieCoverImageUrl: item.movieCoverImageUrl
        };
      });

      // 将新数据追加到现有列表
      contentList.value = [...contentList.value, ...formattedData];

      // 判断是否还有更多数据
      // 如果返回的数据少于请求的pageSize，则认为没有更多数据了
      if (response.data.rows.length < queryParams.value.pageSize) {
        finished.value = true;
        Toast('已经到底了，没有更多数据了');
      } else {
        // 增加页码，准备下次加载
        queryParams.value.pageNum += 1;
      }
    } else {
      // 数据格式不正确，标记为无更多数据
      finished.value = true;
      Toast.fail('获取数据格式异常');
    }

    loading.value = false;
  }).catch(error => {
    console.error('获取电影列表失败:', error);
    Toast.fail('获取电影列表失败，请稍后重试');
    loading.value = false;
  });
}
function handleScroll() {
  // 优化的滚动检测逻辑
  if (contentWrapper.value && !loading.value && !finished.value) {
    const el = contentWrapper.value;
    // 增加滚动阈值，提前加载下一页内容
    // 当距离底部50px时就开始加载
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
      console.log('触发加载更多');
      getList();
    }
  }
}

onBeforeUnmount(() => {
  // 移除事件监听器（使用了模板中的@scroll，所以这步可以省略，但保留以防止内存泄漏）
});

onMounted(() => {
  // console.log('首页组件已挂载，开始初始化数据');
  getList();
});
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 使用视口高度 */
  overflow: hidden; /* 防止内容撑破页面 */
}
.content-wrapper {
  flex: 1;
  overflow-y: auto; /* 内容区域可滚动 */
  margin-top: 80px;
  margin-bottom: 100px;
  padding: 0 10px;
}
.content-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* 项目之间的间隔 */
}
/* 加载更多样式 */
.loading-more {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  color: #999;
  font-size: 14px;
}

/* 没有更多数据样式 */
.no-more {
  text-align: center;
  padding: 20px 0;
  color: #999;
  font-size: 14px;
}

/* 空状态样式 */
.empty-state {
  padding: 40px 0;
}
</style>
