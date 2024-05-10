<template>
  <!-- 広告カルーセル -->
  <h1>Hello, MainAd.vue!</h1>
  <div id="AdCarousel" class="carousel slide">
    <div class="carousel-inner">
      <div class="carousel-item" v-for="(Ad, i) in Ads" :key="i" :class="[i == 0 ? 'active': '']">
        <img :src="require(Ad)" class="d-block w-100" :alt="i">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#AdCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#AdCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "MainAd",
  data() {
    return {
      Ads: [
        '../assets/Ad/ad.JPG',
        '../assets/Ad/ad4.jpg',
        '../assets/Ad/ad5.jpg',
        '../assets/Ad/ad6.jpg'
      ]
    }
  },
  methods: {
    AdURL (filename) { return new URL(`../../public/Ad/${filename}`, import.meta.url).href }
  }
}
</script>

<style>

</style>