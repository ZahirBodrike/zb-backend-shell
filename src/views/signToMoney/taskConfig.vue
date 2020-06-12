<template>
  <div class="task-config-list">
    <div class="config">
      <span v-loading="beanLoading">金豆汇率配置：{{ beanNum }}金豆 = {{ cashAmount }}元</span>
      <el-link type="primary" @click="showConfigBean">
        编辑
      </el-link>
    </div>

    <el-divider />

    <common-table
      ref="table"
      :type="`remote`"
      :columns="columns"
      :fetch="getGoldenBeanTaskList"
      :list-field="`data`"
      :show-pagination="false"
    >
      <template #action="scope">
        <el-link type="primary" @click="showTaskConfig(scope.row)">
          编辑
        </el-link>
      </template>
    </common-table>

    <el-dialog
      v-el-drag-dialog
      title="金豆汇率配置"
      :visible.sync="dialogVisible"
    >
      <el-form :model="goldenBean" label-width="120px">
        <el-form-item label="金豆数">
          <el-input-number v-model="goldenBean.beanNum" />
        </el-form-item>
        <el-form-item label="可兑换现金">
          <el-input-number v-model="goldenBean.cashAmount" />
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateBeanExchange">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      width="40%"
      title="任务配置"
      :visible.sync="taskDialogVisible"
    >
      <el-form :model="currentTask" label-width="100px">
        <el-form-item label="任务名称">
          <el-input v-model="currentTask.title" :style="{ width: '300px' }" />
        </el-form-item>
        <el-form-item label="金豆数量">
          <el-input v-model="currentTask.beanNum" :style="{ width: '300px' }" />
        </el-form-item>
        <el-form-item label="跳转链接">
          <el-input v-model="currentTask.linkUrl" type="textarea" :rows="5" />
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="taskDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateTaskConfig">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CommonTable from '@/components/CommonTable'
import ElDragDialog from '@/directive/el-drag-dialog'

import { getGoldenBeanTaskList, updateGoldenBeanTaskList, getGoldenBeanExchangeConfig,
  updateGoldenBeanExchangeConfig } from '@/api/signToMoney'

export default {
  components: { CommonTable },
  directives: { ElDragDialog },
  data() {
    return {
      getGoldenBeanTaskList,

      columns: [
        { label: '任务名称', prop: 'title' },
        { label: '今日发放金豆', prop: 'todaySendCount' },
        { label: '今日获得金豆人数', prop: 'todaySendUserCount' },
        { label: '编辑任务', slotName: 'action' }
      ],

      dialogVisible: false,
      taskDialogVisible: false,
      beanLoading: false,
      goldenBean: {
        id: 0,
        beanNum: 0,
        cashAmount: 0
      },
      currentTask: {
        taskId: 0,
        title: '',
        beanNum: '',
        linkUrl: ''
      },
      beanNum: 0,
      cashAmount: 0,
      beanConfigId: 0
    }
  },
  mounted() {
    this.getExchangeConfig()
  },
  methods: {
    async updateBeanExchange() {
      const obj = {
        id: this.beanConfigId,
        beanNum: this.goldenBean.beanNum,
        cashAmount: this.goldenBean.cashAmount
      }
      const { code } = await updateGoldenBeanExchangeConfig(obj)
      if (code === 0) {
        this.$message.success('修改成功')
        this.dialogVisible = false
        this.getExchangeConfig()
      }
    },
    async updateTaskConfig() {
      const { code, msg } = await updateGoldenBeanTaskList(this.currentTask)
      if (code === 0) {
        this.$message.success(msg)
        this.taskDialogVisible = false
        this.$refs.table.searchHandler()
      }
    },
    showConfigBean() {
      this.dialogVisible = true
      this.goldenBean.beanNum = this.beanNum
      this.goldenBean.cashAmount = this.cashAmount
    },
    showTaskConfig(row) {
      this.taskDialogVisible = true
      const { taskId, title, beanNum, linkUrl } = row
      this.currentTask = { taskId, title, beanNum, linkUrl }
    },

    async getExchangeConfig() {
      this.beanLoading = true
      const { code, data } = await getGoldenBeanExchangeConfig()
      if (code === 0) {
        this.beanLoading = false
        this.beanNum = data.beanNum
        this.cashAmount = data.cashAmount
        this.beanConfigId = data.id
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.task-config-list {
  padding: 20px;
}
</style>
