<template>
    <div class="mt-2 px-2 pt-1 pb-2 incrementer">
        <div>Increment: <span class="text-orange">{{increment}}</span></div>
        <button 
            @click="changeIncrementValue(1/100)"
            :disabled="increment/100 < minIncrement"
        >
        /100
        </button>
        <button 
            @click="changeIncrementValue(1/10)"
            :disabled="increment/10 < minIncrement"
        >
        /10
        </button>
        <button 
            @click="changeIncrementValue(10)"
            :disabled="increment*10 > maxIncrement"
        >
        *10
        </button>
        <button 
            @click="changeIncrementValue(100)"
            :disabled="increment*100 > maxIncrement"
        >
        *100
        </button>
    </div>
</template>

<script lang="js">
    export default {
        props: {
            increment: {
                type: Number,
                required: true
            },
            minIncrement: {
                type: Number,
                required: true
            },
            maxIncrement: {
                type: Number,
                required: true
            }
        },
        methods: {
            changeIncrementValue(factor) {
                this.$emit('changeIncrementValue', factor)
                console.log(factor)
                console.log(this.increment * factor)
                console.log(.1 * .1)
                console.log("----------")
            }
        },
        emits: [
            'changeIncrementValue'
        ]
    }
</script>

<style lang="scss" scoped>
.incrementer {
    text-align: center;
    background: #ffffff11;
    .text-orange {
        color: #E9AC16;
    }
    button {
        border-radius: 25%;
        font-size: .65em;
        background-color: #f7931A;
        height: 20px;
        width: 40px;
        border: none;
        color: white;
        margin: 3px;
        &:disabled {
            opacity: .2;
        }
    }
    
}

</style>