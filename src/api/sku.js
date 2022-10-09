import request from '@/utils/request'

/**
 * 商品类型搜索
 * @returns Promise
 */
export const getSkuClassSearch = (pageIndex, pageSize, className) => {
  return request({
    url: '/vm-service/skuClass/search',
    params: {
      pageIndex,
      pageSize,
      className
    }
  })
}

/**
 * 新增商品类型
 * @param {string} className 类型名
 * @returns Promise
 */
export const addSkuClass = (className) => {
  return request({
    url: '/vm-service/skuClass',
    method: 'POST',
    data: {
      className
    }
  })
}

/**
 * 修改商品类型
 * @param {String} classId 商品类型id
 * @returns Promise
 */
export const editSkuClass = (classId, className) => {
  return request({
    url: `/vm-service/skuClass/${classId}`,
    method: 'PUT',
    data: {
      className
    }
  })
}

/**
 * 删除商品类型
 * @param {string} classId 商品id
 * @returns Promise
 */
export const delSkuClass = (classId) => {
  return request({
    url: `/vm-service/skuClass/${classId}`,
    method: 'DELETE'
  })
}

/**
 * 商品搜索
 * @returns Promise
 */
export const getSkuSearch = (pageIndex, pageSize, skuName) => {
  return request({
    url: '/vm-service/sku/search',
    params: {
      pageIndex,
      pageSize,
      skuName
    }
  })
}
/**
 * 商品数据导入
 * @param {Object} fileName
 * @returns Promise
 */
export const uploadSku = (data) => {
  return request({
    url: '/vm-service/sku/upload',
    method: 'POST',
    data
  })
}

// /**
//  * 上传图片
//  * @param {Object} fileName 文件名
//  * @returns
//  */
// export const uploadPic = (file) => {
//   const fm = new FormData()
//   fm.append('filename', file)

//   return request({
//     url: '/vm-service/sku/fileUpload',
//     method: 'POST',
//     data: {
//       filename: fm
//     }
//   })
// }
/**
 * 上传图片
 * @param {Object} fileName 文件名
 * @returns
 */
export const uploadPic = (data) => {
  return request({
    url: '/vm-service/sku/fileUpload',
    method: 'POST',
    data
  })
}
/**
 * 新增商品
 * @param {Object} className 商品对象
 * @returns Promise
 */
export const addSku = (data) => {
  return request({
    url: '/vm-service/sku',
    method: 'POST',
    data
  })
}

/**
 * 修改商品
 * @param {String} skuId 商品类型id
 * @returns Promise
 */
export const editSku = (skuId, data) => {
  return request({
    url: `/vm-service/sku/${skuId}`,
    method: 'PUT',
    data
  })
}

