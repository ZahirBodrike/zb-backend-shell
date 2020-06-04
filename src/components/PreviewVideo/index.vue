<template>
  <el-dialog
    v-el-drag-dialog
    :visible.sync="isShow"
    :title="title"
    width="80%"
    top="50px"
    center
    :modal-append-to-body="false"
  >
    <div v-if="isShow">
      <el-carousel
        :autoplay="false"
        :initial-index.sync="index"
        height="500px"
        indicator-position="outside"
        @change="onChangeItem"
      >
        <el-carousel-item v-for="(item,i) in list" :key="i">
          <div class="dialog-item">
            <video
              v-if="item"
              ref="videoItem"
              controls
              :src="typeof item==='object'?item[itemKey]:item"
            />
            <span v-else>暂无视频</span>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </el-dialog>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
export default {
  name: 'PreviewVideo',
  directives: { elDragDialog },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '视频预览'
    },
    list: {
      type: Array,
      default() {
        return []
      },
      required: true
    },
    itemKey: {
      type: String,
      default: 'url'
    }
  },

  data() {
    return {
      index: 0,
      isShow: false
    }
  },

  watch: {
    isShow(newVal) {
      this.$emit('update:visible', newVal)
    },

    visible(newVal) {
      this.isShow = newVal
    }
  },

  methods: {
    show(index) {
      this.isShow = true
      this.index = index
    },

    close() {
      this.isShow = false
    },

    onChangeItem() {
      this.$refs['videoItem'].map((item) => {
        if (item)item.pause()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-item{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #DCDFE6;
  padding: 10px;
  font-size: 60px;
  &>video{
    width: 100%;
    height: 100%;
  }
}
</style>
