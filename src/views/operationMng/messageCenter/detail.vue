<template>
  <div class="message-center-detail">
    <el-form
      ref="form"
      label-width="150px"
      :model="form"
      :rules="formRules"
    >
      <el-form-item
        v-for="(item, index) in formItemList"
        :key="index"
        :label="item.label"
        :prop="item.prop"
      >
        <el-date-picker
          v-if="item.type == 'date'"
          v-model="form[item.prop]"
          type="date"
          placeholder="请选择时间"
          :style="itemStyle"
          value-format="yyyy-MM-dd HH:mm:ss"
        />

        <el-select
          v-else-if="item.type == 'select'"
          v-model="form[item.prop]"
          placeholder="请选择"
          :style="itemStyle"
        >
          <el-option
            v-for="(option, optionIndex) in selectionList(item.prop)"
            :key="optionIndex"
            :label="option.label"
            :value="option.value"
          />
        </el-select>

        <div v-else-if="item.type == 'upload'">
          <el-alert
            title="最多添加一张，每张不超过500k，建议尺寸690*320"
            type="error"
            :style="{ width: '400px', marginBottom: '10px' }"
          />
          <upload-img
            :list.sync="form[item.prop]"
          />
        </div>

        <el-input
          v-else-if="item.type == 'textarea'"
          v-model="form[item.prop]"
          type="textarea"
          :style="itemStyle"
          :autosize="{ minRows: 4 }"
        />

        <el-input v-else v-model="form[item.prop]" :style="itemStyle" />
      </el-form-item>

      <el-form-item label="">
        <el-button type="primary" @click="handleSubmit">
          确定
        </el-button>
        <el-button @click="$router.go(-1)">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import UploadImg from '@/components/UploadImg'

import { formRules } from './const/rules'

import { getMessageCenterMngListDetail, updateMessageCenterMngList, addMessageCenterMngList } from '@/api/operation'

export default {
  components: { UploadImg },
  data() {
    return {
      formRules,
      formItemList: [
        { label: '消息标题', prop: 'messageTitle' },
        { label: '消息内容', prop: 'messageContent', type: 'textarea' },
        { label: '消息跳转链接', prop: 'jumpUrl' },
        { label: '消息推送图片', prop: 'messageImg', type: 'upload' },
        { label: '推送时间', prop: 'addedTime', type: 'date' },
        { label: '下架时间', prop: 'shelfTime', type: 'date' }
      ],

      itemStyle: {
        width: '300px'
      },
      form: {}
    }
  },
  mounted() {
    if (this.$route.query.id) {
      getMessageCenterMngListDetail({ messageId: this.$route.query.id }).then((res) => {
        if (res.code === 200) {
          this.form = res.data
        }
      })
    }
  },
  methods: {
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (!valid) return
        if (this.$route.query.id) {
          updateMessageCenterMngList(this.form).then((res) => {
            if (res.code === 200) {
              this.$message.success('修改成功')
              this.$router.go(-1)
            }
          })
        } else {
          addMessageCenterMngList(this.form).then((res) => {
            if (res.code === 200) {
              this.$message.success('修改成功')
              this.$router.go(-1)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.message-center-detail {
  padding: 20px;
}
</style>
