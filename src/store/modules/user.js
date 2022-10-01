import { getCode, login, getUserDetailById } from '@/api'
import { Message } from 'element-ui'
const state = {
  token: null,
  codeData: {
    codeImg: '',
    random: ''
  },
  userInfo: {},
  hrsaastime: 0

}
const mutations = {
  SET_LOGINCODE(state, payload) {
    state.codeData.codeImg = payload.codeImg
    state.codeData.random = payload.random
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  REMOVE_TOKEN(state) {
    state.token = null
  },
  SET_USERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  REMOVE_USERINFO(state) {
    state.userInfo = {}
  },
  SET_HRSAAS_TIME(state, hrsaastime) {
    // console.log(1)
    state.hrsaastime = hrsaastime
  }
}
const actions = {
  async asyncGetCode({ commit }) {
    const random = Math.random()
    const { data } = await getCode(random)
    // console.log(data)
    const imgUrl = window.URL.createObjectURL(data)
    commit('SET_LOGINCODE', { codeImg: imgUrl, random })
  },
  async asyncLogin({ commit }, logindata) {
    try {
      const { data } = await login(logindata)
      if (!data.success) {
        throw data.msg
      }
      // console.log(data)
      Message({ message: '登录成功', type: 'success' })
      commit('SET_TOKEN', data.token)
      commit('SET_USERINFO', data)
      commit('SET_HRSAAS_TIME', +new Date())
    } catch (error) {
      console.dir(error)
      Message({ message: error, type: 'error' })
    }
  },
  async asyncGetUserInfo({ commit, state }) {
    // 根据id获取用户信息
    await getUserDetailById(state.userInfo.userId)
  },
  // 登出
  logout({ commit }) {
    commit('REMOVE_USERINFO')
    commit('REMOVE_TOKEN')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

