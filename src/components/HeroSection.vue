<template>
    <div id="hero-image" class="position-relative text-center bg-dark text-light">
        <div v-if="!isMainPage" class="col-md-5 px-3 py-5 p-lg-5 mx-auto position-relative">
            <h1 class="display-4 font-weight-normal mb-4">About Bitbuddy</h1>
        </div>
        <currency-conversion-form v-if="isMainPage"></currency-conversion-form>
        <div class="product-device box-shadow d-none d-md-block"></div>
        <div class="product-device product-device-2 box-shadow d-none d-md-block"></div>
    </div>
</template>

<style scoped>
#hero-image {
    background-image: url('../assets/blockchain-large.png');
    /*min-height: 400px;*/
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