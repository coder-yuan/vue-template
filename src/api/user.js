import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }




//now

//用户登录，获取token
export function login(data) {
  return request({
    url: '/api/v1/token',
    method: 'get',
    auth: data
  })
}

// 刷新token
export function refreshToken() {
  return request({
    url: '/api/v1/token',
    method: 'post'
  })
}

//获取用户列表数据
export function getUserList(param) {
  return request({
    url: '/api/v1/user?start='+param.listQuery.page+'&pagesize='+param.listQuery.limit,
    method: 'post',
    data: param.QueryData
  })
}

//注册用户
export function registerUser(param) {
  return request({
    url: '/api/v1/user/register',
    method: 'post',
    data: param
  })
}

// 编辑指定的用户信息
export function editUser(param) {
  return request({
    url: '/api/v1/user/'+param.data.id,
    method: 'post',
    data: param
  })
}

// 禁用指定的用户数据
export function disableUser(id) {
  return request({
    url: '/api/v1/user/'+id,
    method: 'patch'
  })
}

// 删除指定的用户信息
export function deleteUser(id) {
  return request({
    url: '/api/v1/user/'+id,
    method: 'delete'
  })
}

// 修改用户密码
export function updatePwd(param) {
  return request({
    url: '/api/v1/user/'+param.id+'/change',
    method: 'post',
    data: param
  })
}

// 根据用户获取对应角色数据
export function getRolesByUser(id) {
  return request({
    url: '/api/v1/user/'+id+'/roles',
    method: 'get'
  })
}
// 设置用户对应的角色数据
export function setRolesByUser(param) {
  return request({
    url: '/api/v1/user/'+param.data.user_id+'/roles',
    method: 'post',
    data: param
  })
}