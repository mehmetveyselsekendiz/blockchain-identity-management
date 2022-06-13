const Blockchain = require("./src/Blockchain")
const Transaction = require("./src/Transaction")
const ec = require("./src/Keygenerator")
const {course1_key, admin_key, student_key, course2_key} = require('./generatedKey')

const distance_education = new Blockchain()

const ad_key = ec.keyFromPrivate(admin_key.private_key)
const ad_wallet = ad_key.getPublic('hex')

const st_key = ec.keyFromPrivate(student_key.private_key)
const st_wallet = st_key.getPublic('hex')

// Register a student
const register_student = new Transaction(ad_wallet, null, 0, [], st_wallet)
register_student.sign_transaction(ad_key)
distance_education.add_operation(register_student)
distance_education.mine_pending_tansactions("miner")
console.log('register', distance_education.get_registration(st_wallet))

// Authorize the student for Course 1
const authorize_student = new Transaction(ad_wallet, st_wallet, 0, [course1_key.public_key], "")
authorize_student.sign_transaction(ad_key)
distance_education.add_operation(authorize_student)
distance_education.mine_pending_tansactions("miner")
console.log('authorization', distance_education.get_course_authority(st_wallet))

// Student joins Course 1
const join_course1 = new Transaction(st_wallet, course1_key.public_key, 0, [], "")
join_course1.sign_transaction(st_key)
distance_education.add_operation(join_course1)
distance_education.mine_pending_tansactions("miner")

// Student tries to join Course 2 --- Throws error because the student has no authorization for Course 2
// const join_course2 = new Transaction(st_wallet, course2_key.public_key, 0, [], "")
// join_course2.sign_transaction(st_key)
// distance_education.add_operation(join_course2)
// distance_education.mine_pending_tansactions("miner")

console.log("student1 track", distance_education.get_transactions_for_wallet(st_wallet))
console.log("Is blockchain is valid? " + distance_education.is_chain_valid())