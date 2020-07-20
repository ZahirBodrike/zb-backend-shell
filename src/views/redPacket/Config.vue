<template>
  <div class="app-container">
    <div v-loading="baseForm.loading" class="section-box">
      <el-row type="flex" justify="space-between" align="middle">
        <h3>基本配置</h3>
        <el-button type="success" @click="onHandleBase">
          保存
        </el-button>
      </el-row>
      <el-tag type="danger">
        设置日期{{ getCurrentTime }} （注意：若不手动设置，沿用前一天的红包配置）
      </el-tag>
      <el-row type="flex">
        <el-form ref="videoBaseForm" :model="baseForm" style="flex:1">
          <el-col :span="12">
            <el-form-item label="当天红包总金豆数" prop="totalMoney" :rules="rules.float">
              <el-input
                v-model.trim="baseForm.totalMoney"
                clearable
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item label="红包数量" prop="count" :rules="rules.float">
              <el-input
                v-model.trim="baseForm.count"
                clearable
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" style="height:100%">
            <ul class="show-box">
              <li>
                <span>每场整点金额</span>
                <strong>{{ parseInt(baseForm.totalMoney/24)||0 }}(每日 9:00、12:00、15:00、18:00、21:00 金豆数翻倍：{{ parseInt(baseForm.totalMoney/12)||0 }})</strong>
              </li>
              <li>
                <span>每场整点个数</span>
                <strong>{{ parseInt(baseForm.count/24)||0 }}</strong>
              </li>
              <li>
                <span>单个红包金额</span>
                <strong>{{ parseInt(baseForm.totalMoney/baseForm.count)||0 }}</strong>
              </li>
            </ul>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div v-loading="limitForm.loading" class="section-box">
      <el-row type="flex" justify="space-between" align="middle">
        <h3>成本配置</h3>
        <el-button type="success" @click="onHandleLimit">
          保存
        </el-button>
      </el-row>
      <el-row>
        <el-form
          ref="videoLimitForm"
          :model="limitForm"
          inline
          label-position="top"
        >
          <el-row>
            <el-form-item prop="adClickAdditionRatio" :rules="rules.integer">
              <template slot="label">
                点击了广告的用户红包金额增加
                <el-tooltip
                  effect="dark"
                  content="用户点击广告可以抢到更大的红包。若配置增加20%，则点击广告的用户能抢到随机金额的1.2倍红包"
                  placement="top-start"
                >
                  <i class="el-icon-question" style="color:#F56C6C" />
                </el-tooltip>
              </template>
              <el-input v-model.number="limitForm.adClickAdditionRatio" placeholder="请输入内容">
                <template slot="append">
                  %
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="adJumpReductionRatio" :rules="rules.integer">
              <template slot="label">
                未点击广告的用户红包金额减少
                <el-tooltip
                  effect="dark"
                  content="用户未点击广告抢到的红包较小。若配置了减少20%，则未点击广告的用户能抢到随机金额的0.8倍红包"
                  placement="top-start"
                >
                  <i class="el-icon-question" style="color:#F56C6C" />
                </el-tooltip>
              </template>
              <el-input v-model.number="limitForm.adJumpReductionRatio" placeholder="请输入内容">
                <template slot="append">
                  %
                </template>
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="羊毛用户一天抢红包次数大于" prop="limitTriggerStart" :rules="rules.integer2">
              <el-input v-model.number="limitForm.limitTriggerStart" placeholder="请输入内容">
                <template slot="append">
                  次
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="羊毛用户红包拿到小红包的概率" prop="limitWeight" :rules="rules.integer">
              <el-input v-model.number="limitForm.limitWeight" placeholder="请输入内容">
                <template slot="append">
                  %
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="小红包金额是正常红包金额的" prop="limitRatio" :rules="rules.integer">
              <el-input v-model.number="limitForm.limitRatio" placeholder="请输入内容">
                <template slot="append">
                  %
                </template>
              </el-input>
            </el-form-item>
            <h5 style="color: #f56c6c;margin:0">
              说明：一天抢多次红包的用户被判定为羊毛党，会有一定概率拿到较小的红包。例如一个红包正常1元钱，我们规定羊毛党有80%概率拿到小红包，且小红包的金额是正常红包金额的50%，则羊毛党在抢红包时有80%概率拿到平均0.5元的红包。
            </h5>
          </el-row>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getConfig, getLimitConfig, updateConfig, updateLimitConfig } from '@/api/redPacketVideo'
import { asyncValidate } from '@/utils'

export default {
  name: 'ConfigForVideoRedPacket',
  data() {
    const validateFloat = (rule, value, callback) => {
      if (value === null || value === '') {
        callback(new Error('不能为空'))
      } else if (!new RegExp(/^(([0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/).test(value)) {
        callback(new Error('只允许保留两位小数的数字'))
      } else {
        callback()
      }
    }
    const validateInteger = (rule, value, callback) => {
      if (value === null || value === '') {
        callback(new Error('不能为空'))
      } else if (parseInt(value) < 0 || parseInt(value) > 100) {
        callback(new Error('0~100范围内'))
      } else {
        callback()
      }
    }
    const validateInteger2 = (rule, value, callback) => {
      if (value === null || value === '') {
        callback(new Error('不能为空'))
      } else if (parseInt(value) < 0) {
        callback(new Error('不能为负数'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        float: [{ required: true, trigger: 'blur', validator: validateFloat }],
        integer: [{ required: true, trigger: 'blur', validator: validateInteger }],
        integer2: [{ required: true, trigger: 'blur', validator: validateInteger2 }]
      },
      baseForm: {
        loading: false,
        id: null,
        startDate: null,
        totalMoney: 0,
        count: 0
      },
      limitForm: {
        loading: false,
        adClickAdditionRatio: 0,
        adJumpReductionRatio: 0,
        limitRatio: 0,
        limitTriggerStart: 0,
        limitWeight: 0
      }
    }
  },
  computed: {
    getCurrentTime() {
      const date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 00:00:00`
    }
  },

  created() {
    this._getConfig()
    this._getLimitConfig()
  },

  methods: {
    async _getConfig() {
      this.baseForm.loading = true

      const { code, data } = await getConfig({
        startDate: this.getCurrentTime
      }).catch(() => {
        this.baseForm.loading = false
      })

      if (+code === 0) {
        this.baseForm = {
          ...this.baseForm,
          ...data
        }
      }
      this.baseForm.loading = false
    },

    async _getLimitConfig() {
      this.limitForm.loading = true

      const { code, data } = await getLimitConfig().catch(() => {
        this.limitForm.loading = false
      })

      if (+code === 0) {
        this.limitForm = {
          ...this.limitForm,
          ...data
        }
      }

      this.limitForm.loading = false
    },

    async onHandleBase() {
      const valid = await asyncValidate(this, 'videoBaseForm')

      if (!valid) return false
      this.baseForm.loading = true

      const { code } = await updateConfig(
        this.baseForm,
      ).catch(() => {
        this.baseForm.loading = false
      })

      if (+code === 0) {
        this.$message.success('基本配置更新成功！')
      }

      this.baseForm.loading = false
    },

    async onHandleLimit() {
      const valid = await asyncValidate(this, 'videoLimitForm')
      if (!valid) return false

      this.limitForm.loading = true

      const { code } = await updateLimitConfig(
        this.limitForm
      ).catch(() => {
        this.limitForm.loading = false
      })

      if (+code === 0) {
        this.$message.success('成本配置更新成功！')
      }

      this.limitForm.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
    .show-box {
        width: 100%;
        height: 100%;
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 25px 30px;
        box-sizing: border-box;
        margin: 0;

        & > li {
            list-style: none;

            & > span {
                font-size: 16px;
                color: #606266;
                line-height: 40px;
                font-weight: 700;
                margin-right: 10px;
            }
        }
    }

    .btn-box {
        margin-top: 20px;

        button {
            width: 150px;
        }
    }

    .section-box {
        padding: 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        border: 1px solid #ebeef5;
        background-color: #fff;
        margin-bottom: 20px;
    }

</style>

