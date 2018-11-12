import TodoMsg from './todoMsg.vue'

export default {
  extends: TodoMsg,
  computed: {
    style () {
      return {
        position: 'fixed',
        left: '0.1rem',
        top: `${this.vertivalOffset}px`
      }
    }
  },
  mounted () {
    this.createTimer()
  },
  methods: {
    createTimer () {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.autoClose)
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    afterEnter () {
      this.height = this.$el.offsetHeight
    }
  },
  beforeDestory () {
    this.clearTimer()
  },
  data () {
    return {
      vertivalOffset: 0
    }
  }
}
