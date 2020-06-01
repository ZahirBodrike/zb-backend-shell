<template>
  <div class="financeMng-cashoutRecord-table">
    <common-search-form
      ref="form"
      :form-item-list="formItemList"
      :inline="true"
      :label-width="100"
      :item-width="200"
      :show-reset-btn="true"
      :submit-handler="submitHandler"
    >
      <template #btn>
        <el-link type="primary">下载提现记录</el-link>
      </template>
    </common-search-form>

    <common-table
      ref="table"
      :type="`remote`"
      :columns="columns"
      :fetch="getCashOutRecordList"
      :list-field="`data.contentList`"
      :total-field="`data.total`"
      :page-sizes="[5, 10, 20]"
    />
  </div>
</template>

<script>
import CommonSearchForm from '@/components/CommonSearchForm'
import CommonTable from '@/components/CommonTable'

import { getCashOutRecordList } from '@/api/finance'

const statusMap = {
  0: '审核不通过',
  1: '审核通过',
  2: '审核中'
}

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
      getCashOutRecordList,

      formItemList: [
        { label: '用户ID', prop: 'userId' },
        { label: '手机号', prop: 'phone' },
        { label: '用户级别', prop: 'level', itemType: 'select',
          options: [
            { label: '全部', value: '' },
            { label: '普通会员', value: 1 },
            { label: '合伙人', value: 2 },
            { label: '高级合伙人', value: 3 },
            { label: '联合创始人', value: 4 }
          ]
        },
        { label: '提现状态', prop: 'status', itemType: 'select',
          options: [
            { label: '全部', value: '' },
            { label: '审核不通过', value: 0 },
            { label: '审核通过', value: 1 },
            { label: '审核中', value: 2 }
          ]
        },
        { label: '申请时间', prop: ['from', 'to'], itemType: 'daterange' }
      ],
      columns: [
        { label: '申请ID', prop: 'applyId' },
        { label: '用户ID', prop: 'userId' },
        { label: '姓名', prop: 'userName' },
        { label: '用户级别', prop: 'userLevel',
          formatter: row => userLevelMap[row.userLevel]
        },
        { label: '手机号', prop: 'phone' },
        { label: '支付宝账号', prop: 'openId' },
        { label: '申请提现金额', prop: 'amount' },
        { label: '申请提现时间', prop: 'createdTime', minWidth: 200 },
        { label: '打款时间', prop: 'payTime', minWidth: 200 },
        { label: '提现状态', prop: 'status',
          formatter: row => statusMap[row.status]
        }
        // { label: '操作', slot: 'action' }
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
.financeMng-cashoutRecord-table {
  padding: 20px;
}
</style>
