<script setup>
import { ref, onMounted } from 'vue'
import { ethers, utils } from 'ethers'
import abi from '../../contracts/abi.json'

defineProps({
  msg: String
})

let contract = {}

const amount = ref("0")
const contractName = ref("")
const balance = ref("")
const myBalance = ref("")
const txHash = ref("")

onMounted(async()=> {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const account = await provider.getSigner().getAddress()

  contract = new ethers.Contract(
    '0x51dcF597d7286178d114357775433227f73B7cD0',
    abi,
    provider.getSigner()
  )

  contractName.value = await contract.name()
  balance.value = utils.formatEther(await contract.balance())
  myBalance.value = utils.formatEther(await contract.balances(account))
})


const deposit = async () => {
  const tx = await contract.deposit({value: utils.parseEther(amount.value)})
  txHash.value = tx.hash
  await tx.wait()
  window.location.reload()
}

const withdraw = async () => {
  const tx = await contract.withdraw(utils.parseEther(amount.value))
  txHash.value = tx.hash
  await tx.wait()
  window.location.reload()
}
</script>

<template>
  <h1>Name: {{ contractName }}</h1>
  <h1>Total Balance: {{ balance }}</h1> 
  <h1>My Balance: {{ myBalance }}</h1>
  <h1 style="color:red">{{ txHash }}</h1>
  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <input v-model="amount" />
  <br/>
  <button type="button" @click="deposit">Deposit</button>
  <button type="button" @click="withdraw">Withdraw</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
