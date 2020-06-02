<template>
  <div class="order-commission">
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
        :min-width="item.width"
      />
    </el-table>

    <el-divider />

    <el-table :data="userTable">
      <el-table-column
        v-for="(item, index) in orderCommissionUserTable"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :min-width="item.width"
      >
        <template v-if="item.formatter" v-slot="scope">
          {{ item.formatter(scope.row) }}
        </template>
        <template v-else v-slot="scope">{{ scope.row[item.prop] }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { orderCommissionOrderTable, orderCommissionGoodTable, orderCommissionUserTable } from './const/columns'

import { getOrderCommissionInfo } from '@/api/order'

export default {
  data() {
    return {
      orderCommissionOrderTable,
      orderCommissionGoodTable,
      orderCommissionUserTable,

      orderTable: [],
      GoodTable: [],
      userTable: []
    }
  },

  mounted() {
    const obj = this.$route.query
    this.getPageData(obj)
  },

  methods: {
    async getPageData(param) {
      const { code, data } = await getOrderCommissionInfo(param)
      if (code === 200) {
        this.orderTable = Object.freeze([data.order])
        this.GoodTable = Object.freeze(data.dbCommissions)
        this.userTable = Object.freeze(data.dbCommissions)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.order-commission {
  padding: 20px;
}
</style>
