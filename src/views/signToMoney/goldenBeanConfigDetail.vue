<template>
  <div class="golden-bean-config-detail">
    <div class="header">
      <p>金豆配置 - <strong>{{ this.$route.query.level }}</strong></p>

      <div>
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </div>
    </div>

    <el-divider />

    <common-table
      ref="table"
      :type="`remote`"
      :columns="columns"
      :fetch="getKfcTable"
      :list-field="`data`"
      :show-pagination="false"
    >
      <template #action>
        <el-link type="primary">编辑</el-link>
      </template>
    </common-table>

    <el-dialog
      title="todo"
      :visible.sync="dialogVisible"
    >

      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CommonTable from '@/components/CommonTable'
import { getKfcTable } from '@/api/test'

export default {
  components: { CommonTable },
  data() {
    const pageType = this.$route.query.type
    return {
      pageType,
      getKfcTable,

      columns: [
        { label: '业务名称', prop: 'name' },
        { label: '完成任务', prop: 'name' },
        { label: '直推奖励', prop: 'name' },
        { label: '间推奖励', prop: 'name' },
        { label: '直属同级奖励', prop: 'name' },
        { label: '团队合伙人奖励', prop: 'name' },
        { label: '团队高级合伙人奖励', prop: 'name' },
        { label: '配置佣金', slotName: 'action' }
      ],
      dialogVisible: false
    }
  }
}
</script>

<style lang="scss" scoped>
.golden-bean-config-detail {
  padding: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
