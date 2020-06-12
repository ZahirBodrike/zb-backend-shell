<template>
  <div class="operationMng-list-table">
    <common-search-form
      ref="form"
      :form-item-list="formItemList"
      :inline="true"
      :label-width="100"
      :item-width="200"
      :show-reset-btn="true"
      :submit-handler="submitHandler"
    >
      <template #btn>
        <el-link type="primary" @click="gotoDetail({})">
          + 配置弹窗
        </el-link>
      </template>
    </common-search-form>

    <common-table
      ref="table"
      :type="`remote`"
      :columns="columns"
      :fetch="getPopupMngList"
      :list-field="`data.contentList`"
      :total-field="`data.total`"
      :page-sizes="[5, 10, 20]"
    >
      <template #img="scope">
        <el-image :src="scope.row.popupImg" width="100%" :preview-src-list="[scope.row.popupImg]" />
      </template>

      <template #action="scope">
        <el-link type="primary" @click="gotoDetail(scope.row)">
          编辑
        </el-link>
        <el-link type="primary" @click="changeStatus(scope.row)">
          {{ scope.row.enable ? '下架' : '上架' }}
        </el-link>
      </template>
    </common-table>
  </div>
</template>

<script>
import CommonSearchForm from '@/components/CommonSearchForm'
import CommonTable from '@/components/CommonTable'

import { getPopupMngList, updatePopupMngList } from '@/api/operation'

import moment from 'moment'

const jumpTypeMap = {
  1: '商品列表',
  2: '商品ID',
  3: 'APP路径',
  4: 'H5路径',
  5: '联盟活动'
}

export default {
  name: 'OperationMng',
  components: { CommonTable, CommonSearchForm },
  data() {
    return {
      getPopupMngList,

      formItemList: [
        { label: '海报标题', prop: 'popupName' },
        { label: '海报ID', prop: 'popupId' },
        { label: '状态', prop: 'enable', itemType: 'select',
          options: [
            { label: '全部', value: '' },
            { label: '上架', value: 1 },
            { label: '下架', value: 0 }
          ]
        },
        { label: '页面', prop: 'tabTag', itemType: 'select',
          options: [
            { label: '全部', value: '' },
            { label: '首页', value: 'home_page' },
            { label: '会员特权', value: 'member_privilege' },
            { label: '签到赚钱', value: 'make_money' },
            { label: '发圈', value: 'send_group' },
            { label: '我的', value: 'personal_center' }
          ]
        },
        { label: '上架时间', prop: ['addedStartTime', 'addedEndTime'], itemType: 'daterange' },
        { label: '下架时间', prop: ['shelfStartTime', 'shelfEndTime'], itemType: 'daterange' }
      ],
      columns: [
        { label: '配置ID', prop: 'popupId' },
        { label: '名称', prop: 'popupName' },
        { label: '海报图', prop: 'popupImg', slotName: 'img' },
        { label: '上架时间', prop: 'addedTime',
          formatter: (row) => moment(row.addedTime).format('YYYY-MM-DD HH:mm:ss')
        },
        { label: '下架时间', prop: 'shelfTime',
          formatter: (row) => moment(row.addedTime).format('YYYY-MM-DD HH:mm:ss')
        },
        { label: '跳转类型', prop: 'jumpType',
          formatter: (row) => jumpTypeMap[row.jumpType]
        },
        { label: '配置参数', prop: 'jumpObject',
          formatter: (row) => row.jumpObject || '无'
        },
        { label: '页面', prop: 'tabName' },
        { label: '频率', prop: 'popupRate',
          formatter: (row) => `每日${row.popupRate}次`
        },
        { label: '状态', prop: 'enable',
          formatter: (row) => row.enable ? '上架' : '下架'
        },
        { label: '操作', prop: 'enable', slotName: 'action' }
      ]
    }
  },
  methods: {
    submitHandler(form) {
      this.$refs['table'].searchHandler({
        currentPage: 1,
        ...form
      })
    },
    gotoDetail(data) {
      this.$router.push({ name: 'popupMngListDetail', query: { id: data.popupId }})
    },
    changeStatus(item) {
      const obj = { enable: item.enable ? 0 : 1, popupId: item.popupId }
      updatePopupMngList(obj).then((res) => {
        if (res.code === 0) {
          this.$refs['table'].fetchHandler()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.operationMng-list-table {
  padding: 20px;
}
</style>
