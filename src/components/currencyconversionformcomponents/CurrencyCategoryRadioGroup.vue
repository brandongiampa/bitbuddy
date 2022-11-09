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
                const category = e.target.value
                if (category !== this.selectedCurrencyCategory) {
                    this.$emit('changeCurrencyCategory', category)
                }
            }
        },
        props: {
            index: {
                type: Number,
                required: true
            },
            selectedCurrencyCategory: {
                type: String,
                required: true
            },
            disableClicks: {
                type: Boolean,
                required: true
            }
        },
        computed: {
            cryptoInputId() {
                return `currency-category-radio-input-crypto-${this.index}`
            },
            fiatInputId() {
                return `currency-category-radio-input-fiat-${this.index}`
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