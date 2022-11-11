import axios from 'axios'
/**
* If you are an employer peeping my portfolio, please note that I only have free accounts
* to these APIs and would not display my key in code like this if the consequences were 
* anything worse than exceeding the monthly call limit and getting a 403 response.
*/
const OPTIONS_CRYPTO = {
  method: 'GET',
  url: 'https://coinranking1.p.rapidapi.com/coins',
  params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod: '24h',
      'tiers[0]': '1',
      orderBy: 'marketCap',
      orderDirection: 'desc',
      limit: '30',
      offset: '0'
  },
  headers: {
      'X-RapidAPI-Key': '666e34ef4amsh05ee2f9da14ee49p13fcaajsn2db38967314e',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }
}
const OPTIONS_FIAT = {
  method: 'GET',
  url: 'https://exchangerate-api.p.rapidapi.com/rapid/latest/USD',
  headers: {
      'X-RapidAPI-Key': '666e34ef4amsh05ee2f9da14ee49p13fcaajsn2db38967314e',
      'X-RapidAPI-Host': 'exchangerate-api.p.rapidapi.com'
  }
}

const currencyConversionModule = {
    state: {
        disableInterface: false,
        loadingProgress: 0,
        cryptoArray: [],
        fiatArray: [],
        cryptosToUSD: null,
        fiatToUSD: null,
        cryptoInfo: null,
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
        cryptoArray(state) {
          return state.cryptoArray
        },
        fiatArray(state) {
          return state.fiatArray
        },
        cryptosToUSD(state) {
          return state.cryptosToUSD
        },
        fiatsToUSD(state) {
          return state.fiatsToUSD
        },
        cryptoInfo(state) {
          return state.cryptoInfo
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
        populateCryptoArray(state, coins) {
          const arr = []
          for (const coin of coins) arr.push(coin.symbol)
          state.cryptoArray = arr
        },
        populateFiatArray(state, rates) {
          const arr = []
          for (const [key] of Object.entries(rates)) arr.push(key)
          state.fiatArray = arr
        },
        populateCryptoExchangesObj(state, coins) {
          const obj = {}
          for (const coin of coins) obj[coin.symbol] = coin.price
          state.cryptosToUSD = obj
        },
        setFiatExchangesObj(state, fiatsFromUSD) {
          const fiatsToUSD = {}
          for (let [key, val] of Object.entries(fiatsFromUSD)) {
            fiatsToUSD[key] = 1/val
          }
          state.fiatsToUSD = fiatsToUSD
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
        populateArraysAndSetObjects({commit}) {
          return new Promise((resolve) => {
            commit('disableInterface')
            commit('setLoadingProgress', 0)
            axios.request(OPTIONS_CRYPTO)
            .then((response)=> {
              const coins = response.data.data.coins
              commit('populateCryptoArray', coins)
              commit('populateCryptoExchangesObj', coins)
              commit('setLoadingProgress', 99)
            })
            .catch(function (error) {
              commit('throwError')
              console.log(error);
            })
            .then(()=> {
              axios.request(OPTIONS_FIAT)
              .then((response)=> {
                const rates = response.data.rates
                commit('populateFiatArray', rates)
                commit('setFiatExchangesObj', rates)
                commit('setLoadingProgress', 100)
              })
              .catch(function (error) {
                //commit('throwError')
                console.log(error)
              })
              .then(()=> {
                commit('setLastUpdateTime', Date.now())
                commit('enableInterface')
                resolve()
              })
            })
          })
        }
      },
}

export default currencyConversionModule