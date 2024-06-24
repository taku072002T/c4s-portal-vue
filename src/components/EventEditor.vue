<!-- 作って早々だけど、相当非効率な記述をしているので作り変えたい。処理速度は変わらんと思うけどシンプルにコードが汚い -->

<template>
  <!-- タブ -->
  <div class="mb-2 w-100 d-flex" v-if="id != '__NEW'">
    <div class="col-4">
      <div
        class="w-100 rounded-1 py-1 text-center text-nowrap"
        :class="mode == 0 ? ' border border-secondary' : 'pointer'"
        @click="mode = 0"
      >
        情報を編集
      </div>
    </div>
    <div class="col-4">
      <div
        class="w-100 rounded-1 py-1 text-center text-nowrap"
        :class="mode == 1 ? ' border border-secondary' : 'pointer'"
        @click="mode = 1"
      >
        アンケート
      </div>
    </div>
    <div class="col-4">
      <div
        class="w-100 rounded-1 py-1 text-center text-nowrap"
        :class="mode == 2 ? ' border border-secondary' : 'pointer'"
        @click="mode = 2"
      >
        出席登録
      </div>
    </div>
  </div>
  <!-- 情報を編集 -->
  <div v-if="mode == 0">
    <select class="form-select mb-1" :id="`${id}_TYPE`" :value="event.type || ''">
      <option value="" selected>イベントタイプを選んでください</option>
      <option value="assembly">部会</option>
      <option value="course">講座</option>
      <option value="work">制作会</option>
      <option value="event">イベント</option>
      <option value="recreation">レク</option>
    </select>
    <div class="mb-1">
      <input
        type="text"
        class="form-control"
        :id="`${id}_TITLE`"
        placeholder="イベント名"
        :value="event.title"
      />
    </div>
    <p class="mb-0 text-end small text-secondary">時刻を空白にすると終日の予定が作れます</p>
    <div class="mb-1 row">
      <div class="w-50 pe-1">
        <input
          type="date"
          class="form-control"
          :id="`${id}_TERM_BEGIN_DATE`"
          :value="event.term.begin.split(' ')[0]"
        />
      </div>
      <div class="w-50 ps-1">
        <input
          type="time"
          class="form-control"
          :id="`${id}_TERM_BEGIN_TIME`"
          :value="event.term.begin.split(' ')[1]"
        />
      </div>
    </div>
    <div class="mb-1 row">
      <div class="w-50 pe-1">
        <input
          type="date"
          class="form-control"
          :id="`${id}_TERM_END_DATE`"
          :value="event.term.end.split(' ')[0]"
        />
      </div>
      <div class="w-50 ps-1">
        <input
          type="time"
          class="form-control"
          :id="`${id}_TERM_END_TIME`"
          :value="event.term.end.split(' ')[1]"
        />
      </div>
    </div>
    <div class="mb-1">
      <input
        type="text"
        class="form-control"
        :id="`${id}_PLACE`"
        placeholder="場所"
        :value="event.place"
      />
    </div>
    <div class="mb-1 row">
      <div class="w-50 pe-1">
        <input
          type="text"
          class="form-control"
          :id="`${id}_CODE`"
          placeholder="出席コード"
          :value="event.code"
        />
      </div>
      <div class="w-50 ps-1 input-group">
        <input
          type="number"
          class="form-control"
          :id="`${id}_POINT`"
          placeholder="ポイント"
          :value="event.point"
        />
        <span class="input-group-text">Pts.</span>
      </div>
    </div>
    <div class="mb-1">
      <textarea
        class="form-control"
        :id="`${id}_DESCRIPTION`"
        rows="3"
        :value="event.description"
        placeholder="概要"
      />
    </div>
    <div class="row">
      <div class="w-50 pe-1">
        <div
          class="rounded-1 border text-center py-2 text-secondary pointer"
          @click="confirm_('閉じてよろしいですか？') ? close() : ''"
        >
          キャンセル
        </div>
      </div>
      <div class="w-50 ps-1">
        <div
          class="rounded-1 bg-secondary text-center py-2 text-light pointer"
          @click="confirm_('この内容で送信してよろしいですか？') ? send() : ''"
        >
          保存
        </div>
      </div>
    </div>
  </div>
  <!-- アンケート結果 -->
  <div v-else-if="mode == 1">
    <div v-if="notice.attend[0] || notice.absent[0]" class="d-flex mw-sm mx-auto my-3">
      <div class="col-6">
        <h6 class="text-center">出席</h6>
        <div v-for="key in notice.attend" :key="key">
          <p class="mb-1 text-center">
            {{ `${users[key].name}${users[key].nickname ? '(' + users[key].nickname + ')' : ''}` }}
          </p>
        </div>
      </div>
      <div class="col-6">
        <h6 class="text-center text-secondary">欠席</h6>
        <div v-for="key in notice.absent" :key="key">
          <p class="mb-1 text-center text-secondary">
            {{ `${users[key].name}${users[key].nickname ? '(' + users[key].nickname + ')' : ''}` }}
          </p>
        </div>
      </div>
    </div>
    <div v-else><p class="text-secondary text-center my-3">回答者がいません</p></div>

    <div class="w-50 pe-1">
      <div
        class="rounded-1 border text-center py-2 text-secondary pointer"
        @click="confirm_('閉じてよろしいですか？') ? close() : ''"
      >
        とじる
      </div>
    </div>
  </div>
  <!-- 出席登録者 -->
  <div v-else-if="mode == 2">
    <h4 class="mb-0 text-center">{{ event.title }}</h4>
    <div v-if="notice.code[0]" class="row my-3 p-3">
      <div v-for="key in notice.code" :key="key" class="col-md-4 col-6 p-1">
        <div class="border bg-light rounded-1 p-1">
          <h6 class="mb-0"><i class="bi bi-person-check"></i> {{ users[key].name }}</h6>
        </div>
      </div>
    </div>
    <div v-else><p class="text-secondary text-center my-3">出席登録されていません</p></div>
    <div class="w-50 pe-1">
      <div
        class="rounded-1 border text-center py-2 text-secondary pointer"
        @click="confirm_('閉じてよろしいですか？') ? close() : ''"
      >
        とじる
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventEditor',
  props: ['data', 'id', 'users'],
  emits: ['save', 'close'],
  data() {
    return {
      sendID: '',
      event: {},
      mode: 0
    }
  },
  created() {
    if (this.id == '__NEW') {
      this.event = {
        type: '',
        title: '',
        term: {
          begin: ' 18:15',
          end: ' 20:00'
        },
        place: '',
        code: '',
        point: '',
        description: ''
      }
      this.sendID = `${new Date().getTime().toString(16).toUpperCase()}`
    } else {
      this.event = this.data
      this.sendID = this.id
    }
  },
  methods: {
    confirm_(str) {
      return confirm(str)
    },
    send() {
      const value = (id) => {
        return document.getElementById(id).value
      }
      // 不備チェック
      if (!value(`${this.id}_TITLE`)) {
        alert('イベント名が入力されていません')
        return
      }
      if (!value(`${this.id}_TERM_BEGIN_DATE`) || !value(`${this.id}_TERM_END_DATE`)) {
        alert('日付を入力してください')
        return
      }
      if (!value(`${this.id}_PLACE`)) {
        alert('開催場所の入力は必須です')
        return
      }

      // 手動更新できないデータを受け継ぐ
      let tags, notice, attenders
      if (this.id == '__NEW') {
        tags = ['Portal2024から登録']
        notice = {}
        attenders = {}
      } else {
        tags = this.event.tags
        notice = this.event.notice || ''
        attenders = this.event.attenders || ''
      }

      // データを親コンポーネントに送信
      const sendData = {
        type: value(`${this.id}_TYPE`),
        title: value(`${this.id}_TITLE`),
        term:
          value(`${this.id}_TERM_BEGIN_TIME`) && value(`${this.id}_TERM_END_TIME`)
            ? {
                allday: false,
                begin: `${value(`${this.id}_TERM_BEGIN_DATE`)} ${value(
                  `${this.id}_TERM_BEGIN_TIME`
                )}`,
                end: `${value(`${this.id}_TERM_END_DATE`)} ${value(`${this.id}_TERM_END_TIME`)}`
              }
            : {
                allday: true,
                begin: value(`${this.id}_TERM_BEGIN_DATE`),
                end: value(`${this.id}_TERM_END_DATE`)
              },
        place: value(`${this.id}_PLACE`),
        tags: tags,
        code: value(`${this.id}_CODE`),
        point: value(`${this.id}_POINT`),
        description: value(`${this.id}_DESCRIPTION`),
        notice: notice,
        attenders: attenders
      }
      this.$emit('save', sendData, this.sendID)
    },
    close() {
      this.$emit('close')
    }
  },
  computed: {
    notice() {
      const usersKeys = this.$store.getters.usersKeys
      const notice = this.event.notice || {}
      const attenders = this.event.attenders || {}
      let attend = []
      let absent = []
      let code = []

      usersKeys.forEach((key) => {
        if (notice[key]) {
          ;(notice[key] == 1 ? attend : absent).push(key)
        }
        if (attenders[key]) {
          code.push(key)
        }
      })
      return { attend: attend, absent: absent, code: code }
    }
  }
}
</script>

<style></style>
