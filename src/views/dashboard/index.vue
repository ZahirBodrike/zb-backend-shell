<template>
  <div class="dashboard-container">
    <mallki class-name="mallki-text" text="骑士团后台首页" />

    <el-card shadow="hover" :style="{ width: '500px', marginTop: '100px' }">
      <div class="search">
        <span class="label">快速搜索侧边栏：</span>
        <header-search class="index-search" />
      </div>
    </el-card>
  </div>
</template>

<script>
import Mallki from '@/components/TextHoverEffect/Mallki'
import HeaderSearch from '@/components/HeaderSearch'

export default {
  name: 'Dashboard',
  components: { Mallki, HeaderSearch }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  .mallki-text {
    font-size: 40px;
  }
  .search {
    display: flex;
    justify-content: center;
    .label {
      color: #409EFF;
    }
    .index-search {
      color: #409EFF;
    }
  }
}
</style>
