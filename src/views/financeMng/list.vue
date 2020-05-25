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
      :fetch="getTable"
      :list-field="`data`"
      :total-field="`total`"
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

export default {
  name: 'FinanceMng',
  components: { CommonTable, CommonSearchForm },
  data() {
    return {
      formItemList: [
        { label: '对账月份', prop: '' },
        { label: '用户ID', prop: '' },
        { label: '用户级别', prop: '', itemType: 'select' },
        { label: '所属平台', prop: '', itemType: 'select' }
      ],
      columns: [
        { label: '对账月份', prop: '' },
        { label: '用户ID', prop: '' },
        { label: '姓名', prop: '' },
        { label: '用户级别', prop: '' },
        { label: '自购分享佣金', prop: '' },
        { label: '直推/间推佣金', prop: '' },
        { label: '直属同级奖励金额', prop: '' },
        { label: '团队合伙人奖励金额', prop: '' },
        { label: '团队高级合伙人奖励金额', prop: '' },
        { label: '需要发放佣金(税后)', prop: '' },
        { label: '操作', slotName: 'action' }
      ],
      getTable: () => {}
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
