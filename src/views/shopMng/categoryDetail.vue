<template>
  <div class="category-detail">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item
        v-for="(item, index) in formItemList"
        :key="index"
        label-width="120px"
        :label="item.label"
        :prop="item.prop"
      >
        <upload-img v-if="item.type == 'upload'" :list.sync="imgList" />

        <el-input v-else v-model="form[item.prop]" :style="itemStyle" />
      </el-form-item>

      <el-form-item label-width="120px">
        <el-button type="primary" @click="handleSubmit">保存</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import UploadImg from '@/components/UploadImg'
import { taobaoCategoryDetailForm, jingdongCategoryDetailForm, pinduoduoCategoryDetailForm,
  suningCategoryDetailForm, taobaoSubCategoryDetailForm } from './const/categoryDetailForm'

const categoryDetailFormMap = {
  taobao: taobaoCategoryDetailForm,
  jingdong: jingdongCategoryDetailForm,
  pinduoduo: pinduoduoCategoryDetailForm,
  suning: suningCategoryDetailForm
}

const subCategoryDetailFormMap = {
  taobao: taobaoSubCategoryDetailForm
}

export default {
  components: { UploadImg },
  data() {
    const pageType = this.$route.meta.type
    return {
      pageType,
      formItemList: categoryDetailFormMap[pageType],

      form: {},
      imgList: '',
      itemStyle: {
        width: `300px`
      },
      rules: {
        name: [{ required: true, message: '请填写类目名称' }],
        id: [{ required: true, message: '请填写淘宝类目ID' }],
        sort: [{ required: true, message: '请填写运营位权重' }],
        icon: [{ required: true }]
      }
    }
  },
  mounted() {
    if (this.$route.query.type === 'sub') {
      this.formItemList = subCategoryDetailFormMap[this.pageType]
    }
  },
  methods: {
    goBack() {
      this.$router.push({ path: `${this.$route.matched[0].path}/category` })
    },
    handleSubmit() {
      console.log(this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
.category-detail {
  padding: 20px;
}
</style>
