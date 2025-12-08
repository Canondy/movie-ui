<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <van-nav-bar title="发现" fixed />
    <!-- 内容区域 -->
    <div class="content-wrapper" @scroll="handleScroll">
      <div class="content-list">
        <ContentItem v-for="item in contentList" :key="item.id"  :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, reactive, ref, toRefs} from 'vue';
import ContentItem from './../../components/movie/MovieItem.vue';
import { NavBar, Tabbar, TabbarItem } from 'vant';
import { listMovie } from './../../api/home/home.js';

const components = {
  ContentItem,
  [NavBar.name]: NavBar,
  [Tabbar.name]: Tabbar,
  [TabbarItem.name]: TabbarItem,
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

function getList() {
  if (loading.value || finished.value) return;
  queryParams.value.pageNum += 1;
  loading.value = true;
  listMovie(queryParams.value).then(response => {
    // contentList.value = response.data.rows;
    // for (let i = 0; i < contentList.value.length; i++) {
    //   contentList.value.imageUrl = url
    //   console.log(contentList.value.imageUrl)
    // }

    contentList.value = [...contentList.value, ...response.data.rows];
    loading.value = false;
    if (response.data.rows.length < queryParams.value.pageSize) {
      finished.value = true;
    }
  })
}
function handleScroll() {
  if (contentWrapper.value) { // 确保 contentWrapper 不是 null
    const el = contentWrapper.value;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
      getList();
    }
  }
}

onBeforeUnmount(() => {
  if (contentWrapper.value) {
    contentWrapper.value.removeEventListener('scroll', handleScroll);
  }
});

onMounted(() => {
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
/*.content-item {
  width: calc(50% - 5px); !* 每行两个项目，减去间隔 *!
  border-bottom: 1px solid #eee;
  padding: 15px 0;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}
.content-image {
  width: 100%;
  height: 70%;
  margin-right: 10px;
  border-radius: 8px;
}
.content-text {
  height: 30%;
  padding: 10px;
}
.title {
  font-size: 16px;
  font-weight: bold;
  margin-top: 5px;
}
.description {
  font-size: 14px;
  color: #666;
}*/
</style>
