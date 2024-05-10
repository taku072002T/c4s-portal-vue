<template>
  <h1 class="my-5 text-center">{{ pagename }}</h1>

  <div>
    <p class="text-center">部員登録・各種サービスのご利用にはログインが必要です</p>
    <div
      class="w-100 mw-sm mx-auto rounded-3 border bg-white p-3 text-center h4 hover pointer"
      @click="logout"
    >
      <i class="bi bi-google"></i> ログアウト
    </div>
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
