<template>
    <div class="w-100 h-100">
        <select 
            :name="`currency-select-${this.currencyCategory}-${this.index}`" 
            :id="`currency-select-${this.currencyCategory}-${this.index}`" 
            class="w-100 h-100"
            @change="changeSelectedCurrency"
        >
            <option 
                v-for="currency of currencies" 
                :value="currency" 
                :key="`${`currency-select-${this.currencyCategory}-${this.index}`}-option-${currency}`"
                :selected="currency === selectedCurrency"
            >
            {{currency}}
            </option>
        </select>
    </div>
</template>

<script lang="js">
    export default {
        props: {
            currencies: {
                type: Array,
                required: true
            },
            selectedCurrency: {
                type: String,
                required: false
            },
            index: {
                type: Number,
                required: true
            },
            currencyCategory: {
                type: String,
                required: false
                //required: true
            },
            disableClicks: {
                type: Boolean,
                required: true
            }
        },
        methods: {
            changeSelectedCurrency(e) {
                this.$emit('changeSelectedCurrency', e.target.value)
            }
        },
        emits: [
            'changeSelectedCurrency'
        ]
    }
</script>