<template>
  <div class="orderMng-list-table">
    <common-search-form
      :form-item-list="formItemList"
      :inline="true"
      :label-width="150"
      :item-width="200"
      :show-reset-btn="true"
      :submit-handler="submitHandler"
    />

    <common-table
      ref="table"
      :type="`remote`"
      :columns="columns"
      :fetch="getOrderList"
      :list-field="`data.contentList`"
      :total-field="`data.total`"
      :page-sizes="[5, 10, 20]"
    >
      <template #link="scope">
        <el-link type="primary" @click="gotoDetail(scope.row)">
          {{ scope.row.orderSn }}
        </el-link>
      </template>
    </common-table>
  </div>
</template>

<script>
import CommonSearchForm from '@/components/CommonSearchForm'
import CommonTable from '@/components/CommonTable'

import { getOrderList } from '@/api/order'

import { platformMap } from '@/utils/constant'

const orderStatusMap = {
  1: '订单付款',
  2: '订单结算',
  3: '订单失效'
}

export default {
  name: 'OrderMng',
  components: { CommonTable, CommonSearchForm },
  data() {
    return {
      getOrderList,

      formItemList: [
        { prop: 'orderStatus', label: '订单状态', itemType: 'select',
          options: [
            { label: '全部', value: '' },
            { label: '订单付款', value: 1 },
            { label: '订单结算', value: 2 },
            { label: '订单失效', value: 3 }
          ]
        },
        { prop: 'orderSn', label: '订单编号' },
        { prop: 'phone', label: '订单归属手机' },
        { prop: 'leaderPhone', label: '上级/高级合伙人手机' },
        { prop: 'itemId', label: '商品ID' },
        { prop: 'source', label: '所属平台', itemType: 'select',
          options: [
            { label: '全部', value: '' }
          ]
        },
        { prop: ['paidFrom', 'paidTo'], label: '下单时间', itemType: 'daterange' },
        { prop: ['settledFrom', 'settledTo'], label: '结算时间', itemType: 'daterange' }
      ],
      columns: [
        { prop: 'orderParentSn', label: '父订单编号', minWidth: 140, fixed: 'left' },
        { prop: 'orderSn', label: '子订单编号', slotName: 'link', minWidth: 140, fixed: 'left' },
        { prop: 'source', label: '所属平台',
          formatter: (row) => {
            return platformMap[row.source] || row.source
          }
        },
        { prop: 'orderStatus', label: '订单状态',
          formatter: (row) => {
            return orderStatusMap[row.orderStatus] || row.orderStatus
          }
        },
        { prop: 'itemTitle', label: '商品名称', minWidth: 200 },
        { prop: 'payPrice', label: '付款金额' },
        { prop: 'paymentIncome', label: '预估收益' },
        { prop: 'commissionRate', label: '佣金比例' },
        { prop: 'commission', label: '商品返佣' },
        { prop: 'createTime', label: '下单时间' },
        { prop: 'paidTime', label: '订单完成时间' },
        { prop: 'earningTime', label: '结算日期' },
        { prop: 'failedReason', label: '失败原因' },
        { prop: 'orderOwner', label: '订单归属' },
        { prop: 'leader', label: '邀请人上级' }
      ]
    }
  },
  methods: {
    submitHandler(form) {
      this.$refs['table'].searchHandler({
        currentPage: 1,
        ...form
      })
    },
    gotoDetail(row) {
      this.$router.push({
        name: 'orderCommissionList',
        query: {
          orderSn: row.orderSn,
          source: row.source
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.orderMng-list-table {
  padding: 20px;
}
</style>
