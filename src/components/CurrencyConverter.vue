<template>
    <div class="position-relative">
        <div class="row">
            <currency-conversion-form
                :heading="'FROM'"
                :index="1"
            />
            <currency-conversion-form
                :heading="'TO'"
                :index="2"
                :default-crypto="'ETH'"
                :default-fiat="'USD'"
                :default-currency-type="'fiat'"
            />
        </div>
    </div>
</template>

<script lang="ts">
import CurrencyConversionForm from './currencyconvertercomponents/CurrencyConversionForm.vue'

export default {
    components: {
        CurrencyConversionForm
    }
}
</script>