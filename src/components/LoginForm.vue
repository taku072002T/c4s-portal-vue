<template>
  <div class="mw-sm mx-auto mx-auto mt-25vh">
    <p class="fw-bold text-center text-danger mb-0">ご利用には学籍番号による認証が必要です</p>
    <div class="box_det">
      <input
        size="30"
        type="number"
        class="wide"
        name="StudentsNumbers"
        placeholder="学籍番号を入力"
        v-model="SNumInput"
        max="9999999"
      />
    </div>
    <button class="startBtn" @click="checkInput(SNumInput)">認証する</button>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return { SNumInput: '' }
  },

  methods: {
    // 特定の位の数を返す (targetには取り出す元の数を、nには右から何番目の数を取り出すのかを指定する => n=2のときはtargetの10の位を取り出す)
    exportTheNum(target, n){
      return Math.floor((target / (10 ** (n - 1))) % 10)
    },

    checkInput(inputContent){
      // 現在の年 (西暦)
      const currentYear = new Date().getFullYear();

      // 現在の年の下2桁
      const year_tail2 = this.exportTheNum(currentYear, 2) * 10 + this.exportTheNum(currentYear, 1);
      const userInputEnterYear = this.exportTheNum(inputContent, 5) * 10 + this.exportTheNum(inputContent, 4);

      // 桁数確認 & 入学年度の確認(10年以内に入学している)
      if(inputContent.toString().length == 7){
        if((year_tail2 - userInputEnterYear) <= 10 && (year_tail2 - userInputEnterYear) >= 0){
          this.$emit('send', 'StudentsNumbers', inputContent.toString() + '@ed.tus.ac.jp')
        } else {
          alert("入学年度が無効です。");
        }
      } else {
        alert("無効な数字です。");
      }
    }
  }
}
</script>

<style>
.box_det {
  position: relative;
  padding: 1em;
  border-bottom: 1px solid var(--c-c4s);
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
@media only screen and (max-width: 768px) {
  .box_det {
    padding: 0.5em;
    display: block;
    width: 100%;
  }
}
.wide {
  width: 100%;
  height: 3em;
  padding: 0.5em;
  border: none;
  outline: none;
  background: transparent;
  color: var(--c-c4s-dark);
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

button.startBtn {
  display: block;
  text-align: center;
  vertical-align: middle;
  width: 50%;
  margin: 1em auto;
  padding: 0.5rem 1rem;
  position: relative;
  border-radius: 5px;
  border: 1px solid var(--c-c4s);
  font-weight: bold;
  letter-spacing: 2px;
  background: transparent;
  color: var(--c-c4s);
  overflow: hidden;
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}
button.startBtn:hover {
  color: #fff;
  background: var(--c-c4s);
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}
button.startBtn:hover::before {
  -webkit-animation: sh02 0.5s 0s linear;
  -moz-animation: sh02 0.5s 0s linear;
  animation: light 0.5s 0s linear;
}
button.startBtn::before {
  content: '';
  display: block;
  width: 0px;
  height: 86%;
  position: absolute;
  top: 7%;
  left: 0%;
  opacity: 0;
  background: #fff;
  box-shadow: 0 0 50px 30px #fff;
  -webkit-transform: skewX(-20deg);
  -moz-transform: skewX(-20deg);
  -ms-transform: skewX(-20deg);
  -o-transform: skewX(-20deg);
  transform: skewX(-20deg);
}
@keyframes light {
  from {
    opacity: 0;
    left: 0%;
  }
  50% {
    opacity: 1;
  }
  to {
    opacity: 0;
    left: 100%;
  }
}
</style>
