import request from '@/utils/request'

/**
 * @ 工单搜索API
 * @param {*} pageIndex
 * @param {*} pageSize
 * @returns Promise
 */
export const taskSearchAPI = (pageIndex, pageSize, taskCode, status, isRepair) => {
  return request({
    url: 'task-service/task/search',
    params: {
      pageIndex,
      pageSize,
      taskCode,
      status,
      isRepair
    }
  })
}
/**
 * @ 工单状态列表
 * @returns Promise
 */
export const getAllTaskStatusAPI = () => {
  return request({
    url: '/task-service/task/allTaskStatus'
  })
}

/**
 * @ 根据售货机获取运营人员列表
 * @param {String | Number} innerCode 设备编号
 * @returns Promise
 */
export const getOperatorListAPI = (innerCode) => {
  return request({
    url: `/user-service/user/operatorList/${innerCode}`
  })
}

/**
 * @ 创建工单
 * @param {Object} data
 * @returns Promise
 */
export const createTaskAPI = (data) => {
  return request({
    url: `/task-service/task/create`,
    method: 'POST',
    data
  })
}

/**
 * @ 获取售货机货道详情
 * @param {String | Number} innerCode 设备编号
 * @returns Promise
 */
export const getchannelListAPI = (innerCode) => {
  return request({
    url: `/vm-service/channel/channelList/${innerCode}`
  })
}

/**
 * @ 补货详情
 * @param {*} taskId
 * @returns Promise
 */
export const getTaskDetailsAPI = (taskId) => {
  return request({
    url: `/task-service/taskDetails/${taskId}`
  })
}

/**
 * @ 取消工单
 * @param {*} taskId
 * @returns Promise
 */
export const cancelTaskAPI = (taskId, desc) => {
  return request({
    url: `task-service/task/cancel/${taskId}`,
    method: 'POST',
    data: {
      taskId,
      desc
    }
  })
}

/**
 * @ 获取补货预警值
 * @returns Promise
 */
export const getAlertValueAPI = () => {
  return request({
    url: `task-service/task/supplyAlertValue`
  })
}

/**
 * @ 设置自动补货工单阈值
 * @param {integer} alertValue
 * @returns Promise
 */
export const setAlertValueAPI = (alertValue) => {
  return request({
    url: `task-service/task/autoSupplyConfig`,
    method: 'POST',
    data: {
      alertValue
    }
  })
}
