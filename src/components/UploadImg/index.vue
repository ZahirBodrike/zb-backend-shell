<template>
  <div class="components-uploadImg">
    <draggable
      :list="fileList"
      class="el-upload-list el-upload-list--picture-card el-upload-custom-show"
    >
      <div v-for="(item,index) in fileList" :key="index" class="el-upload-list__item is-success">
        <label class="el-upload-list__item-status-label">
          <i class="el-icon-upload-success el-icon-check" />
        </label>
        <el-image :src="item.url" class="el-upload-list__item-thumbnail" :preview-src-list="[item.url]" />
        <span v-if="item.name" class="name">{{ item.name }}</span>
        <div class="el-upload-mask">
          <span v-if="canPreview" class="el-icon-zoom-in" @click="showViewer = true" />
          <span v-if="canDelete" class="el-icon-delete" @click="onHandleRemoveImgItem(index)" />
          <slot name="button" />
        </div>
      </div>
    </draggable>
    <el-upload
      v-show="fileList.length < limitCount"
      :on-exceed="onHandleExceed"
      :on-remove="onHandleRemove"
      :on-success="onHandleSuccess"
      :on-error="onHandleError"
      :before-upload="beforeUploadImages"
      :http-request="httpRequestImages"
      :limit="limitCount"
      :action="actionUrl"
      :file-list="fileList"
      :multiple="true"
      :auto-upload="true"
      :show-file-list="false"
      list-type="picture-card"
      class="el-upload-custom"
    >
      <i class="el-icon-plus" />
    </el-upload>

    <el-image-viewer
      v-if="showViewer"
      :on-close="() => { showViewer = false }"
      :url-list="fileList.map(i => i.url)"
    />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import request from '@/utils/request'
import API from '@/api/common'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'

export default {
  name: 'UploadImg',
  components: { draggable, ElImageViewer },
  props: {
    canPreview: {
      type: Boolean,
      default: true
    }, // 是否显示预览
    canDelete: {
      type: Boolean,
      default: true
    }, // 是否显示删除
    actionUrl: {
      type: String,
      default: API.uploadImg2
    }, // 图片发送请求的地址
    limitCount: {
      type: Number,
      default: 1
    }, // 最大上传文件数
    limitSize: {
      type: Number,
      default: 500
    }, // 限制图片大小(k数)
    limitWidth: {
      type: Number,
      default: -1
    }, // 限制图片宽度(px)
    list: {
      type: [Array, String],
      default: () => '',
      required: true
    }, // 如果限制为1张时为字符串,绑定时必须加sync修饰符
    sizeLimitCkeck: {
      type: Boolean,
      default: false
    },
    coverSizeLimitCkeck: {
      type: Boolean,
      default: false
    },
    bannerSizeLimitCkeck: {
      type: Boolean,
      default: false
    },
    navigationSizeLimitCkeck: {
      type: Boolean,
      default: false
    },
    invitePosterSizeLimitCheck: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      fileList: [], // 和list互斥
      isListWatch: false,
      isFileListWatch: false,
      showViewer: false
    }
  },

  watch: {
    fileList(newVal) {
      this.imgObjToStr(newVal)
    },

    list(newVal) {
      this.imgSrtToObj(newVal)
    }
  },

  created() {
    if (this.list) this.imgSrtToObj(this.list)// 为了兼容父级没有声明，初始化无法侦听改变
  },

  methods: {
    /** 图片字符串转换上传对象 */
    imgSrtToObj(newVal) {
      if (this.isFileListWatch) { // 如果fileList修改格式，list就不需要修改，避免死循环和重复修改
        this.isFileListWatch = false
      } else {
        this.isListWatch = true
        const orgList = (typeof newVal === 'string' || newVal == null || this.limitCount === 1) ? (newVal !== '' && newVal != null ? [newVal] : []) : newVal
        const newList = [].concat(orgList).map(item => {
          return { url: item }
        })
        this.fileList = newList
      }
    },

    /** 图片上传对象转换字符串 */
    imgObjToStr(newVal) {
      if (this.isListWatch) { // 如果list修改格式，fileList就不需要修改，避免死循环和重复修改
        this.isListWatch = false
      } else {
        this.isFileListWatch = true
        const newList = [].concat(newVal).map(item => {
          return item ? item.url : null
        })
        const resList = (typeof newVal === 'string' || newVal == null || this.limitCount === 1) ? (newList.length > 0 ? newList[0] : '') : newList
        this.$emit('update:list', resList)
      }
    },

    /** 图片上传错误 */
    onHandleError(error, file, fileList) {
      this.$message.error(`图片上传失败！Message: ${error}`)
    },

    /** 超过限制 */
    onHandleExceed(files, fileList) {
      this.$message.error(
        `当前选择超出限制，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },

    /** 图片上传前 */
    beforeUploadImages(file) {
      const list = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
      const isImage = list.indexOf(file.type) > -1
      const isLtSize = file.size / 1024 < this.limitSize
      if (!isImage) {
        this.$message.error('上传图片只能是jpg/jpeg/png/gif格式!')
      }
      if (!isLtSize) {
        this.$message.error(`缩略图片大小不能超过${this.limitSize}K!`)
        return false
      }
      if (this.sizeLimitCkeck) {
        return this.valSize(file)
      }
      if (this.coverSizeLimitCkeck) {
        // 封面图片尺寸校验
        return this.valCoverSize(file)
      }
      if (this.bannerSizeLimitCkeck) {
        // banner图片尺寸校验
        return this.valBannerSize(file)
      }
      if (this.navigationSizeLimitCkeck) {
        // banner图片尺寸校验
        return this.valNavigationSize(file)
      }
      if (this.invitePosterSizeLimitCheck) {
        // 邀请海报尺寸校验
        return this.valInvitePosterSize(file)
      }

      if (this.limitWidth !== -1) {
        // 有宽度限制
        return this.valWidth(file)
      } else {
        return true
      }
    },

    /** 校验图片长度 */
    valWidth(file) {
      const _this = this
      return new Promise((resolve, reject) => {
        const width = _this.limitWidth // 图片宽度
        const _URL = window.URL || window.webkitURL
        const image = new Image()
        image.src = _URL.createObjectURL(file)
        image.onload = () => {
          const valid = image.width <= width
          valid ? resolve() : reject()
        }
      }).then(
        () => {
          return file
        },
        () => {
          this.$message.error(`上传图片的宽度必须小于${this.limitWidth}`)
          return Promise.reject()
        }
      )
    },

    /** 校验图片规格 */
    valSize(file) {
      return new Promise((resolve, reject) => {
        const _URL = window.URL || window.webkitURL
        const image = new Image()
        image.src = _URL.createObjectURL(file)
        image.onload = function() {
          const valid = (image.width === 750 && image.height === 750) || (image.width === 800 && image.height === 800)
          valid ? resolve() : reject()
        }
      }).then(
        () => {
          return file
        },
        () => {
          this.$message.error(`上传图片尺寸必须等于于750*750或者800*800`)
          return Promise.reject()
        }
      )
    },

    /** 校验图片规格 */
    valCoverSize(file) {
      return new Promise((resolve, reject) => {
        const _URL = window.URL || window.webkitURL
        const image = new Image()
        image.src = _URL.createObjectURL(file)
        image.onload = function() {
          const valid = (image.width === 750 && image.height === 750) || (image.width === 800 && image.height === 800) || (image.width === 400 && image.height === 400)
          valid ? resolve() : reject()
        }
      }).then(
        () => {
          return file
        },
        () => {
          this.$message.error(`上传图片尺寸必须等于于400*400或者750*750或者800*800`)
          return Promise.reject()
        }
      )
    },

    /** 校验首页banner图片规格 */
    valBannerSize(file) {
      return new Promise((resolve, reject) => {
        const _URL = window.URL || window.webkitURL
        const image = new Image()
        image.src = _URL.createObjectURL(file)
        image.onload = function() {
          const valid = (image.width === 750 && image.height === 320)
          valid ? resolve() : reject()
        }
      }).then(
        () => {
          return file
        },
        () => {
          this.$message.error(`上传图片尺寸必须等于于750*320`)
          return Promise.reject()
        }
      )
    },

    /** 首页导航栏图片规格 */
    valNavigationSize(file) {
      return new Promise((resolve, reject) => {
        const _URL = window.URL || window.webkitURL
        const image = new Image()
        image.src = _URL.createObjectURL(file)
        image.onload = function() {
          const valid = (image.width === 750 && image.height === 270)
          valid ? resolve() : reject()
        }
      }).then(
        () => {
          return file
        },
        () => {
          this.$message.error(`上传图片尺寸必须等于于750*270`)
          return Promise.reject()
        }
      )
    },

    /** 邀请海报图片规格 */
    valInvitePosterSize(file) {
      return new Promise((resolve, reject) => {
        const _URL = window.URL || window.webkitURL
        const image = new Image()
        image.src = _URL.createObjectURL(file)
        image.onload = function() {
          const valid = (image.width === 750 && image.height === 1218)
          valid ? resolve() : reject()
        }
      }).then(
        () => {
          return file
        },
        () => {
          this.$message.error(`请上传750×1218px尺寸的海报图片`)
          return Promise.reject()
        }
      )
    },

    /** 覆盖请求头 */
    httpRequestImages(options) {
      if (!options.file) return false
      const reader = new FileReader()
      reader.readAsDataURL(options.file)
      reader.onload = () => {
        const config = {
          url: options.action,
          method: 'post',
          data: {
            content: reader.result.split(',')[1],
            fileType: 'jpeg'
          }
        }
        request(config)
          .catch(err => {
            options.onError(err)
          })
          .then(res => {
            if (res.code === 200) {
              this.fileList.push({
                raw: options.file,
                name: options.file.name,
                size: options.file.size,
                uid: options.file.uid,
                url: res.data.url
              })
            } else {
              options.onError(res)
            }
          })
      }
      reader.onerror = error => {
        this.$message.error(error)
      }
    },

    /** 图列表上传成功 */
    onHandleSuccess(response, file, fileList) {},

    /** 图列表删除 */
    onHandleRemove(file, fileList) {
      const index = this.fileList.indexOf(file)
      if (index > -1) this.fileList.splice(index, 1)
    },

    /** 拖拽列表删除 */
    onHandleRemoveImgItem(index) {
      this.fileList.splice(index, 1)
    },

    /** 设置图片（用于重置） */
    setList(list) {
      this.fileList = list
    }
  }
}
</script>

<style scoped lang="scss">
.el-upload-custom-show,
.el-upload-custom {
  display: inline-block;
}

.el-upload-custom-show {
  .el-upload-list__item {
    position: relative;
    border: 1px solid #e3e3e3;
    &:hover {
      .el-upload-mask {
        opacity: 1;
      }
    }
    .name {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      font-size: 14px;
      line-height: 16px;
      color: white;
      word-break: break-all;
      text-align: center;
      background: rgba(0, 0, 0, 0.5);
    }
  }
  .el-upload-mask {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    opacity: 0;
    font-size: 18px;
    transition: opacity 0.2s ease;
    justify-content: center;
    align-items: center;
    span {
      width: 25%;
      height: 25%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin: 0 5px;
    }
  }
}

.dialog-item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  background: #e3e3e3;
  padding: 10px;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>

<style lang="scss">
  .el-upload-mask {
      span {
      width: 25%;
      height: 25%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin: 0 5px;
    }
  }
</style>

