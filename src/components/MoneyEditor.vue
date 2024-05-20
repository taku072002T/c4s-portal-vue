<template>
  <PopUp :open="true" @close="close">
    <!-- 出金<->入金の切り替え -->
    <div class="w-100 rounded-pill pillback px-4 py-2 mb-2">
      <input type="radio" name="toggle" class="hide" id="in" value="1" v-model="mode" />
      <label for="in" class="col-6">
        <h4 class="in text-center mb-0 pointer">入金</h4>
      </label>
      <input type="radio" name="toggle" class="hide" id="out" value="-1" v-model="mode" />
      <label for="out" class="col-6">
        <h4 class="out text-center mb-0 pointer">出金</h4>
      </label>
    </div>
    <!-- 未選択時 -->
    <div v-if="mode == 0">
      <p class="mb-0 text-center">選択してください</p>
    </div>
    <!-- 選択時 -->
    <div v-else>
      <div class="mb-1">
        <input type="text" class="form-control" placeholder="名目" v-model="money.name" />
      </div>
      <div class="input-group mb-1">
        <input type="number" class="form-control" v-model="money.price_" />
        <span class="input-group-text" id="basic-addon1">円</span>
      </div>
      <div class="mb-1">
        <input type="date" class="form-control" v-model="money.date" />
      </div>
      <div class="mb-1">
        <textarea class="form-control" rows="3" placeholder="備考" v-model="money.detail" />
      </div>
      <div
        class="w-50 mx-auto rounded-1 bg-secondary text-center py-2 text-light hover pointer"
        @click="send()"
      >
        保存
      </div>
    </div>
  </PopUp>
</template>

<script>
import PopUp from '@/components/PopUp.vue'

export default {
  name: 'MoneyEditor',
  props: ['data', 'id'],
  emits: ['send', 'close'],
  components: {
    PopUp
  },
  data() {
    return {
      money: {},
      sendID: '',
      mode: 0
    }
  },
  created() {
    if (this.id == '__NEW') {
      this.money = {
        date: new Date().toLocaleDateString('sv-SE'),
        detail: '',
        liquid: false,
        name: '',
        price: 0,
        type: 'other',
        userId: this.$store.state.user.uid
      }
      this.sendID = new Date().getTime().toString(16).toUpperCase()
      this.mode = 0
    } else {
      this.sendID = this.id
      this.money = deepCopy(this.data)
      this.money.price_ = Math.abs(this.money.price)
      this.mode = this.data.price / Math.abs(this.money.price)
    }
  },
  methods: {
    send() {
      // 不備チェック
      if (!this.money.name) {
        alert('名目を入力してください')
        return
      }
      if (this.money.price_ <= 0) {
        alert('金額は正しく入力してください')
        return
      }
      if (!this.money.date) {
        alert('日付が不正です')
        return
      }
      // 確認
      if (!confirm('この内容で送信しますか？')) {
        return
      }
      this.money.price = this.mode * this.money.price_
      // 送信
      this.$emit('send', this.sendID, this.money)
    },
    close() {
      if (!confirm('閉じてよろしいですか？')) {
        return
      }
      this.$emit('close')
    }
  }
}

function deepCopy(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    let copy = []
    for (let i = 0; i < obj.length; i++) {
      copy[i] = deepCopy(obj[i])
    }
    return copy
  }

  let copy = {}
  for (let key in obj) {
    // Object.prototype.hasOwnProperty.call を使用してチェック
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepCopy(obj[key])
    }
  }
  return copy
}
</script>

<style>
.pillback {
  background-color: rgb(15, 15, 31);
}
.rating {
  background-color: rgba(0, 0, 16, 0.8);
  padding: 0.4rem 0.4rem 0.1rem 0.4rem;
  border-radius: 2.2rem;
}
.hide {
  display: none;
}
#in + label {
  transition: 0.2s;
  color: white;
}
#in:hover + label {
  color: rgb(255, 63, 63);
}
#in:checked + label {
  color: rgb(255, 127, 127);
}
#out + label {
  transition: 0.2s;
  color: white;
}
#out:hover + label {
  color: rgb(63, 63, 255);
}
#out:checked + label {
  color: rgb(127, 127, 255);
}
</style>
