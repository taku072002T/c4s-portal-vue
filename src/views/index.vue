<template>
  <h1 class="mt-5 mb-5 text-center">{{ pagename }}</h1>

  <div class="text-center">
    <h5>ようこそ、C4'sPortal2024へ。</h5>
    <p>
      Vue.jsを使った新しいPortal。<br />
      現在開発中です。
    </p>
  </div>
</template>

<script>
export default {
  name: 'TopPage',
  data() {
    return {
      pagename: 'トップ'
    }
  }
}
</script>

<style></style>
