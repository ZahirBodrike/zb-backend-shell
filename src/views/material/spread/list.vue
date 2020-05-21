<template>
  <div class="material-list-table">
    <common-search-form
      :form-item-list="formItemList"
      :inline="true"
      :label-width="100"
      :item-width="200"
      :show-reset-btn="true"
      :submit-handler="submitHandler"
    >
      <template v-slot:btn>
        <el-button type="primary" @click="onHandleDetail(null)">添加内容</el-button>
      </template>
    </common-search-form>

    <common-table
      ref="table"
      :type="`remote`"
      :columns="columns"
      :fetch="getTable"
      :list-field="`data.contentList`"
      :total-field="`data.total`"
      :page-sizes="[5, 10, 20]"
      :page-index-key="`currentPage`"
    >
      <template v-slot:stat="scope">
        <p>素材下载：{{ scope.row.downloadNum }}</p>
        <p>素材转发：{{ scope.row.shareNum }}</p>
      </template>
      <template v-slot:createInfo="scope">
        <p>{{ scope.row.createdTime }}</p>
        <p>创建人：{{ scope.row.creator }}</p>
      </template>
      <template v-slot:btn="scope">
        <el-button type="text" @click="onHandleDetail(scope.row.id)">编辑</el-button>
        <el-button v-if="scope.row.enable===1" type="text" @click="onHandleOnOff(scope.row.id,0)">下架</el-button>
        <el-button v-if="scope.row.enable===0" type="text" @click="onHandleOnOff(scope.row.id,1)">上架</el-button>
        <el-button type="text" @click="onDelete(scope.row.id)">删除</el-button>
      </template>
    </common-table>
  </div>
</template>

<script>
import CommonSearchForm from '@/components/CommonSearchForm'
import CommonTable from '@/components/CommonTable'
import * as materialService from '@/api/material'

export default {
  name: 'SpreadMaterialList',
  components: { CommonTable, CommonSearchForm },
  data() {
    return {
      formItemList: [
        { label: '内容关键词', prop: 'proposal' }
      ],
      columns: [
        { label: '宣传文案', prop: 'proposal' },
        { label: '数据', slotName: 'stat' },
        { label: '创建信息', slotName: 'createInfo' },
        { label: '操作', slotName: 'btn', minWidth: '300' }
      ],
      getTable: materialService.spreadMaterialList
    }
  },
  methods: {
    submitHandler(form) {
      this.$refs.table.searchHandler(form)
    },
    /** 详情 */
    onHandleDetail(id) {
      this.$router.push({ name: 'spreadMaterialDetail', query: { id: id }})
    },
    /** 上下架事件*/
    onHandleOnOff(id, enable) {
      this.loading = true
      materialService
        .spreadMaterialOnOff({ id: id, enable: enable })
        .then(response => {
          this.loading = false
          this.$message[response.code === 200 ? 'success' : 'error'](
            response.msg
          )
          if (response.code === 200) {
            this.$refs.table.dataChangeHandler()
          }
        })
        .catch(Error => {
          this.loading = false
        })
    },
    /** 删除事件 */
    onDelete(id) {
      this.loading = true
      materialService
        .spreadMaterialDelete(id)
        .then(response => {
          this.loading = false
          this.$message[response.code === 200 ? 'success' : 'error'](
            response.msg
          )
          if (response.code === 200) this.submitHandler()
        })
        .catch(Error => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.material-list-table {
  padding: 20px;
}
</style>
