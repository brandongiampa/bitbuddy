import axios from 'axios'
import CryptoCurrency from '../classes/CryptoCurrency.js'
import FiatCurrency from '../classes/FiatCurrency.js'
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
      timePeriod: '30d',
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

const dataRequestModule = {
  state: {
    cryptosObjects: {},
    fiatsObjects: {}
  },
  getters: {
    cryptosObjects(state) {
      return state.cryptosObjects
    },
    fiatsObjects(state) {
      return state.fiatsObjects
    }
  },
  mutations: {
    cryptosObjects(state, cryptosObjects) {
      state.cryptosObjects = cryptosObjects
    },
    fiatsObjects(state, fiatsObjects) {
      state.fiatsObjects = fiatsObjects
    }
  },
  actions: {
    createObjects({commit}, cryptosObjects) {
      return new Promise((resolve)=> {
        axios.request(OPTIONS_CRYPTO)
            .then((response)=> {
              const obj = {}
              const coins = response.data.data.coins
              for (let coin of coins) {
                const crypto = new CryptoCurrency()
                crypto.setName(coin.name)
                crypto.setSymbol(coin.symbol)
                crypto.setUUID(coin.uuid)
                crypto.setRank(coin.rank)
                crypto.setIconURL(coin.iconUrl)
                crypto.setToUSD(coin.price)
                crypto.setSparkline(coin.sparkline)
                crypto.setMarketCap(coin.marketCap)
                crypto.setChange(coin.change)
                crypto.setCoinrankingURL(coin.coinrankingUrl)
                crypto.setColor(coin.color)
                obj[coin.symbol] = crypto
              }
              commit('cryptosObjects', obj)
            })
            .catch(function (error) {
              //commit('throwError')
              console.log(error);
            })
            .then(()=> {
              console.log(this.getters.cryptosObjects)
              axios.request(OPTIONS_FIAT)
              .then((response)=> {
                const obj = {}
                const rates = response.data.rates
                
                for (let [key,val] of Object.entries(rates)) {
                  const fiat = new FiatCurrency()
                  fiat.setSymbol(key)
                  fiat.setFromUSD(val)
                  obj[key] = fiat
                }
                commit('fiatsObjects', obj)
                console.log(obj)
              })
              .catch(function (error) {
                console.log(error)
              })
              .then(()=>{
                console.log(this.getters.fiatsObjects)
                resolve()
              })
            })
      })
      
    }
  }

}

export default dataRequestModule