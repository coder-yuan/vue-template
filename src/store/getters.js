const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  user: state => state.user.current_user,
  lastRequestTime: state => state.user.lastRequestTime,
  refresh: state => state.user.refresh,
  permission: state => state.permission.permission,
  isFilter: state => state.permission.isFilter
}
export default getters
