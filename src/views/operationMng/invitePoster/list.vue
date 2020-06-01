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
      <template #btn>
        <el-button type="primary" @click="onHandleDetail(null)">添加邀请海报</el-button>
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
      <template #status="scope">{{ statusEnum[scope.row.enable] }}</template>
      <template #createInfo="scope">
        <p>{{ scope.row.createdTime }}</p>
        <p>创建人：{{ scope.row.creator }}</p>
      </template>
      <template #updateInfo="scope">
        <p>{{ scope.row.updateTime }}</p>
        <p>修改人：{{ scope.row.creator }}</p>
      </template>
      <template #btn="scope">
        <el-button type="text" @click="onHandleDetail(scope.row.posterId)">编辑</el-button>
        <el-button v-if="scope.row.defaultFlag===0 && scope.row.enable===1" type="text" @click="onHandleOnOff(scope.row.posterId,0)">下架</el-button>
        <el-button v-if="scope.row.defaultFlag===0 && scope.row.enable===0" type="text" @click="onHandleOnOff(scope.row.posterId,1)">上架</el-button>
        <el-button type="text" @click="preview(scope.row.posterImgs)">查看海报</el-button>
        <el-button type="text" @click="onDelete(scope.row.posterId)">删除</el-button>
      </template>
    </common-table>
    <PreviewImg ref="PreviewPoster" :list="previewUrl" />
  </div>
</template>

<script>
import CommonSearchForm from '@/components/CommonSearchForm'
import CommonTable from '@/components/CommonTable'
import PreviewImg from '@/components/PreviewImg'
import { STATUS_FILTER, STATUS_ENUM } from '@/utils/constant.js'
import * as operationService from '@/api/operation'

export default {
  name: 'InvitePosterList',
  components: { CommonTable, CommonSearchForm, PreviewImg },
  data() {
    return {
      formItemList: [
        { label: '邀请海报标题', prop: 'posterTitle' },
        {
          label: '状态',
          prop: 'enable',
          itemType: 'select',
          options: STATUS_FILTER
        }
      ],
      columns: [
        { label: '标题', prop: 'posterTitle' },
        { label: '上架时间', prop: 'addedTime' },
        { label: '下架时间', prop: 'shelfTime' },
        { label: '状态', slotName: 'status' },
        { label: '备注', prop: 'remark' },
        { label: '创建信息', slotName: 'createInfo' },
        { label: '最后修改信息', slotName: 'updateInfo' },
        { label: '操作', slotName: 'btn', minWidth: '300' }
      ],
      getTable: operationService.invitePosterList,
      statusEnum: STATUS_ENUM,
      previewUrl: ''
    }
  },
  methods: {
    submitHandler(form) {
      this.$refs.table.searchHandler(form)
    },
    /** 详情 */
    onHandleDetail(id) {
      this.$router.push({ name: 'invitePosterDetail', query: { id: id }})
    },
    /** 上下架事件*/
    onHandleOnOff(posterId, enable) {
      this.loading = true
      operationService
        .invitePosterOnOff({ posterId: posterId, enable: enable })
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
    onDelete(posterId) {
      this.loading = true
      operationService
        .invitePosterDelete(posterId)
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
    },
    /** 预览图片 */
    preview(url) {
      this.previewUrl = url
      this.$refs.PreviewPoster.show(0)
    }
  }
}
</script>

<style lang="scss" scoped>
.material-list-table {
  padding: 20px;
}
</style>
