<template>
    <div class="crypto-info p-5">
        <div class="container">
            <header>
                <a :href="crypto.getCoinrankingURL()" target="_blank">
                    <img :src="crypto.getIconURL()">
                    <h2>{{`${crypto.getName()} (${crypto.getSymbol()})`}}</h2>
                </a>
                <p>
                    Price in USD: {{crypto.getToUSD()}}
                    <span v-if="crypto.getChange() >= 0" class="text-success">
                        <i>&#8648;{{crypto.getChange()}}%</i>
                    </span>
                    <span v-if="crypto.getChange() < 0" class="text-danger">
                        <i>&#8650;{{Math.abs(crypto.getChange())}}%</i>
                    </span>
                </p>
                <p>Market Cap: {{crypto.getMarketCap()}}</p>
                <p>Rank: {{crypto.getRank()}}</p>
            </header>
            <br>
            <div class="px-5 mx-5"><hr/></div>
            <br>
            <div class="sparklines">
                <line-chart :chartData="chartData" />
            </div>
        </div>
    </div>
</template>

<script lang="js">
    import LineChart from './cryptoinfocomponents/LineChart.js'
    export default {
        computed: {
            crypto: function() {
                if (this.$store.getters.globalCrypto && this.$store.getters.cryptosObjects[this.$store.getters.globalCrypto]) {
                    return this.$store.getters.cryptosObjects[this.$store.getters.globalCrypto]
                }
                else {
                    return {
                        getName: ()=> {return null},
                        getSymbol: ()=> {return null},
                        getUUID: ()=> {return null},
                        getRank: ()=> {return null},
                        getIconURL: ()=> {return null},
                        getToUSD: ()=> {return null},
                        getSparkline: ()=> {return [0,100]},
                        getMarketCap: ()=> {return null},
                        getChange: ()=> {return null},
                        getCoinrankingURL: ()=> {return null},
                        getColor: ()=> {return '#000000'}
                    }
                }
            },
            chartData: function() {
                return {
                    labels: ['','','','','','','','','','','','','','','','','','','','','','','','',''],
                    datasets: [
                        {
                            label: this.crypto.getName() + " to USD",
                            backgroundColor: this.crypto.getColor(),
                            data: this.crypto.getSparkline()
                        }
                    ]
                }
                // return {
                //     labels: ['','','','','','','','','','','','','','','','','','','','','','','','',''],
                //     datasets: {
                //         label: this.crypto.getName(),
                //         backgroundColor: this.crypto.getColor(),
                //         data: this.crypto.getSparkline()
                //     }
                // }
            },
            // sparklineMin: function() {
            //     if (!this.$store.getters.globalCrypto || !this.$store.getters.cryptosObjects[this.$store.getters.globalCrypto]) return 0
            //     const crypto = this.$store.getters.cryptosObjects[this.$store.getters.globalCrypto]
            //     const range = Math.max(...crypto.getSparkline()) - Math.min(...crypto.getSparkline())
            //     return Math.floor(Math.min(...crypto.getSparkline()) - (range/10))
            // },
            // sparklineMax: function() {
            //     if (!this.$store.getters.globalCrypto || !this.$store.getters.cryptosObjects[this.$store.getters.globalCrypto]) return 100
            //     const crypto = this.$store.getters.cryptosObjects[this.$store.getters.globalCrypto]
            //     const range = Math.max(...crypto.getSparkline()) - Math.min(...crypto.getSparkline())                
            //     return Math.ceil(Math.max(...crypto.getSparkline()) + (range/10))
            // },
        },
        data() {
            return {
                iconURL: 'https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg',
                name: 'Bitcoin',
                symbol: 'BTC',
                priceUSD: 16000,
                marketCap: null,
                rank: 1
            }
        },
        components: {
            LineChart
        }
    }
</script>

<style lang="scss">
.crypto-info {
    background-color: #efefef;
    text-align: center;
    header {
        img {
            margin-bottom: 20px;
            max-width: 150px;
        }
        p {
            margin: 0px;
        }
    }
    
}
</style>