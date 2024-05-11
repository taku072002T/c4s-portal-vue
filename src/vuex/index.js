import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      status: 'loading',
      status_msg: 'ユーザー情報を読み込み中',
      user: {},
      c4suser: {}
    }
  },
  mutations: {
    setStatus(state, snapshot) {
      state.status = snapshot
    },
    setStatusMessage(state, snapshot) {
      state.status_msg = snapshot
    },
    setUser(state, snapshot) {
      state.user = snapshot
    },
    setC4sUser(state, snapshot) {
      state.c4suser = snapshot
    }
  },
  getters: {
    responsive() {
      return window.innerWidth < 800
    }
  }
})

export default store
