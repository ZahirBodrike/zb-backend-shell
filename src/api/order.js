import request from '@/utils/request'

/* 获取订单列表 */
export function getOrderList(data) {
  return request({
    url: '/commission/order/v1_0/page',
    method: 'post',
    data
  })
}

/* 获取订单分佣信息 */
export function getOrderCommissionInfo(data) {
  return request({
    url: '/commission/order/v1_0/income',
    method: 'post',
    data
  })
}
