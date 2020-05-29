<template>
  <div class="financeMng-list-table">
    <common-search-form
      ref="form"
      :form-item-list="formItemList"
      :inline="true"
      :label-width="100"
      :item-width="200"
      :show-reset-btn="true"
      :submit-handler="submitHandler"
    >
      <template v-slot:btn>
        <el-link type="primary">下载账单</el-link>
      </template>
    </common-search-form>

    <common-table
      ref="table"
      :type="`remote`"
      :columns="columns"
      :fetch="getMemoTicket"
      :list-field="`data.contentList`"
      :total-field="`data.total`"
      :page-sizes="[5, 10, 20]"
    >
      <template v-slot:action>
        <el-link type="primary">下载明细</el-link>
      </template>
    </common-table>
  </div>
</template>

<script>
import CommonSearchForm from '@/components/CommonSearchForm'
import CommonTable from '@/components/CommonTable'

import { getMemoTicket } from '@/api/finance'

const userLevelMap = {
  1: '普通会员',
  2: '合伙人',
  3: '高级合伙人',
  4: '联合创始人'
}

export default {
  name: 'FinanceMng',
  components: { CommonTable, CommonSearchForm },
  data() {
    return {
      getMemoTicket,

      formItemList: [
        { label: '对账月份', prop: 'month', placeholder: '格式：yyyy-MM' },
        { label: '用户ID', prop: 'uid' },
        { label: '用户级别', prop: 'level', itemType: 'select',
          options: [
            { label: '全部', value: '' },
            { label: '普通会员', value: 1 },
            { label: '合伙人', value: 2 },
            { label: '高级合伙人', value: 3 },
            { label: '联合创始人', value: 4 }
          ]
        }
      ],
      columns: [
        { label: '对账月份', prop: 'month' },
        { label: '用户ID', prop: 'uid' },
        { label: '姓名', prop: 'userName' },
        { label: '用户级别', prop: 'level', formatter: row => userLevelMap[row.level] },
        { label: '自购分享佣金', prop: 'zg' },
        { label: '直推佣金', prop: 'zt' },
        { label: '间推佣金', prop: 'jt' },
        { label: '直属同级奖励金额', prop: 'zstj' },
        { label: '团队合伙人奖励金额', prop: 'tdgjhhr' },
        { label: '团队高级合伙人奖励金额', prop: 'tdhhr' },
        { label: '需要发放佣金(税后)', prop: 'income' },
        { label: '操作', slotName: 'action' }
      ]
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
.financeMng-list-table {
  padding: 20px;
}
</style>
