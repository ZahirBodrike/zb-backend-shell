<template>
  <div style="padding: 20px;">
    <common-search-form
      :form-item-list="formItemList"
      :inline="true"
      :input-width="200"
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
      :page-sizes="[1, 10, 20]"
    >
      <template v-slot:img="scope">
        <img :src="scope.row.img">
      </template>
      <template v-slot:btn="scope">
        <el-button v-if="scope.row.status" type="primary">删除</el-button>
      </template>
    </common-table>
  </div>
</template>

<script>
import CommonSearchForm from '@/components/CommonSearchForm'
import CommonTable from '@/components/CommonTable'

import { getTable } from '@/api/test'

export default {
  name: 'TestTable',
  components: { CommonTable, CommonSearchForm },
  data() {
    return {
      formItemList: [
        { prop: 'age', label: '年龄' },
        { prop: 'name', label: 'Name', rules: [{ required: true, message: '请输入活动名称', trigger: 'blur' }] },
        { prop: 'sex', label: '性别' }
      ],
      getTable,
      columns: [
        { prop: 'name', label: 'Name', minWidth: 100 },
        { prop: 'mobile', label: 'Mobile', minWidth: 100 },
        { prop: 'sex', label: 'Sex', minWidth: 100,
          formatter: row => {
            return row.sex ? '女' : '男'
          }
        },
        { prop: 'img', label: 'Pic', minWidth: 400, slotName: 'img' },
        { prop: 'status', label: '状态', minWidth: 120, slotName: 'btn' }
      ]
    }
  },
  methods: {
    submitHandler(form) {
      this.$refs.table.searchHandler(form)
    }
  }
}
</script>
