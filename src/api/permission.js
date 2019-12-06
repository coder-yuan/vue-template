import request from '@/utils/request'

// 获取当前登录用户权限
export function getPermission() {
  
  return request({
    url: '/api/v1/permission',
    method: 'get'
  })
}

// 根据检索条件分页请求权限数据
export function getPermissionList(param) {
  return request({
    url: '/api/v1/permission/all?start='+param.listQuery.page+'&pagesize='+param.listQuery.limit,
    method: 'post',
    data: param.QueryData
  }) 
}

// 提交添加权限数据
export function addPermission(param) {
  return request({
    url: '/api/v1/permission',
    method: 'post',
    data: param
  }) 
}

// 提交编辑权限数据
export function editPermission(param) {
  return request({
    url: '/api/v1/permission/'+param.data.id,
    method: 'post',
    data: param
  }) 
}

// 禁用/启用权限数据
export function disablePermission(param) {
  return request({
    url: '/api/v1/permission/'+param.data.id,
    method: 'patch',
    data: param
  }) 
}

// 删除权限数据
export function deletePermission(param) {
  return request({
    url: '/api/v1/permission/'+param.data.id,
    method: 'delete',
    data: param
  })
}