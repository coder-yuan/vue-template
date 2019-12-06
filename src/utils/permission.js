export function checkPermission(code) {
  let res = false
  const permissions = this.$store.getters.permission
  permissions.forEach(permission => {
    if(permission.code == code) res = true
  });
  return res
}