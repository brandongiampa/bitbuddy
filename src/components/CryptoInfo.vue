<template>
    <div class="crypto-info p-5">
        <div class="container">
            <header>
                <img :src="iconURL" :alt="name">
                <h2>{{`${name} (${symbol})`}}</h2>
                <p>Price in USD: {{priceUSD}}</p>
                <p>Market Cap: {{marketCap}}</p>
                <p>Rank: {{rank}}</p>
            </header>
        </div>
    </div>
</template>

<script lang="js">
    export default {
        data() {
            return {
                iconURL: 'https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg',
                name: 'Bitcoin',
                symbol: 'BTC',
                priceUSD: 16000,
                marketCap: null,
                rank: 1
            }
        }
    }
</script>

<style lang="scss">
.crypto-info {
    background-color: #efefef;
    text-align: center;
    header {
        img {
            margin-bottom: 20px;
            max-width: 150px;
        }
        p {
            margin: 0px;
        }
    }
    
}
</style>