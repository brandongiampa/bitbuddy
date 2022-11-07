<template>
    <div class="col col-lg-6 p-3">
        <h5 class="text-center">{{ heading }}:</h5>
        <!-- RADIO BUTTONS TO DETERMINE WHETHER CRYPTO OR FIAT SHOWS & IS TRANSMITTED TO STORE -->
        <div class="px-5">
            <div class="row">
                <div class="col-6 p-0 m-0">
                    <!-- SELECT CRYPTO VIEW -->
                    <input 
                        @click="changeSelectedCurrencyType"
                        type="radio" 
                        :name="cryptoRadioButtonNameAndID" 
                        :id="cryptoRadioButtonNameAndID" 
                        value="crypto" 
                        :checked="selectedCurrencyType === 'crypto'"
                    >
                    <label :for="cryptoRadioButtonNameAndID">Crypto</label>
                </div>
                <div class="col-6 p-0 m-0">
                    <!-- SELECT FIAT VIEW -->
                    <input 
                        @click="changeSelectedCurrencyType"
                        type="radio" 
                        :name="fiatRadioButtonNameAndID" 
                        :id="fiatRadioButtonNameAndID" 
                        value="fiat"
                        :checked="selectedCurrencyType === 'fiat'"
                    >
                    <label :for="fiatRadioButtonNameAndID">Fiat</label>
                </div>
            </div>
        </div>
        <!-- SELECT AMOUNT OF EITHER CURRENCY TYPE -->
        <!-- <div class="input-group"> -->
        <div class="row">
            <div class="col-7 p-0 m-0" style="background-color: green">
                <input 
                    @change="changeCurrencyAmount" 
                    :disabled="inputsAreDisabled" 
                    :value="currencyAmount" 
                    type="number" 
                    class="w-100" 
                    :about="ariaLabel"
                >
            </div>
            
            <!-- <div class="input-group-append"> -->
            <div class="col-5 p-0 m-0">
                <!-- SELECT CRYPTO TYPE, SHOW ONLY WHEN 'CRYPTO' IS SELECTED -->
                <select v-if="selectedCurrencyType === 'crypto'"
                    :disabled="inputsAreDisabled" 
                    class="custom-select w-100 h-100" 
                    :id="'inputGroupSelect-' + index +'A'">
                    <option 
                        v-for="crypto of arrayOfCryptos" 
                            :key="crypto + ' - ' + index" 
                            :value="crypto" 
                            :selected="crypto === selectedCrypto"
                    >
                        {{ crypto }}
                    </option>
                </select>
                <!-- SELECT FIAT TYPE, SHOW ONLY WHEN 'FIAT' IS SELECTED -->
                <select v-if="selectedCurrencyType === 'fiat'"
                    :disabled="inputsAreDisabled" 
                    class="custom-select w-100 h-100" 
                    :id="'inputGroupSelect-' + index +'B'">
                    <option 
                        v-for="fiatCurrency of arrayOfFiats" 
                            :key="fiatCurrency + '-' + index" 
                            :value="fiatCurrency" 
                            :selected="fiatCurrency === selectedFiat"
                    >
                        {{ fiatCurrency }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

export default {
    methods: {
        changeCurrencyAmount(e) {
            this.currencyAmount = e.target.value 
            console.log(this.currencyAmount)
        },
        changeSelectedCurrencyType(e) {
            this.selectedCurrencyType = e.target.value
        }
    },
    data() {
        return {
            currencyAmount: this.defaultCurrencyAmount,
            selectedCrypto: this.defaultCrypto,
            selectedFiat: this.defaultFiat,
            selectedCurrencyType: this.defaultCurrencyType,
            inputsAreDisabled: false,
            cryptoRadioButtonNameAndID: "crypto - " + this.index,
            fiatRadioButtonNameAndID: "fiat - " + this.index,
            ariaLabel: "Amount of currency converted " + this.heading.toLowerCase()
        }
    },
    computed: {
        selectedCurrency() {
            return this.selectedCurrencyType === 'crypto' ? this.defaultCrypto : this.defaultFiat
        }
    },
    props: {
        heading: {
            type: String,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        defaultCrypto: {
            type: String,
            required: false,
            default: 'BTC'
        },
        defaultFiat: {
            type: String,
            required: false,
            default: 'USD'
        },
        defaultCurrencyType: {
            type: String,
            required: false,
            default: 'crypto'
        },
        defaultCurrencyAmount: {
            type: Number,
            required: false,
            default: 100
        },
        arrayOfCryptos: {
            type: Array,
            required: false,
            default: ()=> {
                return [ 'BTC', 'ETH', 'XRP', 'XLM' ]
            }
        },
        arrayOfFiats: {
            type: Array,
            required: false,
            default: ()=> {
                return [ 'USD', 'CAD', 'KRW' ]
            }
        }
    }
    // setup() {
        
    // },
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
