<template>
  <div class="user-list-table">
    <common-search-form
      :form-item-list="formItemList"
      :inline="true"
      :show-reset-btn="true"
      :label-width="100"
      :item-width="200"
      :submit-handler="submitHandler"
    />

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
  name: 'User',
  components: { CommonTable, CommonSearchForm },
  data() {
    return {
      formItemList: [
        { prop: 'userid', label: '用户ID' },
        { prop: 'phone', label: '手机号' },
        { prop: 'number', label: '专属邀请码' },
        { prop: 'number2', label: '注册邀请码' },
        { prop: ['startTime', 'endTime'], label: '注册时间', itemType: 'daterange' }
      ],
      columns: [
        { prop: 'userid', label: '用户ID' },
        { prop: 'name', label: '昵称' },
        { prop: 'userLevel', label: '用户级别' },
        { prop: 'label', label: '姓名' },
        { prop: 'idcard', label: '身份证号码' },
        { prop: 'registTime', label: '注册时间' },
        { prop: 'phone', label: '手机号码' },
        { prop: 'number', label: '专属邀请码' },
        { prop: 'number2', label: '注册邀请码' },
        { prop: 'orderTime', label: '下首单时间' },
        { prop: 'aliNb', label: '支付宝账号' }
      ],
      getTable: () => {}
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
.user-list-table {
  padding: 20px;
}
</style>
