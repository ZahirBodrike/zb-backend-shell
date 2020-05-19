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
      :list-field="`data`"
      :total-field="`total`"
      :page-sizes="[5, 10, 20]"
    />

    <el-dialog
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
            placeholder="请选择选品库"
          >
            <el-option :value="0" label="选品库1" />
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

import { taobaoSearch, jingdongSearch, pinduoduoSearch, weipinhuiSearch, suningSearch } from './const/searchForm'
import { taobaoTable, jingdongTable, pinduoduoTable, weipinhuiTable, suningTable } from './const/dataTable'

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

export default {
  name: 'ShopMng',
  components: { CommonTable, CommonSearchForm },
  data() {
    const pageType = this.$route.meta.type
    return {
      pageType,
      formItemList: searchFormMap[pageType],
      columns: tableMap[pageType],
      getTable: () => {},
      addGoodBtnList: ['taobao', 'jingdong', 'pinduoduo', 'weipinhui', 'suning'],
      mulAddGoodBtnList: ['jingdong', 'pinduoduo', 'weipinhui'],

      addGoodForm: {
        type: '',
        value: ''
      },
      addTbDialog: false
    }
  },
  methods: {
    submitHandler(form) {
      console.log(form)
    },
    handleAddGood() {
      if (['taobao'].includes(this.pageType)) {
        this.addTbDialog = true
      } else {
        this.$router.push({ path: `/${this.pageType}/detail` })
      }
    },
    handleSubmitAddGood() {
      this.$refs['addGoodForm'].validate(vaild => {
        if (!vaild) return
        console.log(vaild)
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
