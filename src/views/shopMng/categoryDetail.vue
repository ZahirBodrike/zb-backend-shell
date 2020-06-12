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
        <upload-img v-if="item.type == 'upload'" :list.sync="form[item.prop]" />

        <el-input
          v-else
          v-model="form[item.prop]"
          :style="itemStyle"
          :disabled="item.disabled"
        />
      </el-form-item>

      <el-form-item label-width="120px">
        <el-button type="primary" @click="handleSubmit">
          保存
        </el-button>
        <el-button @click="goBack">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import UploadImg from '@/components/UploadImg'
import { taobaoCategoryDetailForm, jingdongCategoryDetailForm, pinduoduoCategoryDetailForm,
  suningCategoryDetailForm, taobaoSubCategoryDetailForm } from './const/categoryDetailForm'

import { getTaobaoTypeListDetail, updateTaobaoTypeList, addTaobaoTypeList } from '@/api/taobaoGoodMng'
import { getJingdongTypeListDetail, updateJingdongTypeList, addJingdongTypeList } from '@/api/jingdongGoodMng'
import { getPinduoduoTypeListDetail, updatePinduoduoTypeList, addPinduoduoTypeList } from '@/api/pinduoduoGoodMng'

/* 分类详情表单 */
const categoryDetailFormMap = {
  taobao: taobaoCategoryDetailForm,
  jingdong: jingdongCategoryDetailForm,
  pinduoduo: pinduoduoCategoryDetailForm,
  suning: suningCategoryDetailForm
}

/* 二级分类的详情表单 */
const subCategoryDetailFormMap = {
  taobao: taobaoSubCategoryDetailForm
}

/* 获取分类详情 */
const getDetailMap = {
  taobao: getTaobaoTypeListDetail,
  jingdong: getJingdongTypeListDetail,
  pinduoduo: getPinduoduoTypeListDetail
}

/* 修改分类详情 */
const updateSubmitMap = {
  taobao: updateTaobaoTypeList,
  jingdong: updateJingdongTypeList,
  pinduoduo: updatePinduoduoTypeList
}

/* 添加分类 */
const addSubmitMap = {
  taobao: addTaobaoTypeList,
  jingdong: addJingdongTypeList,
  pinduoduo: addPinduoduoTypeList
}

export default {
  components: { UploadImg },
  data() {
    const pageType = this.$route.meta.type
    return {
      pageType,
      formItemList: categoryDetailFormMap[pageType],
      getDetail: getDetailMap[pageType],
      updateDetail: updateSubmitMap[pageType],
      addDetail: addSubmitMap[pageType],

      form: {},
      itemStyle: {
        width: `300px`
      },
      rules: {
        name: [{ required: true, message: '请填写类目名称' }],
        catId: [{ required: true, message: '请填写淘宝类目ID' }],
        sort: [{ required: true, message: '请填写运营位权重' }],
        icon: [{ required: true, message: '请上传icon' }]
      }
    }
  },
  mounted() {
    const query = this.$route.query
    if (query.type === 'sub' && !query.id) {
      /* 新建二级类目 */
      this.formItemList = subCategoryDetailFormMap[this.pageType]
      this.form.onlyReadName = query.name
    } else if (query.type === 'sub' && query.id) {
      /* 编辑二级类目 */
      this.formItemList = subCategoryDetailFormMap[this.pageType]
      this.handleGetCategoryDetail(query.id)
    } else if (!query.type && query.id) {
      /* 编辑一级类目 */
      this.handleGetCategoryDetail(query.id)
    }
  },
  methods: {
    goBack() {
      this.$router.push({ path: `${this.$route.matched[0].path}/category` })
    },
    handleSubmit() {
      /* 目前只有淘宝有二级类目 */
      if (this.pageType === 'taobao') {
        this.form.parentTypeId = this.$route.query.parentTypeId
        this.form.level = this.$route.query.parentTypeId ? 2 : 1
        this.form.onlyReadName = undefined
      }
      this.$refs.form.validate((valid) => {
        if (!valid) return

        if (this.$route.query.id) {
          this.updateDetail(this.form).then((res) => {
            if (res.code === 0) {
              this.$message.success('修改成功')
              this.$router.go(-1)
            }
          })
        } else {
          this.addDetail(this.form).then((res) => {
            if (res.code === 0) {
              this.$message.success('添加成功')
              this.$router.go(-1)
            }
          })
        }
      })
    },
    handleGetCategoryDetail(id) {
      this.getDetail({ id }).then((res) => {
        if (res.code === 0) {
          this.form = res.data

          /* 淘宝二级分类详情的只读显示 */
          if (this.$route.query.type === 'sub' && this.$route.query.id) {
            this.form.onlyReadName = res.data.parentTypeName
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.category-detail {
  padding: 20px;
}
</style>
