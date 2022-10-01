import { getCurrentMonth } from '@/utils/get-this-month'
const state = {
  month: {}
}
const mutations = {
  SET_MONTH(state, month) {
    state.month = month
  }
}
const actions = {
  getCurrentMonth({ commit }) {
    const date = getCurrentMonth()
    commit('SET_MONTH', date)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

