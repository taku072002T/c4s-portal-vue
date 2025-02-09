<template>
    <h1 class="mt-5 mb-5 text-center">{{ pagename }}</h1>
    <div class="d-flex">
      <div class="col-md-6 col-xl-4 p-2">
        <div class="bg-white rounded-3 p-4 shadow-sm h-100">
          <h5 class="mb-0">2024年度幹部一覧</h5>
          <p class="mb-0 text-secondary small">4月1日</p>
          <br />
          <p class="mb-0">代表の今井です。2024年度の幹部をご紹介します！</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Procedure',
    data() {
      return {
        pagename: '各種登録'
      }
    }
  }
  </script>
  
  <style>
  </style>