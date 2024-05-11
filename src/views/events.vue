<template>
  <h1 class="mt-5 mb-5 text-center">{{ pagename }}</h1>
  <!-- <CodeForm /> -->

  <div class="mw-xxl mx-auto p-3">
    <!-- placeholder -->
    <div v-if="!ready" class="row">
      <div v-for="n in 9" :key="n" class="col-md-6 col-xl-4 p-2">
        <div class="bg-white rounded-3 p-4 shadow-sm h-100" :class="`work_card`">
          <h5><span class="badge bg-secondary"></span></h5>
          <h5 class="mb-0 placeholder w-100"></h5>
          <p class="mb-0 small text-secondary placeholder w-75"></p>
          <hr class="my-1" />
          <p class="placeholder w-100 mb-1"></p>
          <p class="placeholder w-100 mb-1"></p>
          <p class="placeholder w-75"></p>
        </div>
      </div>
    </div>

    <!-- cards -->
    <div v-else>
      <!-- heldevents -->
      <div class="row" v-if="heldEvents">
        <div v-for="(event, id) in heldEvents" :key="id" class="col-md-6 col-xl-4 p-2">
          <!-- display -->
          <div
            class="bg-white rounded-3 p-4 shadow-sm h-100 position-relative d-flex flex-column"
            :class="`${event.type || 'assembly'}_card`"
            v-if="editting != id"
          >
            <h4 class="text-danger">ただいま開催中</h4>
            <h4>
              <span class="badge bg-danger" v-if="!event.type || event.type == 'assembly'"
                >部会</span
              >
              <span class="badge bg-success" v-else-if="event.type == 'course'">講座</span>
              <span class="badge bg-secondary" v-else-if="event.type == 'work'">制作会</span>
              <span class="badge bg-indigo" v-else-if="event.type == 'event'">イベント</span>
              <span class="badge bg-darkorange" v-else-if="event.type == 'recreation'">レク</span>
              <span class="badge bg-secondary" v-else>その他</span>
            </h4>
            <h4 class="mb-0">
              {{ event.title }}
            </h4>
            <p class="mb-0 text-secondary">{{ getTermText(event.term) }} ・ {{ event.place }}</p>
            <hr class="my-1" />
            <p v-html="event.description" />
            <div class="mt-2 d-flex mt-auto" v-if="$store.state.user">
              <div
                v-if="event.code && (!event.attenders || !event.attenders[$store.state.user.uid])"
                class="w-100 rounded-1 bg-c4s-light c4s-dark border py-3 text-center hover pointer"
              >
                <h4 class="mb-0"><i class="bi bi-person-plus"></i> 出席登録する</h4>
              </div>
              <div
                v-else-if="event.attenders && event.attenders[$store.state.user.uid]"
                class="w-100 rounded-1 bg-light text-secondary border py-3 text-center"
              >
                <h4 class="mb-0"><i class="bi bi-person-check"></i> 出席登録済み</h4>
              </div>
            </div>
            <div class="position-absolute top-0 end-0 p-4">
              <h5 class="text-secondary">
                <span
                  class="ms-4 bi bi-pencil-square pointer"
                  v-if="$store.state.status == 'admin'"
                  @click="editting = id"
                ></span>
                <span
                  class="ms-4 bi bi-calendar-x pointer"
                  v-if="$store.state.status == 'admin'"
                  @click="del(id)"
                ></span>
              </h5>
            </div>
          </div>
          <!-- editor -->
          <div
            class="bg-white rounded-3 p-4 shadow-sm h-100 position-relative d-flex flex-column"
            :class="`${event.type || 'assembly'}_card`"
            v-if="editting == id"
          >
            <EventEditor :data="event" :id="id" @save="upload" @close="editting = ''" />
          </div>
          <hr class="my-3" />
        </div>
      </div>
      <!-- future events -->
      <div class="row mb-5">
        <!-- addnew -->
        <div class="col-md-6 col-xl-4 p-2" v-if="$store.state.status == 'admin'">
          <!-- editor -->
          <div
            class="bg-white rounded-3 p-4 shadow-sm h-100 position-relative d-flex flex-column add_card"
            v-if="editting == '__NEW'"
          >
            <EventEditor id="__NEW" @save="upload" @close="editting = ''" />
          </div>
          <!-- btn -->
          <div
            v-else
            @click="editting = '__NEW'"
            class="rounded-3 p-4 shadow-sm hover pointer h-100 add_card d-flex justify-content-center align-items-center"
          >
            <h5 class="mb-0 text-secondary text-center">
              <i class="bi bi-plus-square-dotted"> </i> 新規登録
            </h5>
          </div>
        </div>
        <!-- list -->
        <div v-for="(event, id) in Events" :key="id" class="col-md-6 col-xl-4 p-2">
          <!-- display -->
          <div
            class="bg-white rounded-3 p-4 shadow-sm h-100 position-relative d-flex flex-column"
            :class="`${event.type || 'assembly'}_card`"
            v-if="editting != id"
          >
            <h5>
              <span class="badge bg-danger" v-if="!event.type || event.type == 'assembly'"
                >部会</span
              >
              <span class="badge bg-success" v-else-if="event.type == 'course'">講座</span>
              <span class="badge bg-secondary" v-else-if="event.type == 'work'">制作会</span>
              <span class="badge bg-indigo" v-else-if="event.type == 'event'">イベント</span>
              <span class="badge bg-darkorange" v-else-if="event.type == 'recreation'">レク</span>
              <span class="badge bg-secondary" v-else>その他</span>
            </h5>
            <h5 class="mb-0">
              {{ event.title }}
            </h5>
            <p class="mb-0 small text-secondary">
              {{ getTermText(event.term) }} ・ {{ event.place }}
            </p>
            <hr class="my-1" />
            <p v-html="event.description" />
            <div class="mt-2 d-flex mt-auto" v-if="$store.state.status == 'member' || 'false'">
              <div class="balloon1-right">
                <p>アンケート</p>
              </div>
              <div
                class="Qbtn hover pointer"
                :class="
                  event.notice && event.notice[$store.state.user.uid] == 1
                    ? 'attend'
                    : 'text-secondary'
                "
                @click="notice(id, true)"
              >
                <i class="bi bi-check-lg"></i> 参加
                <span v-if="event.notice">{{
                  Object.keys(event.notice).filter((n) => event.notice[n] == 1).length
                }}</span>
              </div>
              <div
                class="Qbtn hover pointer"
                :class="
                  event.notice && event.notice[$store.state.user.uid] == -1
                    ? 'absent'
                    : 'text-secondary'
                "
                @click="notice(id, false)"
              >
                <i class="bi bi-x"></i> 欠席
              </div>
            </div>
            <div class="position-absolute top-0 end-0 p-4">
              <h5 class="text-secondary">
                <span class="ms-4 bi bi-person-check" v-if="event.code"></span>
                <span
                  class="ms-4 bi bi-pencil-square pointer"
                  v-if="$store.state.status == 'admin'"
                  @click="editting = id"
                ></span>
                <span
                  class="ms-4 bi bi-calendar-x pointer"
                  v-if="$store.state.status == 'admin'"
                  @click="del(id)"
                ></span>
              </h5>
            </div>
          </div>
          <!-- editor -->
          <div
            class="bg-white rounded-3 p-4 shadow-sm h-100 position-relative d-flex flex-column"
            :class="`${event.type || 'assembly'}_card`"
            v-if="editting == id"
          >
            <EventEditor :data="event" :id="id" @save="upload" @close="editting = ''" />
          </div>
        </div>
      </div>
      <!-- past events -->
      <input type="checkbox" id="open_endEvents" style="display: none" />
      <label
        class="h4 text-secondary hover pointer"
        for="open_endEvents"
        @click="open_endEvents = !open_endEvents"
      >
        <span class="bi bi-caret-down-fill me-3" v-if="open_endEvents"></span>
        <span class="bi bi-caret-right-fill me-3" v-else></span>
        終了したイベント
      </label>
      <div class="row" v-if="open_endEvents">
        <!-- list -->
        <div v-for="(event, id) in endEvents" :key="id" class="col-md-6 col-xl-4 p-2">
          <!-- display -->
          <div
            class="bg-white rounded-3 p-4 shadow-sm h-100 position-relative d-flex flex-column"
            :class="`${event.type || 'assembly'}_card`"
            v-if="editting != id"
          >
            <h5>
              <span class="badge bg-danger" v-if="!event.type || event.type == 'assembly'"
                >部会</span
              >
              <span class="badge bg-success" v-else-if="event.type == 'course'">講座</span>
              <span class="badge bg-secondary" v-else-if="event.type == 'work'">制作会</span>
              <span class="badge bg-indigo" v-else-if="event.type == 'event'">イベント</span>
              <span class="badge bg-darkorange" v-else-if="event.type == 'recreation'">レク</span>
              <span class="badge bg-secondary" v-else>その他</span>
            </h5>
            <h5 class="mb-0">
              {{ event.title }}
            </h5>
            <p class="mb-0 small text-secondary">
              {{ getTermText(event.term) }} ・ {{ event.place }}
            </p>
            <hr class="my-1" />
            <p class="mb-0" v-html="event.description" />
            <div class="position-absolute top-0 end-0 p-4">
              <h5 class="text-secondary">
                <span class="ms-4 bi bi-person-check" v-if="event.code"></span>
                <span
                  class="ms-4 bi bi-pencil-square pointer"
                  v-if="$store.state.status == 'admin'"
                  @click="editting = id"
                ></span>
                <span
                  class="ms-4 bi bi-calendar-x pointer"
                  v-if="$store.state.status == 'admin'"
                  @click="del(id)"
                ></span>
              </h5>
            </div>
          </div>
          <!-- editor -->
          <div
            class="bg-white rounded-3 p-4 shadow-sm h-100 position-relative d-flex flex-column"
            :class="`${event.type || 'assembly'}_card`"
            v-if="editting == id"
          >
            <EventEditor :data="event" :id="id" @save="upload" @close="editting = ''" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { initializeApp } from 'firebase/app'
import { getDatabase, onValue, ref, set, update, remove } from 'firebase/database'

import EventEditor from '@/components/EventEditor.vue'
// import CodeForm from "@/components/CodeForm.vue"

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
  name: 'EventPage',
  components: {
    EventEditor
    // CodeForm
  },
  data() {
    return {
      pagename: 'イベント情報',
      ready: false,
      Events: {},
      endEvents: {},
      heldEvents: {},
      editting: '',
      aditting_allday: false,
      open_endEvents: false
    }
  },
  created() {
    onValue(ref(db, 'event'), (snapshot) => {
      this.Events = {}
      this.heldEvents = {}
      this.endEvents = {}

      // イベントを終了・開催中・予定に振り分け
      // ちゃんと日付順に並び替えてから
      let data = snapshot.val()
      const sortedKeys = Object.keys(data).sort(
        (a, b) => new Date(data[a].term.begin) - new Date(data[b].term.begin)
      )
      sortedKeys.forEach((id) => {
        if (new Date() < new Date(data[id].term.begin)) this.Events[id] = data[id]
        else if (new Date() < new Date(data[id].term.end)) this.heldEvents[id] = data[id]
      })
      sortedKeys.reverse().forEach((id) => {
        if (new Date(data[id].term.end) < new Date()) this.endEvents[id] = data[id]
      })

      this.ready = true
    })
  },
  methods: {
    getTermText(term) {
      const ALLDAY = term.allday
      const BEGIN = new Date(term.begin)
      const END = new Date(term.end)
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
      const addZero = (str) => {
        return String(str)[1] ? str : '0' + str
      }
      const compareDate = (a, b) => {
        return LIST(a)[0] == LIST(b)[0] && LIST(a)[1] == LIST(b)[1] && LIST(a)[2] == LIST(b)[2]
      }

      let MSG = ''
      if (compareDate(TODAY, BEGIN)) {
        MSG = '（きょう）'
      }
      if (compareDate(Shift(TODAY, 1), BEGIN)) {
        MSG = '（あした）'
      }
      if (compareDate(Shift(TODAY, 2), BEGIN)) {
        MSG = '（あさって）'
      }

      // 開始日時
      let beginString = ''
      if (LIST(BEGIN)[0] != LIST(TODAY)[0]) beginString += `${LIST(BEGIN)[0]}年`
      beginString += `${LIST(BEGIN)[1]}月${LIST(BEGIN)[2]}日`
      let beginTimeString = ''
      if (!ALLDAY) beginTimeString += ` ${LIST(BEGIN)[3]}:${addZero(LIST(BEGIN)[4])}`
      // 終了日時
      let endString = ''
      if (compareDate(BEGIN, END)) {
        if (!ALLDAY) {
          endString = ` - ${LIST(END)[3]}:${addZero(LIST(END)[4])}`
        }
      } else {
        endString = ` - `
        if (LIST(BEGIN)[0] != LIST(END)[0]) endString += `${LIST(END)[0]}年`
        endString += `${LIST(END)[1]}月${LIST(END)[2]}日`
        if (!ALLDAY) endString += ` ${LIST(END)[3]}:${addZero(LIST(END)[4])}`
      }

      return `${beginString}${MSG}${beginTimeString}${endString}`
    },
    notice(id, bool) {
      set(ref(db, `event/${id}/notice/${this.$store.state.user.uid}`), bool ? 1 : -1)
    },
    upload(data, id) {
      // アップロード
      update(ref(db, `event/${id}`), data).then(() => {
        this.editting = ''
      })
    },
    del(id) {
      if (
        confirm(`「${this.Events[id].title}」を削除してよろしいですか？`) &&
        confirm(`二度と元には戻せません。ほんとうに削除してよろしいですか？`)
      )
        remove(ref(db, `event/${id}`))
    }
  }
}
</script>

<style>
.badge {
  width: 5em;
}
.assembly_card {
  border-left: crimson solid 10px;
}
.course_card {
  border-left: green solid 10px;
}
.work_card {
  border-left: dimgray solid 10px;
}
.bg-indigo {
  background-color: purple;
}
.event_card {
  border-left: purple solid 10px;
}
.bg-darkorange {
  background-color: darkorange;
}
.recreation_card {
  border-left: darkorange solid 10px;
}
.add_card {
  border: darkgray dashed 3px;
}
.balloon1-right {
  position: relative;
  display: inline-block;
  margin-right: 10px;
  padding: 4px 10px;
  max-width: 100%;
  color: #555;
  font-size: 16px;
  background: rgb(225, 225, 225);
  border-radius: 4px;
}
.balloon1-right:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 100%;
  margin-top: -10px;
  border: 10px solid transparent;
  border-left: 15px solid rgb(225, 225, 225);
}
.balloon1-right p {
  margin: 0;
  padding: 0;
}
.Qbtn {
  margin-left: 20px;
  padding: 4px 2px;
  text-align: center;
  border-bottom: gray dashed 2px;
}
.attend {
  font-weight: bolder;
  color: green;
  border-bottom: green dashed 5px;
}
.absent {
  font-weight: bolder;
  color: darkred;
  border-bottom: darkred dashed 5px;
}
</style>
