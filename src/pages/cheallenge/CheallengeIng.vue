<template>
  <transition v-cloak name="page1">
    <div style="bottom: 0" class="cheallengeing">
      <div @click="goBack" class="back"></div>
      <div class="ing-title">第{{routerTier}}-{{routerTierGuan}}关</div>
      <div class="combat">
        <game-start
        @onStart="goStart"
        @onNextStart="goNextStart"
        :startShow="startShow"
        :isVictory="isVictory"
        :guanKa="guanKa"
        :routerTier="routerTier"
        />
        <div class="boss">
          <div class="boss-blood-box">
            <div class="boss-blood">
              血量 {{bossBlood}} / {{bossBloodAnd}}
            </div>
            <div class="boss-blood-tiao" :style="{width: getBossBlood}"></div>
          </div>
          <img :src="bossUrl"/>
        </div>
        <div class="role-box" :class="roleClass">
          <img :src="roleUrl"/>
        </div>
        <div class="bossjn" v-show="isBossAttack">
          <img src="../../assets/img/zd/jn/bossjn/gj.gif"/>
        </div>
        <div v-show="isShowGif === '1'" class="jj">
          <img src="../../assets/img/zd/jn/jj/jj.gif">
        </div>
        <div v-show="isShowGif === '2'" class="jhyj">
          <img src="../../assets/img/zd/jn/jhyj.gif">
        </div>
        <div v-show="isShowGif === '3'" class="wjgz" >
          <img src="../../assets/img/zd/jn/wjgz.gif"/>
        </div>
         <div v-show="isShowGif === '4'" class="qkyz" >
          <img src="../../assets/img/zd/jn/qkyz/qkyz.gif"/>
        </div>
      </div>
      <div></div>
      <div class="energy">
        <div class="energy-box">
          <div class="energy-tiao">
            <div :style="{width: getTiaoWidth}" class="tiao-box"></div>
          </div>
          <div class="energy-yuan" :class="{bggreen : energy >= energyEnd}">
            {{energy}}/{{energyEnd}}
          </div>
        </div>
      </div>
      <ul class="skill-ul">
        <li class="skill-li-box" v-for="item in skillList"
        :key="item.id"
        :class="{'shake-faguang' : item.isAnm}"
        @click="onsetSkill(item.isActive, item.isAnm, item.id)"
        >
        <div v-show="item.isLoader">
          <div class="loader-box"></div>
          <div class="loader"></div>
        </div>
          <div class="skill-box">
            <img :src="item.isSkill"/>
            <i class="icon">{{item.isActive}}</i>
          </div>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'Vuex'
import GameStart from './GameStart'
import { setTimeout, setInterval, clearTimeout, clearInterval } from 'timers'
export default {
  name: 'CheallengeIng',
  data () {
    return {
      startShow: true,
      isVictory: 3,
      tiao: '',
      bossShouAtk: '', // boss受到的伤害
      skillList: [
        {
          id: '1',
          isSkill: require('../../assets/img/zd/u_01jj(x).png'),
          isActive: 1,
          isAnm: false,
          isLoader: false
        },
        {
          id: '2',
          isSkill: require('../../assets/img/zd/u_02jj(x).png'),
          isActive: 4,
          isAnm: false,
          isLoader: false
        },
        {
          id: '3',
          isSkill: require('../../assets/img/zd/u_03jj(x).png'),
          isActive: 20,
          isAnm: false,
          isLoader: false
        },
        {
          id: '4',
          isSkill: require('../../assets/img/zd/u_04jj(x).png'),
          isActive: 20,
          isAnm: false,
          isLoader: false
        }
      ],
      tiaoPra: '', // 能量条宽度计算
      energyTimer: '', // 能量计算器
      bossAttackTimer: '', // boss 攻击的计算器
      bossAnTimer: '', // boss攻击结束
      roleAttackTimer: '', // 英雄攻击的计算器
      routerTier: 0, // 层
      routerTierGuan: '', // 关卡
      bossBlood: '', // boss血条
      bossBloodAnd: '', // boss 初始血条
      boSsAtk: '', // boss攻击力
      isBossAttack: false, // boss 是否在攻击
      isShowGif: '', // 显示哪个技能
      rolejnHarm: '', // 英雄使用技能的攻击力
      bossUrl: '', // bossgif图
      roleSrc: 'dj',
      thisAnSkill: 0, // 当前点击的技能 用来消除冷却
      thisAnSkillTimer: '',
      thisAnSkillTimer0: '',
      thisAnSkillTimer1: '',
      thisAnSkillTimer2: '',
      thisAnSkillTimer3: ''
    }
  },
  components: {
    GameStart
  },
  computed: {
    ...mapState([
      'energy',
      'energyEnd',
      'blood',
      'atBlood',
      'harmBlood',
      'skillUrl',
      'money'
    ]),
    getBossBlood () {
      if (this.bossShouAtk === '') {
        return this.tiao
      }
      return parseInt(this.tiao / (this.bossBloodAnd / this.bossBlood)) + 'px'
    },
    roleClass () {
      return `roleClass${this.roleSrc}`
    },
    roleUrl () {
      let isPng = 'gif'
      if (this.roleSrc === '5') {
        isPng = 'png'
      }
      return require(`../../assets/img/zd/role${this.roleSrc}.${isPng}`)
    },
    guanKa () {
      return this.routerTier + '-' + this.routerTierGuan
    },
    getTiaoWidth () { // 计算能量条%
      return parseInt(this.tiaoPra / (this.energyEnd / this.energy)) + 'px'
    }
  },
  watch: {
    energy: { // 监听能量上限做图片替换
      handler (newVal, oldVal) {
        this.skillList.forEach((k, v) => {
          if (k.isActive <= newVal && this.skillUrl[v].isActive) {
            k.isSkill = require(`../../assets/img/zd/u_0${v + 1}jj.png`)
            k.isAnm = true
          } else {
            k.isSkill = require(`../../assets/img/zd/u_0${v + 1}jj(x).png`)
            k.isAnm = false
          }
        })
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations({
      setEnergy: 'SET_ENERGY',
      setBlood: 'SET_BLOOD',
      setAtblood: 'SET_ATBLOOD',
      setHarmBlood: 'SET_HARMBLOOD',
      setMoney: 'SET_MONEY',
      setCheckPoint: 'SET_CHECKPOINT',
      setTier: 'SET_TIER'
    }),
    randomNum (minNum, maxNum) { // 随机伤害
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10)
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
        default:
          return 0
      }
    },
    goStart () { // 点击确定开始游戏
      this.startShow = false
      this.$todoMsg({
        content: '战斗开始'
      })
      this.bossAttackTimer = setInterval(() => {
        this.bossAttack()
        this.bossAnTimer = setTimeout(() => {
          this.isBossAttack = false
          $('.role-box').removeClass('opacity')
          clearTimeout(this.bossAnTimer)
        }, 2000)
      }, 2000)
      this.startEnergyTimer()
    },
    goNextStart () { // 下一关
      this.setCheckPoint(this.routerTierGuan)
      if (this.routerTierGuan === 9) {
        this.routerTier++
        this.routerTierGuan = 0
        this.setTier(this.routerTier)
        this.setCheckPoint(0)
      }
      let itemTier = this.routerTier
      let itemTierGuan = this.routerTierGuan
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
      this.getInfo()
    },
    goBack () { // 返回
      this.$router.push('/interface/cheallenge')
    },
    bossAttack () { // boss攻击
      this.isBossAttack = true
      $('.role-box').addClass('opacity')
      let atk = this.randomNum(1, this.bossAtk)
      this.setHarmBlood(atk)
      let msg = `BOSS发动技能，受到 ${atk} 伤害`
      this.$todoMsg({
        content: msg
      })
      this.setAtblood(atk)
      if (this.atBlood <= 0) {
        this.isShowGif = ''
        this.roleSrc = '5'
        this.gameOver(0)
      }
    },
    gameOver (index) { // 1胜利 0 失败
      this.startShow = true
      this.isVictory = index
      this.isBossAttack = false
      if (index === 1) {
        this.bossBlood = 0
        this.setMoney(this.money + this.routerTier * 100)
      }
      this.skillList.forEach((k) => {
        k.isLoader = false
      })
      this.clearTimer()
    },
    clearTimer () {
      clearInterval(this.energyTimer)
      clearInterval(this.bossAttackTimer)
      clearInterval(this.bossAnTimer)
      clearTimeout(this.roleAttackTimer)
      clearTimeout(this.thisAnSkillTimer0)
      clearTimeout(this.thisAnSkillTimer1)
      clearTimeout(this.thisAnSkillTimer2)
      clearTimeout(this.thisAnSkillTimer3)
    },
    roleAttack () { // 英雄攻击
      if (this.isVictory !== 3) {
        return
      }
      if (this.thisAnSkill === 0) {
        this.thisAnSkillTimer0 = setTimeout(() => {
          this.skillList[0].isLoader = false
        }, 1500)
      }
      if (this.thisAnSkill === 1) {
        this.thisAnSkillTimer1 = setTimeout(() => {
          this.skillList[1].isLoader = false
        }, 1500)
      }
      if (this.thisAnSkill === 2) {
        this.thisAnSkillTimer2 = setTimeout(() => {
          this.skillList[2].isLoader = false
        }, 1500)
      }
      if (this.thisAnSkill === 3) {
        this.thisAnSkillTimer3 = setTimeout(() => {
          this.skillList[3].isLoader = false
        }, 1500)
      }
      this.roleAttackTimer = setTimeout(() => {
        this.bossShouAtk = this.randomNum(1, this.rolejnHarm)
        this.bossBlood = this.bossBlood - this.bossShouAtk
        if (this.bossBlood <= 0) {
          this.gameOver(1)
        }
        this.roleSrc = 'dj'
        $('.boss').removeClass('opacity')
        this.isShowGif = ''
        clearTimeout(this.roleAttackTimer)
      }, 1600)
    },
    onsetSkill (skill, isAam, id) { // 点击只能消耗能量条
      this.thisAnSkill = (id - 0) - 1
      if (this.energy <= 0) {
        return
      }
      if (this.startShow) {
        return
      }
      if (isAam && !this.skillList[this.thisAnSkill].isLoader) {
        clearInterval(this.roleAttackTimer)
        let This = this
        this.skillUrl.forEach((k) => {
          if (k.id === id) {
            This.rolejnHarm = k.harm
            This.skillList[this.thisAnSkill].isLoader = true
          }
        })
        this.roleSrc = id
        this.isShowGif = id
        $('.boss').addClass('opacity')
        this.roleAttack()
        this.setEnergy(this.energy - skill)
      }
    },
    startEnergyTimer () { // 能量条每1秒增加1点
      this.energyTimer = setInterval(() => {
        if (this.energy >= this.energyEnd) {
          this.setEnergy(this.energyEnd)
        } else {
          this.setEnergy(this.energy + 1)
        }
      }, 1000)
    },
    getInfo () {
      let routeMork = this.$route.query
      this.isVictory = 3
      this.routerTier = routeMork.itemTier - 0
      this.bossBloodAnd = routeMork.bossBlood
      this.bossUrl = routeMork.bossUrl
      this.routerTierGuan = routeMork.itemTierGuan - 0 + 1
      this.bossBlood = routeMork.bossBlood
      this.bossAtk = routeMork.bossAtk
      this.$nextTick(() => { // 初始化获取能量条宽度
        this.tiaoPra = $('.energy-tiao').width()
      })
    }
  },
  mounted () {
    this.getInfo()
    this.$nextTick(() => {
      this.tiao = $('.boss-blood').width()
    })
  },
  activated () {
    this.getInfo()
  },
  deactivated () {
    if (this.isVictory === 1) {
      this.setCheckPoint(this.routerTierGuan++)
      if (this.routerTierGuan === 10) {
        this.routerTier++
        this.routerTierGuan = 0
        this.setTier(this.routerTier)
        this.setCheckPoint(0)
      }
    }
    this.isBossAttack = false
    this.startShow = true
    this.isVictory = 3
    this.roleSrc = 'dj'
    this.isShowGif = '5'
    $('.boss').removeClass('opacity')
    $('.role-box').removeClass('opacity')
    this.clearTimer()
  }
}
</script>

<style lang="stylus" scopend>
@import '../../assets/styles/publicImg.styl'
#view
  z-index 2
.cheallengeing
  position relative
  width 100%
  height 100%
  background-url('bg2sj.jpg')
  .combat
    width 6rem
    height 7rem
    position absolute
    top 50%
    left 50%
    transform translate(-3rem, -4.5rem)
    .qkyz
      z-index 2
      position absolute
      top 0.5rem
      left 0rem
      width 4rem
      height 4rem
      img
        width 100%
        height 100%
    .jj
      z-index 2
      position absolute
      top -1rem
      left -0.5rem
      width 5rem
      height 6rem
      img
        width 100%
        height 100%
    .wjgz
      z-index 2
      position absolute
      top -1rem
      left -0.5rem
      width 5rem
      height 6rem
      img
        width 100%
        height 100%
    .jhyj
      z-index 2
      position absolute
      top 1.5rem
      left 0
      width 4rem
      height 3rem
      img
        width 100%
        height 100%
    .bossjn // boss 攻击
      position absolute
      right -0.3rem
      bottom 0rem
      width 3rem
      height 3rem
      z-index 3
      img
        width 100%
        height 100%
    .role-box
      z-index 2
      width 2rem
      height 2rem
      position absolute
      right 0.2rem
      bottom 0.2rem
      &.roleClass1
        width 5rem
        height 4rem
        img
          width 5rem
          height 4rem
      &.roleClass2
        width 5rem
        height 4rem
        img
          width 5rem
          height 4rem
      &.roleClass4
        width 5rem
        height 4rem
        img
          width 5rem
          height 4rem
      &.roleClass5
        width 2.5rem
        height 1.5rem
        img
          width 2.5rem
          height 1.5rem
      img
        width 2rem
        height 2rem
    .boss
      width 5rem
      height 4rem
      position absolute
      top 0.5rem
      left -0.5rem
      z-index 1
      img
        width 100%
        height 100%
      .boss-blood-box
          position absolute
          top -0.5rem
          left 2rem
          width 3rem
          height 0.5rem
          line-height 0.4rem
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
          font-size 0.25rem
          @media screen and (min-width 1024px)
            width 4rem
          .boss-blood
            position absolute
            top 0.05rem
            left 0.05rem
            width 2.9rem
            height 89%
            text-indent 0.1rem
            background-size 100% 100%
            z-index 2
            @media screen and (min-width 1024px)
              width 3.9rem
          .boss-blood-tiao
            width 100%
            height 101%
            background-size 100% 100%
            background-url('u_blo.png')
            z-index 1
  .energy
    position absolute
    width 100%
    height 1.5rem
    bottom 2.2rem
    display flex
    flex-direction row
    justify-content center
    .energy-box
      display flex
      align-items center
      width 5rem
      height 1.5rem
      background-url('zd/u_nenglc.png')
      .energy-tiao
        width 3.6rem
        height 0.55rem
        margin-left 0.06rem
        border-radius 0.1rem
        overflow hidden
        .tiao-box
          width 0
          height 0.55rem
          background #6cff2d
          border-radius 0.1rem
      .energy-yuan
        width 1.325rem
        height 1.4rem
        text-align center
        font-size 0.4rem
        color #fff
        line-height 1.4rem
        border-radius 50%
        margin-left -0.03rem
        &.bggreen
          background #6cff2d
  .skill-ul
    position absolute
    display flex
    flex-direction row
    justify-content center
    bottom 0.6rem
    width 100%
    height 1.5rem
    right 0
    .skill-li-box
      position relative
      width 1.4rem
      height 1.4rem
      padding 0.2rem
      margin 0.1rem
      box-sizing border-box
      background-url('zd/u_jnk.png')
      .skill-box
        width 100%
        height 100%
        position relative
        .icon
          position absolute
          left 50%
          bottom -0.3rem
          width 0.5rem
          height 0.5rem
          transform translateX(-0.25rem)
          font-size 0.25rem
          font-weight 600
          text-align center
          line-height 0.55rem
          color $textColor
          background-url('zd/u_jnd.png')
        img
          position absolute
          top 0
          left 0
          width 100%
          height 100%
  .back
    position absolute
    top 1.8rem
    left 0.3rem
    width 0.8rem
    height 0.6rem
    background-url('zd/an_open.png')
  .ing-title
    position absolute
    top 1rem
    right 0.7rem
    width 1.8rem
    height 1rem
    line-height 1.1rem
    text-align center
    font-size 0.25rem
    font-weight 600
    color $textColor
    background-url('zd/u_guank2.png')
</style>
