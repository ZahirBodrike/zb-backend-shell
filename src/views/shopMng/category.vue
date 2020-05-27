<template>
  <div class="good-category">
    <div class="pan-btn light-blue-btn" @click="gotoDetail">新增分类</div>

    <common-table
      ref="table"
      :type="`remote`"
      :columns="columns"
      :fetch="getTaobaoTypeList"
      :list-field="`data`"
      :show-pagination="false"
      :tree-table-lazy="pageType == 'taobao'"
      :load-child-data="pageType == 'taobao' ? loadChildData : () => {}"
    >
      <template v-slot:action="scope">
        <el-link
          type="primary"
          @click="gotoDetail({
            id: scope.row.id,
            type: scope.row.level == 2 ? 'sub' : undefined,
            name: scope.row.name,
            parentTypeId: scope.row.parentTypeId
          })"
        >编辑</el-link>
        <template v-if="scope.row.level == 1 && pageType == 'taobao'">
          <el-link type="primary" @click="gotoDetail({type: 'sub', name: scope.row.name, parentTypeId: scope.row.id })">
            新增二级类目
          </el-link>
        </template>
      </template>
    </common-table>
  </div>
</template>

<script>
import CommonTable from '@/components/CommonTable'

import { getTaobaoTypeList } from '@/api/taobaoGoodMng'

const levelMap = {
  1: '一级类目',
  2: '二级类目',
  3: '三级类目'
}

export default {
  components: { CommonTable },
  data() {
    const pageType = this.$route.meta.type
    return {
      pageType,

      columns: [
        { label: '类目级别', prop: 'level', formatter: row => {
          return levelMap[row.level]
        }
        },
        { label: '类目ID', prop: 'id' },
        { label: '类目名称', prop: 'name' },
        { label: '淘宝类目ID', prop: 'tbkCatId' },
        { label: '权重', prop: 'sortNum' },
        { label: '状态', prop: 'status', formatter: row => {
          return row.status ? '有效' : '无效'
        } },
        { label: '操作', slotName: 'action', minWidth: '250' }
      ],
      getTaobaoTypeList
    }
  },
  methods: {
    loadChildData(tree, treeNode, resolve) {
      const obj = {
        parentTypeId: tree.id
      }
      getTaobaoTypeList(obj).then(res => {
        if (res.code === 200) {
          resolve(res.data)
        }
      })
    },
    gotoDetail(obj) {
      if (obj.type === 'sub' && !obj.id) {
        this.$router.push({
          name: `${this.pageType}CategoryDetail`,
          query: { type: obj.type, name: obj.name, parentTypeId: obj.parentTypeId }
        })
      } else if (obj.type === 'sub' && obj.id) {
        this.$router.push({
          name: `${this.pageType}CategoryDetail`,
          query: { type: obj.type, id: obj.id, name: obj.name, parentTypeId: obj.parentTypeId }
        })
      } else if (!obj.type && obj.id) {
        this.$router.push({ name: `${this.pageType}CategoryDetail`, query: { id: obj.id }})
      } else {
        this.$router.push({ name: `${this.pageType}CategoryDetail` })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.good-category {
  padding: 20px;
}
</style>
