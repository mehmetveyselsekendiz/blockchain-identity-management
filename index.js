const Blockchain = require("./src/Blockchain")
const Transaction = require("./src/Transaction")
const ec = require("./src/Keygenerator")
const {course1_key, course2_key, student_key} = require('./generatedKey')

const distance_education = new Blockchain()

const st_key = ec.keyFromPrivate(student_key.private_key)
const st_wallet = st_key.getPublic('hex')

distance_education.giveaway_coin(st_wallet, 100)

const join_course1 = new Transaction(st_wallet, course1_key.public_key, 25)
join_course1.sign_transaction(st_key)
distance_education.add_transaction(join_course1)

const join_course2 = new Transaction(st_wallet, course2_key.public_key, 35)
join_course2.sign_transaction(st_key)
distance_education.add_transaction(join_course2)

console.log("miner starts...")
distance_education.mine_pending_tansactions("miner")

console.log("student1 balance", distance_education.get_address_balance(st_wallet))
console.log("student1 track", distance_education.get_transactions_for_wallet(st_wallet))
console.log("Is blockchain is valid? " + distance_education.is_chain_valid())