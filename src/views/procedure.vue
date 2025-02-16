<template>
  <div class="container flex-column d-flex justify-content-center align-items-center gap-1 box" v-if="$route.path == '/procedure/'">
    <div class="card custom-card" style="width: 18rem;" @click="goToJoin">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <i class="bi bi-file-person-fill join-icon"></i>
          <span class="card-title">入部登録</span>
        </div>
        <hr class="divider">
        <p class="card-text">こちらから入部手続きを行ってください。手続きに進むにはボタンをクリックして下さい。</p>
        <hr class="divider">
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>
  
  <script>
  export default {
    name: 'Procedure',
    methods: {
    goToJoin() {
      window.location.href = '/procedure/join'; // クリック時に指定URLへ飛ぶ
    }
  },
    data() {
      return {
        pagename: '各種登録'
      }
    }
  }
  </script>
  
  <style scoped>
.box {
  margin-top:10vh;
  box-shadow: none;
}
.custom-card {
  border: 2px solid black;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;
  cursor: pointer;
}

.custom-card:hover {
  transform: scale(0.95);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #f8f9fa;
}

.join-icon {
  font-size: 1.5rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-left: 10px;
}

.divider {
  border-top: 1px solid #dee2e6;
}

.card-text {
  font-size: 0.9rem;
  color: #6c757d;
}
  </style>