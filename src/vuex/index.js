import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      status: 'loading',
      status_msg: 'ユーザー情報を読み込み中',
      user: {},
      c4suser: {},
      users: {},
      adminUsers: {},
      maintenance: {}
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
    },
    setAdminUsers(state, snapshot) {
      state.adminUsers = snapshot
    },
    setMaintenance(state, snapshot) {
      state.maintenance = snapshot
    }
  },
  getters: {
    responsive() {
      return window.innerWidth < 800
    },
    usersKeys(state) {
      const users = state.users

      if (!users[state.user.uid]) {
        return []
      }

      let leader, subleader, treasurer
      let actives = []
      let news = []
      let others = []

      // 登録日順に並び替え
      let keys = Object.keys(users)
      keys.sort((a, b) => {
        return users[a].time - users[b].time
      })

      // 役職ごとに分類
      for (const i in keys) {
        if (Object.hasOwnProperty.call(keys, i)) {
          const key = keys[i]
          switch (users[keys[i]].role) {
            case 'leader':
              leader = key
              break
            case 'subleader':
              subleader = key
              break
            case 'treasurer':
              treasurer = key
              break
            case 'active':
              actives.push(key)
              break
            case 'new':
              news.push(key)
              break
            default:
              others.push(key)
              break
          }
        }
      }

      // 現役・新入部員は学年ごとに並び替え
      actives.sort((a, b) => {
        return users[b].grade - users[a].grade
      })
      news.sort((a, b) => {
        return users[b].grade - users[a].grade
      })

      // 管理者は先頭へ
      let kanrisha = []
      let soreigai = []
      for (const i in actives) {
        if (Object.hasOwnProperty.call(actives, i)) {
          const uid = actives[i]
          ;(state.adminUsers[uid] ? kanrisha : soreigai).push(uid)
        }
      }

      // const result = [leader, subleader, treasurer, ...actives, ...news]
      const result = [leader, subleader, treasurer, ...kanrisha, ...soreigai, ...news, ...others]
      return result
    }
  }
})

export default store
