<template>
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
        </div>
    </div>
</template>

<script lang="js">

    const NUMBER_INPUT_DECIMAL_PLACES = 5

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
            },
            changeRightCategory(category) {
                const toStore = this.rightCurrency
                this.rightCategory = category
                if (!this.rightStoredCurrency || this.rightStoredCurrency === this.leftCurrency) {
                    this.rightCurrency = this.rightCurrencyList[0]
                }
                else {
                    this.rightCurrency = this.rightStoredCurrency
                }
                this.rightStoredCurrency = toStore
                this.convertRightValue()
            },
            changeLeftCurrency(currency) {
                this.leftCurrency = currency
                this.convertRightValue()
            },
            changeRightCurrency(currency) {
                this.rightCurrency = currency
                this.convertRightValue()
            },
            changeLeftValue(value) {
                this.leftValue = value
                this.convertRightValue()
            },
            changeRightValue(value) {
                this.rightValue = value
                this.convertLeftValue()
            },
            convertLeftValue() {
                const rightValue = this.rightValue
                const rightCurrency = this.rightCurrency 
                const rightCategory = this.rightCategory
                const conversions1 = rightCategory === 'crypto' ? this.cryptosToUSD : this.fiatsToUSD
                const rightToUSD = rightValue * conversions1[rightCurrency]
                const leftCurrency = this.leftCurrency
                const leftCategory = this.leftCategory
                const conversions2 = leftCategory === 'crypto' ? this.cryptosToUSD : this.fiatsToUSD
                this.leftValue = this.round(rightToUSD / conversions2[leftCurrency])
            },
            convertRightValue() {
                const leftValue = this.leftValue
                const leftCurrency = this.leftCurrency
                const leftCategory = this.leftCategory
                const conversions1 = leftCategory === 'crypto' ? this.cryptosToUSD : this.fiatsToUSD
                const leftToUSD = leftValue * conversions1[leftCurrency]
                const rightCurrency = this.rightCurrency 
                const rightCategory = this.rightCategory
                const conversions2 = rightCategory === 'crypto' ? this.cryptosToUSD : this.fiatsToUSD
                this.rightValue = this.round(leftToUSD / conversions2[rightCurrency])
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
                for (let i = 0; i < NUMBER_INPUT_DECIMAL_PLACES; i++) n *= 10
                n = Math.round(n)
                for (let i = 0; i < NUMBER_INPUT_DECIMAL_PLACES; i++) n /= 10
                console.log(n)
                return n
            }
        },
        data() {
            return {
                leftValue: 0,
                rightValue: 0,
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
            }
        },
        computed: {
            ...mapGetters([
                'lastUpdateTime', 
                'hadError',
                'cryptoArray',
                'fiatArray',
                'cryptosToUSD',
                'fiatsToUSD'
            ]),
            leftCurrencyList() {
                if (this.leftCategory === 'crypto') {
                    return this.cryptoArray.filter((crypto) => crypto !== this.rightCurrency)
                }
                else {
                    return this.fiatArray.filter((fiat) => fiat !== this.rightCurrency)
                }
            },
            rightCurrencyList() {
                if (this.rightCategory === 'crypto') {
                    return this.cryptoArray.filter((crypto) => crypto !== this.leftCurrency)
                }
                else {
                    return this.fiatArray.filter((fiat) => fiat !== this.leftCurrency)
                }
            }
        },
        components: {
            CurrencyCategoryRadioGroup,
            CurrencyAmountTextInput,
            CurrencySelect,
            IncrementWidget
        },
        created() {
            this.disableInterface = true
            //this.convertRightValue()
        },
        mounted() {
            this.disableInterface = false
        }
    }
</script>

<style scoped>
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
</style>