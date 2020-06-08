<template>
  <div class="shopMng-detail">
    <div class="nav">
      <mallki text="商品信息" class="text" />
      <div>
        <el-button type="primary" size="small" @click="handleSubmit">
          保存
        </el-button>
        <el-button size="small" @click="goBack">
          取消
        </el-button>
      </div>
    </div>

    <el-divider />

    <el-form
      ref="form"
      v-loading="loading"
      label-width="150px"
      :model="form"
    >
      <el-form-item
        v-for="(item, index) in formItemList"
        :key="index"
        :label="item.label"
        :prop="item.prop"
      >
        <el-date-picker
          v-if="item.type == 'daterange'"
          v-model="form[item.prop]"
          type="daterange"
          placeholder="请选择时间"
          :style="itemStyle"
          :disabled="item.disable"
        />

        <el-date-picker
          v-else-if="item.type == 'date'"
          v-model="form[item.prop]"
          type="date"
          placeholder="请选择时间"
          :style="itemStyle"
          :disabled="item.disable"
        />

        <el-card
          v-else-if="item.type == 'bigCard'"
          shadow="always"
          :style="{ width: '350px' }"
        >
          <el-image :src="form[item.prop]" :preview-src-list="[form[item.prop]]" />
        </el-card>

        <card-list
          v-else-if="item.type == 'miniCard'"
          :list="smallPicList(item.prop)"
          confirm-text="设为主图"
          @event-confirm="setMainPic"
        />

        <el-radio-group v-else-if="item.type == 'chooseCheck'" v-model="form[item.prop]" :disabled="item.disable">
          <el-radio :label="0">
            不检测
          </el-radio>
          <el-radio :label="1">
            检测
          </el-radio>
        </el-radio-group>

        <div v-else-if="item.type == 'search'">
          <el-input v-model="form[item.prop]" :style="itemStyle" :disabled="item.disable" />
          <el-button icon="el-icon-search" :disabled="item.disable" @click="handleSearchGood(form[item.prop])" />
        </div>

        <el-input
          v-else
          v-model="form[item.prop]"
          :style="itemStyle"
          :disabled="item.disable"
        />
      </el-form-item>
    </el-form>

    <el-back-to-top />
  </div>
</template>

<script>
import Mallki from '@/components/TextHoverEffect/Mallki'
import CardList from '@/components/CardList'
import ElBackToTop from '@/components/ElBackToTop'

import { taobaoDetailForm, jingdongDetailForm, pinduoduoDetailForm,
  weipinhuiDetailForm, suningDetailForm } from './const/goodDetailForm'

import { getTaobaoGoodListDetail, updateTaobaoGoodList } from '@/api/taobaoGoodMng'

import { getJingdongGoodListDetail, addJingdongGoodList, updateJingdongGoodList,
  getJingdongGoodListDetailById } from '@/api/jingdongGoodMng'

/* 详情表单字段 */
const fromItemListMap = {
  taobao: taobaoDetailForm,
  jingdong: jingdongDetailForm,
  pinduoduo: pinduoduoDetailForm,
  weipinhui: weipinhuiDetailForm,
  suning: suningDetailForm
}

/* 获取详情的api */
const detailApiMap = {
  taobao: getTaobaoGoodListDetail,
  jingdong: getJingdongGoodListDetailById
}

/* 更新功能的api */
const updateApiMap = {
  taobao: updateTaobaoGoodList,
  jingdong: updateJingdongGoodList
}

/* 新增功能的api */
const addApiMap = {
  jingdong: addJingdongGoodList
}

/* 兼容各类型的请求id */
const idNameMap = {
  taobao: 'goodsId',
  jingdong: 'id'
}

export default {
  components: { Mallki, CardList, ElBackToTop },
  data() {
    const pageType = this.$route.meta.type
    return {
      pageType,
      formItemList: fromItemListMap[pageType],
      getDetail: detailApiMap[pageType],
      postUpdate: updateApiMap[pageType],
      postAdd: addApiMap[pageType],
      idName: idNameMap[pageType],

      form: {},
      loading: false,

      itemStyle: {
        width: `300px`
      }
    }
  },
  mounted() {
    /* 编辑时的id无法编辑 */
    if (this.$route.query.id) {
      this.$set(this.formItemList[0], 'disable', true)
      this.getDetailData(this.$route.query.id)
    } else {
      this.$set(this.formItemList[0], 'disable', false)
    }
  },
  methods: {
    /* 切换主图 */
    setMainPic(item) {
      this.form['pictUrl'] = item
    },

    /* 返回列表 */
    goBack() {
      this.$router.push({ path: `${this.$route.matched[0].path}/list` })
    },

    /* 商品小图列表 兼容接口字段string的逗号不确定性 */
    smallPicList(prop) {
      if (this.pageType === 'taobao') {
        return this.form[prop] && this.form[prop].slice(0, this.form[prop].length - 1).split(',')
      } else {
        return this.form[prop] && this.form[prop].slice(0, this.form[prop].length).split(',')
      }
    },

    /* 通过商品id查询商品详情 */
    handleSearchGood(id) {
      this.loading = true
      getJingdongGoodListDetail({ skuId: id }).then((res) => {
        if (res.code === 200) {
          this.loading = false

          this.form = res.data
          this.form.couponTime = [res.data.getStartTime, res.data.getEndTime]

          if (this.pageType === 'jingdong') {
            const { jdfansCoupon } = res.data
            this.form = { ...this.form, ...jdfansCoupon }
            if (res.data.jdfansCoupon) this.form.couponTime = [res.data.jdfansCoupon.getStartTime, res.data.jdfansCoupon.getEndTime]
          }
        }
      })
    },

    /* 通过列表id获取商品详情 */
    getDetailData(id) {
      this.loading = true
      this.getDetail({ [this.idName]: id }).then((res) => {
        if (res.code === 200) {
          this.loading = false

          this.form = res.data
          this.form.couponTime = [res.data.getStartTime, res.data.getEndTime]

          if (this.pageType === 'jingdong') {
            const { jdfansCoupon } = res.data
            this.form = { ...jdfansCoupon, ...res.data }
            if (res.data.jdfansCoupon) this.form.couponTime = [res.data.jdfansCoupon.getStartTime, res.data.jdfansCoupon.getEndTime]
          }
        }
      })
    },

    /* 确定修改/新增 区分各个类型的obj参数 */
    handleSubmit() {
      let obj = {}
      if (this.pageType === 'taobao') {
        obj = {
          id: this.form.id,
          numIid: this.$route.query.id,
          status: this.form.status,
          pictUrl: this.form.pictUrl,
          title: this.form.title
        }
      } else if (this.pageType === 'jingdong') {
        obj = {
          id: this.form.id,
          jdfSkuId: this.form.jdfSkuId,
          pictUrl: this.form.pictUrl,
          goodsName: this.form.jdfSkuName,
          couponLink: this.form.link
        }
      }

      if (this.$route.query.id) {
        this.postUpdate(obj).then((res) => {
          if (res.code === 200) {
            this.$message.success('修改成功')
            this.$router.go(-1)
          }
        })
      } else {
        this.postAdd(obj).then((res) => {
          if (res.code === 200) {
            this.$message.success('添加成功')
            this.$router.go(-1)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.shopMng-detail {
  padding: 20px;
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
      font-size:  24px;
    }
  }
}
</style>
