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

// 获取弹窗管理列表
export function getPopupMngList(data) {
  return request({
    url: '/distribution-agent-mng/popupListByPage',
    method: 'get',
    params: data
  })
}

// 更新弹窗管理列表
export function updatePopupMngList(data) {
  return request({
    url: '/distribution-agent-mng/updatePopup',
    method: 'post',
    data
  })
}

// 获取弹窗管理列表详情
export function getPopupMngListDetail(data) {
  return request({
    url: '/distribution-agent-mng/popupDetail',
    method: 'get',
    params: data
  })
}

// 新增弹窗管理列表
export function addPopupMngList(data) {
  return request({
    url: '/distribution-agent-mng/updatePopup',
    method: 'post',
    data
  })
}

// 获取搜索热词管理列表
export function getHotSearchWordMngList(data) {
  return request({
    url: '/distribution-agent-mng/hotWordListByPage',
    method: 'get',
    params: data
  })
}

// 更新搜索热词管理列表
export function updateHotSearchWordMngList(data) {
  return request({
    url: '/distribution-agent-mng/updateHotWord',
    method: 'post',
    data
  })
}

// 获取搜索热词管理列表详情
export function getHotSearchWordMngListDetail(data) {
  return request({
    url: '/distribution-agent-mng/hotWordDetail',
    method: 'get',
    params: data
  })
}

// 新增搜索热词管理列表
export function addHotSearchWordMngList(data) {
  return request({
    url: '/distribution-agent-mng/addHotWord',
    method: 'post',
    data
  })
}

// 获取消息中心管理列表
export function getMessageCenterMngList(data) {
  return request({
    url: '/distribution-agent-mng/messageListByPage',
    method: 'get',
    params: data
  })
}

// 更新消息中心管理列表
export function updateMessageCenterMngList(data) {
  return request({
    url: '/distribution-agent-mng/updateMessage',
    method: 'post',
    data
  })
}

// 获取消息中心管理列表详情
export function getMessageCenterMngListDetail(data) {
  return request({
    url: '/distribution-agent-mng/messageDetail',
    method: 'get',
    params: data
  })
}

// 新增消息中心管理列表
export function addMessageCenterMngList(data) {
  return request({
    url: '/distribution-agent-mng/addMessage',
    method: 'post',
    data
  })
}
