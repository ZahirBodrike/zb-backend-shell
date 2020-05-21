import request from '@/utils/request'

export function getPopupMngList(data) {
  return request({
    url: '/distribution-agent-mng/popupListByPage',
    method: 'get',
    params: data
  })
}

export function updatePopupMngList(data) {
  return request({
    url: '/distribution-agent-mng/updatePopup',
    method: 'post',
    data
  })
}

export function getPopupMngListDetail(data) {
  return request({
    url: '/distribution-agent-mng/popupDetail',
    method: 'get',
    params: data
  })
}

export function addPopupMngList(data) {
  return request({
    url: '/distribution-agent-mng/updatePopup',
    method: 'post',
    data
  })
}
