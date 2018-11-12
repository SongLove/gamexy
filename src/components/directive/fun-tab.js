import Tab from './tab.vue'

// 继承 notification
export default {
  extends: Tab,
  computed: {
    style () {
      return {
        left: '20px',
        toop: '20px'
      }
    }
  }
}
