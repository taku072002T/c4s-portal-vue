<template>
  <!-- ヘッダー -->
  <div class="header bg-dark">
    <div class="mw-xxl mx-auto d-flex">
      <!-- トップロゴ -->
      <div class="flex-grow-1 p-3">
        <div class="pointer mw-logo" @click="location.href = `/`">
          <img src="@/assets/portal2024_logo.svg" class="w-100" />
        </div>
      </div>
      <!-- ハンバーガーメニュー（ボタン） -->
      <div v-if="$store.getters.responsive" class="w-100 mw-menu px-3 my-auto pointer">
        <label for="menuBtn" class="mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#FFFFFF"
            class="w-100 bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </label>
      </div>
      <!-- PC用メニュー -->
      <div v-else class="w-auto py-3 ms-auto my-auto text-end d-flex">
        <div v-for="page in pages" :key="page.path">
          <router-link
            v-if="
              $store.state.status == 'admin' ||
              ($store.state.status == 'member' && page.state != 'adminonly') ||
              ($store.state.status == 'stranger' && page.state == 'public')
            "
            class="pointer mx-3 text-decoration-none"
            :to="page.path"
            :style="`color: ${page.state == 'adminonly' ? color.admin : color.public}`"
          >
            {{ page.title }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <input type="checkbox" id="menuBtn" />
  <!-- スマホ用メニュー -->
  <div class="menu mw-xl mx-auto">
    <div v-for="page in pages" :key="page.path">
      <div
        class="menu_content"
        v-if="
          $store.state.status == 'admin' ||
          ($store.state.status == 'member' && page.state != 'adminonly') ||
          ($store.state.status == 'stranger' && page.state == 'public')
        "
      >
        <router-link
          class="menu_text pointer h4 text-decoration-none"
          :to="page.path"
          @click="handleMenu(false)"
          :style="`color: ${page.state == 'adminonly' ? color.admin : color.public}`"
        >
          {{ page.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainHeader',
  data() {
    return {
      // main.jsとは異なり公開しているページのみ表示
      pages: [
        {
          title: 'トップ',
          path: '/',
          state: 'adminonly'
        },
        {
          title: '掲示板',
          path: '/article',
          state: 'adminonly'
        },
        {
          title: 'イベント',
          path: '/events',
          state: 'public'
        },
        {
          title: '部費通帳',
          path: '/money',
          state: 'memberonly'
        },
        {
          title: '備品一覧',
          path: '/equips',
          state: 'adminonly'
        },
        {
          title: 'マイページ',
          path: '/mypage',
          state: 'public'
        },
        {
          title: '管理画面',
          path: '/admin/members',
          state: 'adminonly'
        }
      ],
      color: {
        public: 'white',
        admin: 'gray'
      },
      pagename: '',
      admin: false
    }
  },
  methods: {
    go(path) {
      location.href = path
    },
    handleMenu(bool) {
      document.getElementById('menuBtn').checked = bool
    },
    getPagename() {
      this.pages.forEach((page) => {
        if (location.pathname == page.path) this.pagename = page.title
      })
      return this.pagename
    },
    getPathname() {
      return location.pathname
    }
  },
  computed: {
    responsive() {
      return window.innerWidth < 800
    }
  }
}
</script>

<style>
.mw-logo {
  max-width: 120px;
}
.mw-menu {
  max-width: 70px;
}
#menuBtn {
  display: none;
}
.menu {
  width: 100vw;
  height: 0vh;
  background: #444444;
  visibility: collapse;
  opacity: 0;
  transition: all 0.5s ease;
}
#menuBtn:checked ~ .menu {
  visibility: visible;
  opacity: 1;
  height: 100vh;
}
.menu_content {
  text-align: right;
  padding: 2em 1.5em 0 0;
}
.menu_text {
  font-weight: bold;
}
</style>
