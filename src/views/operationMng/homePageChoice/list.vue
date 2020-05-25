<template>
  <div class="operationMng-list-table">
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
  name: 'OperationMng',
  components: { CommonTable, CommonSearchForm },
  data() {
    return {
      formItemList: [],
      columns: [],
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
.operationMng-list-table {
  padding: 20px;
}
</style>
