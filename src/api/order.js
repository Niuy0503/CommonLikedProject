import request from '@/utils/request'

/**
 * @ 订单搜索API
 * @ param {Object} orderInfo
 * @ returns Promise
 */
export const SearchOrderListAPI = (params) => {
  return request({
    url: `order-service/order/search`,
    params
  })
}
