import request from '@/utils/request'


// 获取用户列表数据
export function getRoleList(param) {
  return request({
    url: '/api/v1/role/all?start='+param.listQuery.page+'&pagesize='+param.listQuery.limit,
    method: 'post',
    data: param.QueryData
  })
}

// 提交添加角色
export function addRole(param) {
  return request({
    url: '/api/v1/role',
    method: 'post',
    data: param
  })
}

// 提交编辑角色
export function editRole(param) {
  return request({
    url: '/api/v1/role/'+param.data.id,
    method: 'post',
    data: param
  })
}

// 禁用/启用角色
export function disableRole(param) {
  return request({
    url: '/api/v1/role/'+param.data.id,
    method: 'patch',
    data: param
  })
}

// 删除角色
export function deleteRole(param) {
  return request({
    url: '/api/v1/role/'+param.data.id,
    method: 'delete',
    data: param
  })
}

// 根据角色获取权限列表以及角色对应的权限数据
export function queryPermissionByRole(param) {
  return request({
    url: '/api/v1/role/'+param.data.id+'/permission',
    method: 'get',
    data: param
  })
}

// 提交角色对应的权限数据
export function setPermissionsByRole(param) {
  return request({
    url: '/api/v1/role/'+param.data.role_id+'/permission',
    method: 'post',
    data: param
  })
}