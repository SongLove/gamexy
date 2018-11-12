<template>
  <div class="header">
    <ul class="header-ul">
      <li class="header-li">
        <img style="width:90%;height:95%" :src="roleIcon"/>
        <div class="conent-box"></div>
      </li>
      <li class="header-li">
        <div class="blood-box">
          <div class="blood">
            血量 {{atBlood}} / {{blood}}
          </div>
          <div :style="{width: getTiaoWidth}" class="blood-tiao"></div>
        </div>
        <div class="atk">
          攻击力  {{atk}}
        </div>
      </li>
      <li class="header-li">
        <div class="money-box">
          <i class="icon"></i>
          <span class="money-text">{{money}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'Vuex'
export default {
  name: 'HeaderBox',
  data () {
    return {
      tiao: ''
    }
  },
  computed: {
    ...mapState([
      'roleIcon',
      'money',
      'blood',
      'atBlood',
      'atk',
      'harmBlood'
    ]),
    getTiaoWidth () {
      return this.tiao / (this.blood / this.atBlood) + 'px'
    }
  },
  watch: {
  },
  methods: {
    ...mapMutations({
      setAtblood: 'SET_ATBLOOD'
    })
  },
  mounted () {
    this.$nextTick(() => {
      this.tiao = $('.blood').width()
    })
    this.setAtblood(-this.blood)
  }
}
</script>

<style lang="stylus" scopend>
@import '../../assets/styles/publicImg.styl'
.header
  position fixed
  top 0
  width 100%
  height 1.5rem
  z-index 99
  .header-ul
    display flex
    width 100%
    height 100%
    flex-direction row
    .header-li
      flex 1
      height 100%
      font-size 0.25rem
      position relative
      text-indent 0.1rem
      font-weight 600
      .conent-box
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        background-size 100% 100%
        background-url('u_k1.png')
        font-size 0.25rem
      &:first-child
        flex 0 0 20%
      &:nth-child(2)
        .blood-box
          width 3rem
          height 0.7rem
          line-height 0.6rem
          color #fff
          padding 0.05rem
          margin-right 0.5rem
          box-sizing border-box
          background-size 100% 100%
          background-url('u_k2.png')
          background-color #272727
          border-radius 0.1rem
          overflow hidden
          position relative
          @media screen and (min-width 1024px)
            width 4rem
          .blood
            position absolute
            top 0.05rem
            left 0.05rem
            width 2.9rem
            height 89%
            background-size 100% 100%
            z-index 2
            @media screen and (min-width 1024px)
              width 3.9rem
          .blood-tiao
            width 100%
            height 101%
            background-size 100% 100%
            background-url('u_blo.png')
            z-index 1
        .atk
          width 65%
          height 0.5rem
          line-height 0.5rem
          text-indent 0.15rem
          color #19d219
          background-size 100% 100%
          background-url('u_k3.png')
      &:nth-child(3)
        .money-box
          width 90%
          height 0.65rem
          line-height 0.65rem
          text-indent 0.2rem
          background-size 100% 100%
          background-url('u_k4.png')
          .money-text
            display inline-block
            text-indent 0.2rem
          .icon
            display inline-block
            width 0.5rem
            height 0.4rem
            background-size 100% 100%
            vertical-align middle
            margin-right 0.1rem
            margin-top -0.1rem
            background-url('u_G002.png')
</style>
