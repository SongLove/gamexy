<template>
  <div v-show="startShow" class="result-box">
    <div v-show="isVictory === 3" class="start">
      {{guanKa}}
      <div @click="start" class="start-btn"></div>
    </div>
    <div v-show="isVictory === 1" class="victory">
      获得 {{routerTier * 100}} 金币
      <div @click="nextStart" class="start-btn start-btn2"></div>
    </div>
    <div v-show="isVictory === 0" class="victory defeated">
      您被击败了
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameStatr',
  props: {
    startShow: {
      type: Boolean,
      default: true
    },
    routerTier: {
      type: Number,
      default: 1
    },
    isVictory: {
      type: Number,
      default: 3
    },
    guanKa: {
      type: String,
      default: '1-1'
    }
  },
  methods: {
    start () {
      this.$emit('onStart')
    },
    nextStart () {
      this.$emit('onNextStart')
    }
  }
}
</script>

<style lang="stylus" scopend>
@import '../../assets/styles/publicImg.styl'
.result-box
  z-index 9
  width 3.8rem
  height 4rem
  position absolute
  top 50%
  left 50%
  transform translate(-1.9rem, -1.2rem)
  .victory
    position absolute
    width 3.8rem
    height 3.5rem
    font-size 0.3rem
    line-height 5.5rem
    color $textColor
    text-align center
    font-weight 600
    background-url('zd/u_win.png')
    &.defeated
      background-url('zd/u_ful.png')
  .start
    width 3.8rem
    height 2.6rem
    font-size 0.3rem
    text-align center
    line-height 3.7rem
    font-weight 600
    color $textColor
    background-url('zd/u_guank.png')
  .start-btn
    width 2.2rem
    height 0.7rem
    position absolute
    left 50%
    transform translateX(-1.1rem)
    bottom 0.7rem
    background-url('zd/an_v01.png')
    &.start-btn2
      bottom -1rem
      z-index 9
      background-url('an_k02.png')
</style>
