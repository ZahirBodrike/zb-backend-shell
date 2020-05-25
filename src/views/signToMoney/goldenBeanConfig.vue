<template>
  <div class="golden-bean-config">
    <el-table :data="tableData">
      <el-table-column label="用户级别" prop="level" />
      <el-table-column label="金豆配置" prop="type">
        <template v-slot="scope">
          <el-link type="primary" @click="gotoDetail(scope.row)">
            配置金豆
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
        { level: '普通会员', type: 0 },
        { level: '合伙人', type: 1 },
        { level: '高级合伙人', type: 2 },
        { level: '联合合伙人', type: 3 }
      ]
    }
  },
  methods: {
    gotoDetail(row) {
      this.$router.push({ name: 'signToMoneyGoldenBeanConfigDetail', query: row })
    }
  }
}
</script>

<style lang="scss" scoped>
.golden-bean-config {
  padding: 20px;
}
</style>
