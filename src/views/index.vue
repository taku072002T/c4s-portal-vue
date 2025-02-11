<template>
  <h1 class="mt-5 mb-5 text-center">{{ pagename }}</h1>

  <div class="text-center">
    <div v-if="$store.state.maintenance">
      <h5><strong class="mentenanceMsg">現在、メンテナンス中です。終了までしばらくお待ちください。</strong></h5>
    </div>

    <div v-else>
      <h5>ようこそ、C4'sPortal2024へ。</h5>
      <p>
        Vue.jsを使った新しいPortal。<br />
        現在開発中です。
      </p>
    </div>
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

<style>
 .mentenanceMsg{
  color: rgb(255, 58, 58);
 }
</style>
