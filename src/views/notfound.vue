<template>
  <div class="text-center mt-25vh">
    <h5 class="text-danger">このページは存在しません</h5>
    <p class="text-secondary">旧ポータルとはページ名が変更されていますのでご注意ください。</p>
  </div>
  <div
    class="my-3 w-75 mw-sm mx-auto bg-white rounded-1 border text-center py-3 pointer"
    @click="$router.push('/')"
  >
    トップに戻る
  </div>
</template>

<script>
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'

const auth = getAuth()
const provider = new GoogleAuthProvider()

export default {
  name: 'MyPage',
  data() {
    return {
      pagename: 'マイページ',
      status: 'logout'
    }
  },
  created() {},
  methods: {
    login() {
      signInWithPopup(auth, provider).catch((error) => {
        error.message == 'Firebase: Error (auth/unauthorized-domain).'
          ? alert('不正なドメインです')
          : alert(error.message)
      })
    },
    logout() {
      signOut(auth).then(() => {})
    }
  }
}
</script>

<style></style>
