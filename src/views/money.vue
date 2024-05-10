<template>
  <h1 class="mt-5 text-center">{{ pagename }}</h1>
</template>

<script>
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, get, set } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyBE60G8yImWlENWpCnQZzqqVUrwWa_torg',
  authDomain: 'c4s-portal.firebaseapp.com',
  databaseURL: 'https://c4s-portal-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'c4s-portal',
  storageBucket: 'c4s-portal.appspot.com',
  messagingSenderId: '863775995414',
  appId: '1:863775995414:web:82eb9557a13a099dfbe737',
  measurementId: 'G-K2SR1WSNRC'
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export default {
  name: 'MoneyPage',
  data() {
    return {
      pagename: '部費通帳'
    }
  },
  created() {}
}
</script>

<style></style>
