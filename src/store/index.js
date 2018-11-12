import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import * as getters from './getters'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production' // 调试 开发环境中为true，否则为false

export default new Vuex.Store({
  state,
  mutations,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : [] // 开发环境下显示vuex的状态修改
})
