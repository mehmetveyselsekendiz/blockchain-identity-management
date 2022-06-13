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
        return new Block([{data : "Genesis Block"}])
    }

    get_latest_block(){
        return this.chain[this.chain.length-1]
    }

    mine_pending_tansactions(revard_address){
        const block = new Block(this.pending_tansactions)
        block.previousHash = this.get_latest_block().hash
        block.mine_block(this.nzeros)

        console.log("Block mined")
        this.chain.push(block)

        this.pending_tansactions = [
            new Transaction(null, revard_address, this.mining_revard)
        ]
    }

    add_transaction(transaction){
        if(!transaction.from_address || !transaction.to_address) throw new Error('Transaction must include from and to address.')
        if(!transaction.is_valid()) throw new Error('Cannot add invalid transaction.')
        if(transaction.amount <= 0) throw new Error("Transaction amount must be higher than 0.")

        const wallet_balance = this.get_address_balance(transaction.from_address)

        const pending_transactions_spend = this.pending_tansactions.filter(item=>item.from_address === transaction.from_address)
        const pending_transactions_get = this.pending_tansactions.filter(item=>item.to_address === transaction.from_address)

        const total_pending_amount_spend = pending_transactions_spend.length>0 ? pending_transactions_spend.map(item=>item.amount).reduce((prev,cur)=>prev+cur) : 0
        const total_pending_amount_get = pending_transactions_get.length>0 ? pending_transactions_get.map(item=>item.amount).reduce((prev,cur)=>prev+cur) : 0
        
        const total_balance = wallet_balance + total_pending_amount_get - total_pending_amount_spend
        if(total_balance < transaction.amount) throw new Error("Not enough balance.")

        this.pending_tansactions.push(transaction)
    }

    get_address_balance(address){
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

            if(!current_block.has_valid_transactions()) return false

            if(current_block.hash !== current_block.calculate_hash()) return false
            
            if(current_block.previousHash !== previous_block.hash) return false
            
        }
        return true
    }

    giveaway_coin(giveaway_address, amount){
        const block = new Block([new Transaction(null, giveaway_address, amount)])
        block.previousHash = this.get_latest_block().hash
        block.mine_block(this.nzeros)

        console.log("Giveaway coin")
        this.chain.push(block)

    }

    get_transactions_for_wallet(wallet){
        const transactions = []

        this.chain.forEach(block=>block.transactions.forEach(transaction=>{
            if(transaction.from_address === wallet || transaction.to_address === wallet) transactions.push(transaction)
        }))

        return transactions
    }
}

module.exports = Blockchain