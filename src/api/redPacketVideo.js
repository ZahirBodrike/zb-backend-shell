import request from '@/utils/request'

/**
 * 获取红包配置
 * @param data
 * @param config
 * @returns {AxiosPromise<any>}
 */
export function getConfig(data) {
  return request({
    url: '/redPacket/get',
    method: 'post',
    data
  })
}

/**
 * 更新红包配置
 * @param data
 * @param config
 * @returns {AxiosPromise<any>}
 */
export function updateConfig(data) {
  return request({
    url: '/redPacket/saveOrUpdate',
    method: 'post',
    data
  })
}

/**
 * 获取红包限制配置
 * @param data
 * @param config
 * @returns {AxiosPromise<any>}
 */
export function getLimitConfig(data) {
  return request({
    url: '/redPacket/getRedPacketLimit',
    method: 'get',
    params: data
  })
}

/**
 * 更新红包限制配置
 * @param data
 * @param config
 * @returns {AxiosPromise<any>}
 */
export function updateLimitConfig(data) {
  return request({
    url: '/redPacket/updateRedPacketLimit',
    method: 'post',
    data
  })
}

/**
 * 红包统计列表
 * @param data
 * @param config
 * @returns {AxiosPromise<any>}
 */
export function pageRedPacket(data) {
  return request({
    url: '/redPacket/list',
    method: 'post',
    data
  })
}

/**
 * 获取红包数据详情
 * @param {*} data
 */
export function getRedPacketDetails(data) {
  return request({
    url: '/redPacket/detail',
    method: 'post',
    data
  })
}

