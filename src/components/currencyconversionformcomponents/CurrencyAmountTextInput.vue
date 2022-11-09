<template>
    <div>
        <input 
            type="number" 
            class="w-100"
            @change="changeAmount"
            :id="`currency-amount-text-input-${index}`"
            :value="amountOfCurrency"
            :disabled="disableClicks"
            :step="increment"
        >
    </div>
</template>

<script lang="js">
export default {
    methods: {
        changeAmount(e) {
            this.$emit('changeAmount', e.target.value)
        }
    },
    props: {
        amountOfCurrency: {
            type: Number,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        disableClicks: {
            type: Boolean,
            required: true
        },
        increment: {
            type: Number,
            required: true
        }
    },
    emits: [
        'changeAmount'
    ]
}
</script>