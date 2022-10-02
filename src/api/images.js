import request from '@/utils/request'
export const upImage = (data) =>
  request({
    url: '/vm-service/sku/fileUpload',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
