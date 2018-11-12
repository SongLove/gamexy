import Notification from './notification.vue'

// 继承 notification
export default {
  extends: Notification,
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.vertivalOffset}px`
      }
    }
  },
  data () {
    return {
      vertivalOffset: 16
    }
  }
}
