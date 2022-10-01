import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
const TimeOut = 3600
function IscheckTimeOut() {
  const currentTime = Date.now()
  const timeStamp = (currentTime - store.getters.hrsaastime) / 1000
  // console.log(timeStamp)
  return timeStamp > TimeOut
}
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})
service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (IscheckTimeOut()) {
      console.log(1)
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token超时'))
    }
    config.headers['Authorization'] = store.getters.token
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(
  response => {
    // 1,考虑把那些数据跑出去
    // 2.接▣成功并且业务成功
    // 3.没有成功Promise.reject跑出错误
    // 业务逻辑成功
    return response
  }, error => {
    if (error.response && error.response.status === 401) {
      store.dispatch('user/logout')
      router.push('/login')
      Message.error('token超时')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
)
export default service
