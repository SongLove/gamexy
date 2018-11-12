<template>
  <div class="mypet">
    <ul class="mypet-ul">
      <li class="pet-li" v-for="item in iconUrl"
      :key="item.id"
      @click="getGifUrl(item.id)"
      :class="{active : liAcitve === item.id}"
      >
        <img :src="item.gifUrl === '' ? getIconUrl(item.id) : item.gifUrl"/>
      </li>
    </ul>
    <div class="mypet-msg">
      <div class="mypet-title">{{title}}</div>
      <div class="mypet-gif">
        <img :class="{info : title === ''}" :src="gifUrl"/>
      </div>
      <div class="mypet-gif-msg" v-html="gifMsg"></div>
      <div class="mypet-active" @click="anActive" :class="{anActive: isActive}">
        <i class="icon"></i>
        {{activeMoney}} 激活
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'Vuex'
export default {
  name: 'MyPet',
  data () {
    return {
      iconUrl: [
        {
          id: '1',
          title: '野猪',
          gifUrl: '',
          activeMoney: 0,
          addBlood: 50,
          isActive: false,
          gifMsg: '免费激活，激活增加【<span class="msg-text">50</span>】血'
        },
        {
          id: '2',
          title: '老虎',
          gifUrl: '',
          activeMoney: 100,
          addBlood: 100,
          isActive: false,
          gifMsg: '消耗【<span class="msg-text">100</span>】银两激活，激活增加【<span class="msg-text">100</span>】血'
        },
        {
          id: '3',
          title: '龙女',
          gifUrl: '',
          activeMoney: 200,
          addBlood: 200,
          isActive: false,
          gifMsg: '消耗【<span class="msg-text">200</span>】银两激活，激活增加【<span class="msg-text">200</span>】血'
        },
        {
          id: '4',
          title: '牛头',
          gifUrl: '',
          activeMoney: 400,
          addBlood: 400,
          isActive: false,
          gifMsg: '消耗【<span class="msg-text">400</span>】银两激活，激活增加【<span class="msg-text">400</span>】血'
        },
        {
          id: '5',
          title: '哪吒',
          gifUrl: '',
          activeMoney: 700,
          addBlood: 700,
          isActive: false,
          gifMsg: '消耗【<span class="msg-text">700</span>】银两激活，激活增加【<span class="msg-text">700</span>】血'
        },
        {
          id: '6',
          title: '齐天大圣',
          gifUrl: '',
          activeMoney: 1000,
          addBlood: 1000,
          isActive: false,
          gifMsg: '消耗【<span class="msg-text">1000</span>】银两激活，激活增加【<span class="msg-text">1000</span>】血'
        },
        {
          id: '7',
          title: '青龙',
          gifUrl: '',
          activeMoney: 3000,
          addBlood: 3000,
          isActive: false,
          gifMsg: '消耗【<span class="msg-text">3000</span>】银两激活，激活增加【<span class="msg-text">3000</span>】血'
        },
        {
          id: '8',
          title: '后羿',
          gifUrl: '',
          activeMoney: 5000,
          addBlood: 5000,
          isActive: false,
          gifMsg: '消耗【<span class="msg-text">5000</span>】银两激活，激活增加【<span class="msg-text">5000</span>】血'
        },
        {
          id: '9',
          title: '刑天',
          gifUrl: '',
          activeMoney: 10000,
          addBlood: 10000,
          isActive: false,
          gifMsg: '消耗【<span class="msg-text">10000</span>】银两激活，激活增加【<span class="msg-text">10000</span>】血'
        }
      ],
      gifUrl: require('../../assets/img/cw/wenhao.png'),
      title: '',
      gifMsg: '',
      activeMoney: 0,
      addBlood: 0,
      liAcitve: '',
      isActive: ''
    }
  },
  computed: {
    ...mapState([
      'money',
      'blood',
      'energyEnd'
    ])
  },
  methods: {
    ...mapMutations({
      setMoney: 'SET_MONEY',
      setBlood: 'SET_BLOOD',
      setEnergyEnd: 'SET_ENERGYEND',
      setAtBlood: 'SET_ATBLOOD'
    }),
    anActive () { // 激活
      if (this.liAcitve === '') return
      let icon = this.iconUrl[this.liAcitve - 1]
      if (!icon.isActive) {
        if (this.money < icon.activeMoney && this.money !== icon.activeMoney) {
          this.$todoMsg({
            content: '银两不足'
          })
        } else {
          this.$todoMsg({
            content: '激活成功'
          })
          icon.isActive = true
          this.isActive = icon.isActive
          this.setEnergyEnd(this.energyEnd + 2)
          icon.gifUrl = require(`../../assets/img/cw/an_00${this.liAcitve}.png`)
          this.setMoney(this.money - icon.activeMoney)
          this.setBlood(this.blood + icon.addBlood)
          this.setAtBlood(-icon.addBlood)
        }
      }
    },
    getIconUrl (index) { // 获取icon 初始图片
      return require('../../assets/img/cw/u_00' + index + '.png')
    },
    getGifUrl (index) { // 选中icon 信息
      this.liAcitve = index
      this.gifUrl = require('../../assets/img/cw/an_00' + index + '.gif')
      let iconUrl = this.iconUrl[index - 1]
      this.title = iconUrl.title
      this.isActive = iconUrl.isActive
      this.gifMsg = iconUrl.gifMsg
      this.activeMoney = iconUrl.activeMoney
      this.addBlood = iconUrl.addBlood
    }
  }
}
</script>

<style lang="stylus" scopend>
@import '../../assets/styles/publicImg.styl'
.mypet
  background-url('cw/bg4.jpg')
  .mypet-msg
    width 90%
    height 4.5rem
    margin 0 auto
    background-url('cw/bg4_k1.png')
    text-align center
    position relative
    color $textColor
    font-size 0.25rem
    font-weight 600
    .mypet-title
      width 100%
      height 0.8rem
      line-height 0.8rem
      font-size 0.35rem
    .mypet-gif
      width 100%
      height 3rem
      .info
        width 3rem
        height 85%
        margin-top 0.2rem
      img
        width 4rem
        height 95%
    .mypet-gif-msg
      width 100%
      height 0.7rem
      line-height 0.7rem
      font-size 0.25rem
      .msg-text
        color #571008
    .mypet-active
      position absolute
      bottom -1.2rem
      left 50%
      width 2.3rem
      height 0.7rem
      transform translateX(-1.15rem)
      color #fff
      line-height 0.7rem
      margin 0 auto
      text-align center
      font-size 0.25rem
      font-weight 500
      background-url('jn/an_bg1.png')
      &.anActive
        background-url('an_bg3.png')
      .icon
        display inline-block
        width 0.4rem
        height 0.3rem
        background-size 100% 100%
        vertical-align middle
        margin-top -0.05rem
        background-url('u_G002.png')
  .mypet-ul
    display flex
    flex-wrap wrap
    justify-content center
    padding 0.5rem 0.2rem
    .pet-li
      width 1rem
      height 1rem
      margin 0.2rem
      position relative
      &.active
        &:after
          content ''
          position absolute
          top -8.7%
          left -18%
          width 135%
          height 135%
          background-url('cw/u_k1.png')
      img
        width 100%
        height 100%
</style>
