const currencyConversionModule = {
    state: {
        disableInterface: false,
        loadingProgress: 0,
        lastUpdateTime: null,
        hadError: false
      },
      getters: {
        disableInterface(state) {
          return state.disableInterface
        },
        loadingProgress(state) {
          return state.loadingProgress
        },
        lastUpdateTime(state) {
          return state.lastUpdateTime
        },
        hadError(state) {
          return state.hadError
        }
      },
      mutations: {
        setLoadingProgress(state, n) {
          if (n < 0) state.loadingProgress = 0
          else if (n > 100) state.loadingProgress = 100
          else state.loadingProgress = n
        },
        enableInterface(state) {
          state.disableInterface = false
        },
        disableInterface(state) {
          state.disableInterface = true
        },
        setLastUpdateTime(state) {
          state.lastUpdateTime = new Date(Date.now())
        },
        throwError(state) {
          state.hadError = true
        },
        fixError(state) {
          state.hadError = false
        }
      },
      actions: {
        enableInterface({commit}) {
          commit('enableInterface')
        },
        disableInterface({commit}) {
          commit('disableInterface')
        },
      },
}

export default currencyConversionModule