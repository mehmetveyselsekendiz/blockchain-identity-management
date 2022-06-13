const EC = require('elliptic').ec
const ec = new EC('secp256k1')

const key = ec.genKeyPair();

const public_key = key.getPublic('hex')
//console.log("public-key", public_key)
const private_key = key.getPrivate('hex')
//console.log("private-key", private_key)

module.exports = ec