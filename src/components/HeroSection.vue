<template>
    <div id="hero-image" class="position-relative text-center bg-dark text-light">
        <h1 v-if="!isMainPage">ABOUT</h1>
        <currency-conversion-form v-if="isMainPage"></currency-conversion-form>
        <div class="product-device box-shadow d-none d-md-block"></div>
        <div class="product-device product-device-2 box-shadow d-none d-md-block"></div>
    </div>
</template>

<style scoped>
#hero-image {
    background-image: url('../assets/blockchain-large.png');
    min-height: 400px;
}
#hero-image::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #212529de;
}
</style>

<script lang="js">
import CurrencyConversionForm from './CurrencyConversionForm.vue'

export default {
    components: {
        CurrencyConversionForm
    },
    props: {
        isMainPage: {
            type: Boolean,
            default: true
        }
    }
}
</script>