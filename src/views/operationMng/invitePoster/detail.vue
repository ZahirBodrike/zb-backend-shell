<template>
  <div v-loading.fullscreen="loading" class="app-container">
    <div class="section-box">
      <el-row>
        <el-form
          ref="detailForm"
          :inline="true"
          :model="detailForm"
          label-width="200px"
        >
          <el-row>
            <el-form-item label="邀请海报图标题" prop="posterTitle" :rules="rules.no_null">
              <el-input v-model.trim="detailForm.posterTitle" />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="是否默认模板" prop="defaultFlag" :rules="rules.no_null">
              <el-radio-group v-model="detailForm.defaultFlag">
                <el-radio v-for="d in defaultFilter" :key="d.value" :label="d.value">
                  {{ d.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="状态：" prop="enable" :rules="rules.no_null">
              <el-select v-model="detailForm.enable" clearable placeholder="请选择">
                <el-option
                  v-for="item in statusFilter"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="上架时间：" prop="onLine" :rules="rules.no_null">
              <el-date-picker
                v-model="detailForm.onLine"
                :default-time="['00:00:00','23:59:59']"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="timestamp"
                align="center"
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="备注" prop="remark">
              <el-input v-model.trim="detailForm.remark" />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="海报图片(750×1218px)：" prop="posterImgs" :rules="rules.no_null">
              <uploadImg :list.sync="detailForm.posterImgs" :invite-poster-size-limit-check="true" :limit-count="5" />
            </el-form-item>
          </el-row>
        </el-form>
      </el-row>
    </div>
    <el-row type="flex" justify="center" class="detail-btn-box">
      <el-button @click="onHandleDetailsCancel">
        取消
      </el-button>
      <el-button type="primary" @click="onHandleSubmitForm('detailForm')">
        保存
      </el-button>
    </el-row>
  </div>
</template>

<script>
import uploadImg from '@/components/UploadImg'
import { STATUS_SELECT_FILTER } from '@/utils/constant.js'
import * as operationService from '@/api/operation'

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
        posterId: '',
        posterTitle: '',
        posterImgs: [],
        addedTime: '',
        shelfTime: '',
        onLine: [],
        defaultFlag: 0,
        enable: '',
        remark: ''
      },
      detailId: null,
      statusFilter: STATUS_SELECT_FILTER,
      defaultFilter: [
        { value: 1, label: '是' },
        { value: 0, label: '否' }
      ]
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
      operationService.invitePosterDetail({ id: id }).then((response) => {
        var addedTime = new Date(response.data.addedTime.replace(/-/g, '/')).getTime()
        var shelfTime = new Date(response.data.shelfTime.replace(/-/g, '/')).getTime()
        if (response.code === 0) {
          this.detailForm = {
            ...response.data,
            onLine: [addedTime, shelfTime]
          }
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
      this.$refs[formName].validate((valid) => {
        if (!valid) return this.$message.error('提交信息有误！')
        if (this.detailId) {
          this.detailForm.id = this.detailId
        }
        const onLine = this.detailForm.onLine
        var addedTime = new Date(onLine[0] + 8 * 3600000)
        var shelfTime = new Date(onLine[1] + 8 * 3600000)
        const data = {
          ...this.detailForm,
          addedTime: addedTime,
          shelfTime: shelfTime
        }
        this.loading = true
        operationService[
          this.detailId ? 'invitePosterUpdate' : 'invitePosterAdd'
        ](data)
          .then((response) => {
            this.loading = false
            if (response.code === 0) this.$router.go(-1)
          })
          .catch((Error) => {
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
