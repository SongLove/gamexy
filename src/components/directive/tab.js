import Vue from 'vue'
import Tab from './fun-tab'

const InstanceTab = Vue.extend(Tab)
// 一个Vue实例
// 一个指令 点击的时候 vue实例根据参数偏移
export default Vue.directive('to-tab', {
  // 被绑定
  bind () {
  },
  // 当绑定元素插入DOM中
  inserted (el) {
    el.onclick = function () {
      const instance = new InstanceTab({
        propsData: {
          content: '内容'
        }
      })
      const id = 'notification_btn'
      instance.id = id
      instance.vm = instance.$mount()
      document.body.appendChild(instance.vm.$el)
    }
  }
})
