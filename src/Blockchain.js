const Block = require("./Block")
const Transaction = require("./Transaction")

class Blockchain{
    constructor(){
        this.chain = [this.create_genesis_block()]
        this.pending_tansactions = []
        this.nzeros = 4
        this.mining_revard = 1
    }

    create_genesis_block(){
        return new Block({data : "Genesis Block"})
    }

    get_latest_block(){
        return this.chain[this.chain.length-1]
    }

    //add_block(new_block){
     //   new_block.previousHash = this.get_latest_block().hash
       // new_block.mine_block(this.nzeros)
        //this.chain.push(new_block)}

    mine_pending_tansactions(revard_address){
        const block = new Block(this.pending_tansactions)
        block.mine_block(this.nzeros)

        console.log("Block mined")
        this.chain.push(block)

        this.pending_tansactions = [
            new Transaction(null, revard_address, this.mining_revard)
        ]
    }

    create_transaction(transaction){
        this.pending_tansactions.push(transaction)
    }

    get_address_ballance(address){
        let balance = 0
        this.chain.forEach(block=>block.transactions.forEach(transaction=>{
            if(transaction.from_address === address) balance -= transaction.amount
            if(transaction.to_address === address) balance += transaction.amount
        }))
        return balance
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

module.exports = Blockchain