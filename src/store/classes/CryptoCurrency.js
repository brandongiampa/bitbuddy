import Currency from './Currency.js'

class CryptoCurrency extends Currency {
    constructor(...args) {
        super(...args)
    }
    setUUID(uuid) {
        this.uuid = uuid
    }
    setName(name) {
        this.name = name
    }
    setIconURL(iconURL) {
        this.iconURL = iconURL
    }
    setRank(rank) {
        this.rank = rank
    }
    setMarketCap(marketCap) {
        this.marketCap = marketCap
    }
    setSparkline(sparkline) {
        this.sparkline = sparkline
    }
    setChange(change) {
        this.change = change
    }
    setCoinrankingURL(coinrankingURL) {
        this.coinrankingURL = coinrankingURL
    }
    setColor(color) {
        this.color = color
    }
    getUUID() {
        return this.uuid
    }
    getName() {
        return this.name
    }
    getIconURL() {
        return this.iconURL
    }
    getRank() {
        return this.rank
    }
    getMarketCap() {
        return this.marketCap
    }
    getSparkline() {
        return this.sparkline
    }
    getChange() {
        return this.change
    }
    getCoinrankingURL() {
        return this.coinrankingURL
    }
    getColor() {
        return this.color
    }
}

export default CryptoCurrency