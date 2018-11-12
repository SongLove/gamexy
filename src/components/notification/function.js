import Vue from 'vue'
import Component from './func-notification'

const NotificationConstructor = Vue.extend(Component)
const notify = (options) => {
  if (Vue.prototype.$isServer) return
  const {
    ...rest
  } = options
  const instance = new NotificationConstructor({
    propsData: {...rest}
  })
  const id = 'notification_btn'
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.$on('close', () => {
    instance.vm.visihle = false
  })
}

export default notify
