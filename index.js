// ref: https://www.youtube.com/watch?v=zVqczFZr124

import sha256 from 'crypto-js/sha256';

class Block{
    // index: where the block sits on the chain
    // timestamp: when the block is created
    // data: any type of data you asossiate with the block
    // previousHash: is a string that contains the hash of the block before this one
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        //hash: this will contain the hash of the block
        this.hash = this.calculate_hash()
    }

    calculate_hash(){
        return sha256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).toString()
    }
}