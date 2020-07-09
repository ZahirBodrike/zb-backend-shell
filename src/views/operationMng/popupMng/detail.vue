<template>
  <div class="popupMng-detail">
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

        <el-checkbox
          v-else-if="item.type == 'check'"
          v-model="form[item.prop]"
          label="每日一次"
          :true-label="1"
          :false-label="0"
        />

        <div v-else-if="item.type == 'choose'">
          <el-radio-group v-model="form[item.prop]" @change="chooseJumpType">
            <el-radio
              v-for="(radio, radioIndex) in jumpTypeChoose"
              :key="radioIndex"
              :label="radio.label"
            >
              {{ radio.text }}
            </el-radio>
          </el-radio-group>
        </div>

        <div v-else-if="item.type == 'upload'">
          <el-alert
            title="请上传560*640大小的海报图"
            type="error"
            :style="{ width: '300px', marginBottom: '10px' }"
          />
          <upload-img
            :list.sync="form[item.prop]"
            :size-limit-ckeck="true"
            :limit-width="560"
            :limit-height="640"
          />
        </div>

        <el-input
          v-else-if="item.type == 'number'"
          v-model="form[item.prop]"
          type="number"
          :style="itemStyle"
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

import { getPopupMngListDetail, updatePopupMngList, addPopupMngList } from '@/api/operation'

import { pageSelection, needLoginSelection, status, jumpTypeChoose, platform } from './const/select'
import { formRules } from './const/rules'
import { formItemList, addNewItem } from './const/formlist'

const selectionMap = {
  tabTag: pageSelection,
  needLogin: needLoginSelection,
  enable: status,
  platform
}

export default {
  components: { UploadImg },
  data() {
    return {
      formRules,
      pageSelection,
      selectionMap,
      addNewItem,
      jumpTypeChoose,
      formItemList,

      itemStyle: {
        width: '300px'
      },

      form: {},
      cacheFormList: [],
      currentJumpType: 0
    }
  },
  watch: {
    currentJumpType(newValue) {
      this.formItemList = this.cacheFormList
      if (this.addNewItem[newValue] && this.addNewItem[newValue].length > 0) {
        this.formItemList = this.formItemList.concat(this.addNewItem[newValue])
      }
    }
  },
  mounted() {
    if (this.$route.query.id) {
      getPopupMngListDetail({ popupId: this.$route.query.id }).then((res) => {
        if (res.code === 0) {
          this.form = res.data
          this.currentJumpType = res.data.jumpType
        }
      })
    }
    this.cacheFormList = this.formItemList
  },
  methods: {
    selectionList(type) {
      return this.selectionMap[type]
    },
    chooseJumpType(label) {
      this.currentJumpType = label
    },
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (!valid) return
        if (this.$route.query.id) {
          updatePopupMngList(this.form).then((res) => {
            if (res.code === 0) {
              this.$message.success('修改成功')
              this.$router.go(-1)
            }
          })
        } else {
          addPopupMngList(this.form).then((res) => {
            if (res.code === 0) {
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
.popupMng-detail {
  padding: 20px;
}
</style>
