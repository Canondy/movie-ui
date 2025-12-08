<template>
  <div class="content-item">
    <div class="item-content">
      <img :src="item.imageUrl" alt="content" class="content-image" />
      <div class="content-text">
        <div class="title">{{ item.movieName }}</div>
        <div class="description">{{ item.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.content-item {
  width: 50%;
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
}
</style>
