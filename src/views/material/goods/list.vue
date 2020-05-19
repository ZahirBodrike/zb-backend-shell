<template>
  <div class="material-list-table">
    <common-search-form
      :form-item-list="formItemList"
      :inline="true"
      :label-width="100"
      :item-width="200"
      :show-reset-btn="true"
      :submit-handler="submitHandler"
    >
      <template v-slot:btn>
        <el-button>添加内容</el-button>
      </template>
    </common-search-form>

    <common-table
      ref="table"
      :type="`remote`"
      :columns="columns"
      :fetch="goodsMaterialList"
      :list-field="`data`"
      :total-field="`total`"
      :page-sizes="[5, 10, 20]"
    />
  </div>
</template>

<script>
import CommonSearchForm from '@/components/CommonSearchForm'
import CommonTable from '@/components/CommonTable'
import { SUPPLIER_FILTER } from '@/utils/constant.js'
import { goodsMaterialList } from '@/api/material'

export default {
  name: 'GoodsMaterialList',
  components: { CommonTable, CommonSearchForm },
  data() {
    return {
      goodsMaterialList,
      formItemList: [
        { label: '内容关键词', prop: 'proposal' },
        { label: '类目ID', prop: 'goodsId' },
        {
          label: '所属平台',
          prop: 'platform',
          itemType: 'select',
          options: SUPPLIER_FILTER
        }
      ],
      columns: [
        { label: '类目级别', prop: 'level' },
        { label: '类目ID', prop: 'id' },
        { label: '类目名称', prop: 'name' },
        { label: '淘宝类目ID', prop: 'typeId' },
        { label: '权重', prop: 'sort' },
        { label: '状态', prop: 'status' },
        { label: '操作', slotName: 'action', minWidth: '250' }
      ],
      getTable: () => {}
    }
  },
  methods: {
    submitHandler(form) {
      this.$refs.table.searchHandler(form)
    }
  }
}
</script>

<style lang="scss" scoped>
.material-list-table {
  padding: 20px;
}
</style>
