import request from '@/utils/request'

/* 获取首页精选商品列表 */
export function getHomePageChoiceMngList(data) {
  return request({
    url: '/distribution-agent-mng/mng/homeSelection/list',
    method: 'post',
    data
  })
}

/* 获取首页精选商品基础信息 */
export function getHomePageChoiceMngListDetail(data) {
  return request({
    url: '/distribution-agent-mng/mng/homeSelection/getGoodsBaseInfo',
    method: 'post',
    data
  })
}

/* 添加首页精选商品 */
export function addHomePageChoiceMngList(params) {
  return request({
    url: '/distribution-agent-mng/mng/homeSelection/addGoods',
    method: 'get',
    params
  })
}

/* 编辑首页精选商品 */
export function updateHomePageChoiceMngList(data) {
  return request({
    url: '/distribution-agent-mng/mng/homeSelection/updateStatus',
    method: 'put',
    data
  })
}

/* 获取邀请海报列表 */
export function invitePosterList(params) {
  return request({
    url: '/invitePoster/v1_0/list',
    method: 'get',
    params
  })
}

/* 新增邀请海报 */
export function invitePosterAdd(data) {
  return request({
    url: '/invitePoster/v1_0/add',
    method: 'post',
    data
  })
}

/* 获取邀请海报详情 */
export function invitePosterDetail(params) {
  return request({
    url: '/invitePoster/v1_0/detail',
    method: 'get',
    params: params
  })
}

/* 更新邀请海报详情 */
export function invitePosterUpdate(data) {
  return request({
    url: '/invitePoster/v1_0/update',
    method: 'post',
    data
  })
}

/* 更新邀请海报状态 */
export function invitePosterOnOff(data) {
  return request({
    url: '/invitePoster/v1_0/updateStatus',
    method: 'post',
    data
  })
}

/* 删除邀请海报 */
export function invitePosterDelete(id) {
  return request({
    url: '/invitePoster/v1_0/delete?id=' + id,
    method: 'delete'
  })
}

/* 获取弹窗管理列表 */
export function getPopupMngList(data) {
  return request({
    url: '/distribution-agent-mng/popupListByPage',
    method: 'get',
    params: data
  })
}

/* 更新弹窗管理列表 */
export function updatePopupMngList(data) {
  return request({
    url: '/distribution-agent-mng/updatePopup',
    method: 'post',
    data
  })
}

/* 获取弹窗管理列表详情 */
export function getPopupMngListDetail(data) {
  return request({
    url: '/distribution-agent-mng/popupDetail',
    method: 'get',
    params: data
  })
}

/* 新增弹窗管理列表 */
export function addPopupMngList(data) {
  return request({
    url: '/distribution-agent-mng/updatePopup',
    method: 'post',
    data
  })
}

/* 获取搜索热词管理列表 */
export function getHotSearchWordMngList(data) {
  return request({
    url: '/distribution-agent-mng/hotWordListByPage',
    method: 'get',
    params: data
  })
}

/* 更新搜索热词管理列表 */
export function updateHotSearchWordMngList(data) {
  return request({
    url: '/distribution-agent-mng/updateHotWord',
    method: 'post',
    data
  })
}

/* 获取搜索热词管理列表详情 */
export function getHotSearchWordMngListDetail(data) {
  return request({
    url: '/distribution-agent-mng/hotWordDetail',
    method: 'get',
    params: data
  })
}

/* 新增搜索热词管理列表 */
export function addHotSearchWordMngList(data) {
  return request({
    url: '/distribution-agent-mng/addHotWord',
    method: 'post',
    data
  })
}

/* 获取消息中心管理列表 */
export function getMessageCenterMngList(data) {
  return request({
    url: '/distribution-agent-mng/messageListByPage',
    method: 'get',
    params: data
  })
}

/* 更新消息中心管理列表 */
export function updateMessageCenterMngList(data) {
  return request({
    url: '/distribution-agent-mng/updateMessage',
    method: 'post',
    data
  })
}

/* 获取消息中心管理列表详情 */
export function getMessageCenterMngListDetail(data) {
  return request({
    url: '/distribution-agent-mng/messageDetail',
    method: 'get',
    params: data
  })
}

/* 新增消息中心管理列表 */
export function addMessageCenterMngList(data) {
  return request({
    url: '/distribution-agent-mng/addMessage',
    method: 'post',
    data
  })
}
