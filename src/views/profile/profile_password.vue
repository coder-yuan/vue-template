<template>
  <div id="pwd">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.pass" placeholder="请输入新的密码" auto-complete="off"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="form.checkPass" placeholder="请确认密码" auto-complete="off"/>
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
  name: "pwd",
  props: {
    user: Object
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      code: 'password',
      form: {
        id: this.user ? this.user.id : '',
        pass: '',
        checkPass: '',
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
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
