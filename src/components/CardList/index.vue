<template>
  <el-row type="flex" style="flex-wrap: wrap">
    <el-card v-for="(item,index) in list" :key="index" class="card-box" shadow="hover">
      <div class="img-box">
        <img :src="item">
      </div>
      <div class="btn-box">
        <el-button type="text" @click="onHandlePreviewItem(index)">查看图片</el-button>
        <el-button type="text" @click="onHandleConfirmItem(index)">{{ confirmText }}</el-button>
      </div>
    </el-card>
  </el-row>
</template>

<script>
export default {
  name: 'CardList',
  props: {
    list: {
      type: Array,
      default: () => [],
      required: true
    },
    confirmText: {
      type: String,
      default: '确定'
    }
  },
  data() {
    return {}
  },
  methods: {
    onHandleConfirmItem(index) {
      this.$emit('event-confirm', this.list[index])
    }
  }
}
</script>

<style lang="scss" scoped>

.card-box {
  width: 15%;
  margin:6px;
  /deep/ .el-card__body {
    padding: 0;
  }
  .img-box {
    width: 100%;
    height: 150px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .btn-box{
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    button{
      margin: 0;
    }
  }
}
</style>
