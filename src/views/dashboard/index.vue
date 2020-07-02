<template>
  <div class="dashboard-container">
    <el-image
      :fit="`cover`"
      :src="bannerImg"
      class="banner-img"
    />

    <div class="body animate__animated animate__wobble">
      <h1>
        聚米生活后台管理系统
      </h1>

      <div class="search">
        <p>点击快速查找侧边栏：</p>
        <header-search />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderSearch from '@/components/HeaderSearch'

export default {
  name: 'Dashboard',
  components: { HeaderSearch },
  data() {
    return {
      bannerImg: require('@/assets/homepage.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  height: calc(100vh - 84px);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  .banner-img {
    width: 100%;
    height: 100%;
    transition: all 0.5s linear;
  }
  .body {
    position: absolute;
    color: white;
    font-size: 32px;
    top: 200px;
    letter-spacing: 4px;
    text-align: center;
    .search {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      margin-top: 20px;
    }
  }
}
</style>
