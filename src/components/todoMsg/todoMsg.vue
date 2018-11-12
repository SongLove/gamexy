<template>
  <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
    <div
      class="notification"
      :style="style"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="createTimer"
       @click="handleClose"
    >
      <span class="content">{{content}}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    content: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      visible: true
    }
  },
  computed: {
    style () {
      return {
      }
    }
  },
  methods: {
    handleClose (e) {
      e.preventDefault()
      this.$emit('close')
    },
    afterLeave () {
      this.$emit('closed')
    },
    afterEnter () {},
    clearTimer () {},
    createTimer () {}
  }
}
</script>

<style lang="stylus" scoped>
.notification
  position fixed
  display: inline-flex
  background-color #303030
  color rgba(255, 255, 255, 1)
  align-items center
  padding 0.1rem
  box-shadow 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)
  flex-wrap wrap
  transition all .3s
  font-size 0.25rem
  z-index 99
.content
  padding 0
.btn
  color #ff4081
  padding-left 24px
  margin-left auto
  cursor pointer
</style>
