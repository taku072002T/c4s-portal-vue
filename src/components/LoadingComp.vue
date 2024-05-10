<template>
  <div class="mx-auto text-center mt-25vh">
    {{ $store.state.status_msg }}…
    <br />
    <div class="mx-auto my-5 line-loader" />
  </div>
</template>

<script>
export default {
  name: 'LoadingComp'
}
</script>

<style>
.line-loader {
  height: 4px;
  width: 130px;
  --c: no-repeat linear-gradient(var(--c-c4s) 0 0);
  background: var(--c), var(--c), var(--c-c4s-light);
  background-size: 60% 100%;
  animation: l16 3s infinite;
}
@keyframes l16 {
  0% {
    background-position:
      -150% 0,
      -150% 0;
  }
  66% {
    background-position:
      250% 0,
      -150% 0;
  }
  100% {
    background-position:
      250% 0,
      250% 0;
  }
}
</style>
