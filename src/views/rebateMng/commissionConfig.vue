<template>
  <div class="commission-config">
    <el-table :data="tableData">
      <el-table-column label="用户级别" prop="level" />
      <el-table-column label="佣金配置" prop="type">
        <template v-slot="scope">
          <el-link type="primary" @click="gotoDetail(scope.row)">
            配置比例
          </el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { level: '普通会员', type: 1 },
        { level: '合伙人', type: 2 },
        { level: '高级合伙人', type: 3 },
        { level: '联合合伙人', type: 4 }
      ]
    }
  },
  methods: {
    gotoDetail(row) {
      this.$router.push({ name: 'rebateCommissionConfigDetail', query: row })
    }
  }
}
</script>

<style lang="scss" scoped>
.commission-config {
  padding: 20px;
}
</style>
