const rewardMap = {
  1: '自购奖励',
  2: '直属普通会员',
  7: '直属合伙人奖励',
  8: '直属高级合伙人奖励',
  9: '直属联合创始人奖励映射'
}

const levelMap = {
  1: '普通会员',
  2: '合伙人',
  3: '高级合伙人',
  4: '联合合伙人'
}

export const kfcDetailMainTableOne = [
  { label: '订单编号', prop: 'number' },
  { label: '订单状态', prop: 'status' },
  { label: '餐厅名称', prop: 'name' },
  { label: '餐厅地址', prop: 'city' },
  { label: '联系手机号', prop: 'phone' },
  { label: '是否有加购优惠资格', prop: 'hasRight' },
  { label: '加购商品名称', prop: 'addName' },
  { label: '加购商品金额', prop: 'addPrice' }
]

export const kfcDetailMainTableTwo = [
  { label: '支付金额', prop: 'number' },
  { label: '退款金额', prop: 'status' },
  { label: '佣金比例', prop: 'name' },
  { label: '预估佣金', prop: 'city' },
  { label: '支付时间', prop: 'phone' },
  { label: '退款时间', prop: 'hasRight' },
  { label: '结算日期', prop: 'addName' },
  { label: '订单归属', prop: 'addPrice' }
]

export const kfcDetailMainTableThree = [
  { label: '取餐码', prop: 'qucanma' },
  { label: '预估等餐最小时长（分）', prop: 'status', minWidth: 150 },
  { label: '预估等餐最大时长（分）', prop: 'name', minWidth: 150 },
  { label: '等餐实际时长（分）', prop: 'city' },
  { label: '下单员手机', prop: 'phone' },
  { label: '额外需求', prop: 'hasRight' }
]

export const kfcDetailConfirmTable = [
  { label: '商品种类', prop: '' },
  { label: '类型', prop: '' },
  { label: '商品id', prop: '' },
  { label: '商品名', prop: '' },
  { label: '商品原价', prop: '' },
  { label: '商品支付金额', prop: '' },
  { label: '数量', prop: '' },
  { label: '确认详情', prop: '' },
  { label: '退款详情', prop: '' }
]

export const kfcDetailBuyTable = [
  { label: '商品种类', prop: '' },
  { label: '类型', prop: '' },
  { label: '商品id', prop: '' },
  { label: '商品名', prop: '' },
  { label: '商品原价', prop: '' },
  { label: '商品售价', prop: '' },
  { label: '数量', prop: '' },
  { label: '下单商品详情', prop: '' }
]

export const orderCommissionOrderTable = [
  { label: '订单编号', prop: 'orderSn' },
  { label: '订单状态', prop: 'orderStatus' },
  { label: '下单时间', prop: 'createTime' },
  { label: '订单完成时间', prop: 'paidTime' },
  { label: '结算日期', prop: 'earningTime' },
  { label: '失败原因', prop: 'failedReason' },
  { label: '订单归属', prop: '' }
]

export const orderCommissionGoodTable = [
  { label: '商品ID', prop: 'itemId' },
  { label: '商品名称', prop: 'itemTitle', width: 200 },
  { label: '商品价格', prop: '' },
  { label: '商品数量', prop: 'itemNum' },
  { label: '付款金额', prop: 'payPrice' },
  { label: '预估收益', prop: 'paymentIncome' },
  { label: '佣金比例', prop: 'commissionRate' },
  { label: '商品返佣', prop: 'commission' }
]

export const orderCommissionUserTable = [
  { label: '佣金信息', prop: 'reward',
    formatter: (row) => rewardMap[row.reward]
  },
  { label: '分佣金额', prop: 'userCommission' },
  { label: '比例', prop: 'userIncomeRate' },
  { label: '用户级别', prop: 'TzLevel',
    formatter: (row) => levelMap[row.reward]
  },
  { label: '用户信息', prop: 'userInfo' }
]
