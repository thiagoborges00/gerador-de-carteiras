const bitcoin = require('bitcoinjs-lib')
const bip32 = require('bip32')
const bip39 = require('bip39')

const network = bitcoin.networks.testnet
const path = `m/49'/1'/0'/0`
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)
let root = bip32.fromSeed(seed, network)

let account = root.derivePath(path)
let node = account.derive(0).derive(0)
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
}).address

console.log("Building Wallet \n:Address ", btcAddress)
console.log("Private Key: ",node.toWIF())
console.log("Seed: ", mnemonic)
console.log("\nDone\n")
