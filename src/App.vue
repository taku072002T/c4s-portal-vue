<template>
  <div v-if="st == 'loading'">
    <LoadingComp />
  </div>
  <div v-else-if="st == 'logout'">
    <LoginForm @send="login" />
  </div>
  <div v-else-if="st == 'sendedMail'">
    <div class="text-center">
      <h5 class="mt-25vh">メールを送信しました</h5>
      <p>メール内のリンクを開いて認証を完了してください</p>
      <a class="text-secondary mt-5 small" @click="$store.commit('setStatus', 'logout')"
        >再送する</a
      >
    </div>
  </div>
  <div v-else>
    <MainHeader />
    <router-view />
  </div>
</template>

<script>
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink
} from 'firebase/auth'
import { getDatabase, ref, get, onValue } from 'firebase/database'

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
const auth = getAuth(app)
const db = getDatabase(app)

import LoadingComp from './components/LoadingComp.vue'
import LoginForm from './components/LoginForm.vue'
import MainHeader from './components/MainHeader.vue'
import router from '@/router/index.js'


export default {
  name: 'RouteView',
  components: { LoadingComp, LoginForm, MainHeader },
  created() {
    // メールリンク認証
    if (new URLSearchParams(location.search).get('apiKey')) {
      this.$store.commit('setStatus', 'loading')
      this.$store.commit('setStatusMessage', 'メールアドレスを認証中')
      let email = window.localStorage.getItem('email')
      if (!email) {
        email = prompt('メールアドレスを入力してください')
      }
      signInWithEmailLink(auth, email, window.location.href).then(() => {
        location.search = ''
      })
      return
    }
    // ユーザー情報のセット
    onAuthStateChanged(auth, async (snapshot) => {
      this.$store.commit('setUser', snapshot)
      if (this.$store.state.user) {
        this.$store.commit('setStatus', 'loading')
        this.$store.commit('setStatusMessage', '権限情報を読み込み中')
        window.localStorage.setItem('email', this.$store.state.user.email)
        let status = 'login'
        await get(ref(db, `users/${this.$store.state.user.uid}`)).then((snapshot) => {
          this.$store.commit('setC4sUser', snapshot.val())
          if (snapshot.val()) {
            status = 'member'
          } else {
            status = 'stranger'
          }
        })
        await get(ref(db, `admin-users`)).then((snapshot) => {
          if (snapshot.val()[this.$store.state.user.uid]) {
            status = 'admin'
            this.$store.commit('setAdminUsers', snapshot.val())
            get(ref(db, 'users')).then((snapshot) => {
              this.$store.commit('setUsers', snapshot.val())
            })
          }
        })
        this.$store.commit('setStatus', status)

        // メンテナンスをしているかどうかを確認した上で、メンテナンスの処理を行うユーザーに対してメンテナンス状態を保持する
        await get(ref(db, `systemData/maintenance`)).then((snapshot) => {
          if (snapshot.val()) {
            this.$store.commit('setMaintenanceState', true)
            switch(this.$store.state.status){
              case 'admin':
                this.$store.commit('setMaintenance', false)
                break;
              default:
                this.$store.commit('setMaintenance', true)
                break;
            }
          } else {
            this.$store.commit('setMaintenance', false)
            this.$store.commit('setMaintenanceState', false)
          }
        })
      } else {
        this.$store.commit('setStatus', 'logout')
      }
    })
  },
  methods: {
    // サインイン
    login(provider, email) {
      switch (provider) {
        // メールリンク認証
        case 'Email':
          if (!email) {
            alert('メールアドレスが入力されていません')
          } else if (!email.includes('@')) {
            alert('有効なメールアドレスを入力してください')
          } else {
            sendSignInLinkToEmail(auth, email, {
              url: location.href,
              handleCodeInApp: true
            })
              .then(() => {
                window.localStorage.setItem('email', email)
                this.$store.commit('setStatus', 'sendedMail')
              })
              .catch((e) => {
                console.error(e)
                alert(e.message)
              })
          }
          break

        default:
          alert('未設定のプロバイダ')
          break
      }
    },
    go(path) {
      location.href = path
    },
  },

  mounted(){
    const allowedPaths = ['/mypage', '/maintenance'];

    // 読み込み時に自動遷移するシステム、onValueで実装できたのでコメントアウトするが、今後使えるかもしれないので一応残しておく
    // router.beforeEach((to, from, next) => {
    //   const isMaintenanceMode = this.$store.state.maintenance; // store instanceを直接参照
      
    //   if (isMaintenanceMode && !allowedPaths.includes(to.path)) {
    //     // メンテナンスモード中で、許可されていないパスへの遷移の場合
    //     next('/maintenance');
    //   } else {
    //     // それ以外は通常通り遷移を許可
    //     next();
    //   }
    // });


    // systemData/maintenanceの変更を検知
    // マイページまたはメンテナンス画面以外にいるときにメンテナンス状態になるとメンテナンスページに強制移動
    // メンテナンス画面にいるときにメンテナンスモードが終了するとトップに強制移動
    onValue(ref(db, 'systemData/maintenance'), (snapshot) => {
      const maintenanceData = snapshot.val();
      console.log("メンテナンス状態が変更されました:", maintenanceData);

      this.$store.commit('setMaintenanceState', maintenanceData);

      // 管理者以外の場合のみメンテナンス状態を更新
      if (this.$store.state.status !== 'admin') {
        this.$store.commit('setMaintenance', maintenanceData);
        
        // 現在のパスを取得
        const currentPath = router.currentRoute.value.path;

        // メンテナンスモードがオンで、現在の場所が許可されていないパスの場合のみリダイレクト
        if (maintenanceData && !allowedPaths.includes(currentPath)) {
          router.push('/maintenance').catch(err => {
            if (err.name !== 'NavigationDuplicated') {
              throw err;
            }
          });
        } else if (!maintenanceData && currentPath == '/maintenance') {
          router.push('/').catch(err => {
            if (err.name !== 'NavigationDuplicated') {
              throw err;
            }
          });
        }
      }
    });
  },

  computed: {
    st() {
      return this.$store.state.status
    }
  }
}
</script>

<style></style>
