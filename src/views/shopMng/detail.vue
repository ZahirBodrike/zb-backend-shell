<template>
  <div class="shopMng-detail">
    <div class="nav">
      <mallki text="商品信息" class="text" />
      <div>
        <el-button type="primary" size="small" @click="handleSubmit">保存</el-button>
        <el-button size="small" @click="goBack">取消</el-button>
      </div>
    </div>

    <el-divider />

    <el-form
      ref="form"
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
        />

        <el-date-picker
          v-else-if="item.type == 'date'"
          v-model="form[item.prop]"
          type="date"
          placeholder="请选择时间"
          :style="itemStyle"
        />

        <el-card
          v-else-if="item.type == 'bigCard'"
          shadow="always"
          :style="{ width: '550px' }"
        >
          <el-image :src="currentBigPic" :preview-src-list="[currentBigPic]" />
        </el-card>

        <card-list
          v-else-if="item.type == 'miniCard'"
          :list="cardList"
          confirm-text="设为主图"
          @event-confirm="setMainPic"
        />

        <el-input v-else v-model="form[item.prop]" :style="itemStyle" />
      </el-form-item>
    </el-form>

    <back-to-top />
  </div>
</template>

<script>
import Mallki from '@/components/TextHoverEffect/Mallki'
import CardList from '@/components/CardList'
import BackToTop from '@/components/BackToTop'

import { taobaoDetailForm, jingdongDetailForm, pinduoduoDetailForm,
  weipinhuiDetailForm, suningDetailForm } from './const/goodDetailForm'

const fromItemListMap = {
  taobao: taobaoDetailForm,
  jingdong: jingdongDetailForm,
  pinduoduo: pinduoduoDetailForm,
  weipinhui: weipinhuiDetailForm,
  suning: suningDetailForm
}

export default {
  components: { Mallki, CardList, BackToTop },
  data() {
    const pageType = this.$route.meta.type
    return {
      pageType,
      formItemList: fromItemListMap[pageType],

      form: {},
      itemStyle: {
        width: `300px`
      },
      currentBigPic: 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
      cardList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ]
    }
  },
  methods: {
    setMainPic(item) {
      this.currentBigPic = item
    },
    handleSubmit() {
      console.log(this.form)
    },
    goBack() {
      this.$router.push({ path: `${this.$route.matched[0].path}/list` })
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
