import request from '@/utils/request'

/**
 * @ 获取一定时间范围之内的订单总数
 * @param {Object} params
 * @returns Promise
 */
export const getOrderCountAPI = (params) => {
  return request({
    url: `order-service/report/orderCount`,
    params
  })
}

/**
 * @ 获取一定时间范围之内的收入
 * @param {Object} params
 * @returns Promise
 */
export const getOrderAmountAPI = (params) => {
  return request({
    url: `order-service/report/orderAmount`,
    params
  })
}

/**
 * @ 获取一定时间范围之内的分成总数
 * @param {Object} params
 * @returns Promise
 */
export const getTotalBillAPI = (params) => {
  return request({
    url: `order-service/report/totalBill`,
    params
  })
}

/**
 * @ 获取一定日期范围之内的合作商分成汇总数据
 * @param {Object} params
 * @returns Promise
 */
export const getPartnerCollectAPI = (params) => {
  return request({
    url: `order-service/report/partnerCollect`,
    params
  })
}

/**
 * @ 合作商搜索
 * @returns Promise
 */
export const getPartnerAPI = (pageIndex, pageSize) => {
  return request({
    url: `user-service/partner/search`,
    params: {
      pageIndex,
      pageSize
    }
  })
}
