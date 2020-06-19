import request from '@/utils/request'

/* 获取用户提现列表 */
export function getCashOutRecordList(data) {
  return request({
    url: '/rebateLog/v1_0/page',
    method: 'post',
    data
  })
}

/* 获取对账单数据 */
export function getMemoTicket(data) {
  return request({
    url: '/commissionMonthlyStatement/page',
    method: 'post',
    data
  })
}
