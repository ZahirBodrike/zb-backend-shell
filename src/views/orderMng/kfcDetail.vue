<template>
  <div class="orderMng-kfc-detail">
    <div class="main-table">
      <el-table :data="orderTable">
        <el-table-column
          v-for="(item, index) in kfcDetailMainTableOne"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        />
      </el-table>
      <el-table :data="orderTable">
        <el-table-column
          v-for="(item, index) in kfcDetailMainTableTwo"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        />
      </el-table>
      <el-table :data="orderTable">
        <el-table-column
          v-for="(item, index) in kfcDetailMainTableThree"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          :min-width="item.minWidth"
        />
      </el-table>
    </div>

    <el-divider />

    <span>订单号: 389028091</span>
    <el-divider direction="vertical" />
    <span>退款: 微信退款</span>
    <el-table :data="confirmTable">
      <el-table-column
        v-for="(item, index) in kfcDetailConfirmTable"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :min-width="item.minWidth"
      />
    </el-table>

    <el-divider />

    <el-table :data="BuyTable">
      <el-table-column
        v-for="(item, index) in kfcDetailBuyTable"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :min-width="item.minWidth"
      />
    </el-table>
  </div>
</template>

<script>
import { kfcDetailMainTableOne, kfcDetailMainTableTwo, kfcDetailMainTableThree,
  kfcDetailConfirmTable, kfcDetailBuyTable } from './const/columns'
import { getKfcTable } from '@/api/test'

export default {
  data() {
    return {
      kfcDetailMainTableOne,
      kfcDetailMainTableTwo,
      kfcDetailMainTableThree,
      kfcDetailConfirmTable,
      kfcDetailBuyTable,

      orderTable: [],
      confirmTable: [],
      BuyTable: []
    }
  },
  mounted() {
    getKfcTable().then(res => {
      this.orderTable = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
.orderMng-kfc-detail {
  padding: 20px;
}
</style>
