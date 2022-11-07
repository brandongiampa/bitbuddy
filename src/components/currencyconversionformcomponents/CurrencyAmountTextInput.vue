<template>
    <div>
        <input 
            type="number" 
            class="w-100" 
            v-model="currencyAmount"
            @change="changeAmount"
        >
    </div>
</template>

<script lang="js">
export default {
    data() {
        return {
            currencyAmount: this.defaultAmount
        }
    },
    methods: {
        changeAmount() {
            this.$emit('transmitAmountChange', this.currencyAmount)
        }
    },
    props: {
        defaultAmount: {
            type: Number,
            required: false,
            default: 100
        }
    },
    emits: [
        'transmitAmountChange'
    ]
}
</script>