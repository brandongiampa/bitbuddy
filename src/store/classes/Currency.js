const CONVERSION_ERROR_MESSAGE = 'You have not set the rates of conversion.'

class Currency {
    constructor() {
        //this.symbol = symbol
    }
    setSymbol(symbol) {
        this.symbol = symbol
    }
    setFromUSD(fromUSD) {
        this.fromUSD = this.round(fromUSD)
        this.toUSD = this.round(1/ fromUSD)
    }
    setToUSD(toUSD) {
        this.fromUSD = this.round(1 / toUSD)
        this.toUSD = this.round(toUSD)
    }
    getToUSD() {
        return this.toUSD
    }
    getFromUSD() {
        return this.fromUSD
    }
    getSymbol() {
        return this.symbol
    }
    convertFromUSD(amountUSD) {
        if (!this.fromUSD) throw new Error(CONVERSION_ERROR_MESSAGE)
        return amountUSD * this.fromUSD
    }
    convertToUSD(amountCurrency) {
        if (!this.toUSD) throw new Error(CONVERSION_ERROR_MESSAGE)
        return amountCurrency * this.toUSD
    }
    round(n, digits = 5) {
        let factor = 1
        while (digits > 0) {
            factor *= 10 
            digits--
        }
        n *= factor
        return Math.round(n) / factor
    }
}

export default Currency