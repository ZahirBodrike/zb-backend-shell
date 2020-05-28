import request from '@/utils/request'

// 获取(某个级别的合伙人)返利宝佣金配置
export function getLevelLeaderCommission(params) {
  return request({
    url: '/distribution-agent-mng/commissionUser/v2/proxy/leader/config',
    method: 'get',
    params
  })
}

// 修改(某个级别的合伙人)返利宝佣金配置
export function updateLevelLeaderCommission(data) {
  return request({
    url: '/distribution-agent-mng/commissionUser/v2/proxy/leader/config/save',
    method: 'post',
    data
  })
}

