<template>
  <div class="cheallenge">
    <div class="checkpoint"
      v-for="item in checkPoint"
      :key="item.tier"
      @click="goCheallenge(item.tier, item.tierGuan)"
    >
      <span class="check-text">（ {{item.tierGuan}}-9 ）</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'Vuex'
export default {
  name: 'Cheallenge',
  data () {
    return {
      atBloodTimer: ''
    }
  },
  computed: {
    ...mapState([
      'tier',
      'tierGuan',
      'checkPoint',
      'atBlood',
      'atk',
      'blood'
    ])
  },
  watch: {
    $route (to, from) {
      if (to.name === 'CheallengeIng') {
        clearInterval(this.atBloodTimer)
      }
      if (from.name === 'CheallengeIng' && to.name !== 'CheallengeIng') {
        this.atbTimer()
      }
    }
  },
  methods: {
    ...mapMutations({
      setAtBlood: 'SET_ATBLOOD'
    }),
    atbTimer () {
      this.atBloodTimer = setInterval(() => {
        if (this.atBlood !== this.blood) {
          this.setAtBlood(-2)
        }
      }, 5000)
    },
    goCheallenge (itemTier, itemTierGuan) {
      if (this.atBlood <= 0 || this.atk <= 0) {
        this.$todoMsg({
          content: '请武装自己再进入挑战！'
        })
        return
      }
      if (itemTierGuan === 9) {
        this.$todoMsg({
          content: '本层已通过，请前往下一层'
        })
        return
      }
      if (itemTier === this.tier && itemTierGuan === this.tierGuan) {
        // BOSS属性：初始属性为20血，1-3伤害，每层BOSS在原来的基础上增加10点血和上下限2点伤害
        let bossAtk = 3 + itemTierGuan * 2
        let bossBlood = 20 + itemTierGuan * 10
        let bossUrl = require(`../../assets/img/zd/boss_dj/0${itemTierGuan + 1}.gif`)
        let bossChallenge = {
          itemTier, // 层数
          itemTierGuan, // 关卡
          bossAtk, // boss攻击力
          bossBlood,
          bossUrl
        }
        this.$router.push({
          path: '/interface/cheallengeing',
          query: bossChallenge
        })
      } else {
        this.$todoMsg({
          content: '未满足条件，禁止进入'
        })
      }
    }
  },
  mounted () {
    this.atbTimer()
  }
}
</script>

<style lang="stylus" scopend>
@import '../../assets/styles/publicImg.styl'
.cheallenge
  background-url('tz/bg5.jpg')
  position relative
  .checkpoint
    position absolute
    width 2.3rem
    height 2.2rem
    color #fff
    font-size 0.3rem
    text-align center
    line-height 1rem
    .check-text
      position absolute
      left 50%
      bottom 0
      width 100%
      height 0.5rem
      line-height 0.5rem
      transform translateX(-50%)
      font-size 0.25rem
      color #571008
      font-weight 600
    &:nth-child(1)
      top 1.2rem
      right 12%
      background-url('tz/an_c1.png')
    &:nth-child(2)
      height 2.5rem
      top 3rem
      left 12%
      background-url('tz/an_c2.png')
    &:nth-child(3)
      height 2.6rem
      top 4.5rem
      right 12%
      background-url('tz/an_c3.png')
    &:nth-child(4)
      width 2.8rem
      height 3rem
      top 6.5rem
      left 5.5%
      background-url('tz/an_c4.png')
      @media screen and (min-width 768px)
        left 6.52%
      @media screen and (min-width 1024px)
        left 7%
      .check-text
        left 58%
    &:nth-child(5)
      width 2.75rem
      height 3rem
      top 8rem
      right 8%
      background-url('tz/an_c5.png')
      @media screen and (min-width 768px)
        right 8.52%
      @media screen and (min-width 1024px)
        right 9%
      .check-text
        left 48%
</style>
