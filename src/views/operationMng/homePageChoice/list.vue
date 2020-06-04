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
        <el-button @click="addTbDialog = true">
          添加商品
        </el-button>
        <!-- <el-button>批量添加商品</el-button> -->
      </template>
    </common-search-form>

    <common-table
      ref="table"
      :type="`remote`"
      :columns="columns"
      :fetch="getHomePageChoiceMngList"
      :list-field="`data.contentList`"
      :total-field="`data.total`"
      :page-sizes="[5, 10, 20]"
    >
      <template #img="scope">
        <el-image :src="scope.row.pictUrl" :preview-src-list="[scope.row.pictUrl]" />
      </template>

      <template #action="scope">
        <el-link type="primary" @click="changeStatus(scope.row)">
          {{ scope.row.status ? '下架' : '上架' }}
        </el-link>
      </template>
    </common-table>

    <el-dialog
      title="添加商品(首页商品精选推荐)"
      :visible.sync="addTbDialog"
    >
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="商品ID" prop="goodsIdList" :rules="[{ required: true, message: '请填写商品ID' }]">
          <el-input v-model="form.goodsIdList" placeholder="请输入商品ID" />
        </el-form-item>

        <el-form-item label="所属平台" prop="sourceType">
          <el-select v-model="form.sourceType">
            <el-option
              v-for="(item, index) in platformMap"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="addTbDialog = false">
          取 消
        </el-button>
        <el-button type="primary" @click="addGood">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CommonSearchForm from '@/components/CommonSearchForm'
import CommonTable from '@/components/CommonTable'

import qs from 'qs'

import { platformMap } from './const'

import { getHomePageChoiceMngList, updateHomePageChoiceMngList, addHomePageChoiceMngList } from '@/api/operation'

export default {
  name: 'OperationMng',
  components: { CommonTable, CommonSearchForm },
  data() {
    return {
      getHomePageChoiceMngList,
      platformMap,

      formItemList: [
        { label: '商品ID', prop: 'goodsId' },
        { label: '商品名称', prop: 'goodsName' },
        { label: '商品分类', prop: 'sourceType', itemType: 'select',
          options: [
            { label: '全部', value: null },
            { label: '淘宝', value: 10 }
          ]
        }
      ],
      columns: [
        { label: '商品图片', prop: 'pictUrl', slotName: 'img', fixed: true },
        { label: '商品ID', prop: 'numIid', fixed: true },
        { label: '商品标题', prop: 'title', minWidth: 200 },
        { label: '类目（一级）', prop: 'categoryName' },
        { label: '所属平台', prop: 'sourceName' },
        { label: '30天销量', prop: 'volume' },
        { label: '商品价', prop: 'zkFinalPrice' },
        { label: '领券价(券后)', prop: 'salePrice' },
        { label: '优惠券金额', prop: 'couponInfo' },
        { label: '佣金比例', prop: 'commissionRate' },
        { label: '佣金', prop: 'commission' },
        { label: '优惠券结束时间', prop: 'couponEndTime' },
        { label: '状态', prop: 'status', formatter: (row) => {
          return row.status ? '已上架' : '已下架'
        } },
        { label: '操作', slotName: 'action' }
      ],

      addTbDialog: false,
      form: {
        goodsIdList: '',
        sourceType: 10
      }
    }
  },
  methods: {
    submitHandler(form) {
      this.$refs['table'].searchHandler({
        currentPage: 1,
        ...form
      })
    },
    changeStatus(item) {
      const obj = {
        id: item.id,
        status: item.status ? 0 : 1
      }
      updateHomePageChoiceMngList(qs.stringify(obj)).then((res) => {
        if (res.code === 200) {
          this.$message.success('操作成功')
          this.$refs['table'].searchHandler()
        }
      })
    },
    addGood() {
      this.$refs.form.validate((valid) => {
        if (!valid) return
        addHomePageChoiceMngList(this.form).then((res) => {
          if (res.code === 200) {
            this.$message.success('添加成功')
            this.addTbDialog = false
            this.$refs['table'].searchHandler()
          }
        })
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
