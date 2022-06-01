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
    }

    calculate_hash(){
        return sha256(this.index + JSON.stringify(this.timestamp) + JSON.stringify(this.data) + this.previousHash).toString()
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.create_genesis_block()]
    }

    create_genesis_block(){
        return new Block({data : "Genesis Block"})
    }

    get_latest_block(){
        return this.chain[this.chain.length-1]
    }

    add_block(new_block){
        new_block.previousHash = this.get_latest_block().hash
        new_block.hash = new_block.calculate_hash()
        new_block.index = this.get_latest_block().index + 1
        this.chain.push(new_block)
    }
}

const mvs_coin = new Blockchain()
mvs_coin.add_block(new Block({data : {amount: 5}}))
mvs_coin.add_block(new Block({data : {amount: 10}}))

console.log(JSON.stringify(mvs_coin, null, 4))