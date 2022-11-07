<template>
    <div class="row">
        <div class="col-6 m-0 p-0">
            <input 
                type="radio" 
                :name="cryptoInputId" 
                :id="cryptoInputId" 
                value="crypto" 
                :checked="selectedCurrencyCategory === 'crypto'"
                @click="changeCurrencyCategory"
            >
            <label :for="cryptoInputId">Crypto</label>
        </div>
        <div class="col-6 m-0 p-0">
            <input 
                type="radio" 
                :name="fiatInputId" 
                :id="fiatInputId" 
                value="fiat" 
                :checked="selectedCurrencyCategory === 'fiat'"
                @click="changeCurrencyCategory"
            >
            <label :for="fiatInputId">Fiat</label>
        </div>
    </div>
</template>

<script lang="js">
    export default {
        methods: {
            changeCurrencyCategory(e) {
                if (e && e.target) {
                    console.log(e.target)
                    if (e.target.value !== undefined) {
                        const category = e.target.value
                        if (this.selectedCurrencyCategory !== category) {
                            this.selectedCurrencyCategory = category
                            this.$emit('changeCurrencyCategory', category)
                        }
                    }
                }
            }
        },
        computed: {
            cryptoInputId() {
                return "currency-category-radio-input-crypto-" + this.index.toString()
            },
            fiatInputId() {
                return `currency-category-radio-input-fiat-${this.index}`
            },

        },
        props: {
            index: {
                type: Number,
                required: true
            },
            defaultCurrencyCategory: {
                type: String,
                required: false,
                default: 'crypto'
            }
        },
        data() {
            return {
                selectedCurrencyCategory: this.defaultCurrencyCategory
            }
        },
        emits: [
            'changeCurrencyCategory'
        ]
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