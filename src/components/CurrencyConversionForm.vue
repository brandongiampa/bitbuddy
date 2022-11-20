<template>
    <div class="col-md-5 p-lg-5 mx-auto position-relative">
        <h1 class="display-4 font-weight-normal">Bitbuddy Realtime Converter</h1>
        <div class="position-relative">
            <div class="row">
                <div class="col-12 col-lg-6 p-0 p-lg-3">
                    <!--START LEFT FORM-->
                    <h5 class="text-center">FROM:</h5>
                    <div class="px-5 pt-2">
                        <currency-category-radio-group 
                            :index="1"
                            :selected-currency-category="leftCategory"
                            :disable-clicks="disableInterface"
                            @change-currency-category="changeLeftCategory"
                        />
                    </div>
                    <div class="row px-5 px-lg-0 py-0">
                        <div class="col-12 col-sm-7 p-0 m-0">
                            <currency-amount-text-input 
                                :amount-of-currency="leftValue"
                                :index="1"
                                :disable-clicks="disableInterface"
                                @change-amount="changeLeftValue"
                                :increment="leftIncrement"
                            />
                        </div>
                        <div class="col-12 col-sm-5 m-0 p-0">
                            <currency-select 
                                :currencies="leftCurrencyList"
                                :selected-currency="leftCurrency"
                                :index="1"
                                :disable-clicks="disableInterface"
                                @change-selected-currency="changeLeftCurrency"
                            />
                        </div>
                    </div>
                    <div class="px-5 px-lg-0 py-0">
                        <increment-widget 
                            @change-increment-value="changeIncrementValueLeft" 
                            :increment="leftIncrement"
                            :min-increment="minIncrement"
                            :max-increment="maxIncrement"
                        />
                    </div>
                    <!--END LEFT FORM-->
                </div>
                <div class="col-12 col-lg-6 p-3">
                    <!--START RIGHT FORM-->
                    <h5 class="text-center">TO:</h5>
                    <div class="px-5 pt-2">
                        <currency-category-radio-group 
                            :index="2"
                            :selected-currency-category="rightCategory"
                            :disable-clicks="disableInterface"
                            @change-currency-category="changeRightCategory"
                        />
                    </div>
                    <div class="row">
                        <div class="col-7 p-0 m-0">
                            <currency-amount-text-input 
                                :amount-of-currency="rightValue"
                                :index="2"
                                :disable-clicks="disableInterface"
                                @change-amount="changeRightValue"
                                :increment="rightIncrement"
                            />
                        </div>
                        <div class="col-5 m-0 p-0">
                            <currency-select 
                                :currencies="rightCurrencyList"
                                :selected-currency="rightCurrency"
                                :index="2"
                                :disable-clicks="disableInterface"
                                @change-selected-currency="changeRightCurrency"
                            />
                        </div>
                    </div>
                    <increment-widget 
                        @change-increment-value="changeIncrementValueRight" 
                        :increment="rightIncrement"
                        :min-increment="minIncrement"
                        :max-increment="maxIncrement"
                    />
                </div>
                <!--END RIGHT FORM-->
            </div>
            <p style="font-weight:200; color: #f6f6f6; font-style: italic;" class="text-center font-weight-light font-italic">{{timeString}}</p>
        </div>
        <div v-if="disableInterface" class="overlay">
            <span class="text-light">Loading data...</span>
            <br>
            <div class="progress">
                <div class="progress-bar" 
                    role="progressbar" 
                    :aria-valuenow="loadingProgress" 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                    :style="`width: ${loadingProgress}%;`"
                >
                {{loadingProgress}}%
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="js">
    /**
     * Interface front end constants
     */
    const NUMBER_INPUT_DECIMAL_PLACES = 5

    /**
     * Page refresh constants
     */
    const MINUTES_BETWEEN_REFRESHES = 5
    const MILLISECONDS_BETWEEN_REFRESHES = MINUTES_BETWEEN_REFRESHES * 60 * 1000

    import CurrencyCategoryRadioGroup from './currencyconversionformcomponents/CurrencyCategoryRadioGroup.vue'
    import CurrencyAmountTextInput from './currencyconversionformcomponents/CurrencyAmountTextInput.vue'
    import CurrencySelect from './currencyconversionformcomponents/CurrencySelect.vue'
    import IncrementWidget from './currencyconversionformcomponents/IncrementWidget.vue'
    import { mapGetters } from 'vuex'

    export default {
        methods: {
            changeLeftCategory(category) {
                const toStore = this.leftCurrency
                this.leftCategory = category
                if (!this.leftStoredCurrency || this.leftStoredCurrency === this.rightCurrency) {
                    this.leftCurrency = this.leftCurrencyList[0]
                }
                else {
                    this.leftCurrency = this.leftStoredCurrency
                }
                this.leftStoredCurrency = toStore
                this.convertRightValue()
                if (this.leftCategory === "crypto") this.$store.dispatch('setGlobalCrypto', this.leftCurrency)
            },
            changeRightCategory(category) {
                const toStore = this.rightCurrency
                this.rightCategory = category
                if (!this.rightStoredCurrency || this.rightStoredCurrency === this.leftCurrency) this.rightCurrency = this.rightCurrencyList[0]
                else this.rightCurrency = this.rightStoredCurrency
                this.rightStoredCurrency = toStore
                this.convertRightValue()
                if (this.rightCategory === "crypto") this.$store.dispatch('setGlobalCrypto', this.rightCurrency)
            },
            changeLeftCurrency(currency) {
                this.leftCurrency = currency
                this.convertRightValue()
                if (this.leftCategory === "crypto") this.$store.dispatch('setGlobalCrypto', this.leftCurrency)
            },
            changeRightCurrency(currency) {
                this.rightCurrency = currency
                this.convertRightValue()
                if (this.rightCategory === "crypto") this.$store.dispatch('setGlobalCrypto', this.rightCurrency)
            },
            changeLeftValue(value) {
                this.leftValue = this.round(parseFloat(value))
                this.convertRightValue()
            },
            changeRightValue(value) {
                this.rightValue = this.round(parseFloat(value))
                this.convertLeftValue()
            },
            convertLeftValue() {
                const rightValue = this.round(this.rightValue)
                const rightCurrency = this.rightCurrency 
                const rightCategory = this.rightCategory
                const cryptos = this.$store.getters.cryptosObjects
                const fiats = this.$store.getters.fiatsObjects
                const rightToUSD = rightCategory === 'crypto' ? cryptos[rightCurrency].getToUSD() * rightValue : fiats[rightCurrency].getToUSD() * rightValue 
                const leftCurrency = this.leftCurrency
                const leftCategory = this.leftCategory
                const leftFromUSD = leftCategory === 'crypto' ? cryptos[leftCurrency].getFromUSD() * rightToUSD : fiats[leftCurrency].getFromUSD() * rightToUSD
                this.leftValue = this.round(leftFromUSD)
            },
            convertRightValue() {
                const leftValue = this.round(this.leftValue)
                const leftCurrency = this.leftCurrency
                const leftCategory = this.leftCategory
                const cryptos = this.$store.getters.cryptosObjects
                const fiats = this.$store.getters.fiatsObjects
                const leftToUSD = leftCategory === 'crypto' ? cryptos[leftCurrency].getToUSD() * leftValue : fiats[leftCurrency].getToUSD() * leftValue 
                const rightCurrency = this.rightCurrency 
                const rightCategory = this.rightCategory
                const rightFromUSD = rightCategory === 'crypto' ? cryptos[rightCurrency].getFromUSD() * leftToUSD : fiats[rightCurrency].getFromUSD() * leftToUSD 
                this.rightValue = this.round(rightFromUSD)
            },
            changeIncrementValueLeft(factor) {
                //Workaround for floating point error when multiplying .1 * .1.
                if (factor === 0.1 && this.leftIncrement === 0.1) this.leftIncrement = 0.01
                else if (this.leftIncrement * factor < this.minIncrement) this.leftIncrement = this.minIncrement
                else if (this.leftIncrement * factor > this.maxIncrement) this.leftIncrement = this.maxIncrement
                else this.leftIncrement *= factor
            },
            changeIncrementValueRight(factor) {
                //Workaround for floating point error when multiplying .1 * .1.
                if (factor === 0.1 && this.rightIncrement === 0.1) this.rightIncrement = 0.01
                else if (this.rightIncrement * factor < this.minIncrement) this.rightIncrement = this.minIncrement
                else if (this.rightIncrement * factor > this.maxIncrement) this.rightIncrement = this.maxIncrement
                else this.rightIncrement *= factor
            },
            round(n) {
                let str = n.toString()
                str = this.makeFivePlaceDecimalStringThenRoundOff(str)
                return str
            },
            makeFivePlaceDecimalStringThenRoundOff(str) {
                const spl = str.split('.')
                if (spl.length < 2) return str
                if (spl[1].length <= 5) return str
                return spl[0] + "." + spl[1].substring(0, 5)
            },
            async refreshDataFiveTimes() {
                if (this.numberOfAPIRefreshes <= 5) {
                    await this.$store.dispatch('createObjects')
                    this.numberOfAPIRefreshes++
                    this.convertRightValue()
                }
                else {
                    clearInterval(this.interval)
                }
            },
            async setInitialValues() {
                await this.$store.dispatch('createObjects')
                this.convertRightValue()
            }
        },
        data() {
            return {
                numberOfAPIRefreshes: 0,
                interval: null,
                leftValue: '1',
                rightValue: '0',
                leftCurrency: 'BTC',
                rightCurrency: 'USD',
                leftCategory: 'crypto',
                rightCategory: 'fiat',
                leftStoredCurrency: null,
                rightStoredCurrency: null,
                leftIncrement: 1,
                rightIncrement: 1,
                minIncrement: .00001,
                maxIncrement: 10000,
                storedTimestamp: null
            }
        },
        computed: {
            ...mapGetters([
                'lastUpdateTime', 
                'loadingProgress',
                'hadError',
                'cryptosToUSD',
                'fiatsToUSD',
                'disableInterface'
            ]),
            fiatArray() {
                const arr = []
                for (let [key] of Object.entries(this.$store.getters.fiatsObjects)) arr.push(key)
                return arr
            },
            cryptoArray() {
                const arr = []
                for (let [key] of Object.entries(this.$store.getters.cryptosObjects)) arr.push(key)
                return arr
            },
            leftCurrencyList() {
                if (this.leftCategory === 'crypto') return this.cryptoArray.filter((crypto) => crypto !== this.rightCurrency)
                else return this.fiatArray.filter((fiat) => fiat !== this.rightCurrency)
            },
            rightCurrencyList() {
                if (this.rightCategory === 'crypto') return this.cryptoArray.filter((crypto) => crypto !== this.leftCurrency)
                else return this.fiatArray.filter((fiat) => fiat !== this.leftCurrency)
            },
            timeString() {
                const timestamp = this.$store.getters.lastUpdateTime
                if (!timestamp) return 'not yet updated'
                const str = timestamp.toString()
                return `Last updated: ${str}`
            }
        },
        components: {
            CurrencyCategoryRadioGroup,
            CurrencyAmountTextInput,
            CurrencySelect,
            IncrementWidget
        },
        created() {
            this.setInitialValues()
            this.interval = setInterval(this.refreshDataFiveTimes, MILLISECONDS_BETWEEN_REFRESHES)
        }
    }
</script>

<style lang="scss" scoped>
    input[type=radio] {
        display: none;
    }
    input[type=radio] ~ label {
        background-color: gray;
        width: 100%;
        height: 100%;
        color: #cbcbcb;
    }
    input[type=radio]:checked ~ label {
        background-color: black;
        color: #efefef;
    }
    .overlay {
        background: #111111ee;
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: 1000;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        transition-duration: .05s !important;
        .progress {
            width: 80%;
        }
    }
</style>