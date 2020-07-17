<template>
  <el-dialog
    :visible.sync="isShow"
    :title="time"
    :modal-append-to-body="false"
    width="85%"
  >
    <div v-if="detailData" class="details-box">
      <h2>当天设置</h2>
      <ul>
        <li>
          <span>当天红包总金额</span>
          <strong>{{ detailData.totalMoney }}</strong>
        </li>
        <li>
          <span>当天红包总数量</span>
          <strong>{{ detailData.totalCount }}</strong>
        </li>
        <li>
          <span>每场整点金额</span>
          <strong>{{ detailData.roundTotalMoney }}</strong>
        </li>
        <li>
          <span>每场整点数量</span>
          <strong>{{ detailData.roundCount }}</strong>
        </li>
        <li>
          <span>单个红包金额</span>
          <strong>{{ detailData.eachMoney }}</strong>
        </li>
      </ul>
      <h2>领取详情</h2>
      <ul>
        <li>
          <span>参与用户数</span>
          <strong>{{ detailData.joinUserCount }}</strong>
        </li>
        <li>
          <span>首次参与的用户数</span>
          <strong>{{ detailData.firstJoinUserCount }}</strong>
        </li>
        <li>
          <span>非首次参与的用户数</span>
          <strong>{{ detailData.noFirstJoinUserCount }}</strong>
        </li>
      </ul>
      <ul>
        <li>
          <span>实际发放红包</span>
          <strong>{{ detailData.sendOutCount }}</strong>
        </li>
        <li>
          <span>实际发放金额</span>
          <strong>{{ detailData.sendOutMoney }}</strong>
        </li>
      </ul>
      <ul>
        <li>
          <span>平均每人领取个数</span>
          <strong>{{ detailData.averageGetCount }}</strong>
        </li>
        <li>
          <span>老用户</span>
          <strong>{{ detailData.oldUserAverageGetCount }}</strong>
        </li>
        <li>
          <span>新用户</span>
          <strong>{{ detailData.newUserAverageGetCount }}</strong>
        </li>
      </ul>
      <ul>
        <li>
          <span>平均每人领取金额</span>
          <strong>{{ detailData.averageGetMoney }}</strong>
        </li>
        <li>
          <span>老用户</span>
          <strong>{{ detailData.oldUserAverageGetMoney }}</strong>
        </li>
        <li>
          <span>新用户</span>
          <strong>{{ detailData.newUserAverageGetMoney }}</strong>
        </li>
      </ul>
      <ul>
        <li>
          <span>次日留存</span>
          <strong>{{ detailData.yesterdaySavePercent }}</strong>
        </li>
        <li>
          <span>3日留存</span>
          <strong>{{ detailData.threeDaySavePercent }}</strong>
        </li>
        <li>
          <span>7日留存</span>
          <strong>{{ detailData.sevenDaySavePercent }}</strong>
        </li>
      </ul>
    </div>
  </el-dialog>
</template>

<script>
import { getRedPacketDetails } from '@/api/redPacketVideo'

export default {
  name: 'DialogDetails',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: false,
      detailData: null,
      time: null
    }
  },
  watch: {
    isShow(newVal) {
      this.$emit('update:visible', newVal)
    },

    visible(newVal) {
      this.isShow = newVal
    }

  },
  methods: {
    show(startDate) {
      this.isShow = true
      this.time = startDate
      this.getDetails(startDate)
    },

    async getDetails(date) {
      const { code, data } = await getRedPacketDetails({ date })

      if (+code === 200) this.detailData = { ...this.detailData, ...data }
    }
  }
}
</script>

<style lang="scss" scoped>
    .details-box {

        & > ul {
            padding: 0px 30px;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;

            & > li {
                flex: 0 0 auto;
                width: 25%;
                list-style: none;
                font-size: 18px;
                line-height: 40px;
            }
        }
    }
</style>

