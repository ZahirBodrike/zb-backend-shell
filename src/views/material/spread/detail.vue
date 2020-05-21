<template>
  <div v-loading.fullscreen="loading" class="app-container">
    <div class="section-box">
      <el-row>
        <el-form ref="detailForm" :inline="true" :model="detailForm" label-width="200px">
          <el-row>
            <el-form-item label="作者：" prop="author">
              <el-select v-model="detailForm.author" clearable placeholder="请选择">
                <el-option
                  v-for="item in authorFilter"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="宣传文案：" prop="proposal" :rules="rules.no_null">
              <el-input
                v-model="detailForm.proposal"
                type="textarea"
                clearable
                placeholder="请输入"
                :autosize="{ minRows: 5}"
                maxlength="200"
                show-word-limit
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="素材图片：" prop="imgs" :rules="rules.no_null">
              <uploadImg :list.sync="detailForm.imgs" :limit-count="6" />
            </el-form-item>
          </el-row>
        </el-form>
      </el-row>
    </div>
    <el-row type="flex" justify="center" class="detail-btn-box">
      <el-button @click="onHandleDetailsCancel">取消</el-button>
      <el-button type="primary" @click="onHandleSubmitForm('detailForm')">保存</el-button>
    </el-row>
  </div>
</template>

<script>
import uploadImg from '@/components/UploadImg'
import { AUTHOR_FILTER } from '@/utils/constant.js'
import * as materialService from '@/api/material'

export default {
  components: {
    uploadImg
  },

  data() {
    return {
      loading: false,
      rules: {
        no_null: [
          { required: true, message: '不能为空', trigger: ['blur', 'change'] }
        ]
      },
      detailForm: {
        id: '',
        author: '',
        proposal: '',
        imgs: []
      },
      detailId: null,
      authorFilter: AUTHOR_FILTER
    }
  },

  created() {
    this.$nextTick(() => {
      this.detailId = this.$route.query.id
      if (this.detailId) {
        this.getDetailsData(this.detailId)
      }
    })
  },

  methods: {
    /** 获取详情信息 */
    getDetailsData(id) {
      materialService.spreadMaterialDetail({ id: id }).then(response => {
        if (response.code === 200) {
          this.detailForm = response.data
        } else {
          this.$message['error'](response.msg)
        }
      })
    },
    /** 详情取消 */
    onHandleDetailsCancel() {
      this.$router.go(-1)
    },

    /** 提交表单 */
    onHandleSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return this.$message.error('提交信息有误！')
        this.loading = true
        if (this.detailId) {
          this.detailForm.id = this.detailId
        }
        materialService[
          this.detailId ? 'spreadMaterialUpdate' : 'spreadMaterialAdd'
        ](this.detailForm)
          .then(response => {
            this.loading = false
            this.$message[response.code === 200 ? 'success' : 'error'](
              response.msg
            )
            if (response.code === 200) this.$router.go(-1)
          })
          .catch(Error => {
            this.loading = false
          })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.section-box {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
}

.detail-btn-box {
  .el-button {
    width: 200px;
  }
}

.upload-header-box {
  margin-bottom: 20px;
  & > h3 {
    margin: 10px;
  }
}
</style>
