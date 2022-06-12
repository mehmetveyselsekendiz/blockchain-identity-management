// ref: https://www.youtube.com/watch?v=zVqczFZr124

var sha256 = require("crypto-js/sha256");

class Block{
    // index: where the block sits on the chain
    // timestamp: when the block is created
    // data: any type of data you asossiate with the block
    // previousHash: is a string that contains the hash of the block before this one
    constructor({index = 0, data, previousHash = ''}){
        this.index = index
        this.timestamp = new Date()
        this.data = data
        this.previousHash = previousHash
        //hash: this will contain the hash of the block
        this.hash = this.calculate_hash()
        this.nonce = 0
    }

    calculate_hash(){
        return sha256(this.index + JSON.stringify(this.timestamp) + JSON.stringify(this.data) + this.previousHash + this.nonce).toString()
    }

    mine_block(nzeros){
        while(this.hash.substring(0, nzeros) !== Array(nzeros + 1).join('0')){
            this.nonce++
            this.hash = this.calculate_hash()
        }
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.create_genesis_block()]
        this.nzeros = 4
    }

    create_genesis_block(){
        return new Block({data : "Genesis Block"})
    }

    get_latest_block(){
        return this.chain[this.chain.length-1]
    }

    add_block(new_block){
        new_block.previousHash = this.get_latest_block().hash
        new_block.index = this.get_latest_block().index + 1
        new_block.mine_block(this.nzeros)
        this.chain.push(new_block)
    }

    is_chain_valid(){
        for(let i = 1; i < this.chain.length; i++){
            const current_block = this.chain[i]
            const previous_block = this.chain[i-1]
            if(current_block.hash !== current_block.calculate_hash()){
                return false
            }
            if(current_block.previousHash !== previous_block.hash){
                return false
            }
        }
        return true
    }
}

const mvs_coin = new Blockchain()
mvs_coin.add_block(new Block({data : {amount: 5}}))
mvs_coin.add_block(new Block({data : {amount: 10}}))

//console.log(JSON.stringify(mvs_coin, null, 4))
console.log("Is blockchain is valid? " + mvs_coin.is_chain_valid())