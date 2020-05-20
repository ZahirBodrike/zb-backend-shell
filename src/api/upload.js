
import request from '@/utils/request'

export function getAliOSSConfig(params) {
  return request({
    url: '/common/v1_0/getOssPolicy',
    method: 'get',
    params
  })
}

export function getAuthUrl(params) {
  return request({
    url: '/common/v1_0/getVideoAuthUrl',
    method: 'get',
    params
  })
}
