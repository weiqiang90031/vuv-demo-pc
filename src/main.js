// 配置vue
import Vue from 'vue'
import App from './App.vue'
// 引入公用样式
import './styles/base.less'
// main.js   自动适配所有屏幕
import 'lib-flexible'
//导入路由对象
import router from './router'
//引入子组件
import HmHeader from './components/HmHeader.vue'
//注册全局组件
Vue.component('hm-header', HmHeader)

import HmLogo from './components/HmLogo'
Vue.component('hm-logo', HmLogo)

import './styles/iconfont.css'

import HmButton from './components/HmButton.vue'
Vue.component('hm-button', HmButton)

import HmPost from './components/HmPost.vue'
Vue.component('hm-post', HmPost)
// import Vant from 'vant'
// import 'vant/lib/index.css'

// Vue.use(Vant)
import { List,Field,Toast,Cell,CellGroup,Dialog,RadioGroup,Radio,Uploader } from 'vant'


Vue.use(List);
Vue.use(Uploader);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Dialog);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Toast);
Vue.use(Field)
// Vue.use(Cell)
//注册一个全局过滤器
import moment from 'moment'
Vue.filter('date',function(val,format='YYYY-MM-DD'){
  return moment(val).format(format)
})
Toast('提示内容')



// 处理axios
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'

// 吧axios挂载到vue原型上
Vue.prototype.$axios = axios

// 请求拦截器
axios.interceptors.request.use(config =>{
  // ,{
  //   headers : {
  //     Authorization : token
  //   }
  // }
  let token = localStorage.getItem('token')
  if(token) {
    config.headers.Authorization = token
  }
  return config
})

// 响应拦截器
axios.interceptors.response.use((res)=>{
  const { statusCode, message} = res.data
  //token失效的
  if(statusCode === 401 && message=== '用户信息 验证失败'){
    // 提示token失效了
    
    // 本地失效的token删除
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    // 跳转到login
    router.push('/login')
  }
  return res
})
// 构建vue实例
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
