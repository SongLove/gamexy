<template>
  <transition v-cloak name="page">
    <div class="Interface">
      <header-box/>
      <keep-alive><router-view id="view"/></keep-alive>
      <bottom-box/>
    </div>
  </transition>
</template>

<script>
import BottomBox from '@/components/common/BottomBox'
import HeaderBox from '@/components/common/HeaderBox'
export default {
  name: 'Interface',
  components: {
    HeaderBox,
    BottomBox
  }
}
</script>

<style lang="stylus" scopend>
#view
  position absolute
  top 0rem
  bottom 1.5rem
  padding-top 1.5rem
  left 0
  right 0
  box-sizing border-box
  background-size 100% 100%
</style>
