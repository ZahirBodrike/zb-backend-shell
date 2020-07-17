<template>
  <div v-loading.fullscreen="loading" class="app-container">
    <el-row>
      <div @keyup.enter="onHandleSearch">
        <el-form
          inline
          :model="redPacketForm"
          type="flex"
          justify="center"
        >
          <el-form-item label="时间：" prop="createTime">
            <el-date-picker
              v-model="redPacketForm.createTime"
              :default-time="['00:00:00','23:59:59']"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
              align="center"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onHandleSearch">
              搜索
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-row>
    <el-row>
      <el-table
        v-loading="redPacketTableLoading"
        :data="redPacketTable.contentList||[]"
        max-height="700"
        border
        stripe
      >
        <el-table-column
          sortable
          align="center"
          label="日期"
          prop="startDate"
          width="100"
          fixed="left"
        />
        <el-table-column
          sortable
          align="center"
          label="当天预备总金额"
          prop="totalMoney"
        />
        <el-table-column
          sortable
          align="center"
          label="单个红包设置"
          prop="oneRedPacketMoney"
        />
        <el-table-column
          sortable
          align="center"
          label="预备发放个数"
          prop="count"
        />
        <el-table-column
          sortable
          align="center"
          label="实际领取金额"
          prop="getMoney"
        />
        <el-table-column
          sortable
          align="center"
          label="实际领取个数"
          prop="getCount"
        />
        <el-table-column
          sortable
          align="center"
          label="领取率"
          prop="getPercent"
        />
        <el-table-column
          align="center"
          label="操作"
          width="100"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="onHandleDetails(scope.row.startDate)">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="center" style="margin-top:20px">
      <el-pagination
        :current-page="parseInt(redPacketTable.pageNo)"
        :total="parseInt(redPacketTable.total)"
        :page-sizes="TABLE_PAGE_SIZE"
        layout="sizes,total, prev, pager, next, jumper"
        @size-change="onHandleChangeSize"
        @current-change="onHandleChangeCurrent"
      />
    </el-row>
    <DialogDetails ref="dialogDetails" />
  </div>
</template>

<script>
import { TABLE_PAGE_SIZE } from '@/utils/constant'
import { pageRedPacket } from '@/api/redPacketVideo'
import { getObjFilter } from '@/utils/index'
import DialogDetails from './components/DialogDetails'

export default {
  name: 'ListForVideoRedPacket',
  components: { DialogDetails },
  data() {
    return {
      TABLE_PAGE_SIZE,
      loading: false,
      redPacketSearch: {
        startTime: null, // 下单开始时间
        endTime: null, // 下单结束时间
        pageNo: 1,
        pageSize: 10
      },
      redPacketForm: {
        createTime: null
      },
      redPacketTableLoading: false,
      redPacketTable: {
        pageNo: 1,
        total: 0,
        contentList: []
      } // 订单表格数据

    }
  },
  watch: {
    redPacketSearch: {
      deep: true,
      handler(newVal, oldVal) {
        this.getPageRedPacket()
      }
    }
  },

  created() {
    this.getPageRedPacket()
  },

  methods: {
    /** 页面数量改变 */
    onHandleChangeSize(e) {
      this.redPacketSearch.pageSize = e
    },

    /** 页数改变 */
    onHandleChangeCurrent(e) {
      this.redPacketSearch.pageNo = e
    },

    /** 搜索 */
    onHandleSearch() {
      const [startTime, endTime] = this.redPacketForm.createTime || [null, null]
      this.redPacketSearch = {
        ...this.redPacketSearch,
        ...this.redPacketForm,
        startTime,
        endTime,
        pageNo: 1
      }
    },

    /** 获取列表 */
    async getPageRedPacket() {
      this.redPacketTableLoading = true

      const { code, data } = await pageRedPacket(getObjFilter(this.redPacketSearch))
        .catch(() => {
          this.redPacketTableLoading = false
        })

      if (+code === 200) this.redPacketTable = data

      this.redPacketTableLoading = false
    },

    onHandleDetails(startDate) {
      this.$refs['dialogDetails'].show(startDate)
    }
  }
}
</script>

