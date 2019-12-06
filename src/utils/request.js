import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
var {requestBaseUrl} = require('@/settings.js');

// create an axios instance
const service = axios.create({
  //before
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout

  //now
  // baseURL: 'http://ipointek.3322.org:9000/',
  baseURL: requestBaseUrl,
  timeout: 60000

})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      if(!store.getters.refresh) {
        config.headers.Authorization = "Bearer " + store.getters.token.access_token
      } else {
        config.headers.Authorization = "Bearer " + store.getters.token.refresh_token
        store.commit('user/SET_REFRESH', false)
      }
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */
  
  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.error_code !== 200) {
      if (res.error_code !== 400401 && res.error_code !== 400402) {
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      //  400401：Token身份验证失败；400402：Token已失效
      if (res.error_code === 400402) {
        // to re-login
        // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //   confirmButtonText: 'Re-Login',
        //   cancelButtonText: 'Cancel',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload()
        //   })
        // })
        if(!store.getters.isFilter) {
          store.dispatch('user/logout')
          router.push(`/login`)
        } else {
          store.dispatch('user/refreshToken').then(() => {
            location.reload()
          })
        }
      }
      if(res.code === 400401) {
        console.log('400401');
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
