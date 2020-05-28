import request from '@/utils/request'

// 获取金豆任务列表
export function getGoldenBeanTaskList(params) {
  return request({
    url: '/beanTask/v1_0/list',
    method: 'get',
    params
  })
}

// 修改金豆任务列表
export function updateGoldenBeanTaskList(data) {
  return request({
    url: '/beanTask/v1_0/update',
    method: 'post',
    data
  })
}

// 获取金豆任务列表
export function getGoldenBeanExchangeConfig(params) {
  return request({
    url: '/beanExchangeRate/v1_0/get',
    method: 'get',
    params
  })
}

// 修改金豆任务列表
export function updateGoldenBeanExchangeConfig(data) {
  return request({
    url: '/beanExchangeRate/v1_0/update',
    method: 'post',
    data
  })
}

// 获取金豆任务列表
export function getGoldenBeanRecord(params) {
  return request({
    url: '/beanExchangeRecord/v1_0/list',
    method: 'get',
    params
  })
}
