<template>
  <div class='skill'>
    <div class="skill-box">
      <ul class="skill-ul">
        <li v-for="(item, index) in skillUrl"
         :key="item.id"
         class="skill-li"
         :class="{zindex : isSkillIndex == index}"
         @click="anSkill(index)"
         >
          <img :src="getSkillUrl(item.id)"/>
        </li>
        <li class="skill-li"><img src="../../assets/img/jn/an_05.png"/></li>
      </ul>
      <div class="skill-details">
        <div class="skill-title">
          {{title}}
          <span style="font-weight:500;font-size: 0.4rem"><span style="font-size:0.5rem">L</span>v.{{grade}}</span>
          <div @click="anActive" class="skill-activate" :class="{anActive : isActive}">
            <i class="icon"></i>
            {{activeMoney}} 激活
          </div>
        </div>
        <div class="skill-msg1">
          {{msg1}}
        </div>
        <div class="skill-msg2">
          {{msg2}}
        </div>
        <div @click="update" class="skill-update">
          <i class="icon"></i>
          {{toUpgradeMoney}} 升级
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'Vuex'
export default {
  name: 'Skill',
  data () {
    return {
      activeMoney: '',
      toUpgradeMoney: '',
      isActive: '',
      title: '',
      msg1: '',
      msg2: '',
      harm: '',
      grade: 0,
      isSkillIndex: ''
    }
  },
  computed: {
    ...mapState([
      'energy',
      'money',
      'atk',
      'skillUrl'
    ])
  },
  methods: {
    ...mapMutations({
      setMoney: 'SET_MONEY', // 银两
      setAtk: 'SET_ATK', // 攻击力
      setSkillUrlHarm: 'SET_SKILLURLHARM', // 设置提示攻击力
      setSkillIsActive: 'SET_SKILLACTIVE', // 设置是否激活
      setSkillGrade: 'SET_SKILLGRADE' // 升级
    }),
    panduan (bloo) { // 判断是否 满足激活或升级条件
      let isBloo = true
      let skill = this.skillUrl[this.isSkillIndex]
      if (bloo) {
        if (this.money < skill.activeMoney && this.money !== skill.activeMoney) {
          this.$todoMsg({
            content: '银两不足'
          })
          isBloo = false
        }
      } else {
        if (this.money < skill.toUpgradeMoney && this.money !== skill.toUpgradeMoney) {
          this.$todoMsg({
            content: '银两不足'
          })
          isBloo = false
        }
      }
      return isBloo
    },
    anActive () { // 激活
      if (!this.isActive) {
        let skill = this.skillUrl[this.isSkillIndex]
        if (this.panduan(true)) {
          this.setSkillIsActive(skill.id) // 设置激活
          this.setMoney(this.money - skill.activeMoney) // 消耗银两
          this.setAtk(this.atk + skill.harm) // 增加攻击力
          this.anSkill(this.isSkillIndex)
        }
      } else {
        this.$todoMsg({
          content: '已激活，可进行技能升级'
        })
      }
    },
    update () { // 升级
      if (!this.isActive) {
        this.$todoMsg({
          content: '需要激活，技能才可以升级'
        })
      } else {
        if (this.panduan(false)) {
          this.$todoMsg({
            content: '升级成功'
          })
          let skill = this.skillUrl[this.isSkillIndex]
          this.setSkillGrade(skill.id)
          this.setMoney(this.money - skill.toUpgradeMoney) // 消耗银两
          this.setAtk(this.atk + skill.harm) // 增加攻击力
          this.anSkill(this.isSkillIndex)
          this.setSkillUrlHarm(skill.id)
        }
      }
    },
    anSkill (index) {
      if (index === 4) return
      this.isSkillIndex = index
      let skill = this.skillUrl[index]
      this.activeMoney = skill.activeMoney
      this.toUpgradeMoney = skill.toUpgradeMoney
      this.isActive = skill.isActive
      this.msg1 = skill.msg1
      this.msg2 = skill.msg2
      this.title = skill.title
      this.harm = skill.harm
      this.grade = skill.grade
    },
    getSkillUrl (index) {
      return require(`../../assets/img/jn/an_0${index}.png`)
    }
  },
  mounted () {
    this.anSkill(0)
  }
}
</script>

<style lang='stylus' scopend>
@import '../../assets/styles/publicImg.styl'
.skill
  background-url('jn/bg3.jpg')
  .skill-box
    position absolute
    bottom 0
    padding 2rem 0.2rem 0.5rem
    width 100%
    height 100%
    box-sizing border-box
    .skill-details
      width 95%
      height 6.8rem
      margin 0 auto
      background-url('jn/bg3_b1.png')
      padding 0 0.4rem
      box-sizing border-box
      font-weight 600
      font-size 0.25rem
      color $textColor
      .skill-update
        width 2rem
        height 0.8rem
        color #fff
        line-height 0.8rem
        margin 0 auto
        text-align center
        font-size 0.25rem
        font-weight 500
        background-url('jn/an_bg1.png')
        color #fff
        .icon
          display inline-block
          width 0.4rem
          height 0.3rem
          background-size 100% 100%
          vertical-align middle
          margin-top -0.05rem
          background-url('u_G002.png')
      .skill-title
        width 100%
        height 1.3rem
        line-height 1.3rem
        font-size 0.5rem
        .skill-activate
          width 2rem
          height 0.8rem
          line-height 0.8rem
          color #fff
          float right
          margin-top 0.2rem
          text-align center
          font-size 0.25rem
          font-weight 500
          background-url('jn/an_bg1.png')
          color #fff
          &.anActive
            background-url('an_bg3.png')
            color #505050
          .icon
            display inline-block
            width 0.4rem
            height 0.3rem
            background-size 100% 100%
            vertical-align middle
            margin-top -0.05rem
            background-url('u_G002.png')
      .skill-msg1
        width 100%
        height 1.65rem
        line-height 1.65rem
      .skill-msg2
        width 100%
        height 2.5rem
        line-height 1.65rem
    .skill-ul
      position relative
      height 1.55rem
      margin-bottom 0.5rem
      @media screen and (min-width 768px)
        margin-left 1.05rem
      @media screen and (min-width 1024px)
        margin-left 1.35rem
      .skill-li
        position absolute
        top 0
        width 1.65rem
        height 1.65rem
        &.zindex
          z-index 2
        img
          width 100%
          height 100%
</style>
