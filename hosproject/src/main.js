// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//路由守卫
import routerConfig from './router/config'
routerConfig()
import store from './store'
import $ from 'jquery'
//axios引入
import axios from 'axios'
//axios所发post请求参数格式化
import qs from 'qs'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import { Message } from 'element-ui';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false

axios.defaults.baseURL = __PATH.COMMONPATH;
axios.defaults.withCredentials=false //不设置
Vue.prototype.$http = {
  get: (url, param, flag) => {
    return axios.get(url, {
      params: param
    }).then((res) => {
      return Promise.resolve(res.data)
    }).catch(() => {
      return Promise.resolve(response)
    })
  },
  post: (url, param, flag) => {
    if(localStorage.getItem('LOGINDATA')){
      var obj = JSON.parse(localStorage.getItem('LOGINDATA'))
      param.unitCode = obj.unitCode
      param.hospitalCode = obj.hospitalCode
      param.userId = obj.id
      param.userName = obj.name
      param.roleCode = obj.roleCode
    }
    let params=''
    if(param.flagkuayu){
      var formdata = new FormData();
      for(var item in param){
        formdata.append(item, param[item]||'');
      }
      // params = qs.stringify(formdata)
      params = formdata
    }else{
      params = qs.stringify(param)
    }

    return axios.post(url, params).then((res) => {
      return Promise.resolve(res.data)
    }).catch((res) => {
      return Promise.resolve(res)
    })
  }
}

//全局请求响应配置
axios.interceptors.request.use(config => { //spinShowSet "Content-Type": "multipart/form-data"
  store.commit('spinShowSet',true)
  config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8;multipart/form-data'

  return config
}, error =>{
  store.commit('spinShowSet',false)
  return Promise.reject(error)
})

axios.interceptors.response.use(data => {
  if(data.data.code!=200){
    Message.error(data.data.message)
  }
  store.commit('spinShowSet',false)
  return data
}, error => {
  store.commit('spinShowSet',false)
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
