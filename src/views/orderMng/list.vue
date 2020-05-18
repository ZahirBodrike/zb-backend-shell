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
        { prop: 'status', label: '订单状态' },
        { prop: 'number', label: '订单编号' },
        { prop: 'phone', label: '订单归属手机' },
        { prop: 'phone2', label: '上级/高级合伙人手机' },
        { prop: 'id', label: '商品ID' },
        { prop: 'platform', label: '所属平台', itemType: 'select',
          options: [
            { label: '全部', value: '' }
          ]
        },
        { prop: ['time1', 'time2'], label: '下单时间', itemType: 'daterange' },
        { prop: ['time3', 'time4'], label: '结算时间', itemType: 'daterange' }
      ],
      columns: [
        { prop: 'number', label: '订单编号' },
        { prop: 'platform', label: '所属平台' },
        { prop: 'status', label: '订单状态' },
        { prop: 'name', label: '商品名称' },
        { prop: 'price', label: '付款金额' },
        { prop: 'add', label: '预估收益' },
        { prop: 'rate', label: '佣金比例' },
        { prop: 'commission', label: '商品返佣' },
        { prop: 'time', label: '下单时间' },
        { prop: 'time2', label: '订单完成时间' },
        { prop: 'time3', label: '结算日期' },
        { prop: 'reason', label: '失败原因' },
        { prop: 'orderOwner', label: '订单归属' },
        { prop: 'leader', label: '邀请人上级' }
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
.orderMng-list-table {
  padding: 20px;
}
</style>
