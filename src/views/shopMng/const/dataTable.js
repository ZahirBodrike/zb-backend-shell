const shopTagMap = {
  0: '淘宝',
  1: '天猫'
}

export const taobaoTable = [
  { prop: 'pictUrl', label: '商品图片', slotName: 'img', fixed: 'left' },
  { prop: 'numIid', label: '商品ID', fixed: 'left' },
  { prop: 'title', label: '商品标题', minWidth: 200 },
  { prop: 'levelOneCategoryName', label: '淘宝类目(一级)' },
  { prop: 'userType', label: '商品标识', formatter: row => shopTagMap[row.userType] },
  { prop: 'volume', label: '30天销量' },
  { prop: 'zkFinalPrice', label: '淘宝天猫价' },
  { prop: 'salePrice', label: '领券价(券后)' },
  { prop: 'couponInfo', label: '优惠券金额' },
  { prop: 'commissionRate', label: '佣金比例', formatter: row => row.commissionRate },
  { prop: 'commission', label: '佣金' },
  { prop: 'couponEndTime', label: '优惠券结束时间', minWidth: 200 },
  { label: '操作', slotName: 'action' }
]

export const jingdongTable = [
  { prop: 'img', label: '商品图片', slotName: 'img' },
  { prop: 'shopId', label: '商品ID' },
  { prop: 'shopTitle', label: '商品标题' },
  { prop: 'type1', label: '类目(一级)' },
  { prop: 'shopTag', label: '商品标识' },
  { prop: '30sale', label: '30天销量' },
  { prop: 'price', label: '商品价格' },
  { prop: 'couponPrice', label: '领券价(券后)' },
  { prop: 'coupon', label: '优惠券金额' },
  { prop: 'rate', label: '佣金比例', fomatter: row => row },
  { prop: 'commission', label: '佣金' },
  { prop: 'couponEndTime', label: '优惠券结束时间' },
  { label: '操作', slotName: 'action' }
]

export const pinduoduoTable = [
  { prop: 'img', label: '商品图片', slotName: 'img' },
  { prop: 'shopId', label: '商品ID' },
  { prop: 'shopTitle', label: '商品标题' },
  { prop: 'type1', label: '类目' },
  { prop: '30sale', label: '月销数量' },
  { prop: 'price', label: '原价' },
  { prop: 'groupPrice', label: '拼团价' },
  { prop: 'couponPrice', label: '领券价(券后)' },
  { prop: 'coupon', label: '优惠券金额' },
  { prop: 'rate', label: '佣金比例', fomatter: row => row },
  { prop: 'commission', label: '佣金' },
  { prop: 'couponEndTime', label: '优惠券结束时间' },
  { label: '操作', slotName: 'action' }
]

export const weipinhuiTable = [
  { prop: 'img', label: '商品图片', slotName: 'img' },
  { prop: 'shopId', label: '商品ID' },
  { prop: 'shopTitle', label: '商品标题' },
  { prop: 'type1', label: '类目' },
  { prop: 'shopTag', label: '商品标识' },
  { prop: 'price', label: '市场价' },
  { prop: 'couponPrice', label: '折后价' },
  { prop: 'couponRate', label: '折扣比例' },
  { prop: 'rate', label: '佣金比例', fomatter: row => row },
  { prop: 'commission', label: '佣金' },
  { prop: 'couponEndTime', label: '商品售卖结束时间' },
  { label: '操作', slotName: 'action' }
]

export const suningTable = [
  { prop: 'img', label: '商品图片', slotName: 'img' },
  { prop: 'shopId', label: '商品ID' },
  { prop: 'shopTitle', label: '商品标题' },
  { prop: 'type1', label: '类目(一级)' },
  { prop: 'shopTag', label: '商品标识' },
  { prop: '30sale', label: '30天销量' },
  { prop: 'price', label: '商品价格' },
  { prop: 'couponPrice', label: '领券价(券后)' },
  { prop: 'coupon', label: '优惠券金额' },
  { prop: 'rate', label: '佣金比例', fomatter: row => row },
  { prop: 'commission', label: '佣金' },
  { prop: 'couponEndTime', label: '优惠券结束时间' },
  { label: '操作', slotName: 'action' }
]
