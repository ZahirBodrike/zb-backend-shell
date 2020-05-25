<template>
  <div class="financeMng-cashoutRecord-table">
    <common-search-form
      ref="form"
      :form-item-list="formItemList"
      :inline="true"
      :label-width="100"
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
  name: 'FinanceMng',
  components: { CommonTable, CommonSearchForm },
  data() {
    return {
      formItemList: [
        { label: '用户ID', prop: '' },
        { label: '手机号', prop: '' },
        { label: '用户级别', prop: '', itemType: 'select' },
        { label: '提现状态', prop: '', itemType: 'select' },
        { label: '申请时间', prop: '', itemType: 'daterange' }
      ],
      columns: [
        { label: '申请ID', prop: '' },
        { label: '用户ID', prop: '' },
        { label: '姓名', prop: '' },
        { label: '用户级别', prop: '' },
        { label: '手机号', prop: '' },
        { label: '支付宝账号', prop: '' },
        { label: '申请提现金额', prop: '' },
        { label: '申请提现时间', prop: '' },
        { label: '打款时间', prop: '' },
        { label: '提现状态', prop: '' },
        { label: '操作', slot: 'action' }
      ],
      getTable: () => {}
    }
  },
  methods: {
    submitHandler(form) {
      this.$refs['table'].searchHandler({
        currentPage: 1,
        ...form
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.financeMng-cashoutRecord-table {
  padding: 20px;
}
</style>
