
<template>
  <div>
    <!--welcome image-->
    <div style="width: 100%; max-width: 120px; margin: 30px auto;">
      <img src="@/assets/join-header.svg" style="width: 100%">
    </div>

    <!--header message-->
    
    <div class="my-3">
      <p class="text-center" style="line-height: 3em;">
        <span class="fw-bold">C4'sへようこそ。</span><br>
        C4'sへの入部、歓迎いたします！<br>
        以下のフォームを入力いただいた後、<br>
        各種サービスにご案内します。
      </p>
    </div>
    <!--alerts-->
    <div class="alert alert-secondary small mw-md mx-auto my-5" role="alert">
      Twitterなどのアプリ内ブラウザではなく、Chrome, Safariなどのブラウザアプリで操作してください。
    </div>
    <h6 class="text-center text-danger my-5" v-if="alerted" id="input-alert">
      入力に不備があるようです。各項目を確認してください。
    </h6>
    <!--input form-->
    <div class="mw-md mx-auto">
      <div class="mb-3">
        <h6>お名前(フルネーム)</h6>
        <input class="form-control" type="text" id="name" v-model="name">
        <p class="mb-0 text-danger text-end small" id="name-alert">空白は不要です</p>
      </div>
      <div class="mb-3">
        <h6>お名前(よみがな)</h6>
        <input class="form-control" type="text" id="nameKana" v-model="nameKana">
        <p class="mb-0 text-danger text-end small" id="nameKana-alert">空白は不要です</p>
      </div>
      <div class="mb-3">
        <h6>ニックネーム</h6>
        <input class="form-control" type="text" id="nickname" v-model="nickname">
      </div>
      <div class="mb-3">
        <h6>性別</h6>
        <div class="btn-group w-100" role="group">
          <input type="radio" class="btn-check" name="genderRadio" id="gender-man" autocomplete="off" v-model="sex">
          <label class="btn btn-outline-secondary" for="gender-man">男性</label>
          <input type="radio" class="btn-check" name="genderRadio" id="gender-woman" autocomplete="off" v-model="sex">
          <label class="btn btn-outline-secondary" for="gender-woman">女性</label>
          <input type="radio" class="btn-check" name="genderRadio" id="gender-other" autocomplete="off" v-model="sex">
          <label class="btn btn-outline-secondary" for="gender-other">その他</label>
        </div>
        <p class="mb-0 text-danger text-end small" id="gender-alert"></p>
      </div>
      <div class="mb-3">
        <h6>生年月日</h6>
        <input class="form-control" type="date" id="birth" v-model="birth">
        <p class="mb-0 text-danger text-end small" id="birth-alert"></p>
      </div>
      <div class="mb-3">
        <h6>大学名</h6>
        <div class="btn-group w-100" role="group">
          <input type="radio" class="btn-check" name="belongRadio" id="belong-tus" @click="tab_tus" autocomplete="off" checked>
          <label class="btn btn-outline-secondary" for="belong-tus">東京理科大学</label>
          <input type="radio" class="btn-check" name="belongRadio" id="belong-other" @click="tab_other" autocomplete="off">
          <label class="btn btn-outline-secondary" for="belong-other">その他</label>
        </div>
      </div>
      <div class="mb-3" id="department-tab" v-if="tus">
        <h6>所属学科</h6>
        <select class="form-select" id="department" v-model="departmentIndex">
          <option value="0">理学部第一部 数学科</option>
          <option value="1">理学部第一部 物理学科</option>
          <option value="2">理学部第一部 化学科</option>
          <option value="3">理学部第一部 応用数学科</option>
          <option value="4">理学部第一部 応用化学科</option>
          <option value="5">工学部 建築学科</option>
          <option value="6">工学部 工業化学科</option>
          <option value="7">工学部 電気工学科</option>
          <option value="8">工学部 情報工学科</option>
          <option value="9">工学部 機械工学科</option>
          <option value="10">薬学部 薬学科</option>
          <option value="11">薬学部 生命創薬科学科</option>
          <option value="12">創域理工学部 数理科学科</option>
          <option value="13">創域理工学部 先端物理学科</option>
          <option value="14">創域理工学部 情報計算科学科</option>
          <option value="15">創域理工学部 生命生物科学科</option>
          <option value="16">創域理工学部 建築学科</option>
          <option value="17">創域理工学部 先端化学科</option>
          <option value="18">創域理工学部 電気電子情報工学科</option>
          <option value="19">創域理工学部 経営システム工学科</option>
          <option value="20">創域理工学部 機械航空宇宙工学科</option>
          <option value="21">創域理工学部 社会基盤工学科</option>
          <option value="22">先進工学部 電子システム工学科</option>
          <option value="23">先進工学部 マテリアル創成工学科</option>
          <option value="24">先進工学部 生命システム工学科</option>
          <option value="25">先進工学部 物理工学科</option>
          <option value="26">先進工学部 機械デザイン工学科</option>
          <option value="27">経営学部 経営学科</option>
          <option value="28">経営学部 ビジネスエコノミクス学科</option>
          <option value="29">経営学部 国際デザイン経営学科</option>
          <option value="30">理学部第二部 数学科</option>
          <option value="31">理学部第二部 物理学科</option>
          <option value="32">理学部第二部 化学科</option>
          <option selected>--選択してください--</option>
        </select>
        <p class="mb-0 text-danger text-end small" id="department-alert">専攻コースは該当の学科を選択してください</p>
      </div>
      <div class="mb-3" id="department-free-tab" v-if="!tus">
        <h6>大学名・学部・学科・コースなど</h6>
        <input class="form-control" type="text" id="department-free" v-model="departmentFree">
        <p class="mb-0 text-danger text-end small" id="department-free-alert">すべて正式名称で入力してください</p>
      </div>
      <div class="mb-3">
        <h6>学年</h6>
        <input class="form-control" type="number" id="grade" v-model="grade">
        <p class="mb-0 text-danger text-end small" id="grade-alert"></p>
      </div>
      <div class="mb-3">
        <h6>学籍番号</h6>
        <input class="form-control" type="text" id="studentNumber" v-model="studentNumber">
        <p class="mb-0 text-danger text-end small" id="studentNumber-alert"></p>
      </div>
      <div class="mb-3">
        <h6>電話番号</h6>
        <input class="form-control" type="tel" id="phoneNumber" v-model="phoneNumber">
        <p class="mb-0 text-danger text-end small" id="phoneNumber-alert">ハイフン(-)は不要</p>
      </div>
      <div class="mb-3">
        <h6>自己紹介</h6>
        <textarea class="form-control" type="tel" id="detail" v-model="detail"></textarea>
        <p class="mb-0 text-danger text-end small" id="detail-alert">過去の制作経験や楽しみなことなど、何でもどうぞ！</p>
      </div>
      <div class="mb-3">
        <h6>C4's会則</h6>
        <ClubRule />
      </div>
    </div>
    <!--enter-->
    <div class="mw-sm mx-auto mb-5">
      <div class="w-75 mx-auto rounded-pill text-center pointer hover my-3" :class="[ agree ? 'bg-dimgrey' : 'bg-black' ]" style="line-height: 3em; color: white;" id="agree-btn" @click="agreed">同意する</div>
      <div class="w-75 mx-auto rounded-pill text-center               my-3" :class="[{ 'pointer hover': agree }, agree ? 'bg-c4s-light' : 'bg-c4s-verylight']" style="line-height: 3em;" :style="{ color: agree ? 'white' : 'dimgray' }" id="upload-btn" @click="upload">入部する</div>
    </div>
  </div>

  <!--保存していますオーバーレイ-->
  <div id="saving" style="position: fixed; left: 0; top: 0; width: 100%; height: 100%; background-color: white; z-index: 2147483647;" v-if="saving">
    <div style="width: 100%; max-width: 120px; margin: 30px auto;">
      <!-- <img src="/img/loading.svg" style="width: 100%"> -->
    </div>
    <h5 class="mt-3 text-center text-primary">部員登録しています…</h5>
    <div class="text-center mt-5">
      <div class="spinner-grow" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
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
  import { getDatabase, ref, get } from 'firebase/database'
  import ClubRule from '@/components/ClubRule.vue';
  // 学部リスト
  const departmentList = {
          0:"理学部第一部 数学科",
          1:"理学部第一部 物理学科",
          2:"理学部第一部 化学科",
          3:"理学部第一部 応用数学科",
          4:"理学部第一部 応用科学科",
          5:"工学部 建築学科",
          6:"工学部 工業化学科",
          7:"工学部 電気工学科",
          8:"工学部 情報工学科",
          9:"工学部 機械工学科",
          10:"薬学部 薬学科",
          11:"薬学部 生命創薬科学科",
          12:"創域理工学部 数理化学科",
          13:"創域理工学部 先端物理学科",
          14:"創域理工学部 情報計算科学科",
          15:"創域理工学部 生命生物科学科",
          16:"創域理工学部 建築学科",
          17:"創域理工学部 先端化学科",
          18:"創域理工学部 電気電子情報工学科",
          19:"創域理工学部 経営システム工学科",
          20:"創域理工学部 機械航空宇宙工学科",
          21:"創域理工学部 社会基盤工学科",
          22:"先進工学部 電子システム工学科",
          23:"先進工学部 マテリアル創成工学科",
          24:"先進工学部 生命システム工学科",
          25:"先進工学部 物理工学科",
          26:"先進工学部 機械デザイン工学科",
          27:"経営学部 経営学科",
          28:"経営学部 ビジネスエコノミクス学科",
          29:"経営学部 国際デザイン経営学科",
          30:"理学部第二部 数学科",
          31:"理学部第二部 物理学科",
          32:"理学部第二部 化学科",
          33:"無選択"
          
  }


  export default {
    components: {
      ClubRule
    },
    name: 'JoinForm',
    data() {
      return {
        pagename: '入部手続き',
        departmentList: departmentList,
        alerted: false,
        tus: true,
        loading: false,
        name: '',
        nameKana: '',
        nickname: '',
        sex: '',
        birth: '',
        department: '',
        departmentIndex:33,
        departmentFree: '',
        grade: 1,
        studentNumber: '',
        phoneNumber: '',
        detail: '',
        agree: false,
        saving: false,
        firebaseDb: null,
        user: null,
      }
    },
    methods: {
      agreed() {
        this.agree = true
      },
      upload(){
        if(!this.agree) { alert("会則に同意されない場合は入部できません"); return; }
        // departmentIndexをdepartmentに変換
        this.department = departmentList[this.departmentIndex]
        console.log(departmentList[this.departmentIndex])
        const data = {
        name: this.name,
        nameKana: this.nameKana,
        nickname: this.nickname,
        sex: this.sex,
        birth: this.birth,
        department: this.tus === true ? this.department : this.departmentFree,
        departmentIndex: this.tus === true ? this.departmentIndex : -1,
        grade: Number(this.grade),
        studentNumber: this.studentNumber,
        phoneNumber: this.phoneNumber,
        detail: this.detail,
        role: "new",
        time: new Date().getTime(),
        point: 0,
      };
      
      // 不備チェック
      try {
        if (!data.name) {throw new Error("name is null"); }
        
        if (!data.nameKana) {throw new Error("nameKana is null"); }
        
        if (!data.sex) {throw new Error("gender is not selected"); }
        
        if (!data.birth) {throw new Error("birth is null"); }
        
        if (this.belong === 'tus' && data.departmentIndex === 33) {throw new Error("department is null"); }
        
        if (this.belong === 'other' && !data.department) {throw new Error("department is null"); }
        
        if (!(data.grade > 0)) {throw new Error("undefined grade"); }
        
        if (!data.studentNumber) {throw new Error("student number is null"); }
        
        if (!data.phoneNumber) {throw new Error("phone number is null"); }
        
        if (!data.detail) {throw new Error("detail is null"); }
      } catch (err) {
        this.alerted = true;
        window.scroll({ top: 0 });
        console.error(err);
        return;
      }
      
      // アップロード開始。保存中オーバーレイを表示
      this.saving = true;
      if(location.hostname === "localhost") {
        console.table(data);
        setTimeout(() => {
          window.location.href = "/procedure/welcome/";
        }, 6000);
      } else {
        set(ref(this.firebaseDb, "users/" + this.user.uid), data)
        .then(() => {
          return push(ref(this.firebaseDb, "notice"), {
            title : "新規部員が登録されました！",
            content : `${data.department} ${data.grade}年生の${data.name}さんが部員登録しました！`,
            target : "admin",
            time : new Date().getTime(),
            dead : new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
            link : "/control",
          });
        })
        .then(() => {
          setTimeout(() => {
            window.location.href = "/procedure/welcome/";
          }, 6000);
        })
        .catch((err) => {
          console.error(err);
        });
      }
      },
      tab_tus(){
        this.tus = true
      },
      tab_other(){
        this.tus = false
      }
    },
    mounted() {
      const firebaseConfig = {
      apiKey: "AIzaSyBE60G8yImWlENWpCnQZzqqVUrwWa_torg",
      authDomain: "c4s-portal.firebaseapp.com",
      databaseURL: "https://c4s-portal-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "c4s-portal",
      storageBucket: "c4s-portal.appspot.com",
      messagingSenderId: "863775995414",
      appId: "1:863775995414:web:82eb9557a13a099dfbe737",
      measurementId: "G-K2SR1WSNRC"
      };

      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);
      const auth = getAuth();

      var user = {};

//ユーザー情報の取得
    onAuthStateChanged(auth, (us) => {
          user = us;
          window.scroll({ top : 0 });

          get(ref(db, "users/" + user.uid)).then((snapshot) =>{
          //部員登録済みはバイバイ
          if(snapshot.val()) {
            get(ref(db, "admin-users/" + user.uid)).then((snapshot) => {
          //ローカルホストなら続行
            if(location.hostname == "localhost") { start (); }
            //ローカルホストじゃなくても管理者アカウントなら続行
            else if(snapshot.val()) { start(); }
            //どっちの条件も満たしてなければバイバイ
            else {
              alert("既に入部手続きを終えています。部員情報の更新は、アカウント画面からお願いします。");
              window.location.href = "/mypage";
            }
            })
            }
            else { start (); }
          });
          });
      function start() {
      document.getElementById("phoneNumber").value = user.phoneNumber
      document.getElementById("grade").value = 1;
      }
    }
  }
  </script>
  
  <style>
.bg-black {
background:black;
}
.bg-dimgrey {
background:dimgrey;
}
.bg-c4s-verylight {
background: #FFDFCF;
}

  </style>