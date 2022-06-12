const sha256 = require("crypto-js/sha256");
const ec = require("./Keygenerator")

class Transaction{
    constructor(from_address, to_address, amount){
        this.from_address = from_address
        this.to_address = to_address
        this.amount = amount
    }

    calculate_hash(){
        return sha256(JSON.stringify(this.amount) + this.from_address + this.to_address).toString()
    }

    sign_transaction(sign_key){
        if(sign_key.getPublic('hex') !== this.from_address) throw new Error('You can not sign transactions for other wallets.')

        const hash_transaction = this.calculate_hash()
        const sign = sign_key.sign(hash_transaction, 'base64')
        this.signature = sign.toDER('hex')
    }

    is_valid(){
        if(this.from_address === null) return true
        if(!this.signature || this.signature.length === 0) throw new Error('No signiture in this tansaction.')

        const public_key = ec.keyFromPublic(this.from_address, 'hex')
        return public_key.verify(this.calculate_hash(), this.signature)
    }
}

module.exports = Transaction