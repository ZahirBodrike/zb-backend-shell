import request from '@/utils/request'

/* 京东商品分类列表 - 分页列表 */
export function getJingdongTypeList(params) {
  return request({
    url: '/mng/jdf/type/list',
    method: 'get',
    params
  })
}

/* 京东商品分类详情 */
export function getJingdongTypeListDetail(params) {
  return request({
    url: '/mng/jdf/type/detail',
    method: 'get',
    params
  })
}

/* 京东商品分类列表 - 添加商品 */
export function addJingdongTypeList(data) {
  return request({
    url: '/mng/jdf/type/create',
    method: 'post',
    data
  })
}

/* 京东商品分类列表 - 修改商品 */
export function updateJingdongTypeList(data) {
  return request({
    url: '/mng/jdf/type/update',
    method: 'post',
    data
  })
}

/* 京东商品管理列表 - 分页列表 */
export function getJingdongGoodList(data) {
  return request({
    url: '/jd/v1_0/list',
    method: 'post',
    data
  })
}

/* 京东商品管理列表 - 搜索商品skuid */
export function getJingdongGoodListDetail(params) {
  return request({
    url: '/jd/searchGoodsDetailBySkuId',
    method: 'get',
    params
  })
}

/* 京东商品管理列表 - 搜索商品详情id */
export function getJingdongGoodListDetailById(params) {
  return request({
    url: '/jd/getGoodsDetailById',
    method: 'get',
    params
  })
}

/* 京东商品管理列表 - 添加商品 */
export function addJingdongGoodList(data) {
  return request({
    url: '/jd/addGoods',
    method: 'post',
    data
  })
}

/* 京东商品管理列表 - 编辑商品 */
export function updateJingdongGoodList(data) {
  return request({
    url: '/jd/updateGoods',
    method: 'post',
    data
  })
}

/* 京东商品管理列表 - 商品上下架 */
export function changeStatusJingdongGoodList(data) {
  return request({
    url: '/jd/updateStatus',
    method: 'put',
    data
  })
}

/* 京东商品列表 - 获取京东优惠券信息 */
export function getJingdongGoodListCouponInfo(params) {
  return request({
    url: '/jd/searchCouponDetail',
    method: 'get',
    params
  })
}

