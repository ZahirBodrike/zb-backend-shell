<template>
  <div>
    <common-search-form
      :form-item-list="formItemList"
      :inline="true"
      :input-width="200"
      :show-reset-btn="true"
      :submit-handler="submitHandler"
    />
  </div>
</template>

<script>
import CommonSearchForm from '@/components/CommonSearchForm'
import { selectList } from '@/api/remote-search'

export default {
  name: 'TestSearch',
  components: { CommonSearchForm },
  data() {
    return {
      formItemList: [
        { prop: 'age', label: '年龄' },
        { prop: 'name', label: 'Name', rules: [{ required: true, message: '请输入活动名称', trigger: 'blur' }] },
        { prop: 'age', label: '年龄' },
        { prop: 'sex', label: 'Sex', itemType: 'select',
          options: [
            { value: '', label: 'All' },
            { value: 0, label: 'Male' },
            { value: 1, label: 'Female' }
          ]
        },
        { prop: 'remote',
          label: '远程',
          itemType: 'select',
          selectFetch: selectList,
          selectResultField: 'data.list' },
        {
          prop: 'time1', label: '时间1', itemType: 'date'
        },
        {
          prop: ['startTime', 'endTime'], label: '时间2', itemType: 'daterange'
        }
      ]
    }
  },
  methods: {
    submitHandler(e) {
      console.log(e)
    }
  }
}
</script>
