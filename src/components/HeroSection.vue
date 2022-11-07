<template>
    <div id="hero-image" class="position-relative text-center bg-dark text-light">
        <div class="col-md-5 p-lg-5 mx-auto position-relative">
            <h1 class="display-4 font-weight-normal">Bitbuddy Realtime Converter</h1>
            <currency-converter></currency-converter>
        </div>
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

<script lang="ts">
import CurrencyConverter from './CurrencyConverter.vue'

export default {
    components: {
        CurrencyConverter
    }
}
</script>