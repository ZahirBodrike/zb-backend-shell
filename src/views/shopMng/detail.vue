<template>
  <div class="shopMng-detail">
    <sticky>
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
    </sticky>

    <el-form
      ref="form"
      v-loading="loading"
      :style="{ marginTop: '20px' }"
      label-width="150px"
      :model="form"
      :rules="rules"
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
          :value-format="`yyyy-MM-dd HH:mm:ss`"
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

        <el-radio-group
          v-else-if="item.type == 'chooseCheck'"
          v-model="form[item.prop]"
          :disabled="item.disable"
        >
          <el-radio :label="0">
            不检测
          </el-radio>
          <el-radio :label="1">
            自动检测
          </el-radio>
          <el-radio :label="2">
            定时检测
          </el-radio>
        </el-radio-group>

        <div v-else-if="item.type == 'search'">
          <el-input
            v-model="form[item.prop]"
            :style="itemStyle"
            clearable
            :disabled="item.disable"
          />
          <el-button icon="el-icon-search" :disabled="item.disable" @click="handleSearchGood(form[item.prop])" />
        </div>

        <div v-else-if="item.type == 'searchCoupon'">
          <el-input
            v-model="form[item.prop]"
            :style="itemStyle"
            clearable
            @input="changeCouponLink"
          />
          <el-button icon="el-icon-search" :disabled="item.disable" @click="handleSearchCoupon(form[item.prop])" />
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
/* component */
import Mallki from '@/components/TextHoverEffect/Mallki'
import CardList from '@/components/CardList'
import ElBackToTop from '@/components/ElBackToTop'
import Sticky from '@/components/Sticky'

/* constant */
import { rules } from './const/rules'
import { taobaoDetailForm, jingdongDetailForm, pinduoduoDetailForm,
  weipinhuiDetailForm, suningDetailForm } from './const/goodDetailForm'

/* api */
import { getTaobaoGoodListDetail, addTaobaoGoodList, updateTaobaoGoodList,
  getTaobaoGoodListCouponInfo, getTaobaoGoodListDetailById } from '@/api/taobaoGoodMng'

import { getJingdongGoodListDetail, addJingdongGoodList, updateJingdongGoodList,
  getJingdongGoodListDetailById, getJingdongGoodListCouponInfo } from '@/api/jingdongGoodMng'

import { getPinduoduoGoodListDetailByGoodId, addPinduoduoGoodList, updatePinduoduoGoodList,
  getPinduoduoGoodListDetail } from '@/api/pinduoduoGoodMng'

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
  taobao: getTaobaoGoodListDetailById,
  jingdong: getJingdongGoodListDetailById,
  pinduoduo: getPinduoduoGoodListDetail
}

/* 更新功能的api */
const updateApiMap = {
  taobao: updateTaobaoGoodList,
  jingdong: updateJingdongGoodList,
  pinduoduo: updatePinduoduoGoodList
}

/* 新增功能的api */
const addApiMap = {
  taobao: addTaobaoGoodList,
  jingdong: addJingdongGoodList,
  pinduoduo: addPinduoduoGoodList
}

/* 兼容各类型的请求id */
const idNameMap = {
  taobao: 'goodsId',
  jingdong: 'id',
  pinduoduo: 'id'
}

/* 通过商品id输入框查询详情 */
const searchDetailByGoodIdMap = {
  taobao: getTaobaoGoodListDetail,
  jingdong: getJingdongGoodListDetail,
  pinduoduo: getPinduoduoGoodListDetailByGoodId
}

/* 通过商品id输入框查询详情的key id */
const searchDetailByGoodIdMapKey = {
  taobao: 'goodsId',
  jingdong: 'skuId',
  pinduoduo: 'goodsId'
}

/* 优惠券开始时间和结束时间字段 */
const couponTimeStartAndEndMap = {
  taobao: ['couponStartTime', 'couponEndTime'],
  pinduoduo: ['couponStartTime', 'couponEndTime']
}

/* 查询优惠券信息 */
const searchCouponApiMap = {
  taobao: getTaobaoGoodListCouponInfo,
  jingdong: getJingdongGoodListCouponInfo
}

export default {
  components: { Mallki, CardList, ElBackToTop, Sticky },
  data() {
    const pageType = this.$route.meta.type
    return {
      pageType,
      rules,
      formItemList: fromItemListMap[pageType],
      getDetail: detailApiMap[pageType],
      postUpdate: updateApiMap[pageType],
      postAdd: addApiMap[pageType],
      idName: idNameMap[pageType],
      goodIdSearchDetail: searchDetailByGoodIdMap[pageType],
      goodIdSearchDetailKey: searchDetailByGoodIdMapKey[pageType],
      couponTimeStartAndEnd: couponTimeStartAndEndMap[pageType],
      couponIdSearchCoupon: searchCouponApiMap[pageType],

      form: {},
      loading: false,
      isEditorCouponLink: false,

      itemStyle: {
        width: `300px`
      }
    }
  },
  watch: {
    form: {
      handler(oldValue) {
        /* 检测券如果为“定时监测” 才可编辑检测时间 */
        this.$set(this.formItemList[this.formItemList.length - 1], 'disable', oldValue.checkOffSale !== 2)
        if (oldValue.checkOffSale !== 2) {
          this.form['checkOffSaleTime'] = ''
        }
      },
      deep: true
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
      if (this.pageType === 'pinduoduo') {
        this.form['goodsImageUrl'] = item
      } else {
        this.form['pictUrl'] = item
      }
    },

    /* 返回列表 */
    goBack() {
      this.$router.push({ path: `${this.$route.matched[0].path}/list` })
    },

    /* 商品小图列表 兼容接口字段string的逗号不确定性 */
    smallPicList(prop) {
      if (this.pageType === 'taobao') {
        return this.form[prop] && this.form[prop].slice(0, this.form[prop].length - 1).split(',')
      } else if (this.pageType === 'pinduoduo') {
        return this.form[prop] && JSON.parse(this.form[prop])
      } else {
        return this.form[prop] && this.form[prop].slice(0, this.form[prop].length).split(',')
      }
    },

    /* 通过商品id查询商品详情 */
    handleSearchGood(id) {
      this.loading = true

      this.isEditorCouponLink = true

      this.goodIdSearchDetail({ [this.goodIdSearchDetailKey]: id }).then((res) => {
        if (res.code === 0) {
          this.loading = false

          if (this.pageType === 'jingdong') {
            this.form = res.data
            const { jdfansCoupon } = res.data
            this.form = { ...this.form, ...jdfansCoupon }
            if (res.data.jdfansCoupon) this.form.couponTime = [res.data.jdfansCoupon.getStartTime, res.data.jdfansCoupon.getEndTime]
          } else {
            this.form = res.data
            this.form.couponTime = [res.data[this.couponTimeStartAndEnd[0]], res.data[this.couponTimeStartAndEnd[1]]]
          }
        }
      })
    },

    /* 查询优惠券 */
    handleSearchCoupon(id) {
      if (!this.form.nick && !this.form.shopName) {
        this.$message.error('请先搜索商品id详情')
        return
      }

      if (!this.form.appointCoupon) {
        this.$message.error('优惠券链接/id不能为空')
        return
      }

      this.isEditorCouponLink = true

      let obj = {}
      if (this.pageType === 'taobao') {
        obj = {
          goodsId: this.form.numIid,
          couponId: this.form.appointCoupon
        }
      } else if (this.pageType === 'jingdong') {
        obj = {
          couponLink: this.form.link
        }
      }

      this.couponIdSearchCoupon(obj).then((res) => {
        if (res.code === 0) {
          if (this.pageType === 'taobao') {
            this.form.couponInfo = res.data.couponInfo
            this.form.couponAmount = res.data.couponAmount
            this.form.couponTime = [res.data[this.couponTimeStartAndEnd[0]], res.data[this.couponTimeStartAndEnd[1]]]
            this.form.couponRemainCount = res.data.couponRemainCount
          } else if (this.pageType === 'jingdong') {
            this.form.link = res.data.link
            this.form.discount = res.data.discount
            this.form.quota = res.data.quota
            this.form.couponRemainCount = res.data.couponRemainCount
            this.form.couponTime = [res.data.getStartTime, res.data.getEndTime]
          }
        }
      })
    },

    /* jingdong: 标记用户操作couponLink则传 否则不传couponLink字段 */
    changeCouponLink() {
      this.isEditorCouponLink = true
    },

    /* 通过列表id获取商品详情 */
    getDetailData(id) {
      this.loading = true
      this.getDetail({ [this.idName]: id }).then((res) => {
        if (res.code === 0) {
          this.loading = false
          this.form = res.data

          if (this.pageType === 'jingdong') {
            const { jdfansCoupon } = res.data
            this.form = { ...jdfansCoupon, ...res.data }
            if (res.data.jdfansCoupon) this.form.couponTime = [res.data.jdfansCoupon.getStartTime, res.data.jdfansCoupon.getEndTime]
          } else {
            this.form.couponTime = [res.data[this.couponTimeStartAndEnd[0]], res.data[this.couponTimeStartAndEnd[1]]]
          }
        }
      })
    },

    /* 校验确认 */
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          this.$message.error('请填写必填信息!')
          return
        }

        /* 校验检测时间 */
        if (this.form['checkOffSale'] === 2 && !this.form['checkOffSaleTime']) {
          this.$message.error('请填写检测时间')
          return
        }

        this.postSubmitRequest()
      })
    },

    /* 修改或者添加请求 */
    postSubmitRequest() {
      if (this.$route.query.id) {
        this.postUpdate(this.getUpdateParams()).then((res) => {
          if (res.code === 0) {
            this.$message.success('修改成功')
            this.$router.go(-1)
          }
        })
      } else {
        this.postAdd(this.getUpdateParams()).then((res) => {
          if (res.code === 0) {
            this.$message.success('添加成功')
            this.$router.go(-1)
          }
        })
      }
    },

    /* 区分各个模块添加和编辑的obj参数 */
    getUpdateParams() {
      let obj = {}
      if (this.pageType === 'taobao') {
        obj = {
          id: this.form.id,
          numIid: this.form.numIid,
          status: this.form.status || 1,
          pictUrl: this.form.pictUrl,
          title: this.form.title,
          checkOffSale: this.form.checkOffSale,
          checkOffSaleTime: this.form.checkOffSaleTime,
          appointCoupon: this.form.appointCoupon,
          userCommissionRate: this.form.userCommissionRate
        }
      } else if (this.pageType === 'jingdong') {
        obj = {
          id: this.form.id,
          jdfSkuId: this.form.jdfSkuId,
          pictUrl: this.form.pictUrl,
          goodsName: this.form.jdfSkuName,
          couponLink: this.isEditorCouponLink ? this.form.link : undefined,
          checkOffSale: this.form.checkOffSale,
          checkOffSaleTime: this.form.checkOffSaleTime
        }
      } else if (this.pageType === 'pinduoduo') {
        obj = {
          id: this.form.id,
          goodsId: this.form.goodsId,
          pictUrl: this.form.goodsImageUrl,
          goodsName: this.form.goodsName,
          checkOffSale: this.form.checkOffSale,
          checkOffSaleTime: this.form.checkOffSaleTime
          // couponId: 0
        }
      }
      return obj
    }
  }
}
</script>

<style lang="scss" scoped>
.shopMng-detail {
  padding: 20px;
  .nav {
    padding: 20px 0;
    background: white;
    border-bottom: 0.5px solid #eeeeee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
      font-size:  24px;
    }
  }
}
</style>
