<template>
  <div id="roleEdit">
    <el-dialog title="编辑角色" :visible.sync="dialogEditVisible" :before-close="handleClose">
      
      <div class="app-container">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="编号">
            <el-input v-model="form.code" />
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" v-model="form.remark"></el-input>
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
  name: "roleEdit",
  props: {
    dialogEditVisible: Boolean,
    data: Object
  },
  data() {
    return {
      itemCode: 'roleEdit',
      form: {
        id: this.data ? this.data.id : null,
        code: this.data ? this.data.code : null,
        name: this.data ? this.data.name : null,
        remark: this.data ? this.data.remark : null
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
