<template>
  <div class="orderMng-addOil-table">
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
      :fetch="getTable"
      :list-field="`data`"
      :total-field="`total`"
      :page-sizes="[5, 10, 20]"
    />
  </div>
</template>

<script>
import CommonSearchForm from '@/components/CommonSearchForm'
import CommonTable from '@/components/CommonTable'

export default {
  name: 'OrderMng',
  components: { CommonTable, CommonSearchForm },
  data() {
    return {
      formItemList: [
        { label: '订单状态', prop: 'status', itemType: 'select',
          options: [
            { label: '全部', value: 0 },
            { label: '已支付', value: 1 },
            { label: '已结算', value: 2 },
            { label: '已失效', value: 3 }
          ]
        },
        { label: '订单编号', prop: 'number' },
        { label: '订单归属手机', prop: 'phone' },
        { label: '上级/高级合伙人手机', prop: 'leaderPhone' },
        { label: '供应商', prop: 'supplier', itemType: 'select' },
        { label: '支付时间', prop: ['start', 'end'], itemType: 'daterange' }
      ],
      columns: [
        { label: '订单编号', prop: 'number' },
        { label: '供应商', prop: 'supplier' },
        { label: '供应商订单状态', prop: 'status' },
        { label: '订单状态', prop: 'status' },
        { label: '加油站名', prop: 'name' },
        { label: '省份/城市', prop: 'city' },
        { label: '汽油', prop: 'type' },
        { label: '汽油升数', prop: 'howmuch' },
        { label: '总价格', prop: 'price' },
        { label: '付款金额', prop: 'newPrice' },
        { label: '佣金比例', prop: 'rate' },
        { label: '预估佣金', prop: 'commission' },
        { label: '支付时间', prop: 'time' },
        { label: '结算日期', prop: 'time2' },
        { label: '订单归属', prop: 'orderOwner' },
        { label: '邀请人上级', prop: 'leader' }
      ],
      getTable: () => {}
    }
  },
  methods: {
    submitHandler(form) {
      console.log(form)
    }
  }
}
</script>

<style lang="scss" scoped>
.orderMng-addOil-table {
  padding: 20px;
}
</style>
