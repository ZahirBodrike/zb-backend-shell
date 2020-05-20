<template>
  <div class="addOilMng-repeatStation-table">
    <common-search-form
      :form-item-list="formItemList"
      :inline="true"
      :label-width="100"
      :item-width="200"
      :show-reset-btn="false"
      :submit-handler="submitHandler"
    >
      <template v-slot:btn>
        <el-button>导出当前重复油站记录</el-button>
      </template>
    </common-search-form>

    <common-table
      ref="table"
      :type="`remote`"
      :columns="columns"
      :fetch="getKfcTable"
      :list-field="`data`"
      :total-field="`total`"
      :page-sizes="[5, 10, 20]"
      @selection-change="handleCheck"
    >
      <template v-slot:input>
        <el-input />
      </template>

      <template v-slot:action>
        <el-link type="primary" @click="handleUpdateTable">保存</el-link>
      </template>
    </common-table>
  </div>
</template>

<script>
import CommonSearchForm from '@/components/CommonSearchForm'
import CommonTable from '@/components/CommonTable'

import { getKfcTable } from '@/api/test'

export default {
  name: 'AddOilMng',
  components: { CommonTable, CommonSearchForm },
  data() {
    return {
      formItemList: [
        { label: '距离', prop: '' },
        { label: '油站IDs', prop: '' }
      ],
      columns: [
        { label: '选项', type: 'selection' },
        { label: '地址', prop: 'address' },
        { label: '供应商', prop: '' },
        { label: '状态', prop: '' },
        { label: 'ID', prop: 'id' },
        { label: '权重', prop: '', slotName: 'input' },
        { label: '油站名', prop: '' },
        { label: '操作', slotName: 'action' }
      ],
      getKfcTable
    }
  },
  methods: {
    submitHandler(form) {
      console.log(form)
    },
    handleCheck(e) {
      console.log(e)
    },
    handleUpdateTable() {
      this.$refs['table'].tableData[0].id = 10
      console.log(this.$refs['table'].tableData)
    }
  }
}
</script>

<style lang="scss" scoped>
.addOilMng-repeatStation-table {
  padding: 20px;
}
</style>
