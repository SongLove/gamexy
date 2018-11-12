<template>
  <div class="bottom">
    <ul class="bottom-ul">
      <router-link tag="li" exact to="/interface/onhook" class="bottom-li">
        <div class="icon-box">
          <div class="li-icon li-icon1" style="border:none"></div>
        </div>
      </router-link>
      <router-link tag="li" to="/interface/skill" class="bottom-li">
        <div class="icon-box">
          <div class="li-icon li-icon2"></div>
        </div>
      </router-link>
      <router-link tag="li" to="/interface/mypet" class="bottom-li">
        <div class="icon-box">
          <div class="li-icon li-icon3"></div>
        </div>
      </router-link>
      <router-link tag="li" to="/interface/cheallenge" class="bottom-li">
        <div class="icon-box">
          <div class="li-icon li-icon4"></div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BottomBox'
}
</script>

<style lang="stylus" scopend>
@import '../../assets/styles/publicImg.styl'
.bottom
  position fixed
  bottom 0
  width 100%
  height 1.5rem
  z-index 1
  .bottom-ul
    display flex
    width 100%
    height 100%
    flex-direction row
    background-url('c.png')
    background-repeat repeat-x
    .bottom-li
      width 25%
      text-align center
      font-size 0.25rem
      .icon-box
        width 100%
        height 100%
        padding 0.15rem 0.3rem
        box-sizing border-box
        position relative
        .li-icon
          width 1.3rem
          height 1.2rem
          margin 0 auto
          &.li-icon1
            background-url('an_01gj.png')
          &.li-icon2
            background-url('an_02jn.png')
          &.li-icon3
            background-url('an_03cw.png')
          &.li-icon4
            background-url('an_04tz.png')
      &.router-link-active
        background-url('bg2_d2.png')
</style>
