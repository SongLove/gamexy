<template>
  <div class="onhook">
    <div class="onhook-box">
      <div v-show="roleGo" :class="pao" class="role-go">
        <img :src="roleGif" />
      </div>
      <div v-show="onhookGif" class="onhook-gif pk-box">
        <img :src="onhookchangjGif"/>
      </div>
      <div v-show="pkbgShow" class="pk-box pk-bg">
        <img class="da1" v-show="daShow" src="../../assets/img/da1.gif"/>
        <img class="da1" v-show="!daShow" src="../../assets/img/da2.gif"/>
      </div>
    </div>
    <div class="count-moeny">
      <div class="moeny-time">银两收益 ：<i class="icon"></i>2 / 5秒</div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'Vuex'
export default {
  name: 'OnHook',
  data () {
    return {
      timer: '',
      roleGoTimer: '', // 人物走动定时器
      roleGif: require('../../assets/img/da3.gif'), // 人物
      onhookGifTimer: '', // 场景进入定时器
      daTimer: '', // 人物打斗定时器
      againTimer: '', // 动画重复定时器
      roleGo: true,
      onhookGif: false,
      pkbgShow: false,
      daShow: true,
      onhookchangjGif: '',
      paoClass: 0
    }
  },
  computed: {
    ...mapState([
      'money'
    ]),
    pao () {
      return `paoClass${this.paoClass}`
    }
  },
  methods: {
    ...mapMutations({
      setMoney: 'SET_MONEY'
    }),
    getInfo () {
      this.paoClass++
      if (this.paoClass >= 10) {
        this.paoClass = 2
      }
      this.roleGoTimer = '' // 人物走动定时器
      this.onhookGifTimer = '' // 场景进入定时器
      this.daTimer = '' // 人物打斗定时器
      this.roleGo = true
      this.onhookGif = false
      this.pkbgShow = false
      this.daShow = true
      this.againTimer = ''
      this.onhookchangjGif = ''
      this.roleGif = require('../../assets/img/da3.gif')
      clearTimeout(this.roleGoTimer)
      clearTimeout(this.onhookGifTimer)
      clearTimeout(this.daTimer)
      clearTimeout(this.againTimer)
      this.anmDadou()
    },
    anmDadou () {
      this.roleGoTimer = setTimeout(() => {
        this.roleGo = false
        this.onhookchangjGif = require('../../assets/img/bg_war.gif')
        this.roleGif = ''
        this.onhookGif = true
      }, 3300)
      this.onhookGifTimer = setTimeout(() => {
        this.onhookGif = false
        this.onhookchangjGif = ''
        this.pkbgShow = true
      }, 4200)
      this.daTimer = setTimeout(() => {
        this.daShow = false
      }, 7500)
      this.againTimer = setTimeout(() => {
        this.getInfo()
      }, 9800)
    }
  },
  mounted () {
    this.getInfo()
    this.timer = setInterval(() => {
      this.setMoney(this.money + 2)
    }, 5000)
  },
  activated () {
    this.getInfo()
  },
  deactivated () {
    clearTimeout(this.roleGoTimer)
    clearTimeout(this.onhookGifTimer)
    clearTimeout(this.daTimer)
    clearTimeout(this.againTimer)
  }
}
</script>

<style lang="stylus" scopend>
@import '../../assets/styles/publicImg.styl'
.onhook
  background-url('bg2.jpg')
  overflow hidden
  .onhook-box
    position absolute
    top 0
    left 0
    bottom 1.5rem
    width 100%
    height 100%
    .pk-box
      position absolute
      width 100%
      height 100%
      top 0
      bottom 0
    .role-go
      position absolute
      top 1.5rem
      left 5.5rem
      width 2.5rem
      height 2.5rem
      &.paoClass4
        top 4.5rem
        left 5.5rem
        @media screen and (min-width 768px)
          top 5rem
          left 7.5rem
        @media screen and (min-width 1024px)
          left 8rem
      &.paoClass6
        top 8rem
        left 3rem
        @media screen and (min-width 768px)
          top 7rem
          left 3.5rem
        @media screen and (min-width 1024px)
          top 7.5rem
          left 4.5rem
      &.paoClass8
        top 1.5rem
        left 1rem
        @media screen and (min-width 768px)
          top 1rem
          left 2rem
      @media screen and (min-width 768px)
        left 7.5rem
      img
        width 100%
        height 100%
    .onhook-gif
      img
        width 100%
        height 100%
    .pk-bg
      background-url('bg2sj.jpg')
      .da1
        width 6rem
        height 4rem
        position absolute
        top 35%
        left 50%
        transform translateX(-3rem)
  .count-moeny
    position absolute
    bottom .5rem
    width 40%
    height 0.6rem
    margin-left 30%
    line-height 0.5rem
    background-size 100% 100%
    padding 0.05rem 0.1rem
    text-align center
    color #fff
    font-size 0.25rem
    background-url('u_k5.png')
    box-sizing border-box
    z-index 9
    .icon
      display inline-block
      width 0.4rem
      height 0.3rem
      background-size 100% 100%
      vertical-align middle
      margin-right 0.1rem
      background-url('u_G002.png')
</style>
