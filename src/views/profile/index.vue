<template>
  <div id="profile">
    <el-card class="box-card" >
      <el-tabs type="border-card">
        <el-tab-pane label="用户头像">
          <div>
            <span>
              <Avatar
              :avatar="avatar"
              @updateUserAvatar="updateUserAvatar"
              />
            </span>
            
          </div>
        </el-tab-pane>
        <el-tab-pane label="基础信息">
          <Info
          :user="user"
          @handleSubmit="handleSubmit"
          />
        </el-tab-pane>
        <el-tab-pane label="修改密码">
          <Password
          :user="user"
          @handleSubmit="handleSubmit"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script type="text/javascript">
import {mapGetters} from 'vuex'
import {updatePwd} from '@/api/user'
import Avatar from './profile_avatar'
import Info from './profile_info'
import Password from './profile_password'

export default {
  name: "profile",
  data() {
    return {
      user: this.$store.getters.user ? this.$store.getters.user : null
    }
  },
  components: {
    Avatar,
    Info,
    Password
  },
  computed: {
    ...mapGetters(['avatar'])
  },
  methods: {
    // 提交头像路径，将用户头像数据更新
    updateUserAvatar(file) {
      this.user.avatar = file.id
      this.$store.dispatch("user/updateUser",{
          avatar: file,
          user: this.user
      }).then(res => {
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 2 * 1000
        })
      })
    },

    // 点击保存按钮
    handleSubmit(data, code) {
      switch (code) {
        case "info":
          this.user.id = data.id ? data.id : null
          this.user.account = data.account ? data.account : null
          this.user.email = data.email ? data.email : null
          this.user.address = data.address ? data.address : null

          this.$store.dispatch("user/updateUser",{
            imgUrl: this.avatarUrl,
            user: this.user
          }).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 2 * 1000
            })
          })
        case "password":
          this.fetchEditPwd(data).then(res => {
            if(res.success) {
              this.$message({
                message: '密码修改成功，请重新登录',
                type: 'success',
                duration: 2 * 1000
              })
              this.$store.dispatch('user/logout')
              this.$router.push(`/login`)
              // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
            }
          })
          break;
      }
    },

    // 提交修改用户密码
    fetchEditPwd(data) {
      return new Promise((resolve, reject) => {
        const param = {
          id: data.id,
          data: {
            password: data.pass
          }
        }
        updatePwd(param).then(res => {
          resolve(res)
        })
      }) 
    }
  }
}
</script>

<style>
  .box-card {
    width: 60%;
    margin: 3% 21%;
  }
</style>
