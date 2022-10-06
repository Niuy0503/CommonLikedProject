import request from '@/utils/request'

/**
 * @ 获取维修人员列表
 * @param {*} innerCode 设备编号
 * @returns Promise
 */
export const getRepairerListAPI = (innerCode) => {
  return request({
    url: `user-service/user/repairerList/${innerCode}`
  })
}
