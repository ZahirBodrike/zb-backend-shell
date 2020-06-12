export const taobaoDetailForm = [
  { label: '商品ID', prop: 'numIid', disable: true },
  { label: '店铺名称', prop: 'nick', disable: true },
  { label: '淘宝标题', prop: 'titleOrigin', disable: true },
  { label: '商品标题', prop: 'title' },
  { label: '商品价格', prop: 'reservePrice', disable: true },
  { label: '优惠券id/链接', prop: 'couponClickUrl', disable: true },
  { label: '优惠券面值', prop: 'coupon', disable: true },
  { label: '优惠券门槛价格', prop: 'couponInfo', disable: true },
  { label: '优惠券数量', prop: 'couponRemainCount', disable: true },
  { label: '优惠券有效期', prop: 'couponTime', type: 'daterange', disable: true },
  { label: '领券价（券后）', prop: 'salePrice', disable: true },
  { label: '佣金比例', prop: 'commissionRate', disable: true },
  { label: '佣金金额', prop: 'commission', disable: true },
  { label: '商品主图', prop: 'pictUrl', type: 'bigCard' },
  { label: '商品小图', prop: 'smallImagesStr', type: 'miniCard' },
  { label: '一级类目', prop: 'levelOneCategoryName', disable: true },
  { label: '二级类目', prop: 'categoryName', disable: true },
  { label: '检测券', prop: 'checkOffSale', type: 'chooseCheck', disable: true },
  { label: '检测时间', prop: 'checkTime', type: 'date', disable: true } //
]

export const jingdongDetailForm = [
  { label: '商品ID', prop: 'jdfSpuId', type: 'search' },
  { label: '店铺名称', prop: 'shopName', disable: true },
  { label: '京东标题', prop: 'jdfSkuNameOrigin', disable: true },
  { label: '商品标题', prop: 'jdfSkuName' },
  { label: '商品价格', prop: 'price', disable: true },
  { label: '优惠券id/链接', prop: 'link' },
  { label: '优惠券面值', prop: 'discount', disable: true },
  { label: '优惠券门槛价格', prop: 'quota', disable: true },
  { label: '优惠券数量', prop: 'couponRemainCount', disable: true },
  { label: '优惠券有效期', prop: 'couponTime', type: 'daterange', disable: true },
  { label: '领券价（券后）', prop: 'salePrice', disable: true }, //
  { label: '佣金比例', prop: 'commissionShare', disable: true },
  { label: '佣金金额', prop: 'commission', disable: true },
  { label: '商品主图', prop: 'pictUrl', type: 'bigCard' },
  { label: '商品小图', prop: 'smallImagesStr', type: 'miniCard' },
  { label: '一级类目', prop: 'jdfCid1Name', disable: true },
  { label: '二级类目', prop: 'jdfCid2Name', disable: true },
  { label: '三级类目', prop: 'jdfCid3Name', disable: true },
  { label: '检测券', prop: 'checkOffSale', type: 'chooseCheck', disable: true }, //
  { label: '检测时间', prop: 'checkTime', type: 'date', disable: true } //
]

export const pinduoduoDetailForm = [
  { label: '商品ID', prop: 'goodsId', type: 'search' },
  { label: '店铺名称', prop: 'mallName', disable: true },
  { label: '拼多多标题', prop: 'goodsNameOrigin', disable: true },
  { label: '商品标题', prop: 'goodsName' },
  { label: '商品价格', prop: 'minGroupPrice', disable: true },
  { label: '优惠券id/链接', prop: 'couponid', disable: true }, //
  { label: '优惠券面值', prop: 'couponDiscount', disable: true },
  { label: '优惠券门槛价格', prop: 'couponMinOrderAmount', disable: true },
  { label: '优惠券数量', prop: 'couponRemainQuantity', disable: true },
  { label: '优惠券有效期', prop: 'couponTime', type: 'daterange', disable: true },
  { label: '领券价（券后）', prop: 'salePrice', disable: true },
  { label: '佣金比例', prop: 'promotionRate', disable: true },
  { label: '佣金金额', prop: 'commission', disable: true }, //
  { label: '商品主图', prop: 'goodsImageUrl', type: 'bigCard' },
  { label: '商品小图', prop: 'goodsGalleryUrls', type: 'miniCard' },
  { label: '一级类目', prop: 'categoryName', disable: true },
  { label: '检测券', prop: 'checkOffSale', disable: true },
  { label: '检测时间', prop: 'checkTime', type: 'date', disable: true } //
]

export const weipinhuiDetailForm = [
  { label: '商品ID', prop: 'goodid' },
  { label: '店铺名称', prop: 'shopname' },
  { label: '唯品会标题', prop: 'title' },
  { label: '商品标题', prop: 'goodtitle' },
  { label: '商品价格', prop: 'price' },
  { label: '折扣比例', prop: 'rate' },
  { label: '折后价', prop: 'couponPrice' },
  { label: '佣金比例', prop: 'crate' },
  { label: '佣金金额', prop: 'commission' },
  { label: '售卖时间', prop: 'duration', type: 'daterange' },
  { label: '商品主图', prop: 'mainPic', type: 'bigCard' },
  { label: '商品小图', prop: 'miniPic', type: 'miniCard' },
  { label: '一级类目', prop: 'level1' },
  { label: '二级类目', prop: 'level2' },
  { label: '三级类目', prop: 'level3' },
  { label: '检测券', prop: 'check' },
  { label: '检测时间', prop: 'checkTime', type: 'date' }
]

export const suningDetailForm = [
  { label: '商品ID', prop: 'goodid' },
  { label: '店铺名称', prop: 'shopname' },
  { label: '苏宁标题', prop: 'title' },
  { label: '商品标题', prop: 'goodtitle' },
  { label: '商品价格', prop: 'price' },
  { label: '优惠券id/链接', prop: 'couponid' },
  { label: '优惠券面值', prop: 'coupon' },
  { label: '优惠券门槛价格', prop: 'couponInfo' },
  { label: '优惠券数量', prop: 'couponNum' },
  { label: '优惠券有效期', prop: 'duration', type: 'daterange' },
  { label: '领券价（券后）', prop: 'couponPrice' },
  { label: '佣金比例', prop: 'rate' },
  { label: '佣金金额', prop: 'commission' },
  { label: '商品主图', prop: 'pictUrl', type: 'bigCard' },
  { label: '商品小图', prop: 'miniPic', type: 'miniCard' },
  { label: '一级类目', prop: 'level1' },
  { label: '二级类目', prop: 'level2' },
  { label: '三级类目', prop: 'level3' },
  { label: '检测券', prop: 'check' },
  { label: '检测时间', prop: 'checkTime', type: 'date' }
]
