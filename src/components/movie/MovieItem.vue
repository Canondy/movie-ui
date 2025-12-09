<template>
  <!-- 电影Item组件 -->
  <div class="content-item" @click="handleItemClick">
    <div class="poster-container">
      <img :src="item.imageUrl" :alt="item.movieName" class="content-image" @error="handleImageError" />
      <!-- 评分标签 -->
      <div v-if="item.score" class="score-tag">
        <span class="score">{{ item.score }}</span>
      </div>
    </div>
    <div class="content-text">
      <div class="title">{{ item.movieName }} （{{ item.year }}）</div>
      <div class="description">{{ item.desc }}</div>
      <!-- 添加年份信息 -->
      <!-- <div v-if="item.year" class="year">{{ item.year }}</div> -->
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

// 定义props
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

// 创建路由实例
const router = useRouter()

// 处理图片加载失败
const handleImageError = (event) => {
  // 设置默认图片
  event.target.src = '/src/assets/images/p4807474924.jpg';
}

// 处理电影卡片点击
const handleItemClick = () => {
  // 如果有电影ID，跳转到详情页
  if (props.item.id) {
    // console.log('查看电影详情:', props.item.movieName);
    // 路由跳转到电影详情页
    router.push({
      path: '/movie/detail',
      query: {id: props.item.id}
    })
  }
}
</script>

<style scoped>
.content-item {
  width: calc(50% - 5px); /* 配合父组件的 justify-content: space-between */
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 10px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.content-item:active {
  transform: scale(0.98);
}

.poster-container {
  position: relative;
  padding-top: 140%; /* 固定宽高比 */
  overflow: hidden;
  background-color: #f0f0f0;
}

.content-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.content-item:hover .content-image {
  transform: scale(1.05);
}

.score-tag {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(255, 165, 0, 0.9);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.content-text {
  padding: 10px;
}

.title {
  font-size: 19px;
  font-weight: 600;
  color: red;
  margin-bottom: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.description {
  font-size: 16px;
  color: #666;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
  margin-bottom: 5px;
}
</style>
