<template>
  <h1 class="mt-5 mb-5 text-center">{{ pagename }}</h1>

  <MoneyEditor
    v-if="openModal"
    :data="snapshot[editID]"
    :id="editID"
    @close="openModal = false"
    @send="send"
  />

  <div v-if="total == '---,---'">
    <LoadingComp />
  </div>
  <div v-else class="row mb-more mw-lg mx-auto">
    <div class="col-lg-6">
      <!-- 残高表示 -->
      <div class="w-100 px-3 mb-3 text-light">
        <div class="w-100 bg-c4s p-3 rounded-3">
          <p class="mb-0">部費残高</p>
          <p class="mb-0">
            <span class="fs-3em">{{ total.toLocaleString() }}</span
            ><span>円</span>
          </p>
        </div>
      </div>
      <!-- グラフ -->
      <div class="w-100 px-3 mb-3" v-if="!$store.getters.responsive">
        <div class="w-100 border p-3 rounded-3">
          <p class="mb-0 text-secondary text-center">ここに残高推移グラフを表示</p>
        </div>
      </div>
    </div>
    <div class="col-lg-6">
      <!-- 明細の年度選択 -->
      <select class="form-select w-75 mx-auto mb-3 small" v-model="selectedYear">
        <option
          v-for="(year, key) in moneyData"
          :key="key"
          :value="key"
          :selected="getYear() == key"
        >
          {{ key }}年度
        </option>
      </select>
      <!-- 明細 -->
      <div v-for="(element, key) in moneyData[selectedYear]" :key="key" class="w-100 px-3 mb-2">
        <!-- 部費支払い -->
        <div
          class="bg-white border border-success shadow-sm rounded-3 px-3 py-1 w-95 mx-auto"
          v-if="element.type == 'FeePaid'"
        >
          <div
            class="d-flex"
            :class="admin ? 'pointer' : ''"
            @click="editID = editID == key ? '' : key"
          >
            <h6 class="col-4 text-end text-success mb-0">部費収入</h6>
            <p class="col-4 text-center text-secondary small mb-0">
              {{ getDateText(element.date) }}
            </p>
            <h6 class="col-4 text-success mb-0">+{{ element.price.toLocaleString() }}</h6>
          </div>
          <div v-if="editID == key">
            <hr class="my-1" />
            <div class="d-flex">
              <p class="col-10 mb-0 text-center">{{ element.name }}</p>
              <p class="col-2 text-end mb-0 text-secondary">
                <span class="ms-3 bi bi-file-earmark-x pointer" @click="del(key)"></span>
              </p>
            </div>
          </div>
          <div v-if="!element.liquid" @click="liquid(key)" class="pointer">
            <hr class="my-2" />
            <div class="text-danger text-center fw-bold">
              <i class="bi bi-exclamation-circle-fill"> </i>未精算
            </div>
          </div>
        </div>
        <!-- その他収入・支出 -->
        <div
          class="bg-white border shadow-sm rounded-md w-100 mx-auto mb-2 px-3 py-2"
          :class="element.price < 0 ? 'border-primary' : 'border-success'"
          v-else
        >
          <div
            class="d-flex"
            :class="admin ? 'pointer' : ''"
            @click="editID = editID == key ? '' : key"
          >
            <div class="col-8">
              <h6 class="mb-0">{{ element.name }}</h6>
              <p class="text-secondary small mb-0">
                {{ editID == key ? element.date : getDateText(new Date(element.date)) }}
              </p>
            </div>
            <div class="col-4">
              <h4
                class="mb-0 text-end"
                :class="element.price < 0 ? 'text-primary' : 'text-success'"
              >
                {{ element.price > 0 ? '+' : '' }}{{ Number(element.price).toLocaleString() }}
              </h4>
            </div>
          </div>
          <div v-if="editID == key">
            <hr class="my-2" />
            <div class="d-flex">
              <p class="col-9 mb-1">{{ element.detail }}</p>
              <p class="col-3 text-end mb-1 text-secondary">
                <span class="ms-3 bi bi-pencil-square pointer" @click="openModal = true"></span>
                <span class="ms-3 bi bi-file-earmark-x pointer" @click="del(key)"></span>
              </p>
            </div>
          </div>
          <div v-if="!element.liquid" @click="liquid(key)" class="pointer">
            <hr class="my-2" />
            <div class="text-danger text-center fw-bold">
              <i class="bi bi-exclamation-circle-fill"> </i>未精算
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 新規 -->
  <div class="RBbtn rounded-circle text-center pointer" v-if="admin" @click="addnew()">
    <h1 class="bi bi-plus-lg lh-50"></h1>
  </div>
</template>

<script>
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, set, update, remove } from 'firebase/database'
import LoadingComp from '@/components/LoadingComp.vue'
import MoneyEditor from '@/components/MoneyEditor.vue'

const firebaseConfig = {
  apiKey: 'AIzaSyBE60G8yImWlENWpCnQZzqqVUrwWa_torg',
  authDomain: 'c4s-portal.firebaseapp.com',
  databaseURL: 'https://c4s-portal-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'c4s-portal',
  storageBucket: 'c4s-portal.appspot.com',
  messagingSenderId: '863775995414',
  appId: '1:863775995414:web:82eb9557a13a099dfbe737',
  measurementId: 'G-K2SR1WSNRC'
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export default {
  name: 'MoneyPage',
  components: {
    LoadingComp,
    MoneyEditor
  },
  data() {
    return {
      pagename: '部費通帳',
      loading: true,
      selectedYear: this.getYear().toString(),
      snapshot: {},
      moneyData: {},
      total: '---,---',
      editID: '',
      openModal: false
    }
  },
  created() {
    this.$store.commit('setStatusMessage', '部費情報を取得中')
    // データを取得
    onValue(ref(db, 'money'), (snapshot) => {
      const data = snapshot.val()
      this.snapshot = data
      const reversedKeys = Object.keys(data).reverse()
      this.total = 0
      this.moneyData = {}
      for (const i in reversedKeys) {
        const key = reversedKeys[i]
        const element = data[key]
        if (!this.moneyData[this.getYear(element.date)]) {
          this.moneyData[this.getYear(element.date)] = {}
        }
        this.moneyData[this.getYear(element.date)][key] = element
        if (element.liquid) {
          this.total += element.price
        } else if (element.type == 'FeePaid') {
          set(ref(db, `money/${key}/liquid`), true).then(() => {
            console.warn('部費支払いが未精算として登録されていたため、清算処理を実行しました。')
          })
        } else {
          console.log(`${element.name}は未精算のため合計に含めていません`)
        }
      }
      console.warn('データを取得しました')
      console.log(this.moneyData)
    })
  },
  methods: {
    // 年度を取得（3月までは前年になる）
    getYear(snapshot) {
      const date = snapshot ? new Date(snapshot) : new Date()
      const year = date.getFullYear()
      const result = date.getMonth() < 3 ? year - 1 : year
      return result.toString()
    },
    // 日時をテキストに変換
    getDateText(snapshot) {
      const DATE = new Date(snapshot)
      const TODAY = new Date()

      const LIST = (input) => {
        let date = new Date(input)
        return [
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate(),
          date.getHours(),
          date.getMinutes()
        ]
      }
      const Shift = (date, int) => {
        let result = date
        result.setDate(date.getDate() + int)
        return result
      }
      const compareDate = (a, b) => {
        return LIST(a)[0] == LIST(b)[0] && LIST(a)[1] == LIST(b)[1] && LIST(a)[2] == LIST(b)[2]
      }

      if (compareDate(TODAY, DATE)) return 'きょう'
      if (compareDate(Shift(TODAY, -1), DATE)) return 'きのう'
      if (compareDate(Shift(TODAY, -1), DATE)) return 'おととい'
      if (Shift(TODAY, -5) < DATE)
        return `${Math.round((Shift(TODAY, 7) - DATE) / (1000 * 60 * 60 * 24))}日前`
      return `${LIST(DATE)[1]}月${LIST(DATE)[2]}日`
    },
    // 新規作成
    addnew() {
      this.editID = '__NEW'
      this.openModal = true
    },
    // 清算済みにする
    liquid(id) {
      if (!confirm('清算済みにしますか？')) return
      if (!confirm('元に戻せません。清算してよろしいですか？')) return
      set(ref(db, `money/${id}/liquid`), true)
    },
    // 送信
    send(id, data) {
      this.openModal = false
      update(ref(db, `money/${id}`), data).then(() => {
        this.editID = id
        this.selectedYear = this.getYear(data.date)
      })
    },
    // 削除
    del(key) {
      if (!confirm(this.snapshot[key].name + 'を削除します。よろしいですか？')) {
        return
      }
      if (!confirm('元に戻せません。よろしいですか？')) {
        return
      }
      remove(ref(db, `money/${key}`)).catch((e) => alert(e.message))
    }
  },
  computed: {
    admin() {
      return this.$store.state.status == 'admin'
    }
  }
}
</script>

<style>
.bg-c4s {
  background-color: var(--c-c4s);
}
.fs-3em {
  font-size: 3em;
  font-weight: bold;
  line-height: 0.8em;
}
.w-95 {
  width: 95%;
}
.border-dashed {
  border: darkgray dashed 1px;
}
.RBbtn {
  position: fixed;
  bottom: 30px;
  right: 25px;
  width: 50px;
  height: 50px;
  background-color: #1f1f1f;
  color: #dfdfdf;
  font-weight: bold;
  z-index: 50;
}
.lh-50 {
  line-height: 50px;
  margin: 0;
}
.mb-more {
  margin-bottom: 100px;
}
</style>
