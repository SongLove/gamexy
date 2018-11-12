<template>
  <div class="role">
    <div class="role-tile"></div>
    <role-swiper/>
    <div class="role-go">
      <input class="name-inpu" v-model="roleName" type="text" placeholder="请输入您的名字"/>
      <div @click="back" class="role-go-btn"></div>
    </div>
  </div>
</template>

<script>
import Bus from './bug.js'
import RoleSwiper from './Swiper'
import { mapMutations } from 'Vuex'
export default {
  // 跳转方式为this.$router.push({path:'/AddShop',query:{id:val.ID})
  name: 'Role',
  data () {
    return {
      roleName: '',
      roleIcon: require('../../assets/img/T01.png')
    }
  },
  components: {
    RoleSwiper
  },
  mounted () {
    let This = this
    Bus.$on('progress', (b) => {
      if (b <= 0) {
        This.roleIcon = require('../../assets/img/T01.png')
      }
      if (b >= 0.5) {
        This.roleIcon = require('../../assets/img/T02.png')
      }
      if (b >= 1) {
        This.roleIcon = require('../../assets/img/T03.png')
      }
    })
  },
  methods: {
    ...mapMutations({
      setRoleName: 'SET_ROLENAME',
      setRoleIcon: 'SET_ROLEICON'
    }),
    back () {
      if (this.roleName) {
        this.setRoleName(this.roleName)
        this.setRoleIcon(this.roleIcon)
        this.$router.push('/interface/onhook')
      } else {
        this.$todoMsg({
          content: '请输入您的名字，方可进入游戏'
        })
      }
    }
  }
}
</script>

<style lang="stylus" scopend>
@import '../../assets/styles/publicImg.styl'
.role
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  background-url('bg01.jpg')
  background-size 100% 100%
  .role-tile
    width 4rem
    height 0.8rem
    margin 0 auto
    margin-top 0.5rem
    background-url('bg1_z.png')
    background-size 100% 100%
  .role-go
    position absolute
    bottom 0.9rem
    display flex
    flex-direction column
    align-items center
    width 100%
    .name-inpu
      display inline
      width 40%
      height 0.7rem
      text-indent 0.1rem
      text-align center
      border-radius 0.1rem
      margin-bottom .4rem
      font-size .3rem
      font-weight 500
      color #fff
      background #3c3a3a
      &::-webkit-input-placeholder
        color #fff
    .role-go-btn
      width 38%
      height 1rem
      font-size .25rem
      background-url('an_cj01.png')
      background-size 100% 100%
</style>
