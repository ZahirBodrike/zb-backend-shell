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
            <el-form-item label="商品素材图片：" prop="imgs" :rules="rules.no_null">
              <uploadImg :list.sync="detailForm.imgs" :limit-count="6" />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="商品视频（不超过30M）：" prop="video">
              <uploadVideo :list.sync="detailForm.video" :limit-count="1" />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="商品所属平台：" prop="platform" :rules="rules.no_null">
              <el-select v-model.number="detailForm.platform" clearable placeholder="请选择">
                <el-option
                  v-for="item in supplierFilter"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="商品ID：" prop="goodsId" :rules="rules.no_null">
              <el-row :gutter="4">
                <el-col :span="19">
                  <el-input v-model.trim="detailForm.goodsId" clearable />
                </el-col>
                <el-col :span="5">
                  <el-button type="primary" icon="el-icon-search" @click="onHandleSearchGoods()" />
                </el-col>
              </el-row>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="商品标题：" prop="goodsName">
              <el-input v-model.trim="detailForm.goodsName" disabled />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="商品价格：" prop="goodsPrice">
              <el-input v-model.trim="detailForm.goodsPrice" disabled />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="优惠券面值：" prop="goodsCouponPrice">
              <el-input v-model.trim="detailForm.goodsCouponPrice" disabled />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="领券价(券后)：" prop="goodsPostCouponPrice">
              <el-input v-model.trim="detailForm.goodsPostCouponPrice" disabled />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="佣金比例：" prop="goodsCommissionRate">
              <el-input v-model.trim="detailForm.goodsCommissionRate" disabled />
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
import uploadVideo from '@/components/UploadVideo'
import { SUPPLIER_FILTER, AUTHOR_FILTER } from '@/utils/constant.js'
import * as materialService from '@/api/material'

export default {
  components: {
    uploadImg,
    uploadVideo
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
        imgs: [],
        video: '',
        platform: '',
        goodsId: '',
        goodsName: '',
        goodsPrice: '',
        goodsCouponPrice: '',
        goodsPostCouponPrice: '',
        goodsCommissionRate: ''
      },
      detailId: null,
      authorFilter: AUTHOR_FILTER,
      supplierFilter: SUPPLIER_FILTER
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
      materialService.goodsMaterialDetail({ id: id }).then(response => {
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
        if (this.detailForm.video) {
          var index = this.detailForm.video.lastIndexOf('?')
          if (index !== -1) {
            this.detailForm.video = this.detailForm.video.substring(0, index)
          }
        }
        materialService[
          this.detailId ? 'goodsMaterialUpdate' : 'goodsMaterialAdd'
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
    },
    /** 搜索商品信息 */
    onHandleSearchGoods() {
      if (!this.detailForm.platform) {
        this.$message['error']('请先选择商品所属平台！')
        return
      }

      materialService.goodsInfo({ platform: this.detailForm.platform, goodsId: this.detailForm.goodsId })
        .then(response => {
          this.$message[response.code === 200 ? 'success' : 'error'](
            response.msg
          )
          if (response.code === 200) {
            // TODO 赋值商品信息
          }
        })
        .catch(Error => {
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
