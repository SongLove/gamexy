import TodoMsg from './todoMsg.vue'
import todoMsg from './function'

export default (Vue) => {
  Vue.component(TodoMsg.name, TodoMsg)
  Vue.prototype.$todoMsg = todoMsg
}
