import axios from 'axios'

const currencyConversionModule = {
    state: {
        leftCategory: 'crypto',
        leftValue: 1,
        leftCurrency: 'BTC',
        rightCategory: 'fiat',
        rightValue: 1,
        rightCurrency: 'USD',
        disableInput: false,
        cryptoArray: [],
        fiatArray: [],
        cryptosToUSD: null,
        fiatToUSD: null,
        cryptoInfo: null,
        lastUpdateTime: null,
        hadError: false
      },
      getters: {
        leftCategory(state) {
          return state.leftCurrencyCategory
        },
        leftValue(state) {
          return state.leftValue
        },
        leftCurrency(state) {
          return state.leftCurrency
        },
        rightCategory(state) {
          return state.rightCurrencyCategory
        },
        rightValue(state) {
          return state.rightValue
        },
        rightCurrency(state) {
          return state.rightCurrency
        },
        disableInput(state) {
          return state.disableInput
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
          return state.lastLoadTime
        },
        hadError(state) {
          return state.hadError
        }
      },
      mutations: {
        changeLeftCategory(state, category) {
          state.leftCategory = category
        },
        changeLeftValue(state, value) {
          state.leftValue = value
        },
        changeLeftCurrency(state, currency) {
          state.leftCurrency = currency
        },
        changeRightCategory(state, category) {
          state.rightCategory = category
        },
        changeRightValue(state, value) {
          state.rightValue = value
        },
        changeRightCurrency(state, currency) {
          state.rightCurrency = currency
        },
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
          state.lastUpdateTime = Date.now()
        },
        throwError(state) {
          state.hadError = true
        },
        fixError(state) {
          state.hadError = false
        }
      },
      actions: {
        changeLeftCategory({commit}, category) {
          commit('changeLeftCategory', category)
        },
        changeLeftValue({commit}, value) {
          commit('changeLeftValue', value)
        },
        changeLeftCurrency({commit}, currency) {
          commit('changeLeftCurrency', currency)
        },
        changeRightCategory({commit}, category) {
          commit('changeRightCategory', category)
        },
        changeRightValue({commit}, value) {
          commit('changeRightValue', value)
        },
        changeRightCurrency({commit}, currency) {
          commit('changeRightCurrency', currency)
        },
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
              //commit('throwError')
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