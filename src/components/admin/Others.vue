<template>
  <div class="leftSide">
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="maintenanceSwitcher">
      <label class="form-check-label" for="maintenanceSwitcher">メンテナンスの切り替え</label>
    </div>
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
    methods: {
      users() {
        return this.$store.state.users
      }
    },

    created(){
      if(this.$store.state.maintenanceState){
        $("#maintenanceSwitcher").prop("checked", true);
      }      
    },

    mounted(){
      $("#maintenanceSwitcher").on("click", function() {
        const isChecked = !$(this).prop("checked");
        console.log(isChecked)

        if(!isChecked){
          const checkUSER = window.confirm("メンテナンスモードを開始しますか？");

          if(checkUSER){
            alert("メンテナンスモードを開始しました。");
          } else {
            $("#maintenanceSwitcher").prop("checked", isChecked);
          }
        } else {
          const checkUSER = window.confirm("メンテナンスモードを終了しますか？");

          if(checkUSER){
            alert("メンテナンスモードを終了しました。");
          } else {
            $("#maintenanceSwitcher").prop("checked", isChecked);
          }
        }
        
      })
    }
  }
</script>

<style>
  .leftSide{
    margin-left: 5%;
    margin-top: 5%;
  }
</style>