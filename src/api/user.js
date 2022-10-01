import request from '@/utils/request'

export function login(data) {
}

export function getUserDetailById(id) {
  return request({
    url: `/user-service/user/${id}`
  })
}

export function logout() {
}
