<template>
  <div class="operationMng-list-table">
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
        <el-link type="primary" @click="gotoDetail({})">
          + 创建消息任务
        </el-link>
      </template>
    </common-search-form>

    <common-table
      ref="table"
      :type="`remote`"
      :columns="columns"
      :fetch="getMessageCenterMngList"
      :list-field="`data.contentList`"
      :total-field="`data.total`"
      :page-sizes="[5, 10, 20]"
    >
      <template #action="scope">
        <el-link type="primary" @click="gotoDetail(scope.row)">
          查看
        </el-link>
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

import { getMessageCenterMngList, updateMessageCenterMngList } from '@/api/operation'

export default {
  name: 'OperationMng',
  components: { CommonTable, CommonSearchForm },
  data() {
    return {
      formItemList: [
        { label: '消息标题', prop: 'messageTitle' },
        { label: '状态', prop: 'status', itemType: 'select',
          options: [
            { label: '全部', value: null },
            { label: '上架', value: 1 },
            { label: '下架', value: 0 }
          ]
        },
        { label: '创建时间', prop: ['createStartTime', 'createEndTime'], itemType: 'daterange' },
        { label: '推送时间', prop: ['addedStartTime', 'addedEndTime'], itemType: 'daterange' }
      ],
      columns: [
        { label: '消息ID', prop: 'messageId' },
        { label: '消息标题', prop: 'messageTitle' },
        { label: '创建时间', prop: 'createdTime' },
        { label: '推送时间', prop: 'addedTime' },
        { label: '下架时间', prop: 'shelfTime' },
        // { label: '推送人群', prop: 'createdTime' },
        // { label: '推送渠道', prop: 'createdTime' },
        { label: '状态', prop: 'enable',
          formatter: (row) => row.enable ? '上架' : '下架'
        },
        // { label: '配置人', prop: 'createdTime' },
        { label: '操作', slotName: 'action' }
      ],
      getMessageCenterMngList
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
      this.$router.push({ name: 'messageCenterDetail', query: { id: data.messageId }})
    },
    changeStatus(item) {
      const obj = { enable: item.enable ? 0 : 1, messageId: item.messageId }
      updateMessageCenterMngList(obj).then((res) => {
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
