import { createStore } from 'vuex'
import currencyConversionModule from './modules/CurrencyConversionModule.js'
import dataRequestModule from './modules/DataRequestModule.js'

export default createStore({
  state: {
    globalCrypto: 'BTC'
  },
  getters: {
    globalCrypto(state) {
      return state.globalCrypto
    }
  },
  mutations: {
    setGlobalCrypto(state, globalCrypto) {
      state.globalCrypto = globalCrypto
    }
  },
  actions: {
    setGlobalCrypto({commit}, globalCrypto) {
      commit('setGlobalCrypto', globalCrypto)
    }
  },
  modules: {
    currencyConversionModule,
    dataRequestModule
  }
})
