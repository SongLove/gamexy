import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Cheallenge = (resolve) => { // 路由懒加载
  import('@/pages/cheallenge/Cheallenge').then((module) => {
    resolve(module)
  })
}
const Check = (resolve) => { // 路由懒加载
  import('@/components/directive/Check').then((module) => {
    resolve(module)
  })
}
const CheallengeIng = (resolve) => { // 路由懒加载
  import('@/pages/Cheallenge/CheallengeIng').then((module) => {
    resolve(module)
  })
}
const MyPet = (resolve) => { // 路由懒加载
  import('@/pages/mypet/MyPet').then((module) => {
    resolve(module)
  })
}
const Role = (resolve) => { // 路由懒加载
  import('@/pages/role/Role').then((module) => {
    resolve(module)
  })
}
const Interface = (resolve) => { // 路由懒加载
  import('@/pages/Interface').then((module) => {
    resolve(module)
  })
}
const OnHook = (resolve) => { // 路由懒加载
  import('@/pages/onhook/OnHook').then((module) => {
    resolve(module)
  })
}
const Skill = (resolve) => { // 路由懒加载
  import('@/pages/skill/Skill').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Role',
      component: Role
    },
    {
      path: '/Check',
      name: 'Check',
      component: Check
    },
    {
      path: '/Interface',
      name: 'Interface',
      component: Interface,
      children: [
        {
          path: '/Interface/OnHook',
          name: 'OnHook',
          component: OnHook
        },
        {
          path: '/Interface/Skill',
          name: 'Skill',
          component: Skill
        },
        {
          path: '/Interface/Cheallenge',
          name: 'Cheallenge',
          component: Cheallenge
        },
        {
          path: '/Interface/MyPet',
          name: 'MyPet',
          component: MyPet
        },
        {
          path: '/Interface/CheallengeIng',
          name: 'CheallengeIng',
          component: CheallengeIng
        }
      ]
    }
  ]
})
