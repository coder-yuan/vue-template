<template>
  <div id="info">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="info">
      <el-form-item label="账号" prop="account">
        <el-input v-model="form.account" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address" />
      </el-form-item>
    </el-form>
    <span class="dialog-footer" style="float: right">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('form')">保 存</el-button>
    </span>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "info",
  props: {
    user: Object
  },
  data() {
    return {
      code: 'info',
      form: {
        id: this.user ? this.user.id : '',
        account: this.user ? this.user.account : '',
        email: this.user ? this.user.email : '',
        address: this.user ? this.user.address : ''
      },
      rules: {
        account: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ]
      }
    }
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            this.$emit('handleSubmit',this.form,this.code)
          } 
      });
    },
    handleCancel() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
  .info {
    width: 65%
  }
</style>
