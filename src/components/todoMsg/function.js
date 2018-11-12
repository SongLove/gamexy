import Vue from 'vue'
import Component from './func-notification'

const NotificationConstructor = Vue.extend(Component)

const instances = []
let seed = 1
let wid = window.screen.width
const removeInstance = (instance) => {
  if (!instance) return
  const len = instances.length
  const index = instances.findIndex(inst => instance.id === inst.id)

  instances.splice(index, 1)

  if (len <= 1) return
  const removeHeight = instance.vm.height
  for (let i = index; i < len - 1; i++) {
    instances[i].vertivalOffset =
      parseInt(instances[i].vertivalOffset) - removeHeight - 16
  }
}

const notify = (options) => {
  if (Vue.prototype.$isServer) return

  const {
    autoClose,
    ...rest
  } = options
  const instance = new NotificationConstructor({
    propsData: {
      ...rest
    },
    data: {
      autoClose: autoClose === undefined ? 3000 : autoClose
    }
  })

  const id = `notification_${seed++}`
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true

  let vertivalOffset = 0
  instances.forEach(item => {
    vertivalOffset += item.$el.offsetHeight + 16
  })
  let topxp = 80
  if (wid > 700) {
    topxp = 200
  }
  vertivalOffset += topxp
  instance.vertivalOffset = vertivalOffset
  instances.push(instance)
  instance.vm.$on('closed', () => {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el)
    instance.vm.$destroy()
  })
  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })
  return instance.vm
}

export default notify
