<template>
  <div id="userEdit">
    <el-dialog title="编辑用户" :visible.sync="dialogEditUserVisible" :before-close="handleClose">
      
      <div class="app-container">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="账号">
            <el-input v-model="form.account"/>
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
  name: "userEdit",
  props: {
    dialogEditUserVisible: Boolean,
    data: Object
  },
  data() {
    return {
      itemCode: 'userEdit',
      form: {
        id: this.data ? this.data.id : null,
        account: this.data ? this.data.account : null,
        password: this.data ? this.data.password : null
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
      this.$emit('itemSubmit',this.itemCode,this.form);
    },
  }
  
}
</script>

<style>
</style>
