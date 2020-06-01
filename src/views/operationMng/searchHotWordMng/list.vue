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
      <template #btn>
        <el-link type="primary" @click="gotoDetail({})">+ 配置搜索热词</el-link>
      </template>
    </common-search-form>

    <common-table
      ref="table"
      :type="`remote`"
      :columns="columns"
      :fetch="getHotSearchWordMngList"
      :list-field="`data.contentList`"
      :total-field="`data.total`"
      :page-sizes="[5, 10, 20]"
    >
      <template #action="scope">
        <el-link type="primary" @click="gotoDetail(scope.row)">编辑</el-link>
        <el-link type="primary" @click="changeStatus(scope.row)">
          {{ scope.row.enable ? '下架' : '上架' }}
        </el-link>
      </template>
    </common-table>
  </div>
</template>

<script>
import CommonSearchForm from '@/components/CommonSearchForm'
import CommonTable from '@/components/CommonTable'

import { getHotSearchWordMngList, updateHotSearchWordMngList } from '@/api/operation'

import moment from 'moment'

export default {
  name: 'OperationMng',
  components: { CommonTable, CommonSearchForm },
  data() {
    return {
      formItemList: [
        { label: '名称', prop: 'wordName' },
        { label: '状态', prop: 'enable', itemType: 'select',
          options: []
        }
      ],
      columns: [
        { label: '配置ID', prop: 'wordId' },
        { label: '名称', prop: 'wordName' },
        { label: '权重', prop: 'sortNum' },
        { label: '上架时间', prop: 'addedTime', minWidth: 150,
          formatter: row => moment(row.addedTime).format('YYYY-MM-DD HH:mm:ss')
        },
        { label: '下架时间', prop: 'shelfTime', minWidth: 150,
          formatter: row => moment(row.shelfTime).format('YYYY-MM-DD HH:mm:ss')
        },
        { label: '状态', prop: 'enable',
          formatter: row => row.enable ? '上架' : '下架'
        },
        { label: '操作', prop: 'enable', slotName: 'action' }
      ],
      getHotSearchWordMngList
    }
  },
  methods: {
    submitHandler(form) {
      this.$refs['table'].searchHandler({
        currentPage: 1,
        ...form
      })
    },
    gotoDetail(data) {
      this.$router.push({ name: 'searchHotWordListDetail', query: { id: data.wordId }})
    },
    changeStatus(item) {
      const obj = { enable: item.enable ? 0 : 1, wordId: item.wordId }
      updateHotSearchWordMngList(obj).then(res => {
        if (res.code === 200) {
          this.$refs['table'].fetchHandler()
        }
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
