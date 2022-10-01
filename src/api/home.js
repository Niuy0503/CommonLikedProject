import request from '@/utils/request'

export const getSkuTopAPI = (topValue, start, end) => {
  return request({
    url: `/order-service/report/skuTop/${topValue}/${start}/${end}`,
    topValue,
    start,
    end
  })
}
/**
 *  获取所有工单状态详情
 * @returns Promise
 */
export const getAllTaskStatus = (params) => {
  return request({
    url: `/task-service/task/taskReportInfo/${params.start}/${params.end}`
  })
}
/**
 * 获取一定时间范围之内的订单总数
 * @param {Object} params
 * @returns Promise
 */
export const getOrderCount = (params) => {
  return request({
    url: `/order-service/report/orderCount`,
    params
  })
}
/**
 *  获取一定时间范围之内的收入
 * @param {Object} params
 * @returns Promise
 */
export const getorderAmount = (params) => {
  return request({
    url: `/order-service/report/orderAmount`,
    params
  })
}
export const getAmountCollect = (collectType, date) => {
  return request({
    url: `/order-service/report/amountCollect/${collectType}/${date.start}/${date.end}`
  })
}
export const getRegionCollect = (date) => {
  return request({
    url: `/order-service/report/regionCollect/${date.start}/${date.end}`
  })
}
/**
 * 合作商点位汇总统计
 * @returns Promise
 */
export const getNodeCollect = () => {
  return request({
    url: `/vm-service/node/nodeCollect`
  })
}
/**
 * 获取点位总数
 * @returns Promise
 */
export const getNodeCount = () => {
  return request({
    url: `/vm-service/node/count`
  })
}
/**
 * 获取合作商总数
 * @returns Promise
 */
export const getPartnerCount = () => {
  return request({
    url: `/user-service/partner/count`
  })
}
