<template>
  <div class="searchHotWord-detail">
    <common-search-form
      ref="form"
      :fetch="getHotSearchWordMngListDetail"
      :fetch-params="{ wordId: this.$route.query.id }"
      :form-item-list="formItemList"
      :inline="false"
      :label-width="150"
      :item-width="300"
      :show-reset-btn="false"
      :submit-handler="submitHandler"
      :submit-btn-position="`left`"
      :submit-btn-text="'保存'"
      :auto-fetch="$route.query.id"
      @change-select="handleChangeSelect"
      @getData="handleGetData"
      @change-choose="handleChangeChoose"
    />
  </div>
</template>

<script>
import CommonSearchForm from '@/components/CommonSearchForm'

import { getHotSearchWordMngListDetail, updateHotSearchWordMngList, addHotSearchWordMngList } from '@/api/operation'

import { addNewSubItem } from './const/formlist'

export default {
  components: { CommonSearchForm },
  data() {
    return {
      formItemList: [
        { label: '名称', prop: 'wordName', rules: [{ required: true }] },
        { label: '权重', prop: 'sortNum', rules: [{ required: true }] },
        { label: '是否显示HOT', prop: 'showHot', itemType: 'select',
          options: [
            { label: '不显示', value: 0 },
            { label: '显示', value: 1 }
          ], rules: [{ required: true }]
        },
        { label: '上架时间', prop: 'addedTime', itemType: 'date', rules: [{ required: true }],
          valueFormat: 'yyyy-MM-dd HH:mm:ss'
        },
        { label: '下架时间', prop: 'shelfTime', itemType: 'date', rules: [{ required: true }],
          valueFormat: 'yyyy-MM-dd HH:mm:ss'
        },
        { label: '标签类型', prop: 'type', itemType: 'select',
          options: [
            { label: '搜索关键词', value: 1 },
            { label: '跳转链接', value: 2 }
          ], rules: [{ required: true }]
        },
        { label: '所属平台', prop: 'platform', modelValue: 'platform', itemType: 'select',
          options: [
            { label: '淘宝', value: 10 },
            { label: '京东', value: 20 },
            { label: '拼多多', value: 30 },
            { label: '唯品会', value: 80 },
            { label: '苏宁', value: 130 }
          ], rules: [{ required: true }]
        }
      ],
      addNewItem: [
        { label: '跳转类型', prop: 'jumpType', modelValue: 'jumpType', itemType: 'radio',
          options: [
            { text: '商品列表', label: 1 },
            { text: 'H5链接', label: 4 }
          ], rules: [{ required: true }]
        }
      ],
      addNewSubItem,

      getHotSearchWordMngListDetail,

      currentType: 0,
      currentSubType: 0,
      cacheSubType: 0,
      cacheFormList: []
    }
  },
  watch: {
    currentType(newVal) {
      this.formItemList = this.cacheFormList
      if (newVal === 2) {
        if (this.currentSubType) {
          this.formItemList = this.formItemList.concat(this.addNewItem).concat(this.addNewSubItem[this.currentSubType])
        } else {
          this.formItemList = this.formItemList.concat(this.addNewItem).concat(this.addNewSubItem[1])
        }
      }
    },
    currentSubType(newVal) {
      this.formItemList = this.cacheFormList
      if (this.currentType === 2) {
        this.formItemList = this.formItemList.concat(this.addNewItem).concat(this.addNewSubItem[newVal])
      }
    }
  },
  mounted() {
    this.cacheFormList = this.formItemList
  },
  methods: {
    submitHandler(form) {
      if (this.$route.query.id) {
        updateHotSearchWordMngList(form).then((res) => {
          if (res.code === 0) {
            this.$message.success('修改成功')
            this.$router.go(-1)
          }
        })
      } else {
        addHotSearchWordMngList(form).then((res) => {
          if (res.code === 0) {
            this.$message.success('添加成功')
            this.$router.go(-1)
          }
        })
      }
    },
    handleChangeSelect(prop, value) {
      if (prop === 'type') {
        this.currentType = value
      }
    },
    handleChangeChoose(prop, value) {
      if (prop === 'jumpType') {
        this.currentSubType = value
      }
    },
    handleGetData(data) {
      this.currentType = data.type
      this.currentSubType = data.jumpType
      this.cacheSubType = data.jumpType
    }
  }
}
</script>

<style lang="scss" scoped>
.searchHotWord-detail {
  padding: 20px;
}
</style>
