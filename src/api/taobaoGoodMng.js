import request from '@/utils/request'

/* 淘宝商品列表 - 分页列表 */
export function getTaobaoGoodList(data) {
  return request({
    url: '/distribution-agent-mng/mng/tbk/list',
    method: 'post',
    data
  })
}

/* 淘宝商品列表 - 获取选品库 */
export function getTaobaoFavorites() {
  return request({
    url: '/distribution-agent-mng/mng/tbk/favorites/list',
    method: 'get'
  })
}

/* 淘宝商品列表 - 批量添加商品 */
export function multAddTaobaoGoodList(params) {
  return request({
    url: '/distribution-agent-mng/mng/tbk/syncGoods',
    method: 'get',
    params
  })
}

/* 淘宝商品列表 - 添加商品 */
export function addTaobaoGoodList(data) {
  return request({
    url: '/distribution-agent-mng/mng/tbk/addGoods',
    method: 'post',
    data
  })
}

/* 淘宝商品列表 - 删除商品 */
export function delTaobaoGoodList(params) {
  return request({
    url: '/distribution-agent-mng/mng/tbk/delete',
    method: 'get',
    params
  })
}

/* 淘宝商品列表 - 通过id获取商品详情 */
export function getTaobaoGoodListDetail(params) {
  return request({
    url: '/distribution-agent-mng/mng/tbk/searchDetailsByGoodsId',
    method: 'get',
    params
  })
}

/* 淘宝商品列表 - 通过列表id获取商品详情 */
export function getTaobaoGoodListDetailById(params) {
  return request({
    url: '/distribution-agent-mng/mng/tbk/getDetailById',
    method: 'get',
    params
  })
}

/* 淘宝商品列表 - 更新商品状态 */
export function updateTaobaoGoodList(data) {
  return request({
    url: '/distribution-agent-mng/mng/tbk/update',
    method: 'post',
    data
  })
}

/* 淘宝商品列表 - 获取淘宝优惠券信息 */
export function getTaobaoGoodListCouponInfo(params) {
  return request({
    url: '/distribution-agent-mng/mng/tbk/searchCouponDetail',
    method: 'get',
    params
  })
}

/* 淘宝商品列表 - 淘宝商品上下架 */
export function changeStatusTaobaoGoodList(data) {
  return request({
    url: '/distribution-agent-mng/mng/tbk/updateStatus',
    method: 'put',
    data
  })
}

/* 淘宝商品分类 - 获取淘宝分类列表 */
export function getTaobaoTypeList(params) {
  return request({
    url: '/distribution-agent-mng/mng/tbk/type/list',
    method: 'get',
    params
  })
}

/* 淘宝商品分类 - 创建淘宝分类 */
export function addTaobaoTypeList(data) {
  return request({
    url: '/distribution-agent-mng/mng/tbk/type/create',
    method: 'post',
    data
  })
}

/* 淘宝商品分类 - 修改淘宝分类 */
export function updateTaobaoTypeList(data) {
  return request({
    url: '/distribution-agent-mng/mng/tbk/type/update',
    method: 'post',
    data
  })
}

/* 淘宝商品分类 - 获取淘宝分类列表详情 */
export function getTaobaoTypeListDetail(params) {
  return request({
    url: '/distribution-agent-mng/mng/tbk/type/detail',
    method: 'get',
    params
  })
}

