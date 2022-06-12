// ref: https://www.youtube.com/watch?v=zVqczFZr124
const Blockchain = require("./src/Blockchain")
const Transaction = require("./src/Transaction")

const mvs_coin = new Blockchain()
mvs_coin.create_transaction(new Transaction("user1", "user2", 100))
mvs_coin.create_transaction(new Transaction("user2", "user3", 100))

console.log("miner starts...")
mvs_coin.mine_pending_tansactions("miner")

console.log(JSON.stringify(mvs_coin, null, 4))
console.log("Is blockchain is valid? " + mvs_coin.is_chain_valid())