import request from '@/utils/request'

/* 获取优选好货列表 */
export function goodsMaterialList(params) {
  return request({
    url: '/material/goodsMaterial/v1_0/list',
    method: 'get',
    params: params
  })
}

/* 新增优选好货 */
export function goodsMaterialAdd(data) {
  return request({
    url: '/material/goodsMaterial/v1_0/add',
    method: 'post',
    data
  })
}

/* 获取优选好货详情 */
export function goodsMaterialDetail(params) {
  return request({
    url: '/material/goodsMaterial/v1_0/detail',
    method: 'get',
    params: params
  })
}

/* 更新优选好货详情 */
export function goodsMaterialUpdate(data) {
  return request({
    url: '/material/goodsMaterial/v1_0/update',
    method: 'post',
    data
  })
}

/* 更新优选好货状态 */
export function goodsMaterialOnOff(data) {
  return request({
    url: '/material/goodsMaterial/v1_0/updateStatus',
    method: 'post',
    data
  })
}

/* 删除优选好货 */
export function goodsMaterialDelete(id) {
  return request({
    url: '/material/goodsMaterial/v1_0/delete?id=' + id,
    method: 'delete'
  })
}

/* 获取商品信息 */
export function goodsInfo(params) {
  return request({
    url: '/material/goodsMaterial/v1_0/getGoodsInfo',
    method: 'get',
    params: params
  })
}

/* 获取宣传素材列表 */
export function spreadMaterialList(params) {
  return request({
    url: '/material/spreadMaterial/v1_0/list',
    method: 'get',
    params: params
  })
}

/* 新增宣传素材 */
export function spreadMaterialAdd(data) {
  return request({
    url: '/material/spreadMaterial/v1_0/add',
    method: 'post',
    data
  })
}

/* 获取宣传素材详情 */
export function spreadMaterialDetail(params) {
  return request({
    url: '/material/spreadMaterial/v1_0/detail',
    method: 'get',
    params: params
  })
}

/* 更新宣传素材详情 */
export function spreadMaterialUpdate(data) {
  return request({
    url: '/material/spreadMaterial/v1_0/update',
    method: 'post',
    data
  })
}

/* 更新宣传素材状态 */
export function spreadMaterialOnOff(data) {
  return request({
    url: '/material/spreadMaterial/v1_0/updateStatus',
    method: 'post',
    data
  })
}

/* 删除宣传素材 */
export function spreadMaterialDelete(id) {
  return request({
    url: '/material/spreadMaterial/v1_0/delete?id=' + id,
    method: 'delete'
  })
}
