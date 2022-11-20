<template>
    <div class="crypto-info p-5">
        <div class="container">
            <header>
                <a :href="crypto.getCoinrankingURL()" target="_blank" :style="`color: ${linkColor};`">
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
                        getName: ()=> {return "Loading cryptocurrencies..."},
                        getSymbol: ()=> {return "0"},
                        getUUID: ()=> {return null},
                        getRank: ()=> {return "0"},
                        getIconURL: ()=> {return `./logo-orange.png`},
                        getToUSD: ()=> {return null},
                        getSparkline: ()=> {return [0,100]},
                        getMarketCap: ()=> {return "0"},
                        getChange: ()=> {return "0"},
                        getCoinrankingURL: ()=> {return "0"},
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
            },
            linkColor: function() {
                const originalColor = this.crypto.getColor()
                const complementaryColor = this.getComplementaryColor(originalColor)
                const val1 = this.hexToRGB(complementaryColor.substring(1,3))
                const val2 = this.hexToRGB(complementaryColor.substring(3,5))
                const val3 = this.hexToRGB(complementaryColor.substring(5,7))
                if (val1 > 170 && val2 > 170) {
                    if (val3 > 170 < 128) {
                        return "#" + this.getHexFromInt(255-val1) + this.getHexFromInt(255-val2) + this.getHexFromInt(val3 + 128)
                    }
                    else {
                        return "#" + this.getHexFromInt(255-val1) + this.getHexFromInt(255-val2) + this.getHexFromInt(val3) 
                    }
                }
                if (val2 > 170) {
                    if (val3 > 170 < 128) {
                        return "#" + this.getHexFromInt(val1) + this.getHexFromInt(255-val2) + this.getHexFromInt(val3 + 128)
                    }
                    else {
                        return "#" + this.getHexFromInt(val1) + this.getHexFromInt(255-val2) + this.getHexFromInt(val3) 
                    }
                }
                if (val1 > 170 & val3 > 170) {
                    if (val3 > 170 < 128) {
                        return "#" + this.getHexFromInt(255-val1) + this.getHexFromInt(val2) + this.getHexFromInt(val3 + 128)
                    }
                    else {
                        return "#" + this.getHexFromInt(255-val1) + this.getHexFromInt(val2) + this.getHexFromInt(val3) 
                    }
                }
                return complementaryColor
            }
        },
        methods: {
            hexToRGB: function(twoDigitHex) {
                const ones = this.getSingleDigitHexValue(twoDigitHex[1])
                const tens = this.getSingleDigitHexValue(twoDigitHex[0])
                return (tens * 16) + ones 
            },
            getSingleDigitHexValue: function(digit) {
                if (/[0-9]/.test(digit)) return parseInt(digit)
                else if (/[A-F]/.test(digit)) return digit.charCodeAt(0) - 55
                else return digit.charCodeAt(0) - 87
            },
            getHexFromInt: function(val) { //single 0-255 value
                if (val === 255) return "FF"
                const colors = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
                const val1 = Math.floor(val/16)
                const val2 = (val % 16)
                return colors[val1] + colors[val2]
            },
            getComplementaryColor: function(hex) {
                const R = 255 - this.hexToRGB(hex.substring(1,3))
                const G = 255 - this.hexToRGB(hex.substring(3,5))
                const B = 255 - this.hexToRGB(hex.substring(5,7))
                return "#" + this.getHexFromInt(R) + this.getHexFromInt(G) + this.getHexFromInt(B)
            }
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