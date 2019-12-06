import { login, refreshToken } from '@/api/user'
import { getToken, setToken, removeToken, setLocalUser, getLocalUser, removeLocalUser, setLoginInfo, removeLoginInfo} from '@/utils/auth'
import store from '../index'
import { resetRouter } from '@/router'
import jwt_decode from 'jwt-decode'
import {editUser} from '@/api/user'

const state = {
  token: getToken(),
  name: '',
  avatar: null,
  current_user: null,
  roles: [],
  lastRequestTime: '',
  refresh: false
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INFO: (state, payload) => {
    let info = jwt_decode(payload.access_token).identity
    state.name = info.username ? info.username : state.name
    state.avatar = payload.user.avatar ? payload.user.avatar_img : state.avatar
    state.roles = info.roles ? info.roles : state.roles
  },
  SET_USER: (state, user) => {
    state.current_user = user
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_TIME: (state) => {
    state.lastRequestTime = new Date()
  },
  SET_REFRESH: (state,refresh) => {
    state.refresh = refresh
  }
}

const actions = {
  
  // user login
  login({ commit }, userInfo) {
    console.log('into login');
    const { loginForm, isRemember } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: loginForm.username.trim(), password: loginForm.password }).then(response => {
        const { data } = response
        
        const token = {
          access_token: data.access_token,
          refresh_token: data.refresh_token
        }
        commit('SET_TOKEN', token)
        commit('SET_INFO',  {
          access_token: token.access_token,
          user: data.user
        })
        commit('SET_USER',  data.user)
        if(isRemember) {
          setLoginInfo({
            isRemember: isRemember,
            username: loginForm.username,
            password: loginForm.password
          })
        } else {
          removeLoginInfo()
        }
        
        
        setLocalUser(data.user)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise(resolve => {
      let token = getToken()
      let user = getLocalUser()
      commit('SET_INFO',  {
        access_token: token.access_token,
        user: user
      })
      commit('SET_USER',  user)
      resolve()
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_AVATAR', null)
      commit('SET_USER', null)
      commit('SET_ROLES', [])
      removeToken()
      removeLocalUser()
      resetRouter()
      resolve()
      
      store.commit('permission/SET_ISFilter', false)

    }).catch(error => {
      reject(error)
    })
  },

  // refresh token
  refreshToken({ commit }) {
    commit('SET_REFRESH', true)
    return new Promise(resolve => {
      refreshToken().then(res => {
        const token = getToken()
        token.access_token = res.data.access_token
        commit('SET_TOKEN', token)
      })
      removeToken()
      resolve()
    })
  },

  // 更新用户信息
  updateUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const user = payload.user
      const param = {
        data: user
      }
      editUser(param).then(res => {
        user.avatar_img = payload.avatar
        commit('SET_NAME', payload.user.account)
        commit('SET_USER', payload.user)
        commit('SET_AVATAR', payload.avatar)
        setLocalUser(user)
        resolve(res)
      })
    })
  } 
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

