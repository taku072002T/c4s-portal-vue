<template>
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
        class="rounded-1 border text-center py-2 text-secondary hover pointer"
        @click="confirm_('閉じてよろしいですか？') ? close() : ''"
      >
        キャンセル
      </div>
    </div>
    <div class="w-50 ps-1">
      <div
        class="rounded-1 bg-secondary text-center py-2 text-light hover pointer"
        @click="confirm_('この内容で送信してよろしいですか？') ? send() : ''"
      >
        保存
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventEditor',
  props: ['data', 'id'],
  emits: ['save', 'close'],
  data() {
    return {
      sendID: '',
      event: {}
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
      this.sendID = new Date().getTime().toString(16).toUpperCase()
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
        notice = this.event.notice
        attenders = this.event.attenders
      }

      // データを親コンポーネントに送信
      const sendData = {
        type: value(`${this.id}_TYPE`),
        title: value(`${this.id}_TITLE`),
        term:
          value(`${this.id}_TERM_BEGIN_TIME`) && value(`${this.id}_TERM_END_TIME`)
            ? {
                allday: false,
                begin: `${value(`${this.id}_TERM_BEGIN_DATE`)} ${value(`${this.id}_TERM_BEGIN_TIME`)}`,
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
  }
}
</script>

<style></style>
