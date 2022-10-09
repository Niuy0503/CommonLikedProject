import request from '@/utils/request'

/**
 * 策略搜索
 * @returns Promise
 */
export const getPolicySearch = (pageIndex, pageSize, policyName) => {
  return request({
    url: '/vm-service/policy/search',
    params: {
      pageIndex,
      pageSize,
      policyName
    }
  })
}

/**
 * 查询售货机策略
 * @returns Promise
 */
export const getAutomatPolicy = (innerCode) => {
  return request({
    url: `/vm-service/policy/vmPolicy/${innerCode}`
  })
}

/**
 * 根据策略搜索售货机
 * @returns Promise
 */
export const getAutomatSearch = (policyId, params) => {
  return request({
    url: `/vm-service/policy/vmList/${policyId}`,
    params
  })
}

/**
 * 新增策略
 * @returns Promise
 */
export const addPolicy = (data) => {
  return request({
    url: '/vm-service/policy',
    method: 'POST',
    data
  })
}

/**
 * 修改策略
 * @returns Promise
 */
export const editPolicy = (policyId, data) => {
  return request({
    url: `/vm-service/policy/${policyId}`,
    method: 'PUT',
    data
  })
}

/**
 * 取消策略
 * @returns Promise
 */
export const cancelPolicy = (policyId, data) => {
  return request({
    url: `/vm-service/vm/cancelPolicy/:innerCode/${policyId}`,
    method: 'PUT',
    data
  })
}

/**
 * 删除策略
 * @returns Promise
 */
export const delPolicy = (policyId, params) => {
  return request({
    url: `/vm-service/policy/${policyId}`,
    method: 'DELETE',
    params
  })
}
