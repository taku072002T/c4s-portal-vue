<template>
  <div>
    <h1 class="mt-5 mb-5 text-center">{{ pagename }}</h1>
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
    <h6 class="text-center text-danger my-5 hide" id="input-alert">
      入力に不備があるようです。各項目を確認してください。
    </h6>
    <!--input form-->
    <div class="mw-md mx-auto">
      <div class="mb-3">
        <h6>お名前(フルネーム)</h6>
        <input class="form-control" type="text" id="name">
        <p class="mb-0 text-danger text-end small" id="name-alert">空白は不要です</p>
      </div>
      <div class="mb-3">
        <h6>お名前(よみがな)</h6>
        <input class="form-control" type="text" id="nameKana">
        <p class="mb-0 text-danger text-end small" id="nameKana-alert">空白は不要です</p>
      </div>
      <div class="mb-3">
        <h6>ニックネーム</h6>
        <input class="form-control" type="text" id="nickname">
      </div>
      <div class="mb-3">
        <h6>性別</h6>
        <div class="btn-group w-100" role="group">
          <input type="radio" class="btn-check" name="genderRadio" id="gender-man" autocomplete="off">
          <label class="btn btn-outline-secondary" for="gender-man">男性</label>
          <input type="radio" class="btn-check" name="genderRadio" id="gender-woman" autocomplete="off">
          <label class="btn btn-outline-secondary" for="gender-woman">女性</label>
          <input type="radio" class="btn-check" name="genderRadio" id="gender-other" autocomplete="off">
          <label class="btn btn-outline-secondary" for="gender-other">その他</label>
        </div>
        <p class="mb-0 text-danger text-end small" id="gender-alert"></p>
      </div>
      <div class="mb-3">
        <h6>生年月日</h6>
        <input class="form-control" type="date" id="birth">
        <p class="mb-0 text-danger text-end small" id="birth-alert"></p>
      </div>
      <div class="mb-3">
        <h6>大学名</h6>
        <div class="btn-group w-100" role="group">
          <input type="radio" class="btn-check" name="belongRadio" id="belong-tus" autocomplete="off" checked>
          <label class="btn btn-outline-secondary" for="belong-tus">東京理科大学</label>
          <input type="radio" class="btn-check" name="belongRadio" id="belong-other" autocomplete="off">
          <label class="btn btn-outline-secondary" for="belong-other">その他</label>
        </div>
      </div>
      <div class="mb-3" id="department-tab">
        <h6>所属学科</h6>
        <select class="form-select" id="department">
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
      <div class="mb-3 hide" id="department-free-tab">
        <h6>大学名・学部・学科・コースなど</h6>
        <input class="form-control" type="text" id="department-free">
        <p class="mb-0 text-danger text-end small" id="department-free-alert">すべて正式名称で入力してください</p>
      </div>
      <div class="mb-3">
        <h6>学年</h6>
        <input class="form-control" type="number" id="grade">
        <p class="mb-0 text-danger text-end small" id="grade-alert"></p>
      </div>
      <div class="mb-3">
        <h6>学籍番号</h6>
        <input class="form-control" type="text" id="studentNumber">
        <p class="mb-0 text-danger text-end small" id="studentNumber-alert"></p>
      </div>
      <div class="mb-3">
        <h6>電話番号</h6>
        <input class="form-control" type="tel" id="phoneNumber">
        <p class="mb-0 text-danger text-end small" id="phoneNumber-alert">ハイフン(-)は不要</p>
      </div>
      <div class="mb-3">
        <h6>自己紹介</h6>
        <textarea class="form-control" type="tel" id="detail"></textarea>
        <p class="mb-0 text-danger text-end small" id="detail-alert">過去の制作経験や楽しみなことなど、何でもどうぞ！</p>
      </div>
      <div class="mb-3">
        <h6>C4's会則</h6>
        <ClubRule />
      </div>
    </div>
    <!--enter-->
    <div class="mw-sm mx-auto mb-5">
      <div class="w-75 mx-auto rounded-pill text-center pointer hover my-3" style="line-height: 3em; background: #FF7F00; color: white;" id="DOUI-btn" onclick="DOUI()">同意する</div>
      <div class="w-75 mx-auto rounded-pill text-center               my-3" style="line-height: 3em; background: #FFDFCF; color: dimgray;" id="upload-btn" onclick="upload()">入部する</div>
    </div>
  </div>

  <!--保存していますオーバーレイ-->
  <div id="saving" style="position: fixed; left: 0; top: 0; width: 100%; height: 100%; background-color: white; z-index: 2147483647; display: none;">
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
  import ClubRule from '@/components/ClubRule.vue';
  export default {
    components: {
      ClubRule
    },
    name: 'JoinForm',
    data() {
      return {
        pagename: '入部手続き'
      }
    }
  }
  </script>
  
  <style>


  </style>