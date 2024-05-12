<template>
  <h1 class="mt-5 mb-5 text-center">{{ pagename }}</h1>
  <div class="row mb-5 mw-lg mx-auto">
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
          class="bg-white border border-success shadow-sm rounded-3 py-1 w-95 mx-auto d-flex"
          :class="$store.state.status == 'admin' ? 'pointer' : ''"
          v-if="element.type == 'FeePaid'"
        >
          <h6 class="col-4 text-end text-success mb-0">部費収入</h6>
          <p class="col-4 text-center text-secondary small mb-0">{{ getDateText(element.date) }}</p>
          <h6 class="col-4 text-success mb-0">+{{ element.price.toLocaleString() }}</h6>
        </div>
        <!-- その他収入・支出 -->
        <div
          class="bg-white border shadow-sm rounded-md w-100 mx-auto mb-2 px-1 py-2 row pointer hover"
          :class="element.price < 0 ? 'border-primary' : 'border-success'"
          v-else
        >
          <div class="col-8">
            <h6 class="mb-0">{{ element.name }}</h6>
            <p class="text-secondary small mb-0">{{ getDateText(new Date(element.date)) }}</p>
          </div>
          <div class="col-4">
            <h4 class="mb-0 text-end" :class="element.price < 0 ? 'text-primary' : 'text-success'">
              {{ element.price > 0 ? '+' : '' }}{{ Number(element.price).toLocaleString() }}
            </h4>
          </div>
          <div v-if="!element.liquid">
            <hr class="my-2" />
            <div class="text-danger text-center fw-bold">
              <i class="bi bi-exclamation-circle-fill"> </i>未精算
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'

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
  data() {
    return {
      pagename: '部費通帳',
      selectedYear: this.getYear().toString(),
      moneyData: {},
      total: '---,---'
    }
  },
  created() {
    // データを取得
    onValue(ref(db, 'money'), (snapshot) => {
      const data = snapshot.val()
      const reversedKeys = Object.keys(data).reverse()
      this.total = 0
      for (const i in reversedKeys) {
        const key = reversedKeys[i]
        const element = data[key]
        if (!this.moneyData[this.getYear(element.date)]) {
          this.moneyData[this.getYear(element.date)] = {}
        }
        this.moneyData[this.getYear(element.date)][key] = element
        this.total += element.price
      }
    })
    console.warn('データを取得しました')
    console.log(this.moneyData)
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
</style>
