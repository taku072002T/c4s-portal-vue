<template>
    <h5 class="MSG"><strong>現在、メンテナンス中です。終了までしばらくお待ちください。</strong></h5>
    <div class="iconDeco gradient-text">
      <i class="bi bi-cone-striped"></i>
    </div>
  </template>
  
  <script>
    export default {
        name: 'Maintenance'
    }
  </script>
  
  <style>
    .MSG{
        color: rgb(255, 58, 58);
        text-align: center;
        margin-top: 10%;
    }

    .iconDeco{
        /* color: rgb(255, 98, 0); */
        justify-content: center;
        display: flex;
        margin-top: 3%;
        font-size: 12vw;
    }

    .gradient-text {
      background: linear-gradient(
        to bottom,
        #f52009,
        #f52009,
        #f52009,
        #f52009,
        #f52009,
        #f52009,
        rgb(255, 51, 0),
        rgb(255, 98, 0),
        rgb(255, 98, 0),
        rgb(255, 98, 0),
        rgb(255, 98, 0),
        rgb(255, 98, 0),
        rgb(255, 98, 0),
        #ff7f00,
        #ffbb00,
        #ff7f00,
        rgb(255, 98, 0),
        rgb(255, 98, 0),
        rgb(255, 98, 0),
        rgb(255, 98, 0),
        rgb(255, 98, 0),
        rgb(255, 98, 0),
        rgb(255, 51, 0),
        #f52009,
        #f52009,
        #f52009,
        #f52009,
        #f52009,
        #f52009,
        #f52009,
        #f52009
      );
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      background-size: 100% 400%;
      animation: textGradient 10s linear infinite;
    }

    @keyframes textGradient {
      0% {
        background-position: 0% 100%;
      }
      25% {
        background-position: 0% 85%;
      }
      50% {
        background-position: 0% 50%;
      }
      75% {
        background-position: 0% 15%;
      }
      100% {
        background-position: 0% 0%;
      }
    }

    /* オプション: アニメーションの一時停止 */
    .gradient-text:hover {
      animation-play-state: paused;
    }
  </style>