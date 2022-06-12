const sha256 = require("crypto-js/sha256");

class Block{
    // index: where the block sits on the chain
    // timestamp: when the block is created
    // data: any type of data you asossiate with the block
    // previousHash: is a string that contains the hash of the block before this one
    constructor(transactions){
        this.timestamp = new Date()
        this.transactions = transactions
        this.previousHash = ""
        //hash: this will contain the hash of the block
        this.hash = this.calculate_hash()
        this.nonce = 0
    }

    calculate_hash(){
        return sha256(JSON.stringify(this.timestamp) + JSON.stringify(this.transaction) + this.previousHash + this.nonce).toString()
    }

    mine_block(nzeros){
        while(this.hash.substring(0, nzeros) !== Array(nzeros + 1).join('0')){
            this.nonce++
            this.hash = this.calculate_hash()
        }
    }

    has_valid_transactions(){
        this.transactions.forEach(transaction=>{
            if(!transaction.isValid()) return false
        })
        return true
    }
}

module.exports = Block