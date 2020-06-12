import {
  HOST,
  WORK_ORDER_URL,
  M_GOODS_DETAIL,
  COUPON_PAGE_LINK,
  COUPON_GOODS_LINK,
  SUPPLIER_INFO_LINK,
  REFUND_Apply_Info_LINK,
  APP_DOMAIN_PAGE_LINK
} from '@/apiConfig'

const API = {
  uploadImg: `${HOST}/file/img/v1_0/base64_upload`,
  uploadImg2: `${HOST}/distribution-agent-mng/common/img/base64_upload`,
  uploadPdf: `${HOST}/zy_invoice/v1_0/upload_pdf`,
  uploadFile: `${HOST}/common/img/file`,

  // 获取临时ID接口
  cacheId: `${HOST}/other/v1_0/id`,

  // 商品模块
  goodsImport: `${HOST}/channel/alibaba/v1_0/sync_product_info`,
  goodsDel: `${HOST}/apps/goods/v1_0/delete`,
  goodsDetail: `${HOST}/goods/v1_0/detail`,
  goodsEnableUpdate: `${HOST}/goods/v1_0/updateEnable`,
  goodsEdit: `${HOST}/goods/v1_0/edit`,
  goodsGoodsAdd: `${HOST}/apps/goods/v1_0/goods_add`,
  goodsSearch: `${HOST}/goods/v1_0/list`,
  goodsForJDImport: `${HOST}/channel/jd/v1_0/batchImportGoods`, // 批量JD商品导入
  goodsDelProValue: `${HOST}/apps/goods/v1_0/delete_pro_value`, // 刪除商品属性值
  goodsSkuRefresh: `${HOST}/apps/goods/v1_0/sku_refresh`, // 刷新sku
  goodsUpdateProName: `${HOST}/apps/goods/v1_0/update_pro_name`, // 修改商品属性名称
  goodsSyncCostPrice: `${HOST}/apps/goods/v1_0/sync_cost_price`, // 修改商品规格价格
  goodsStock: `${HOST}/goods/v1_0/stock`, // 获取商品实时库存
  importUpdateSpu: `${HOST}/goods/v1_0/importUpdateSpu`, // 导入需要更新库存的SPU
  importAikucunSpu: `${HOST}/aikucun/v1_0/importAikucunSpu`, // 导入爱库存SPU
  importAkcSpu: `${HOST}/aikucun/v2_0/importAikucunSpu`, // 导入爱库存SPU
  // 淘宝客模块
  syncTbkSpu: `${HOST}/channel/tbk/v1_0/sysn`, // 同步淘宝客商品
  initTbk: `${HOST}/channel/tbk/v1_0/init`, // 插入淘宝客商品
  favoritesfList: `${HOST}/channel/tbk/v1_0/favorites/list`, // 淘宝客品库列表
  tbkTypeList: `${HOST}/channel/tbk/v1_0/type/list`, // 淘宝客分类品库列表
  addFavorites: `${HOST}/channel/tbk/v1_0/favorites/addFavorites`, // 淘宝客分类添加品库
  saveType: `${HOST}/channel/tbk/v1_0/type/save`, // 淘宝客分类保存
  infoType: `${HOST}/channel/tbk/v1_0/type/info`, // 淘宝客分类信息
  tbkItemList: `${HOST}/channel/tbk/v1_0/page`, // 淘宝客列表分页
  editTbkItemSortNum: `${HOST}/channel/tbk/v1_0/edit/sort_num`, // 淘宝客排序
  syncFavorites: `${HOST}/channel/tbk/v1_0/sysn`, // 品库同步
  deleteFavorites: `${HOST}/channel/tbk/v1_0/favorites/delete`, // 品库删除
  typelist: `${HOST}/channel/tbk/v1_0/favorites/selectList`, // 淘宝客分类列表,
  editTbkItemIsHome: `${HOST}/channel/tbk/v1_0/edit/is_home_page`, // 首页显示
  onOffTbkFavorites: `${HOST}/channel/tbk/v1_0/favorites/onOrOffFavorites`, // 上下架选品库
  getTbkItemDetails: `${HOST}/channel/tbk/v1_0/items/details`, // 获取淘宝客商品详情
  updateTbkItem: `${HOST}/channel/tbk/v1_0/items/update`, // 更新淘宝客
  copyToHomePage: `${HOST}/channel/tbk/v1_0/items/copyToHomePage`, // 更新淘宝客
  getTbkItemDetailsByNumIid: `${HOST}/channel/tbk/v1_0/items/details_numIid`, // 通过numIid获取淘宝客商品详情
  generatePwd: `${HOST}/channel/tbk/v1_0/generate_pwd`, // 补全淘口令
  exportExcel: `${HOST}/channel/tbk/v1_0/export/excel`, // 导出淘宝客商品
  getGoodsDetailsBySpuId: `${HOST}/goods/v1_0/detail_by_spuId`, // 通过numIid获取淘宝客商品详情
  getTbkTips: `${HOST}/channel/tbk/v1_0/tips`, // 淘宝客提示
  getTbkTipDetail: `${HOST}/channel/tbk/v1_0/tip/detail`, // 淘宝客提示详情
  saveTbkTipDetail: `${HOST}/channel/tbk/v1_0/tip/save`, // 保存淘宝客提示
  deleteTbkTip: `${HOST}/channel/tbk/v1_0/tip/delete`, // 删除淘宝客提示
  updateTbkStatus: `${HOST}/channel/tbk/v1_0/update_status`, // 通过numIid获取淘宝客商品详情
  getOrderImportLog: `${HOST}/channel/tbk/v1_0/order_imort_log/list`, // 获取淘宝客订单导入日志
  deleteOrderData: `${HOST}/channel/tbk/v1_0/order_imort_data`, // 删除导入的淘宝客订单
  importTbkOrder: `${HOST}/channel/tbk/v1_0/order/import`, // 导入淘宝客订单
  importUpdateSkuPrice: `${HOST}/goods/v1_0/import_update_sku`, // 导入需要更新价格的sku

  // 订单模块
  addOperationLog: `${HOST}/order/v1_0/add_operation_log`, // 插入新的操作记录

  // 分销模块
  saleList: `${HOST}/user/v1_0/sale_list`, // 分销用户列表
  saleSwitch: `${HOST}/user/v1_0/sale_switch`, // 分销用户开关

  // 优惠券模块
  couponAdd: `${HOST}/coupon/v1_0/add`,
  couponDetail: `${HOST}/coupon/v1_0/detail`,
  couponEdit: `${HOST}/coupon/v1_0/edit`,
  couponEnable: `${HOST}/coupon/v1_0/enable`,
  couponSearch: `${HOST}/coupon/v1_0/search`,
  couponSend: `${HOST}/coupon/v1_0/send`,
  couponUpload: `${HOST}/coupon/v1_0/upload`,
  workOrderUrl: `${WORK_ORDER_URL}`,
  mGoodsDetail: `${M_GOODS_DETAIL}`,
  couponLinkPage: `${COUPON_PAGE_LINK}`,
  couponGoodsDetail: `${COUPON_GOODS_LINK}`,
  supplierInfo: `${SUPPLIER_INFO_LINK}`,
  refundApplyInfo: `${REFUND_Apply_Info_LINK}`,
  appDomainPage: `${APP_DOMAIN_PAGE_LINK}`
}

export default API

