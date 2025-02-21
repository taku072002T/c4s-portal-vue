<template>
<div class="my-5 w-25 mw-xs mx-auto"><img src="../assets/logoAlpha.png" class="w-100"></div>

<h4 class="font-kaisei-tokumin-eb text-center mb-5">入部手続き完了!</h4>

<p class="text-center mb-5" style="line-height: 3em;">
  これであなたもC4'sの一員です<br>
  これからどうぞよろしくお願いします
</p>

<div class="mw-md mx-auto bg-white shadow-sm rounded-md p-3">
  <h5 class="text-center mb-3">Discordに参加しよう</h5>
  <p style="text-align: justify;">
    　C4'sでは、Discordを連絡手段として利用しています。
    お手数ですが、Discordアカウントを持っていない方はアカウントの作成もお願いします。
  </p>
  <div class="bg-dark text-white text-center w-100 rounded-sm hover pointer" style="line-height: 3em;" onclick="joinDiscord()">
    Discordサーバー「C4's」に参加
  </div>
</div>

<h3 class="text-center bi bi-caret-down-fill my-4"></h3>

<div class="mw-md mx-auto bg-white shadow-sm rounded-md p-3">
  <h5 class="text-center mb-3">トップページへ</h5>
  <p class="text-center">
    以下のページが解放されました！<br>
    トップページのメニューからアクセスしてください。
  </p>
  <div class="w-50 mx-auto gap-2 text-center mb-3">
    <div class="shadow-sm border w-100 rounded-pill mb-1" style="line-height: 2em;">部費</div>
    <div class="shadow-sm border w-100 rounded-pill mb-1" style="line-height: 2em;">メンバー紹介</div>
    <div class="shadow-sm border w-100 rounded-pill mb-1" style="line-height: 2em;">場所予約状況照会</div>
  </div>
  <div class="bg-dark text-white text-center w-100 rounded-sm hover pointer" style="line-height: 3em;" onclick="movetop()">
    トップページへ
  </div>
</div>

<p class="text-center my-5" id="showmore"><a class="text-secondary my-5 pointer" onclick="showmore()">さらに見る</a></p>

<div id="more" class="mb-5 hide">

  <h3 class="text-center bi bi-caret-down-fill my-4"></h3>

  <div class="mw-md mx-auto bg-white shadow-sm rounded-md p-3">
    <h5 class="text-center mb-3">esaにログインしよう</h5>
    <p style="text-align: justify;">
      　esaは、部会での議事録などを管理するシステムです。ご自身のGoogleアカウントでログインしておいてください。
    </p>
    <div class="bg-dark text-white text-center w-100 rounded-sm hover pointer" style="line-height: 3em;" onclick="joinEsa()">
      esa「c4s」に参加
    </div>
  </div>

  <h3 class="text-center bi bi-caret-down-fill my-4"></h3>

  <div class="mw-md mx-auto bg-white shadow-sm rounded-md p-3">
    <h5 class="text-center mb-3">ガクセイ協賛にログインしよう</h5>
    <p style="text-align: justify;">
      　学生協賛に参加すると部費に還元されます。積極的に活動に参加したい方はご協力をお願いします。
    </p>
    <div class="bg-dark text-white text-center w-100 rounded-sm hover pointer" style="line-height: 3em;" onclick="joinKyosan()">
      ガクセイ協賛に参加
    </div>
  </div>
</div>

<!--
  <div class="container">
      <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none fs-5">
          <img src="../img/logo.png" width="38px" class="rounded-3"> C4's Portal
        </a>
  
        <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li><a href="../" class="nav-link px-2 mx-1"><svg viewBox="0 0 16 16" x="0" y="0" width="24px" height="24px"><use class="text-dark" xlink:href="#house"></use></svg></a></li>
          <li><a href="../event" class="nav-link px-2 mx-1"><svg viewBox="0 0 16 16" x="0" y="0" width="24px" height="24px"><use class="text-dark" xlink:href="#calendar"></use></svg></a></li>
          <li><a href="../equips" class="nav-link px-2 mx-1"><svg viewBox="0 0 16 16" x="0" y="0" width="24px" height="24px"><use class="text-dark" xlink:href="#box"></use></svg></a></li>
          <li><a href="../money" class="nav-link px-2 mx-1"><svg viewBox="0 0 16 16" x="0" y="0" width="24px" height="24px"><use class="text-dark" xlink:href="#cash"></use></svg></a></li>
          <li><a href="../wallet" class="nav-link px-2 mx-1"><svg viewBox="0 0 16 16" x="0" y="0" width="24px" height="24px"><use class="text-dark" xlink:href="#wallet"></use></svg></a></li>
          <li><a href="../store" class="nav-link px-2 mx-1"><svg viewBox="0 0 16 16" x="0" y="0" width="24px" height="24px"><use class="text-dark" xlink:href="#basket"></use></svg></a></li>
          <li><a href="../procedure" class="nav-link px-2 mx-1"><svg viewBox="0 0 16 16" x="0" y="0" width="24px" height="24px"><use class="text-secondary" xlink:href="#textFile"></use></svg></a></li>
        </ul>
  
        <div class="col-md-3 text-end" id="account">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </header>
  </div>

  <div class="container">
    <h2 class="fs-2 fw-normal">入部手続き</h2>
    <p class="text-secondary">C4'sへようこそ！</p>

    <div class="mb-4">
      <h3>2. Discordに参加しよう</h3>
      <p>C4'sでは、メインの連絡手段としてDiscordを利用しています。<br>
        お手数ですが、Discordアカウントを持っていない方は、ここでアカウントの作成もお願いします。</p>
      <a href="https://discord.gg/KkFaQfA4uT" class="btn btn-outline-dark">Discordサーバー「C4's」に参加</a>
    </div>
    
    <div class="mb-4">
      <h3>3. esaにログインしよう</h3>
      <p>C4'sでは、文書管理ツールとしてesaを利用しています。ご自身のGoogleアカウントでログインしてください。</p>
      <a href="https://c4s.esa.io/team/invitations/member-bdea0c194425635198c6ca6e739e0613" class="btn btn-outline-dark">esa「c4s」に参加</a>
    </div>

    <div class="mb-4">
      <h3>4. ガクセイ協賛にログインしよう</h3>
      <p>C4'sでは、部費の調達手段の1つとして、「ガクセイ協賛」を活用しています。こちらは強制ではありませんが、ぜひ協賛プログラムへの参加にご協力ください。</p>
      <a href="https://www.gakuseikyosan.com/member_regist/step1?is_group=2&in_code=zW8wxXSe" class="btn btn-outline-dark">ガクセイ協賛に参加</a>
    </div>
    

      <div class="text-end">
          <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="me-1 bi bi-door-open" viewBox="0 0 16 16">
            <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
            <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"/>
          </svg>入部</button>
      </div>
  </div>

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">手続き完了</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
              <img src="../icons/check2-circle.svg" width="80px" class="mb-3">
              <h5 class="text-center py-3">ありがとうございました！</h5>
              <p>これからどうぞよろしくお願いします。</p>
          </div>
          <div class="modal-footer">
              <a type="button" class="btn btn-dark" href="../">終了</a>
          </div>
      </div>
  </div>
-->
  </template>
  
  <script>
  window.joinDiscord = function () { location.href = "https://discord.gg/KkFaQfA4uT"; }
  window.joinKyosan = function () { location.href = "https://www.gakuseikyosan.com/member_regist/step1?is_group=2&in_code=zW8wxXSe"; }
  window.joinEsa = function () { location.href = "https://c4s.esa.io/team/invitations/member-bdea0c194425635198c6ca6e739e0613"; }
  window.movetop = function () {
      if (location.hostname == "localhost") {
        location.href = "/";
      }
      else {
        location.href = "/";
      }
    }
    window.showmore = function () {
    document.getElementById("more").style.display = "block"; 
    document.getElementById("showmore").style.display = "none";
  }
  export default {
    name: 'WelcomePage',
    data() {
      return {
        pagename: 'Welcome!'
      }
    }
  }
  </script>
  
  <style></style>
  