<template>
  <div class="good-category">
    <div class="pan-btn light-blue-btn">新增分类</div>

    <common-table
      ref="table"
      :type="`remote`"
      :columns="columns"
      :fetch="getTable"
      :list-field="`data`"
      :total-field="`total`"
      :page-sizes="[5, 10, 20]"
      :tree-table-lazy="pageType == 'taobao'"
      :load-child-data="pageType == 'taobao' ? loadChildData : () => {}"
    >
      <template v-slot:action="scope">
        <el-link type="primary">编辑</el-link>
        <template v-if="scope.row.level == '一级类目' && pageType == 'taobao'">
          <el-link type="primary">查看二级类目</el-link>
          <el-link type="primary">新增二级类目</el-link>
        </template>
      </template>
    </common-table>
  </div>
</template>

<script>
import CommonTable from '@/components/CommonTable'

import { getTable } from '@/api/test'

export default {
  components: { CommonTable },
  data() {
    const pageType = this.$route.meta.type
    return {
      pageType,

      columns: [
        { label: '类目级别', prop: 'level' },
        { label: '类目ID', prop: 'id' },
        { label: '类目名称', prop: 'name' },
        { label: '淘宝类目ID', prop: 'typeId' },
        { label: '权重', prop: 'sort' },
        { label: '状态', prop: 'status' },
        { label: '操作', slotName: 'action', minWidth: '250' }
      ],
      getTable
    }
  },
  methods: {
    loadChildData(tree, treeNode, resolve) {
      getTable().then(res => {
        resolve(res.data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.good-category {
  padding: 20px;
}
</style>
