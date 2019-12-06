import { getPermission } from '@/api/permission'
import router,{ constantRoutes } from '@/router'
function filterAsyncRoutes(constantRoutes,permissions,routes) {
  
  constantRoutes.forEach((route,index) => {
    const flag = HavePermission(permissions,route)
    if(flag) {
      routes[index].hidden = false
    }
    if(route.children) {
      filterAsyncRoutes(route.children,permissions,routes[index].children)
    }
  });

}

function HavePermission(permissions,route) {
  let res = false
  permissions.forEach(permission => {
    const routeCode = route.meta ? route.meta.code ? JSON.stringify(route.meta.code) : null  : null;
    const permissionCode = JSON.stringify(permission.code)
    if(permissionCode == routeCode) res = true
  })
  return res
}

const state = {
  permission: [],
  isFilter: false
}

const mutations = {
  SET_PERMISSION(state, permissions) {
    state.permission = permissions
  },
  SET_ISFilter(state, isFilter) {
    state.isFilter = isFilter
  }
}

const actions = {
  generateRoutes({commit}) {
    return new Promise((resolve,reject) => {
      getPermission().then(response => {
        const { data } = response;
        filterAsyncRoutes(constantRoutes,data,router.options.routes)
        commit('SET_PERMISSION',data)
        commit('SET_ISFilter',true)
        resolve();
      }).catch(() => {
        reject();
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