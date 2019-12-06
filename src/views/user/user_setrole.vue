<template>
  <div id="userSetRole">
    <el-dialog title="设置角色" :visible.sync="dialogSetRoleVisible" :before-close="handleClose">
      <div class="app-container">
        <el-transfer v-model="currentRolesData" :data="rolesData | dataFilter">
        </el-transfer>
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
  name: "userSetRole",
  props: {
    dialogSetRoleVisible: Boolean,
    rolesData: {type: Array,default: []},
    currentRoles: {type: Array,default: []}
  },
  data() {
    return {
      itemCode: 'userSetRole',
      currentRolesData: this.currentRoles
    }
  },
  methods: {
    handleClose() {
      this.handleCancel()
    },
    handleCancel() {
      this.$emit('itemCancel',this.itemCode);
    },
    handleSubmit() {
      this.$emit('itemSubmit',this.itemCode,this.currentRolesData);
    },
  },
  filters: {
    dataFilter(roles) {
      const data = []
      roles.forEach(role => {
        let code = role.code
        let name = role.name
        data.push({
          key: role.id,
          label: '['+code + '] ' + name
        })
      });
      return data
    }
  }
}
</script>

<style>
  .app-container {
    width: 75%;
    margin: auto;
  }
</style>
