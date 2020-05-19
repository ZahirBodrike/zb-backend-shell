import request from '@/utils/request'

export function goodsMaterialList(params) {
  return request({
    url: '/material/goodsMaterial/v1_0/list',
    method: 'get',
    params: params
  })
}
