<template>
  <div id="userAdd">
    <el-dialog title="添加用户" :visible.sync="dialogAddUserVisible" :before-close="handleClose">
      
      <div class="app-container">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="账号">
            <el-input v-model="form.account" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" />
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "userAdd",
  props: {
    dialogAddUserVisible: Boolean
  },
  data() {
    return {
      itemCode: 'userAdd',
      form: {
        account: '',
        password: '',
        level: '',
        client_type: ''
      }
    }
  },
  components: {
  },
  methods: {
    handleClose() {
      this.handleCancel()
    },
    handleCancel() {
      this.$emit('itemCancel',this.itemCode);
    },
    handleSubmit() {
      this.form.level = 1 //  普通用户
      this.form.client_type = 100  //normal
      this.$emit('itemSubmit',this.itemCode,this.form);
    },
  }
  
}
</script>

<style>
</style>
