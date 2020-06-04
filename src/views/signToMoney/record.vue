<template>
  <div class="signToMoney-record-table">
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
        <el-link type="primary" :href="downloadData">
          下载兑换记录
        </el-link>
      </template>
    </common-search-form>

    <common-table
      ref="table"
      :type="`remote`"
      :columns="columns"
      :fetch="getGoldenBeanRecord"
      :list-field="`data.contentList`"
      :total-field="`data.total`"
      :page-sizes="[5, 10, 20]"
    />
  </div>
</template>

<script>
import CommonSearchForm from '@/components/CommonSearchForm'
import CommonTable from '@/components/CommonTable'

import { getGoldenBeanRecord } from '@/api/signToMoney'

import { HOST } from '@/apiConfig'

export default {
  name: 'SignToMoney',
  components: { CommonTable, CommonSearchForm },
  data() {
    return {
      getGoldenBeanRecord,

      downloadData: `${HOST}/beanExchangeRecord/v1_0/export`,
      formItemList: [
        { label: '用户ID', prop: 'uid' },
        { label: '手机号', prop: 'phone' },
        { label: '用户级别', prop: 'level', itemType: 'select' },
        { label: '兑换时间', prop: ['createdTimeStart', 'createdTimeEnd'], itemType: 'daterange' }
      ],
      columns: [
        { label: '用户ID', prop: 'uid' },
        { label: '姓名', prop: 'name' },
        { label: '用户级别', prop: 'level' },
        { label: '手机号', prop: 'phone' },
        { label: '金豆数', prop: 'beanNum' },
        { label: '兑换金额', prop: 'cashAmount' },
        { label: '兑换比例', prop: 'exchangeRate' },
        { label: '兑换时间', prop: 'createdTime' }
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
.signToMoney-record-table {
  padding: 20px;
}
</style>
