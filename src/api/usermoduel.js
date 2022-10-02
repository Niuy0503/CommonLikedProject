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
/**
 * 人员搜索(列表页)
 * @param {Object} params
 * @returns Promise
 */
export function getUserInfoApi(params) {
  return request({
    url: `/user-service/user/search`,
    params
  })
}
/**
 * 新增人员
 * @param {Object} data
 * @returns Promise
 */
export function addUserApi(data) {
  return request({
    url: `/user-service/user`,
    method: 'POST',
    data
  })
}
/**
 * 获取角色列表
 * @returns Promise
 */
export function getRoleApi() {
  return request({
    url: `/user-service/role`
  })
}
/**
 * 获取区域列表
 * @returns Promise
 */
export function getRegionApi() {
  return request({
    url: `/vm-service/region/search`,
    params: { pageIndex: 1, pageSize: 999999 }
  })
}
export function updataUserApi(id, data) {
  return request({
    url: `/user-service/user/${id}`,
    method: 'PUT',
    data
  })
}
