<template>
  <div class="leftSide" v-if="this.$store.state.status == 'admin'">
    <h5>メンテナンスの設定</h5>
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="maintenanceSwitcher">
      <label class="form-check-label" for="maintenanceSwitcher">メンテナンスの切り替え</label>
    </div>
  </div>

  <div class="leftSide" v-else>
    <h5 class="warn">管理者権限がないため、このページは閲覧できません。</h5>
  </div>
</template>

<script>
  import { initializeApp } from 'firebase/app'
  import { getDatabase, ref, onValue, set, update, remove } from 'firebase/database'

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
    name: 'Others',

    mounted(){
      if(this.$store.state.maintenanceState){
        $("#maintenanceSwitcher").prop("checked", true);
      }

      $("#maintenanceSwitcher").on("click", () => {
        // isCheckedはこのイベントが実行されるときには既にクリック後のboolになっているため、変更前を保存するために!が付いている
        const isChecked = !$(this).prop("checked");

        if(this.$store.state.status == 'admin'){
          const maintenancePath = 'systemData/maintenance';

          if(!isChecked){
            const checkUSER = window.confirm("メンテナンスモードを開始しますか？");

            if(checkUSER){
              this.databaseChange(maintenancePath, !isChecked)
              alert("メンテナンスモードを開始しました。");
            } else {
              $("#maintenanceSwitcher").prop("checked", isChecked);
            }
          } else {
            const checkUSER = window.confirm("メンテナンスモードを終了しますか？");

            if(checkUSER){
              this.databaseChange(maintenancePath, !isChecked)
              alert("メンテナンスモードを終了しました。");
            } else {
              $("#maintenanceSwitcher").prop("checked", isChecked);
            }
          }
        } else {
          alert('アクセス権限がないため、変更できません。');
          $("#maintenanceSwitcher").prop("checked", isChecked);
        }
      })
    },

    methods: {
      databaseChange(path, content){
        set(ref(db, path), content)
          .then(() => {
            console.log("データが更新されました");
          })
          .catch((error) => {
            console.log("error: " + error);
          });
      }
    }
  }
</script>

<style>
  .leftSide{
    margin-left: 5%;
    margin-top: 5%;
  }

  .warn{
    color: red;
    font-weight: bold;
  }
</style>