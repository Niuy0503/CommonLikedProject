import request from '@/utils/request'
/**
 * 人员工作量列表
 * @param {Object} params
 * @returns Promise
 */
export function getUserWorkApi(params) {
  return request({
    url: `/user-service/user/searchUserWork`,
    params
  })
}

/**
 * 获取用户基本信息
 * @param {String} id
 * @returns Promise
 */
export function getUserApi(id) {
  return request({
    url: `/user-service/user/${id}`
  })
}

/**
 * 获取用户工作量(工单统计)
 * @param {Object} params
 * @returns Promise
 */
export function getUserWorkOrderApi(params) {
  return request({
    url: `/task-service/task/userWork`,
    params
  })
}
