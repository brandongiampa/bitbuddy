import axios from 'axios'

const currencyConversionModule = {
    state: {
        disableInput: false,
        cryptoArray: [],
        fiatArray: [],
        cryptoExchangesObj: null,
        fiatExchangesObj: null,
        cryptoInfo: null,
        lastUpdateTime: null,
        hadError: false
      },
      getters: {
        disableInput(state) {
          return state.disableInput
        },
        cryptoArray(state) {
          return state.cryptoArray
        },
        fiatArray(state) {
          return state.fiatArray
        },
        cryptoExchangesObj(state) {
          return state.cryptoExchanges
        },
        fiatExchangesObj(state) {
          return state.fiatExchanges
        },
        cryptoInfo(state) {
          return state.cryptoInfo
        },
        lastUpdateTime(state) {
          return state.lastLoadTime
        },
        hadError(state) {
          return state.hadError
        }
      },
      mutations: {
        enableInput(state) {
          state.disableInput = false
        },
        disableInput(state) {
          state.disableInput = true
        },
        populateCryptoArray(state, coins) {
          const arr = []
          for (const coin of coins) arr.push(coin.symbol)
          state.cryptoArray = arr
          console.log(state.cryptoArray)
        },
        populateFiatArray(state, rates) {
          const arr = []
          for (const [key] of Object.entries(rates)) arr.push(key)
          state.fiatArray = arr
          console.log(state.fiatArray)
        },
        populateCryptoExchangesObj(state, coins) {
          const obj = {}
          for (const coin of coins) obj[coin.symbol] = coin.price
          state.cryptoExchangesObj = obj
          console.log(state.cryptoExchangesObj)
        },
        setFiatExchangesObj(state, obj) {
          state.fiatExchangesObj = obj
          console.log(state.fiatExchangesObj)
        },
        setLastUpdateTime(state) {
          state.lastUpdateTime = Date.now()
          console.log(state.lastUpdateTime)
        },
        throwError(state) {
          state.hadError = true
        },
        fixError(state) {
          state.hadError = false
        }
      },
      actions: {
        enableInput({commit}) {
          commit('enableInput')
        },
        disableInput({commit}) {
          commit('disableInput')
        },
        populateArraysAndSetObjects({commit}) {
          /**
           * If you are an employer peeping my portfolio, please note that I only have free accounts
           * to these APIs and would not display my key in code like this if the consequences were 
           * anything worse than exceeding the monthly call limit and getting a 403 response.
           */
          const optionsCrypto = {
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
          const optionsFiat = {
            method: 'GET',
            url: 'https://exchangerate-api.p.rapidapi.com/rapid/latest/USD',
            headers: {
                'X-RapidAPI-Key': '666e34ef4amsh05ee2f9da14ee49p13fcaajsn2db38967314e',
                'X-RapidAPI-Host': 'exchangerate-api.p.rapidapi.com'
            }
          }
          commit('disableInput')
          axios.request(optionsCrypto)
          .then((response)=> {
            const coins = response.data.data.coins
            commit('populateCryptoArray', coins)
            commit('populateCryptoExchangesObj', coins)
          })
          .catch(function (error) {
            commit('throwError')
            console.log(error);
          })
          .then(()=> {
            axios.request(optionsFiat)
            .then((response)=> {
              const rates = response.data.rates
              commit('populateFiatArray', rates)
              commit('setFiatExchangesObj', rates)
            })
            .catch(function (error) {
              commit('throwError')
              console.log(error)
            })
            .then(()=> {
              commit('setLastUpdateTime', Date.now())
              commit('enableInput')
            })
          })
        }
      },
}

export default currencyConversionModule