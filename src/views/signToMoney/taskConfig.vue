<template>
  <div class="task-config-list">
    <div class="config">
      <span>金豆汇率配置：10000金豆 = 1元</span>
      <el-link type="primary" @click="dialogVisible = true">编辑</el-link>
    </div>

    <el-divider />

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
        <el-link type="primary">编辑</el-link>
      </template>
    </common-table>

    <el-dialog
      v-el-drag-dialog
      title="金豆汇率配置"
      :visible.sync="dialogVisible"
    >

      <el-form :model="goldenBean" label-width="120px">
        <el-form-item label="金豆数">
          <el-input-number v-model="goldenBean.number" />
        </el-form-item>
        <el-form-item label="可兑换现金">
          <el-input-number v-model="goldenBean.money" />
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CommonTable from '@/components/CommonTable'
import ElDragDialog from '@/directive/el-drag-dialog'

export default {
  components: { CommonTable },
  directives: { ElDragDialog },
  data() {
    return {
      columns: [
        { label: '任务名称', prop: '' },
        { label: '今日发放金豆', prop: '' },
        { label: '今日获得金豆人数', prop: '' },
        { label: '编辑任务', slotName: 'action' }
      ],
      getTable: () => {},
      dialogVisible: false,
      goldenBean: {
        number: '',
        money: ''
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
