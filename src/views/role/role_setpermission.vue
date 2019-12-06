<template>
  <div id="setPermission">
    <div>
      <el-tree
        ref="tree"
        :data="data"
        :props="defaultProps"
        node-key="id"
        show-checkbox
        :default-checked-keys="defaultCheckArray"
        :default-expanded-keys="defaultOpenArray"
      >
      </el-tree>
    </div>
    <div style="text-align:center;margin: 50px 0">
        <el-button @click="handleCancel">返 回</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </div>
      <!-- @check-change="handleCheckChange" -->
  </div>
</template>

<script type="text/javascript">
import {setPermissionsByRole} from '@/api/role'
export default {
  name: "setPermission",
  data() {
    return {
      data : this.$route.query.data,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      currentCheckedKeys: [],
    }
  },
  methods: {
    fetchSetPermission() {
      let param = {
        data: {
          role_id: this.$route.query.roleId,
          permissions: this.currentCheckedKeys
        }
      }
      setPermissionsByRole(param).then(res => {
        if(res.success) {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 2 * 1000
          })
          this.$router.go(-1)
        }
      })
      
    },
    filterCheckedPermissions(permissions,checkArray) {
      permissions.forEach(item => {
        if(item.checked) checkArray.push(item.id)
        if(item.children && item.children.length != 0) this.filterCheckedPermissions(item.children,checkArray)
      });
    },
    filterOpenedPermissions(permissions,openArray) {
      permissions.forEach(item => {
        if(!item.checked) openArray.push(item.id)
        if(item.children && item.children.length != 0) this.filterOpenedPermissions(item.children,openArray)
      });
    },
    handleCancel() {
      this.$router.go(-1)
    },
    handleSubmit() {
      this.currentCheckedKeys = this.$refs.tree.getCheckedKeys()
      this.fetchSetPermission()
    }
  },
  computed: {
    defaultCheckArray() {
      const checkArray = []
      this.filterCheckedPermissions(this.data,checkArray)
      return checkArray
    },
    defaultOpenArray() {
      const openArray = []
      this.filterOpenedPermissions(this.data,openArray)
      return openArray
    }
  },
}
</script>

<style>
  .el-tree-node.is-expanded>.el-tree-node__children {
    display: flex
  }
</style>