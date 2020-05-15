<template>
  <div class="dashboard-container">
    <mallki class-name="mallki-text" text="骑士团后台首页" />
  </div>
</template>

<script>
import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  name: 'Dashboard',
  components: { Mallki }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .mallki-text {
    font-size: 40px;
  }
}
</style>
