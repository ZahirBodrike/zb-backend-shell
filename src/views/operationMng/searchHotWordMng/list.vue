<template>
  <div class="operationMng-list-table">
    <common-search-form
      :form-item-list="formItemList"
      :inline="true"
      :label-width="100"
      :item-width="200"
      :show-reset-btn="true"
      :submit-handler="submitHandler"
    >
      <template v-slot:btn>
        <el-link type="primary">+ 配置搜索热词</el-link>
      </template>
    </common-search-form>

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
      formItemList: [
        { label: '名称', prop: 'name' },
        { label: '状态', prop: 'status', itemType: 'select',
          options: []
        }
      ],
      columns: [
        { label: '配置ID', prop: 'id' },
        { label: '名称', prop: 'name' },
        { label: '权重', prop: 'sort' },
        { label: '上架时间', prop: '' },
        { label: '下架时间', prop: '' },
        { label: '备注', prop: '' },
        { label: '状态', prop: 'status' },
        { label: '操作', prop: 'status', slotName: 'action' }
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
.operationMng-list-table {
  padding: 20px;
}
</style>
