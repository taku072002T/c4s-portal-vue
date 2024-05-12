import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      status: 'loading',
      status_msg: 'ユーザー情報を読み込み中',
      user: {},
      c4suser: {},
      users: {}
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
    },
    setUsers(state, snapshot) {
      state.users = snapshot
    }
  },
  getters: {
    responsive() {
      return window.innerWidth < 800
    },
    usersKeys(state) {
      let leader, subleader, treasurer
      let actives = []
      let news = []

      const users = state.users
      for (const key in users) {
        if (Object.hasOwnProperty.call(users, key)) {
          switch (users[key].role) {
            case "leader": leader = key; break;
            case "subleader": subleader = key; break;
            case "treasurer": treasurer = key; break;
            case "active": actives.push(key); break;
            case "new": news.push(key); break;
            default: break;
          }
        }
      }

      return [leader, subleader, treasurer, ...actives, ...news]
    }
  }
})

export default store
