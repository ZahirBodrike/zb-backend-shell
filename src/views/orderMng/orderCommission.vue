<template>
  <div class="order-commission">
    <common-search-form
      :form-item-list="formItemList"
      :inline="true"
      :label-width="100"
      :item-width="200"
      :show-reset-btn="true"
      :submit-handler="submitHandler"
    />

    <el-table :data="orderTable">
      <el-table-column
        v-for="(item, index) in orderCommissionOrderTable"
        :key="index"
        :label="item.label"
        :prop="item.prop"
      />
    </el-table>

    <el-divider />

    <el-table :data="GoodTable">
      <el-table-column
        v-for="(item, index) in orderCommissionGoodTable"
        :key="index"
        :label="item.label"
        :prop="item.prop"
      />
    </el-table>

    <el-divider />

    <el-table :data="UserTable">
      <el-table-column
        v-for="(item, index) in orderCommissionUserTable"
        :key="index"
        :label="item.label"
        :prop="item.prop"
      />
    </el-table>
  </div>
</template>

<script>
import CommonSearchForm from '@/components/CommonSearchForm'

import { orderCommissionOrderTable, orderCommissionGoodTable, orderCommissionUserTable } from './const/columns'

export default {
  components: { CommonSearchForm },
  data() {
    return {
      orderCommissionOrderTable,
      orderCommissionGoodTable,
      orderCommissionUserTable,

      formItemList: [
        { label: '所属平台', prop: 'platform' },
        { label: '订单编号', prop: 'number' },
        { label: '下单时间', prop: ['time1', 'time2'], itemType: 'daterange' }
      ],

      orderTable: [],
      GoodTable: []
    }
  },
  methods: {
    submitHandler(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.order-commission {
  padding: 20px;
}
</style>
