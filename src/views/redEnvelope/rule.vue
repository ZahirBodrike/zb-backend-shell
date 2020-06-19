<template>
  <div class="redEnvelope-rule-table">
    <div>
      <strong>整点抢红包配置规则</strong>
      <i :style="{ fontSize: '14px' }">(设置日期 2020-05-08 00:00:00)</i>
      <el-alert
        title="注意⚠️：若不手动设置，沿用前一天的红包配置"
        type="error"
        :style="{ width: '400px', margin: '10px 0' }"
      />

      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="当天红包总金豆数">
          <el-input-number
            v-model="form.goldenBeanNumber"
            placeholder="请填写整数"
            controls-position="right"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="红包数量">
          <el-input-number
            v-model="form.redEnvelopeNumber"
            placeholder="请填写整数"
            controls-position="right"
            :min="0"
          />
        </el-form-item>

        <el-form-item label="">
          <p>每场整点金豆：34482758</p>
          <p>每场整点红包个数：8239</p>
          <p>单个红包金豆数：300</p>
        </el-form-item>
      </el-form>
    </div>

    <el-divider />

    <div>
      <strong>成本设置</strong>

      <el-form ref="form" :model="form" label-width="220px">
        <el-form-item
          v-for="(item, index) in formItemList"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        >
          <el-input v-model="form[item.prop]" :style="itemStyle">
            <template slot="append">
              {{ item.append }}
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>

    <div :style="{ marginLeft: '200px' }">
      <el-button type="primary" @click="handleSubmit">
        保存
      </el-button>
    </div>
  </div>
</template>

<script>
import { formItemList } from './const'

export default {
  data() {
    return {
      formItemList,

      form: {
        goldenBeanNumber: '',
        redEnvelopeNumber: ''
      },
      itemStyle: {
        width: '300px'
      }
    }
  },
  methods: {
    handleSubmit() {
      console.log(this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
.redEnvelope-rule-table {
  padding: 20px;
}
</style>
