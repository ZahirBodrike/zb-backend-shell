<template>
  <div class="redEnvelope-list-table">
    <common-search-form
      ref="form"
      :form-item-list="formItemList"
      :inline="true"
      :label-width="100"
      :item-width="200"
      :show-reset-btn="true"
      :submit-handler="submitHandler"
    />

    <el-link type="primary">下载数据</el-link>

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
  name: 'RedEnvelope',
  components: { CommonTable, CommonSearchForm },
  data() {
    return {
      formItemList: [
        { label: '日期', prop: ['startTime', 'endTime'], itemType: 'daterange', itemWidth: 300 }
      ],
      columns: [
        { label: '日期', prop: '' },
        { label: '计划发放金豆数', prop: '' },
        { label: '计划发放红包个数', prop: '' },
        { label: '翻倍红包个数', prop: '' },
        { label: '单个红包金豆数', prop: '' },
        { label: '翻倍红包金豆数', prop: '' },
        { label: '实际领取红包人数', prop: '' },
        { label: '实际领取红包数', prop: '' },
        { label: '实际发放金豆数', prop: '' },
        { label: '领取率', prop: '' },
        { label: '正常红包领取个数', prop: '' },
        { label: '翻倍红包领取个数', prop: '' },
        { label: '正常红包领取每场平均用户数', prop: '' },
        { label: '翻倍红包领取每场平均用户数', prop: '' },
        { label: '贡献团队金豆数', prop: '' },
        { label: '总发放金豆数', prop: '' },
        { label: '发放总金额（1:10000）', prop: '' },
        { label: '操作', prop: '' }
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
.redEnvelope-list-table {
  padding: 20px;
}
</style>
