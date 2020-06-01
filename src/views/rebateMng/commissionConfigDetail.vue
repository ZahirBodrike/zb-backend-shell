<template>
  <div class="commission-config-detail">
    <div class="header">
      <p>佣金比例配置 - <strong>{{ this.$route.query.level }}</strong></p>

      <!-- <div>
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </div> -->
    </div>

    <el-divider />

    <common-table
      ref="table"
      :type="`remote`"
      :columns="columns"
      :fetch="getLevelLeaderCommission"
      :params="{ leaderLevel: this.$route.query.type }"
      :list-field="`data.commissionRates`"
      :show-pagination="false"
      :data-handler="dataHandler"
    >
      <template #action="scope">
        <el-link type="primary" @click="showConfig(scope.row)">编辑</el-link>
      </template>
    </common-table>

    <el-dialog
      :title="`佣金配置 - ${ this.$route.query.level }`"
      :visible.sync="dialogVisible"
    >
      <el-form
        :model="currentConfig"
        label-width="200px"
      >
        <el-form-item
          v-for="(item, index) in formItemList"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        >
          <el-input
            v-model="currentConfig[item.prop]"
            :disabled="item.level > $route.query.type"
          />
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateCurrent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CommonTable from '@/components/CommonTable'
import { getLevelLeaderCommission, updateLevelLeaderCommission } from '@/api/rebate'

import { cloneDeep } from 'lodash'

export default {
  components: { CommonTable },
  data() {
    const pageType = this.$route.query.type
    return {
      pageType,
      getLevelLeaderCommission,

      dialogVisible: false,
      currentConfig: {

      },

      columns: [
        { label: '业务名称', prop: 'name' },
        { label: '自购佣金比例', prop: 'zg' },
        { label: '直推奖励比例', prop: 'zt' },
        { label: '间推奖励比例', prop: 'jt' },
        { label: '直属同级奖励比例', prop: 'zstj' },
        { label: '团队合伙人奖励比例', prop: 'tdhhr' },
        { label: '团队高级合伙人奖励比例', prop: 'tdgjhhr' },
        { label: '配置佣金', slotName: 'action' }
      ],
      formItemList: [
        { label: '自购佣金比例', prop: 'zg', level: 1 },
        { label: '直推奖励比例', prop: 'zt', level: 2 },
        { label: '间推奖励比例', prop: 'jt', level: 2 },
        { label: '直属同级奖励比例', prop: 'zstj', level: 2 },
        { label: '团队合伙人奖励比例', prop: 'tdhhr', level: 3 },
        { label: '团队高级合伙人奖励比例', prop: 'tdgjhhr', level: 4 }
      ]
    }
  },
  methods: {
    dataHandler(data) {
      return {
        id: data.id,
        name: data.name,
        ...data.leaderCommissionRate
      }
    },
    showConfig(row) {
      this.dialogVisible = true
      this.currentConfig = cloneDeep(row)
    },
    async updateCurrent() {
      const { id, name, ...rate } = this.currentConfig

      const isFloat = Object.keys(rate).find(i => rate[i] > 1 || rate[i] < 0)
      if (isFloat) {
        this.$message.error('比例必须在0-1这个范围')
        return false
      }

      const obj = {
        commissionRate: { id, name, leaderCommissionRate: rate },
        leaderLevel: this.$route.query.type
      }
      const { code } = await updateLevelLeaderCommission(obj)
      if (code === 200) {
        this.dialogVisible = false
        this.$message.success('修改成功')
        this.$refs['table'].searchHandler()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.commission-config-detail {
  padding: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
