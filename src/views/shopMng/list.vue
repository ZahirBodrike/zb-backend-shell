<template>
  <div class="shopMng-list-table">
    <common-search-form
      :form-item-list="formItemList"
      :inline="true"
      :label-width="100"
      :item-width="200"
      :show-reset-btn="true"
      :submit-handler="submitHandler"
    >
      <template #btn>
        <el-button v-if="addGoodBtnList.includes(pageType)" @click="handleAddGood">
          添加商品
        </el-button>
        <el-button v-if="mulAddGoodBtnList.includes(pageType)" @click="handleMultAddGood">
          批量添加商品
        </el-button>
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
    >
      <template #img="scope">
        <el-image :src="scope.row.pictUrl" :preview-src-list="[scope.row.pictUrl]" />
      </template>

      <template #action="scope">
        <el-link type="primary" @click="gotoDetail(scope.row)">
          编辑
        </el-link>
        <el-link
          v-if="actionChangeStatusLinkList.includes(pageType)"
          type="primary"
          @click="handleChangeStatus(scope.row)"
        >
          {{ scope.row.status ? '下架' : '上架' }}
        </el-link>

        <!-- 暂时不做删除功能 -->
        <!-- <el-link
          v-if="actionDeleteLinkList.includes(pageType)"
          type="primary"
          @click="handleDelete(scope.row.numIid)"
        >
          删除
        </el-link> -->
      </template>
    </common-table>

    <el-dialog
      v-loading="addTaobaoGoodLoading"
      title="添加淘宝天猫商品(请选择选品库/输入物料ID信息)"
      :visible.sync="addTbDialog"
    >
      <el-form ref="addGoodForm" :model="addGoodForm">
        <el-form-item label="添加类型" :rules="{ required: true, message: '添加类型不能为空' }" prop="type">
          <el-radio-group v-model="addGoodForm.type" @change="typeChange">
            <el-radio label="通过选品库添加" />
            <el-radio label="通过物料ID添加" />
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-input v-if="addGoodForm.type == '通过物料ID添加'" v-model="addGoodForm.value" />
          <el-select
            v-else-if="addGoodForm.type == '通过选品库添加'"
            v-model="addGoodForm.value"
            v-loading="selectLoading"
            placeholder="请选择选品库"
          >
            <el-option
              v-for="(item, index) in taobaoFavorites"
              :key="index"
              :value="item.favoritesId"
              :label="item.favoritesTitle"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="addTbDialog = false;addGoodForm.type = ''">
          取 消
        </el-button>
        <el-button type="primary" @click="handleSubmitAddGood">
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

import { taobaoSearch, jingdongSearch, pinduoduoSearch, weipinhuiSearch,
  suningSearch } from './const/searchForm'
import { taobaoTable, jingdongTable, pinduoduoTable, weipinhuiTable,
  suningTable } from './const/dataTable'

import { getTaobaoGoodList, getTaobaoFavorites, multAddTaobaoGoodList,
  delTaobaoGoodList, changeStatusTaobaoGoodList } from '@/api/taobaoGoodMng'

import { getJingdongGoodList, changeStatusJingdongGoodList } from '@/api/jingdongGoodMng'

import { getPinduoduoGoodList, changeStatusPinduoduoGoodList } from '@/api/pinduoduoGoodMng'

/* 各模块的搜索查询 */
const searchFormMap = {
  taobao: taobaoSearch,
  jingdong: jingdongSearch,
  pinduoduo: pinduoduoSearch,
  weipinhui: weipinhuiSearch,
  suning: suningSearch
}

/* 各模块的表格列 */
const tableMap = {
  taobao: taobaoTable,
  jingdong: jingdongTable,
  pinduoduo: pinduoduoTable,
  weipinhui: weipinhuiTable,
  suning: suningTable
}

/* 各模块的表格请求api */
const listApi = {
  taobao: getTaobaoGoodList,
  jingdong: getJingdongGoodList,
  pinduoduo: getPinduoduoGoodList
}

/* 部分平台的列表处删除功能 */
const deleteApi = {
  taobao: delTaobaoGoodList
}

/* 部分平台的列表上下架功能 */
const changeStatusApi = {
  taobao: changeStatusTaobaoGoodList,
  jingdong: changeStatusJingdongGoodList,
  pinduoduo: changeStatusPinduoduoGoodList
}

export default {
  name: 'ShopMng',
  components: { CommonTable, CommonSearchForm },
  data() {
    /* 淘宝 - taobao / 京东 - jingdong / 拼多多 - pinduoduo / 苏宁 - suning / 唯品会 - weipinhui */
    const pageType = this.$route.meta.type
    return {
      pageType,
      formItemList: searchFormMap[pageType],
      columns: tableMap[pageType],
      getTable: listApi[pageType],
      deleteItem: deleteApi[pageType],
      changeStatusItem: changeStatusApi[pageType],

      addGoodBtnList: ['taobao', 'jingdong', 'pinduoduo', 'weipinhui', 'suning'],
      mulAddGoodBtnList: ['taobao', 'jingdong', 'pinduoduo', 'weipinhui'],
      actionDeleteLinkList: ['taobao'],
      actionChangeStatusLinkList: ['taobao', 'jingdong', 'pinduoduo'],

      addGoodForm: {
        type: '',
        value: ''
      },
      addTbDialog: false,
      selectLoading: false,
      taobaoFavorites: [],
      addTaobaoGoodLoading: false
    }
  },
  methods: {
    submitHandler(form) {
      this.$refs['table'].searchHandler({
        currentPage: 1,
        ...form
      })
    },

    /* 跳转编辑商品详情 */
    gotoDetail(row) {
      let id = null
      if (['taobao', 'jingdong', 'pinduoduo'].includes(this.pageType)) {
        id = row.id
      } else {
        id = row.numIid
      }

      this.$router.push({ name: `${this.pageType}Detail`, query: { id }})
    },

    /* 跳转添加商品 */
    handleAddGood() {
      this.$router.push({ path: `/${this.pageType}/detail` })
    },

    /* 批量添加商品 */
    handleMultAddGood() {
      if (this.pageType === 'taobao') {
        this.selectLoading = true
        this.addTbDialog = true
        getTaobaoFavorites().then((res) => {
          this.taobaoFavorites = res.data
          this.selectLoading = false
        })
      } else {
        this.$notify.warning('未确定功能~')
      }
    },

    /* 列表页删除功能 */
    handleDelete(id) {
      this.deleteItem({ goodsId: id }).then((res) => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.$refs['table'].searchHandler()
        }
      })
    },

    /* 列表页上下架功能 */
    handleChangeStatus(row) {
      const obj = { id: row.id, status: row.status ? 0 : 1 }
      this.changeStatusItem(qs.stringify(obj)).then((res) => {
        if (res.code === 0) {
          this.$message.success('操作成功')
          this.$refs['table'].searchHandler()
        }
      })
    },

    /* 淘宝确认添加商品 */
    handleSubmitAddGood() {
      this.$refs['addGoodForm'].validate((vaild) => {
        if (!vaild) return

        this.addTaobaoGoodLoading = true

        const obj = {}
        if (this.addGoodForm.type === '通过选品库添加') {
          obj.favoritesId = this.addGoodForm.value
        } else {
          obj.materialId = this.addGoodForm.value
        }

        multAddTaobaoGoodList(obj).then((res) => {
          if (res.code === 0) {
            this.$message.success('添加成功')
            this.$refs['table'].searchHandler()
            this.addTbDialog = false
            this.addTaobaoGoodLoading = false
          }
        })
      })
    },

    /* 切换类型清空输入框 */
    typeChange() {
      this.addGoodForm.value = null
    }
  }
}
</script>

<style lang="scss" scoped>
.shopMng-list-table {
  padding: 20px;
}
</style>
