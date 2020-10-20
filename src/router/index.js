//配置路由信息
import Vue from 'vue'
import VueRouter from 'vue-router'
//导入组件
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import User from '../pages/User.vue'
import Edit from '../pages/Edit.vue'
import MyFollow from '../pages/MyFollow.vue'
import MyComment from '../pages/MyComment'
import MyStar from '../pages/MyStar'

//注册
Vue.use(VueRouter)
const router = new VueRouter({
  //配置路由规则
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login',name:'login', component: Login },
    { path: '/register',name:'register', component: Register },
    { path: '/user',name:'user', component: User },
    { path: '/edit',name:'edit', component: Edit },
    { path: '/myfollow', component: MyFollow },
    { path: '/mycomment', component: MyComment },
    { path: '/mystar', component: MyStar },
  ],
})

// 全局前置守卫
router.beforeEach((to,from,next)=>{ 
  if(to.path === '/user') { //未完待续
    let token = localStorage.getItem('token')
    if (token) {
      next()
    }else {
      next('/login')
    }
  }else {//放行
    next()
  }
  
})
export default router
