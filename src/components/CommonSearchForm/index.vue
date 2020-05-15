<template>
  <el-form
    ref="form"
    :model="formData"
    :inline="inline"
    :label-width="labelWidth ? (labelWidth + 'px') : '80px'"
    @submit.native.prevent="searchHandler()"
  >
    <el-form-item
      v-for="(item, index) in formItemList"
      :key="index"
      :prop="item.itemType != 'daterange' ? item.prop : (datePrefix + index)"
      :label="item.label"
      :rules="item.rules || []"
      :label-width="item.labelWidth ? (item.labelWidth + 'px') : ''"
    >
      <div :style="{ width: inputWidth ? ( inputWidth + 'px' ) : '200px'}">

        <el-input
          v-if="item.itemType === 'input' || item.itemType === undefined"
          v-model="formData[item.modelValue]"
          :size="item.size ? item.size : size"
          :readonly="item.readonly"
          :disabled="item.disabled"
          :placeholder="item.placeholder"
          :style="itemStyle + (item.itemWidth ? `width: ${item.itemWidth}px;` : '')"
        />

        <el-select
          v-else-if="item.itemType === 'select'"
          v-model="formData[item.modelValue]"
          :size="item.size ? item.size : size"
          :disabled="item.disabled"
          :placeholder="item.placeholder"
          :style="itemStyle + (item.itemWidth ? `width: ${item.itemWidth}px;` : '')"
        >
          <el-option
            v-for="(option, optionIndex) in item.options"
            :key="optionIndex + '_local'"
            :value="(typeof option === 'object') ? option[item.valueKey || 'value'] : option"
            :label="(typeof option === 'object') ? option[item.labelKey || 'label'] : option"
          />
          <el-option
            v-for="(op, opIndex) in selectOptions[selectOptionPrefix + index]"
            :key="opIndex + '_remote'"
            :value="(typeof op === 'object') ? op[item.valueKey || 'value'] : op"
            :label="(typeof op === 'object') ? op[item.labelKey || 'label'] : op"
          />
        </el-select>

        <el-date-picker
          v-else-if="item.itemType === 'date'"
          v-model="formData[item.modelValue]"
          type="date"
          :placeholder="item.placeholder"
          :size="item.size ? item.size : size"
          :disabled="item.disabled"
          :readonly="item.readonly"
          :editable="item.editable"
          :style="itemStyle + (item.itemWidth ? `width: ${item.itemWidth}px;` : '')"
          :picker-options="item.pickerOptions || {}"
        />

        <el-date-picker
          v-else-if="item.itemType === 'daterange'"
          v-model="formData[item.modelValue]"
          :size="item.size ? item.size : size"
          type="daterange"
          :disabled="item.disabled"
          :readonly="item.readonly"
          :editable="item.editable"
          :placeholder="item.placeholder"
          :style="itemStyle + (item.itemWidth ? `width: ${item.itemWidth}px;` : '')"
          :picker-options="item.pickerOptions || {}"
          @change="date => changeDate(date, item.prop[0], item.prop[1])"
        />

      </div>
    </el-form-item>

    <el-form-item label="" :style="{ display: 'flex', justifyContent: 'flex-end' }">
      <el-button
        type="primary"
        :size="size"
        :loading="submitLoading"
        @click="searchHandler"
      >
        {{ submitBtnText }}
      </el-button>
      <el-button
        v-if="showResetBtn"
        type="primary"
        :plain="true"
        :size="size"
        :loading="submitLoading"
        @click="resetForm"
      >{{ resetBtnText }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { formProps } from './props'

export default {
  name: 'CommonSearchForm',
  props: formProps,
  data() {
    const { formItemList, fuzzy } = this.$props
    const datePrefix = 'daterange-prefix'
    const selectOptionPrefix = 'select-option-prefix'

    const dataObj = {
      selectOptions: {}
    }
    const formData = {}
    const format = {}
    const fuzzyOps = {}

    formItemList && formItemList.forEach((item, index) => {
      const propType = typeof item.prop
      if (propType === 'string') {
        item.modelValue = item.prop
        formData[item.prop] = ''

        fuzzyOps[item.prop] = item.fuzzy ? item.fuzzy : fuzzy
        if (item.format) {
          format[item.prop] = item.format
        }
      } else if (propType === 'object' && Object.prototype.toString.call(item.prop) === '[object Array]') {
        item.prop.forEach(value => {
          formData[value] = ''
          if (item.format) {
            format[value] = item.format
          }

          fuzzyOps[value] = item.fuzzy ? item.fuzzy : fuzzy
        })
      }
      if (item.itemType === 'daterange') {
        formData[datePrefix + index] = ''
        item.modelValue = datePrefix + index
      }
      if (item.itemType === 'select' && item.selectFetch) {
        const dataKey = selectOptionPrefix + index
        dataObj.selectOptions[dataKey] = []
        this.getRemoteData({
          fetch: item.selectFetch,
          dataKey,
          resultField: item.selectResultField || 'data',
          resultHandler: item.selectResultHandler
        })
      }
    })

    return {
      formData,
      datePrefix,
      selectOptionPrefix,
      ...dataObj,
      format,
      fuzzyOps
    }
  },
  computed: {
    itemStyle() {
      const { itemWidth } = this
      if (itemWidth) {
        return `width: ${itemWidth}px;`
      }
      return ''
    }
  },
  methods: {
    isArray(value) {
      return typeof value === 'object' && Object.prototype.toString.call(value) === '[object Array]'
    },
    searchHandler() {
      this.getParams((error, params) => {
        if (!error) {
          const { submitHandler } = this
          if (submitHandler) {
            submitHandler(params)
          } else {
            throw new Error('找不到submitHandler函数!')
          }
        }
      })
    },
    getParamFuzzy() {
      return this.fuzzyOps
    },
    getParams(callback) {
      this.$refs['form'].validate(valid => {
        if (valid) {
          const { formData, datePrefix, format } = this
          const formattedForm = {}
          Object.keys(formData).forEach(v => {
            if (v.indexOf(datePrefix) === -1) {
              formattedForm[v] = format[v] ? format[v](formData[v], v) : formData[v]
            }
          })
          if (callback) callback(null, formattedForm)
        } else {
          if (callback) callback(new Error())
        }
      })
    },
    resetForm() {
      this.$refs['form'].resetFields()
      const { resetBtnCallback } = this
      if (resetBtnCallback) resetBtnCallback()
    },
    changeDate(date, startDate, endDate) {
      let dates
      if (date === null) {
        this.formData[startDate] = ''
        this.formData[endDate] = ''
        return
      }
      if (typeof date === 'string') {
        dates = date.split(' - ')
      } else if (date && date.hasOwnProperty('length')) {
        const firstDate = date[0]
        const secondDate = date[1]
        dates = [
          `${firstDate.getFullYear()}-${('0' + (firstDate.getMonth() + 1)).substr(-2)}-${('0' + firstDate.getDate()).substr(-2)}`,
          `${secondDate.getFullYear()}-${('0' + (secondDate.getMonth() + 1)).substr(-2)}-${('0' + secondDate.getDate()).substr(-2)}`
        ]
      }

      this.formData[startDate] = dates[0]
      this.formData[endDate] = dates[1]
    },
    getRemoteData({ fetch, dataKey, resultField, resultHandler }) {
      fetch().then(response => {
        let result = response
        if (typeof response === 'object' && !this.isArray(response)) {
          if (resultField.indexOf('.') !== -1) {
            resultField.split('.').forEach(value => {
              result = result[value]
            })
          } else {
            result = response[resultField]
          }
        }

        if (!result || !(result instanceof Array)) {
          console.warn(`The result of key:${resultField} is not Array. 接口返回的字段:${resultField} 不是一个数组`)
        }

        if (resultHandler) {
          this.selectOptions[dataKey] = result.map(resultHandler)
        } else {
          this.selectOptions[dataKey] = result
        }
      })
    }
  }
}
</script>
