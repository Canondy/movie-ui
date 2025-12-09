<template>
  <div class="movie-detail-container">
    <!-- 左上角回退按钮 -->
    <div class="back-button" @click="goBack">
      <van-icon name="arrow-left" size="24" />
    </div>

    <div v-if="loading" class="loading-container">
      <van-loading type="spinner" color="#1989fa" size="36px" />
      <span class="loading-text">加载中...</span>
    </div>

    <div v-else-if="movieDetail" class="detail-content">
      <!-- 电影海报 -->
      <div class="poster-section">
        <img :src="movieDetail.imageUrl || defaultImageUrl" :alt="movieDetail.movieName" class="movie-poster" @error="handleImageError" />
        <div v-if="movieDetail.score" class="score-badge">
          {{ movieDetail.score }}
        </div>
      </div>

      <!-- 电影信息 -->
      <div class="info-section">
        <h1 class="movie-title">{{ movieDetail.movieName }}</h1>
        <div class="movie-meta">
          <span class="meta-tag year">{{ movieDetail.year || '未知年份' }}</span>
          <span class="meta-tag duration">{{ movieDetail.duration || '未知时长' }}</span>
        </div>
        <div class="movie-desc-wrapper">
          <p class="movie-desc">{{ movieDetail.desc || '暂无描述' }}</p>
        </div>

        <!-- 其他信息 -->
        <div class="additional-info">
          <h3 class="section-title">电影详情</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">地区</span>
              <span class="value">{{ movieDetail.country || '未知' }}</span>
            </div>
            <div class="info-item">
              <span class="label">类型</span>
              <span class="value">{{ movieDetail.movieType || '未知' }}</span>
            </div>
            <div class="info-item">
              <span class="label">主演</span>
              <span class="value">{{ movieDetail.starring || '未知' }}</span>
            </div>
            <div class="info-item">
              <span class="label">导演</span>
              <span class="value">{{ movieDetail.director || '未知' }}</span>
            </div>
            <div class="info-item">
              <span class="label">内容</span>
              <span class="value">{{ movieDetail.movieContext || '未知' }}</span>
            </div>
          </div>
        </div>

        <!-- 底部操作按钮 -->
        <div class="action-buttons">
          <van-button type="primary" size="large" class="action-btn">
            <van-icon name="play-circle-o" /> 立即播放
          </van-button>
          <van-button type="default" size="large" class="action-btn">
            <van-icon name="star-o" /> 收藏
          </van-button>
        </div>
      </div>
    </div>

    <div v-else class="empty-container">
      <van-empty description="未找到电影信息" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon, Loading, Empty, Button } from 'vant'
import { selectMovieDetailVoById } from '@/api/home/home'

const components = {
[Icon.name]: Icon,
[Loading.name]: Loading,
[Empty.name]: Empty,
[Button.name]: Button
}

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const movieDetail = ref(null)
const defaultImageUrl = '/src/assets/images/p4807474924.jpg'

const data = reactive({
  queryParams: {
    id: undefined
  },
})

data.queryParams.id = route.query.id || route.params.id

// 返回上一页
const goBack = () => {
  router.back()
}

// 获取电影详情
const getList = async () => {
  const id = route.query.id || route.params.id
  if (!id) {
    console.error('未提供电影ID')
    return
  }

  loading.value = true
  try {
    // console.log('正在请求电影详情，ID:', id)
    const res = await selectMovieDetailVoById(id)
    // console.log('API响应结果:', res)

    if (res && res.data) {
      movieDetail.value = res.data.data
      // console.log('成功获取电影详情:', movieDetail.value)
    } else {
      console.error('获取电影详情失败: 返回数据格式异常')
    }
  } catch (error) {
    console.error('获取电影详情失败:', error)
  } finally {
    loading.value = false
  }
}

// 监听路由变化
watch(
    () => [route.query.id, route.params.id],
    ([newId]) => {
      if (newId) {
        // console.log('路由参数变化，重新获取电影详情:', newId)
        getList()
      }
    },
    { deep: true, immediate: true}
)

// 处理图片加载失败
const handleImageError = (event) => {
  event.target.src = defaultImageUrl
}

// 组件挂载时获取电影详情
onMounted(() => {
  getList()
})
</script>

<style scoped>
.movie-detail-container {
  min-height: 100vh;
  background-color: #f8f8f8;
  padding-top: 15px;
  position: relative;
}

.back-button {
  position: fixed;
  top: 15px;
  left: 15px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.loading-container,
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
}

.loading-text {
  margin-top: 10px;
  color: #666;
}

.detail-content {
  padding: 15px;
}

.poster-section {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
}

.movie-poster {
  width: 100%;
  border-radius: 8px;
}

.score-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff6b6b;
  color: white;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 18px;
  font-weight: bold;
}

.info-section {
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.movie-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #333;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  transition: color 0.2s ease;
}

.movie-title:hover {
  color: #1989fa; /* Vant主题色 */
}

.movie-meta {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.meta-tag {
  background-color: #f5f5f5;
  color: #666;
  font-size: 17px;
  padding: 4px 10px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s ease;
}

.meta-tag:hover {
  background-color: #e8e8e8;
  transform: translateY(-1px);
}

.movie-desc-wrapper {
  margin-bottom: 20px;
}

.movie-desc {
  font-size: 18px;
  color: #333;
  line-height: 1.8;
  padding: 12px;
  background-color: #f8f8f8;
  border-radius: 6px;
  border-left: 3px solid #1989fa;
  transition: all 0.3s ease;
}

.additional-info {
  border-top: 1px solid #eee;
  padding-top: 20px;
  margin-bottom: 20px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid #1989fa;
  display: inline-block;
}

.info-grid {
  display: grid;
  gap: 12px;
}

.info-item {
  display: flex;
  border-bottom: 1px dashed #f0f0f0;
  font-size: 17px;
  transition: background-color 0.2s ease;
  padding: 10px 5px;
  border-radius: 4px;
}

.info-item:hover {
  background-color: #fafafa;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item .label {
  color: #666;
  width: 50px;
  flex-shrink: 0;
  font-weight: 500;
  display: flex;
  align-items: center;
  font-size: 18px;
}

.info-item .value {
  color: #333;
  flex: 1;
  line-height: 1.7;
  word-break: break-word;
  font-size: 17px;
}

/* 添加响应式调整 */
@media (max-width: 375px) {
  .movie-title {
    font-size: 24px;
  }

  .info-item .label {
    width: 45px;
  }
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  padding-bottom: 70px; /* 为底部固定导航栏留出空间 */
}

.action-btn {
  flex: 1;
}
</style>
