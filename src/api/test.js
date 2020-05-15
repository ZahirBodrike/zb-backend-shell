import request from '@/utils/request'

export function getTable(data) {
  return request({
    url: '/vue-element-admin/search/table',
    method: 'get',
    params: data
  })
}
