<template>
  <div class="signToMoney-record-table">
    <common-search-form
      ref="form"
      :form-item-list="formItemList"
      :inline="true"
      :label-width="100"
      :item-width="200"
      :show-reset-btn="true"
      :submit-handler="submitHandler"
    />

    <el-link type="primary">下载兑换记录</el-link>

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
  name: 'SignToMoney',
  components: { CommonTable, CommonSearchForm },
  data() {
    return {
      formItemList: [
        { label: '用户ID', prop: '' },
        { label: '手机号', prop: '' },
        { label: '用户级别', prop: '', itemType: 'select' },
        { label: '兑换时间', prop: '', itemType: 'daterange' }
      ],
      columns: [
        { label: '用户ID', prop: '' },
        { label: '姓名', prop: '' },
        { label: '用户级别', prop: '' },
        { label: '手机号', prop: '' },
        { label: '金豆数', prop: '' },
        { label: '兑换金额', prop: '' },
        { label: '兑换比例', prop: '' },
        { label: '兑换时间', prop: '' }
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
.signToMoney-record-table {
  padding: 20px;
}
</style>
