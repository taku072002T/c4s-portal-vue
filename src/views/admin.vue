<template>
  <h1 class="mt-5 mb-5 text-center">{{ pagename }}</h1>

  <hr class="mb-0" />
  <div class="row">
    <div class="col-sm-4 mb-5 h-100 pe-0">
      <router-link
        :to="`/admin/${page.path}`"
        v-for="(page, i) in pages"
        :key="i"
        class="d-block w-100 py-3 px-5 text-center text-decoration-none"
        :class="tab == i ? 'tab-selected' : 'tab-unselected'"
        @click="tab = i"
        >{{ page.name }}
      </router-link>
    </div>
    <div class="col-sm-8 mb-5 h-100 ps-0">
      <div class="w-100 innerpage">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPage',
  components: {},
  data() {
    return {
      pagename: '管理画面',
      tab: 0,
      pages: [
        {
          path: 'members',
          name: '部員一覧'
        },
        {
          path: 'dashboard',
          name: 'ダッシュボート'
        },
        {
          path: 'fee',
          name: '部費情報'
        },
        {
          path: 'magazine',
          name: 'メルマガ管理'
        },
        {
          path: 'shop',
          name: 'ショップ管理'
        },
        {
          path: 'others',
          name: 'その他'
        }
      ]
    }
  }
}
</script>

<style>
.d-block {
  display: block;
}
.innerpage {
  border-left: 1px solid lightgray;
}
.tab-selected {
  background-color: var(--c-c4s-light);
  color: var(--c-c4s-dark);
  font-weight: bold;
}
.tab-unselected {
  color: black;
  cursor: pointer;
  transition: 300ms;
}
.tab-unselected:hover {
  background-color: var(--c-c4s-verylight);
}
</style>
