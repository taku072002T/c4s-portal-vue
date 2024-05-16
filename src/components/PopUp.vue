<template>
  <div class="background" v-if="open">
    <div class="popup">
      <div class="box">
        <slot />
      </div>
      <div class="mt-3 text-center text-white pointer closebtn" @click="$emit('close')">
        <h1 class="bi bi-x-lg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopUp',
  props: ['open'],
  emits: ['close']
}
</script>

<style>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 80%;
  max-width: 360px;
  margin: auto;
}
.box {
  background: white;
  padding: 10px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
  border-radius: 3px;
}
</style>
