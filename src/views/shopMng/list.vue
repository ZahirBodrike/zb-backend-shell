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
        <el-button v-if="addGoodBtnList.includes(pageType)">添加商品</el-button>
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
      mulAddGoodBtnList: ['jingdong', 'pinduoduo', 'weipinhui']
    }
  },
  methods: {
    submitHandler(form) {
      console.log(form)
    }
  }
}
</script>

<style lang="scss" scoped>
.shopMng-list-table {
  padding: 20px;
}
</style>
