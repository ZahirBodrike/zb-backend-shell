import request from '@/utils/request'

/**
 * 获取邀请海报列表
 * @param {*} params
 */
export function invitePosterList(params) {
  return request({
    url: '/invitePoster/v1_0/list',
    method: 'get',
    params: params
  })
}

/**
 * 新增邀请海报
 * @param {} data
 */
export function invitePosterAdd(data) {
  return request({
    url: '/invitePoster/v1_0/add',
    method: 'post',
    data
  })
}
/**
 * 获取邀请海报详情
 * @param {} params
 */
export function invitePosterDetail(params) {
  return request({
    url: '/invitePoster/v1_0/detail',
    method: 'get',
    params: params
  })
}
/**
 * 更新邀请海报详情
 * @param {} data
 */
export function invitePosterUpdate(data) {
  return request({
    url: '/invitePoster/v1_0/update',
    method: 'post',
    data
  })
}
/**
 * 更新邀请海报状态
 * @param {} data
 */
export function invitePosterOnOff(data) {
  return request({
    url: '/invitePoster/v1_0/updateStatus',
    method: 'post',
    data
  })
}
/**
 * 删除邀请海报
 * @param {} id
 */
export function invitePosterDelete(id) {
  return request({
    url: '/invitePoster/v1_0/delete?id=' + id,
    method: 'delete'
  })
}
