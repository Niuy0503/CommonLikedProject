import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import dashboard from './modules/dashboard'
import sku from './modules/sku'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ['user.token', 'user.userInfo', 'user.hrsaastime']
    })
  ],
  modules: {
    app,
    settings,
    user,
    dashboard,
    sku
  },
  getters
})

export default store
