<template>
  <div class="shopMng-detail">
    <mallki text="商品信息" />
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
        >
          <el-image :src="currentBigPic" />
        </el-card>

        <card-list
          v-else-if="item.type == 'miniCard'"
          :list="cardList"
          confirm-text="设为主图"
        />

        <el-input v-else v-model="form[item.prop]" :style="itemStyle" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Mallki from '@/components/TextHoverEffect/Mallki'
import CardList from '@/components/CardList'

import { taobaoDetailForm, jingdongDetailForm } from './const/goodDetailForm'

const fromItemListMap = {
  taobao: taobaoDetailForm,
  jingdong: jingdongDetailForm
}

export default {
  components: { Mallki, CardList },
  data() {
    const pageType = this.$route.meta.type
    return {
      pageType,
      formItemList: fromItemListMap[pageType],

      form: {},
      itemStyle: {
        width: `300px`
      },
      cardList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.shopMng-detail {
  padding: 20px;
}
</style>
