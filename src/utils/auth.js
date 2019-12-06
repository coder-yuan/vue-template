//  import Cookies from 'js-cookie'

// const TokenKey = 'vue_admin_template_token'

// export function getToken() {
//   const res = Cookies.get(TokenKey)
//   return res
// }

// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }


//now
export function getToken() {
  const tokenObj = localStorage.getItem("token");

  return tokenObj ? JSON.parse(tokenObj) : null
}

export function setToken(token) {
  localStorage.setItem("token", JSON.stringify(token))
}

export function removeToken() {
  return localStorage.removeItem("token")
}

export function getLocalUser() {
  const localUser = localStorage.getItem("user");
  return localUser ? JSON.parse(localUser) : null
}

export function setLocalUser(user) {
  localStorage.setItem("user", JSON.stringify(user))
}

export function removeLocalUser() {
  return localStorage.removeItem("user")
}

export function getLoginInfo() {
  const loginInfo = localStorage.getItem("login");
  return loginInfo ? JSON.parse(loginInfo) : null
}

export function setLoginInfo(data) {
  localStorage.setItem("login", JSON.stringify(data))
}

export function removeLoginInfo() {
  return localStorage.removeItem("login")
}

