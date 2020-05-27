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
      <template v-slot:btn>
        <el-button v-if="addGoodBtnList.includes(pageType)" @click="handleAddGood">添加商品</el-button>
        <el-button v-if="mulAddGoodBtnList.includes(pageType)">批量添加商品</el-button>
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
      <template v-slot:img="scope">
        <el-image :src="scope.row.pictUrl" :preview-src-list="[scope.row.pictUrl]" />
      </template>

      <template v-slot:action="scope">
        <el-link type="primary" @click="$router.push({ name: 'taobaoDetail', query: {id: scope.row.numIid} })">
          编辑</el-link>
        <el-link type="primary" @click="handleDelete(scope.row.numIid)">删除</el-link>
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
        <el-button @click="addTbDialog = false;addGoodForm.type = ''">取 消</el-button>
        <el-button type="primary" @click="handleSubmitAddGood">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CommonSearchForm from '@/components/CommonSearchForm'
import CommonTable from '@/components/CommonTable'

import { taobaoSearch, jingdongSearch, pinduoduoSearch, weipinhuiSearch,
  suningSearch } from './const/searchForm'
import { taobaoTable, jingdongTable, pinduoduoTable, weipinhuiTable,
  suningTable } from './const/dataTable'

import { getTaobaoGoodList, getTaobaoFavorites, addTaobaoGoodList,
  delTaobaoGoodList } from '@/api/taobaoGoodMng'

const searchFormMap = {
  taobao: taobaoSearch,
  jingdong: jingdongSearch,
  pinduoduo: pinduoduoSearch,
  weipinhui: weipinhuiSearch,
  suning: suningSearch
}

const tableMap = {
  taobao: taobaoTable,
  jingdong: jingdongTable,
  pinduoduo: pinduoduoTable,
  weipinhui: weipinhuiTable,
  suning: suningTable
}

const listApi = {
  taobao: getTaobaoGoodList
}

const deleteApi = {
  taobao: delTaobaoGoodList
}

export default {
  name: 'ShopMng',
  components: { CommonTable, CommonSearchForm },
  data() {
    const pageType = this.$route.meta.type
    return {
      pageType,
      formItemList: searchFormMap[pageType],
      columns: tableMap[pageType],
      getTable: listApi[pageType],
      deleteItem: deleteApi[pageType],

      addGoodBtnList: ['taobao', 'jingdong', 'pinduoduo', 'weipinhui', 'suning'],
      mulAddGoodBtnList: ['jingdong', 'pinduoduo', 'weipinhui'],

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
    handleAddGood() {
      if (['taobao'].includes(this.pageType)) {
        this.selectLoading = true
        this.addTbDialog = true
        getTaobaoFavorites().then(res => {
          this.taobaoFavorites = res.data
          this.selectLoading = false
        })
      } else {
        this.$router.push({ path: `/${this.pageType}/detail` })
      }
    },
    handleDelete(id) {
      this.deleteItem({ goodsId: id }).then(res => {
        if (res.code === 200) {
          this.$message.success('删除成功')
          this.$refs['table'].searchHandler()
        }
      })
    },

    handleSubmitAddGood() {
      this.$refs['addGoodForm'].validate(vaild => {
        if (!vaild) return

        this.addTaobaoGoodLoading = true

        const obj = {}
        if (this.addGoodForm.type === '通过选品库添加') {
          obj.favoritesId = this.addGoodForm.value
        } else {
          obj.materialId = this.addGoodForm.value
        }

        addTaobaoGoodList(obj).then(res => {
          if (res.code === 200) {
            this.$message.success('添加成功')
            this.$refs['table'].searchHandler()
            this.addTbDialog = false
            this.addTaobaoGoodLoading = false
          }
        })
      })
    },
    typeChange(val) {
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
