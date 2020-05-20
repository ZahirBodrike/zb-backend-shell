<template>
  <div class="addOilMng-privilege-table">
    <common-search-form
      :form-item-list="formItemList"
      :inline="true"
      :label-width="100"
      :item-width="200"
      :show-reset-btn="true"
      :submit-handler="submitHandler"
    >
      <template v-slot:btn>
        <el-button>导出当前加油站</el-button>
      </template>
    </common-search-form>

    <div class="btn-group">
      <div class="pan-btn blue-btn">为搜索结果挂维护页</div>
      <div class="pan-btn blue-btn">为搜索结果撤销维护页</div>
      <div class="pan-btn yellow-btn">为搜索结果添加自定义标签</div>
      <div class="pan-btn yellow-btn">为搜索结果清除指定标签</div>
      <div class="pan-btn yellow-btn">为搜索结果清除全部标签</div>
      <div class="pan-btn light-blue-btn">保存标签操作</div>
    </div>

    <el-divider />

    <p>有效的城市数量：450</p>

    <common-table
      ref="table"
      :type="`remote`"
      :columns="columns"
      :fetch="getKfcTable"
      :list-field="`data`"
      :total-field="`total`"
      :page-sizes="[5, 10, 20]"
    >
      <template v-slot:action="scope">
        <el-link type="primary">油号列表</el-link>
        <el-link type="primary">{{ scope.row.status ? '下架' : '上架' }}</el-link>
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
        { label: '加油站', prop: '' },
        { label: '省份', prop: '' },
        { label: '城市', prop: '' },
        { label: '供应商', prop: '' },
        { label: '下单时间', prop: ['start', 'end'], itemType: 'daterange' }
      ],
      columns: [
        { label: 'ID', prop: '' },
        { label: '供应商', prop: '' },
        { label: '加油站名', prop: '' },
        { label: '省份', prop: '' },
        { label: '城市', prop: '' },
        { label: '地址', prop: '' },
        { label: '自定义标签', prop: '' },
        { label: '创建时间', prop: '' },
        { label: '最新更新时间', prop: '' },
        { label: '维护链接', prop: '' },
        { label: '是否有效', prop: 'status' },
        { label: '操作', prop: 'status', slotName: 'action' }
      ],
      getKfcTable
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
.addOilMng-privilege-table {
  padding: 20px;
  .btn-group {
    display: flex;
    justify-content: space-around;
    .pan-btn {
      margin: 0 10px;
      padding: 15px;
    }
  }
}
</style>
