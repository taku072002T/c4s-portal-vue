<template>
  <!-- 新規 -->
  <div
    class="RBbtn rounded-circle text-center pointer"
    style="z-index: 10000"
    @click="console.log(roleInput)"
  >
    <h1 class="bi bi-plus-lg lh-50"></h1>
  </div>
  <div class="f-dlex flex-row-reverse flex-wrap">
    <!-- 絞り込み -->
    <div class="col-md-4"></div>
    <!-- 名簿 -->
    <div class="col-md-8">
      <ul class="list-group list-group-flush">
        <li
          v-for="uid in $store.getters.usersKeys.filter(
            (uid) => users[uid].name && !users[uid].reason
          )"
          :key="uid"
          class="list-group-item d-flex hover"
          @click="openInfo(uid)"
        >
          <p class="mb-0 lh-1">
            <span v-if="users[uid].role == 'leader'" class="badge bg-leader rounded-pill"
              >代表</span
            >
            <span v-else-if="users[uid].role == 'subleader'" class="badge bg-leader rounded-pill"
              >副代表</span
            >
            <span v-else-if="users[uid].role == 'treasurer'" class="badge bg-leader rounded-pill"
              >会計</span
            >
            <span v-else-if="$store.state.adminUsers[uid]" class="badge bg-admin rounded-pill"
              >幹部</span
            >
            <span v-else-if="users[uid].role == 'active'" class="badge bg-active rounded-pill"
              >現役</span
            >
            <span v-else-if="users[uid].role == 'new'" class="badge bg-new rounded-pill"
              >仮入部</span
            >
          </p>
          <p class="mb-0 ps-2 lh-1">
            <span class="h6">{{ users[uid].name }}</span>
            <span class="ps-3">{{ users[uid].nickname }}</span>
            <br />
            <span class="text-secondary small"
              >{{ users[uid].studentNumber }}・{{ users[uid].department.split(' ')[1]
              }}{{ getGrade(uid) }}</span
            >
          </p>
        </li>
      </ul>
    </div>
    <!-- ポップアップ -->
    <PopUp v-if="editID" :title="edit ? '情報を編集' : '部員情報'" @close="editID = ''">
      <!-- 編集画面 -->
      <div v-if="edit">
        <h6 class="text-center">役職</h6>
        <div class="d-flex flex-wrap">
          <div v-for="role in roles" :key="role" class="col-4 px-1 pb-1">
            <input
              type="radio"
              name="role"
              v-model="roleInput"
              :value="role.id"
              :id="role.id"
              class="hide roleRadio"
            />
            <label :for="role.id" class="roleLabel pointer">{{ role.name }}</label>
          </div>
        </div>
      </div>
      <!-- 詳細画面 -->
      <div v-else>
        <div class="px-3 position-relative">
          <h4 class="mb-0">{{ users[editID].nickname || users[editID].name }}</h4>
          <p class="mb-0">
            {{ users[editID].nickname && users[editID].name + '・'
            }}{{ users[editID].nameKana }}・{{ users[editID].sex == 'woman' ? '女性' : '男性' }}
          </p>
          <p class="mb-0 text-secondary">{{ users[editID].department }}</p>
          <p class="mb-0 text-secondary">{{ getGrade(editID) }}</p>
          <p class="mb-0 text-secondary">{{ getDateText(users[editID].birth) }} 生まれ</p>
          <p class="mb-0 text-secondary">学籍番号：{{ users[editID].studentNumber }}</p>
          <p class="mb-0 text-secondary">電話番号：{{ users[editID].phoneNumber || '未登録' }}</p>
          <p class="mb-0 text-secondary">UID：{{ editID }}</p>

          <div v-if="users[editID].detail">
            <hr class="my-2" />
            <p class="lh-sm text-justify mb-0" v-html="users[editID].detail"></p>
            <hr class="my-2" />
          </div>
          <div class="text-secondary position-absolute top-0 end-0 me-3">
            <span @click="edit = true" class="bi bi-pencil-square ms-4 pointer"></span>
            <a
              :href="getLink(editID)"
              target="_blank"
              rel="noopener noreferrer"
              class="bi bi-box-arrow-up-right ms-4 pointer text-secondary"
            ></a>
          </div>
        </div>
      </div>
    </PopUp>
  </div>
</template>

<script>
import PopUp from '../PopUp.vue'

export default {
  components: {
    PopUp
  },
  data() {
    return {
      editID: '',
      edit: false,
      roleInput: 'active',
      roles: [
        { id: 'leader', name: '代表' },
        { id: 'subleader', name: '副代表' },
        { id: 'treasurer', name: '会計' },
        { id: 'admin', name: '幹部' },
        { id: 'active', name: '現役' },
        { id: 'new', name: '仮入部' }
      ]
    }
  },
  methods: {
    openInfo(uid) {
      this.editID = uid
      this.edit = false
    },
    getDateText(snapshot) {
      const date = new Date(snapshot)
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    }
  },
  computed: {
    users() {
      return this.$store.state.users
    },
    getGrade() {
      return (id) => {
        const i = this.users[id].grade
        if (i <= 4) return `学部${i}年`
        else if (i <= 6) return `修士${i - 4}年`
        else return `博士${i - 6}年`
      }
    },
    getLink() {
      return (id) => {
        return `https://console.firebase.google.com/u/0/project/c4s-portal/database/c4s-portal-default-rtdb/data/~2Fusers~2F${id}?hl=ja`
      }
    }
  }
}
</script>

<style>
.lh-100 {
  line-height: 100%;
}
.bg-leader {
  background-color: rgb(100, 0, 162);
}
.bg-admin {
  background-color: rgb(177, 50, 255);
}
.bg-active {
  background-color: green;
}
.bg-new {
  background-color: rgb(142, 208, 0);
}
.hover {
  transition: 200ms;
  cursor: pointer;
}
.hover:hover {
  background-color: rgba(255, 128, 0, 0.1);
}
.roleLabel {
  width: 100%;
  text-align: center;
  padding: 0.3rem 0;
  border-radius: 3px;
  border: 1px solid gray;
  transition: 200ms;
}
#leader:checked + label,
#subleader:checked + label,
#treasurer:checked + label {
  background-color: rgb(100, 0, 162);
  border-color: rgb(100, 0, 162);
  color: white;
}
#admin:checked + label {
  background-color: rgb(177, 50, 255);
  border-color: rgb(177, 50, 255);
  color: white;
}
#active:checked + label {
  background-color: green;
  border-color: green;
  color: white;
}
#new:checked + label {
  background-color: rgb(142, 208, 0);
  border-color: rgb(142, 208, 0);
}
</style>
