<template>
  <PopUp :open="id" @close="$emit('close')">
    <div class="py-3">
      <div v-if="disp == 'default' || disp == 'failed'">
        <h5 class="text-center">出席コード</h5>
        <input
          type="text"
          class="form-control text-center w-75 mx-auto"
          id="codeinput"
          v-model="codeInput"
        />
        <div class="w-75 mx-auto">
          <button
            type="button"
            class="col-12 btn btn-outline-dark mt-3 rounded-pill w-100"
            @click="attend()"
          >
            <i class="bi bi-check"> </i>出席登録
          </button>
        </div>
        <div v-if="disp == 'failed'" class="text-center text-danger mt-3">
          <h1><i class="bi bi-x-lg"></i></h1>
          <h3>出席コードが違います！</h3>
        </div>
      </div>
      <div v-if="disp == 'success'" class="text-center text-success">
        <h1><i class="bi bi-check-lg"></i></h1>
        <h3>出席が登録されました！</h3>
        <b>{{ data.point }}ポイント獲得！</b>
      </div>
      <div v-if="disp == 'already'" class="text-primary text-center">
        <h1><i class="bi bi-check-lg"></i></h1>
        <h3>すでに出席登録されています</h3>
      </div>
    </div>
  </PopUp>
</template>

<script>
import PopUp from '@/components/PopUp.vue'

export default {
  name: 'CodeForm',
  components: {
    PopUp
  },
  props: ['id', 'data'],
  emits: ['close'],
  data() {
    return {
      answer: '',
      disp: 'default',
      codeInput: ''
    }
  },
  methods: {
    attend() {
      // コード認証
      if (!this.data.code) {
        alert('このイベントには出席コードが登録されていません…なぜこの画面を表示出来ているんだ？')
        return
      }
      if (!this.codeInput) {
        this.disp = 'default'
        return
      }
      if (this.data.code == this.codeInput) {
        this.disp = 'success'
      } else {
        this.disp = 'failed'
      }
    }
  }
}
</script>

<style>
#codeinput {
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 1.5em;
  text-indent: 1.5em;
  line-height: 35px;
  caret-color: white;
  border: none;
  border-bottom: solid 1px gray;
  border-radius: 0;
}
</style>
