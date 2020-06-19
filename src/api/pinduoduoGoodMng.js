import request from '@/utils/request'

/* 拼多多商品商品列表 - 分页列表 */
export function getPinduoduoGoodList(data) {
  return request({
    url: '/ddk/v1_0/list',
    method: 'post',
    data
  })
}

/* 拼多多商品商品列表 - 添加 */
export function addPinduoduoGoodList(data) {
  return request({
    url: '/ddk/addGoods',
    method: 'post',
    data
  })
}

/* 拼多多商品商品列表 - 获取商品详情 */
export function getPinduoduoGoodListDetail(params) {
  return request({
    url: '/ddk/getGoodsDetailById',
    method: 'get',
    params
  })
}

/* 拼多多商品商品列表 - 查询商品详情 */
export function getPinduoduoGoodListDetailByGoodId(params) {
  return request({
    url: '/ddk/searchGoodsDetailByGoodsId',
    method: 'get',
    params
  })
}

/* 拼多多商品商品列表 - 修改 */
export function updatePinduoduoGoodList(data) {
  return request({
    url: '/ddk/updateGoods',
    method: 'post',
    data
  })
}

/* 拼多多商品商品列表 - 商品上下架 */
export function changeStatusPinduoduoGoodList(data) {
  return request({
    url: '/ddk/updateStatus',
    method: 'put',
    data
  })
}

/* 拼多多商品分类列表 - 分页列表 */
export function getPinduoduoTypeList(params) {
  return request({
    url: '/mng/ddk/type/list',
    method: 'get',
    params
  })
}

/* 拼多多商品分类列表 - 分类详情 */
export function getPinduoduoTypeListDetail(params) {
  return request({
    url: '/mng/ddk/type/detail',
    method: 'get',
    params
  })
}

/* 拼多多商品分类列表 - 添加分类 */
export function addPinduoduoTypeList(data) {
  return request({
    url: '/mng/ddk/type/create',
    method: 'post',
    data
  })
}

/* 拼多多商品分类列表 - 修改分类 */
export function updatePinduoduoTypeList(data) {
  return request({
    url: '/mng/ddk/type/update',
    method: 'post',
    data
  })
}
