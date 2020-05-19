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
        <video :src="item.raw.ossUrl" class="el-upload-list__item-thumbnail" />
        <span v-if="item.name" class="name">{{ item.name }}</span>
        <div class="el-upload-mask">
          <span v-if="canPreview" class="el-icon-zoom-in" @click="onHandlePreviewItem(index)" />
          <span v-if="canDelete" class="el-icon-delete" @click="onHandleRemoveVideoItem(index)" />
          <slot name="button" />
        </div>
      </div>
    </draggable>
    <el-upload
      v-show="fileList.length<limitCount"
      multiple
      auto-upload
      :on-exceed="onHandleExceed"
      :on-success="onHandleSuccess"
      :on-error="onHandleError"
      :before-upload="beforeUploadVideos"
      :data="params"
      :limit="limitCount"
      :headers="{'x-oss-object-acl':'private'}"
      :action="actionUrl"
      :file-list="fileList"
      :show-file-list="false"
      list-type="picture-card"
      class="el-upload-custom"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <PreviewVideo ref="UploadPreviewVideo" :list="typeof list==='object'?list:[list]" />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import PreviewVideo from '@/components/PreviewVideo'
import { getAliOSSConfig, getAuthUrl } from '@/api/upload' // 请求后台的接口拿Ali-OSS数据

export default {
  name: 'UploadVideo',
  components: { draggable, PreviewVideo },
  props: {
    canPreview: {
      type: Boolean,
      default: true
    },
    canDelete: {
      type: Boolean,
      default: true
    },
    limitCount: {
      type: Number,
      default: 1
    },
    limitSize: {
      type: Number,
      default: 50
    }, // 限制视频大小(M数)
    list: {
      required: true,
      type: Array
    } // 如果限制为1张时为字符串,绑定时必须加sync修饰符
  },

  data() {
    return {
      actionUrl: 'https://oss.aliyuncs.com',
      params: null,
      fileList: [], // 文件列
      isListWatch: false,
      isFileListWatch: false,
      dir: 'upload-video/'
    }
  },

  watch: {
    fileList(newVal) {
      this.fileObjToStr(newVal)
    },

    list(newVal) {
      this.fileSrtToObj(newVal)
    }
  },

  created() {
    if (this.list) this.fileSrtToObj(this.list)// 为了兼容父级没有声明，初始化无法侦听改变
  },

  methods: {
    /** 图片字符串转换上传对象 */
    fileSrtToObj(newVal) {
      if (this.isFileListWatch) { // 如果fileList修改格式，list就不需要修改，避免死循环和重复修改
        this.isFileListWatch = false
      } else {
        this.isListWatch = true
        const orgList = (typeof newVal === 'string' || newVal == null || this.limitCount === 1) ? (newVal !== '' && newVal != null ? [newVal] : []) : newVal
        const newList = [].concat(orgList).map(item => {
          return { raw: { ossUrl: item }}
        })
        this.fileList = newList
      }
    },
    /** 图片上传对象转换字符串 */
    fileObjToStr(newVal) {
      if (this.isListWatch) { // 如果list修改格式，fileList就不需要修改，避免死循环和重复修改
        this.isListWatch = false
      } else {
        this.isFileListWatch = true
        const newList = [].concat(newVal).map(item => {
          return item ? item.raw.ossUrl : null
        })
        const resList = (typeof newVal === 'string' || newVal == null || this.limitCount === 1) ? (newList.length > 0 ? newList[0] : '') : newList
        this.$emit('update:list', resList)
      }
    },
    /** 上传错误 */
    onHandleError(error, file, fileList) {
      this.$message.error(`视频上传失败！Message: ${error}`)
    },

    // 文件超出个数限制时的钩子
    onHandleExceed(files, fileList) {
      this.$message.warning(`每次只能上传 ${this.limitCount} 个文件`)
    },

    // 文件列表移除文件时的钩子
    onHandleRemoveVideoItem(index) {
      this.fileList.splice(index, 1)
    },

    // 文件上传成功时的钩子
    async onHandleSuccess(response, file, fileList) {
      const { code, data } = await getAuthUrl({ 'dir': this.dir, 'fileName': file.raw.ossName })
      if (code === 200) {
        const index = fileList.indexOf(file)
        if (index !== -1) {
          file.url = data
          file.raw.ossUrl = data
          fileList[index].url = data
          fileList[index].raw.ossUrl = data
          this.fileList = fileList
        }
      }
    },

    /** 预览图片 */
    onHandlePreviewItem(index) {
      this.$refs['UploadPreviewVideo'].show(index)
    },

    // 文件上传前的校验
    beforeUploadVideos(file) {
      const isLt50M = file.size / 1024 / 1024 < this.limitSize
      if (['video/mp4'].indexOf(file.type) === -1) {
        this.$message.error('请上传正确的视频格式')
        return false
      }
      if (!isLt50M) {
        this.$message.error(`上传视频大小要在${this.limitSize}MB以内!`)
        return false
      }

      return new Promise((resolve, reject) => {
        getAliOSSConfig()
          .then(response => {
            const {
              accessKeyId,
              dir,
              expire,
              host,
              policy,
              signature,
              domain
            } = response.data // 接口返回配置参数
            this.dir = response.data.dir
            const key = this.getFileName(dir, file.name)
            this.actionUrl = host // 修改host
            this.params = {
              key,
              policy,
              signature,
              expire,
              name: file.name,
              OSSAccessKeyId: accessKeyId,
              success_action_status: '200'
            }
            file.ossUrl = `${domain}/${key}`
            console.log(dir)
            file.ossName = key.replace(dir, '')
            resolve(true)
          })
          .catch(() => {
            reject(false)
          })
      })
    },

    getFileName(dir, filename) {
      const suffix = this.getSuffix(filename)
      const dateStr = new Date().getTime()
      const randomStr = this.randomString(5)
      const name = `${dir}${dateStr}${randomStr}${suffix}`
      return name
    },

    getSuffix(filename) {
      const pos = filename.lastIndexOf('.')
      let suffix = ''
      if (pos !== -1) {
        suffix = filename.substring(pos)
      }
      return suffix
    },

    randomString(len) {
      len = len || 32
      const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      const maxPos = chars.length
      let pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
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
