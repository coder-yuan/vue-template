<template>
  <div id="userPwd">
    <el-dialog title="修改密码"  :visible.sync="dialogEditPwdVisible" :before-close="handleClose">
      <div class="app-container">
        <el-form ref="form" :rules="rule" :model="form" label-width="120px">
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.pass" placeholder="请输入新的密码" auto-complete="off"/>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="form.checkPass" placeholder="请确认密码" auto-complete="off"/>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel('form')">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "userPwd",
  props: {
    dialogEditPwdVisible: Boolean,
    userId: {
      type: Number,
      default: 0
    }
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
      itemCode: 'userPwd',
      form: {
        id: this.userId ,
        pass: '',
        checkPass: '',
      },
      rule: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
  },
  components: {
  },
  methods: {
    handleClose() {
      this.handleCancel('form')
    },
    handleCancel(formName) {
      this.$refs[formName].resetFields();
      this.$emit('itemCancel',this.itemCode);
    },
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('itemSubmit',this.itemCode,this.form);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      
    },
  }
  
}
</script>

<style>
</style>
