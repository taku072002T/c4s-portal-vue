<template>
  <div class="fixed" id="codeform_back"/>
  <div class="fixed">
    <div class="position-relative w-100 h-100" id="codeform_body">
      <div class="position-absolute top-50 start-50 translate-middle w-100 bg-light p-3 shadow text-center mw-md">
        <h3>出席コードを入力</h3>
        <input type="number" class="w-100 text-center h1">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CodeForm',
  data() {
    return {
      answer: ""
    }
  },
  mounted() {
    
  }
}
</script>

<style>
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
}
#codeform_back {
  background: black;
  opacity: 0.5;
  transition: 0.3s;
}
/* #codeform_open:checked ~ #codeform_back {
  opacity: 0.5;
} */
#codeform_body {
  opacity: 1;
}
#codeform_input {
  font-size: 3em;
}
</style>