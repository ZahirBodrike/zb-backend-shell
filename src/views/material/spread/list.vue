<template>
  <div class="material-list-table">
    <common-search-form
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
      :list-field="`contentList`"
      :total-field="`total`"
      :page-sizes="[5, 10, 20]"
    />
  </div>
</template>

<script>
import CommonSearchForm from '@/components/CommonSearchForm'
import CommonTable from '@/components/CommonTable'

export default {
  name: 'Material',
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
      console.log(form)
    }
  }
}
</script>

<style lang="scss" scoped>
.material-list-table {
  padding: 20px;
}
</style>
