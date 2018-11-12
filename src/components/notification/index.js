import Notification from './notification.vue'
import notify from './function'
import Tab from '../directive/tab.vue'
export default (Vue) => {
  Vue.component(Notification.name, Notification)
  Vue.component(Tab.name, Tab)
  Vue.prototype.$notify = notify
}
