<template>
  <div id="role">
    <div class="query_bar">
      <span>
        <RoleQuery 
        ref="rolequery"
        :QueryData="QueryData"
        @handleSubmitSearch="handleSubmitSearch"/>
      </span>
      <span v-if="checkPermission('role:add')" >
        <el-button icon="el-icon-edit" @click="showAddVisible" >添加角色</el-button>
      </span>
    </div>
    <div class="content">
      <RoleAdd 
      :key="componentAddKey"
      :dialogAddVisible="dialogAddVisible"
      @itemSubmit="itemSubmit"
      @itemCancel="itemCancel"
      />
      <RoleEdit 
      :key="componentEditKey"
      :dialogEditVisible="dialogEditVisible"
      :data="currentData"
      @itemSubmit="itemSubmit"
      @itemCancel="itemCancel"
      />

      <RoleList 
      ref="rolelist"
      :tableData="tableData" 
      :listQueryPagination="listQueryPagination"
      :isLoading="listLoading"
      @paginationChange="paginationChange"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
      @handleDisable="handleDisable"
      @handleSetPermission="handleSetPermission"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import {getRoleList, addRole, editRole, disableRole, deleteRole, queryPermissionByRole} from '@/api/role'
import RoleList from './role_list'
import RoleQuery from './role_query'
import RoleAdd from './role_add'
import RoleEdit from './role_edit'

export default {
  name: "role",
  data() {
    return {
      changeKeyUnil: 2,               //组件key每次改变数量

      listLoading: true,              //是否显示加载状态
      tableData: [],                  //角色列表数据
      listQueryPagination: {          //列表分页参数  
        page: 1,         //当前页数
        pageSize: 5,     //当前每页数量
        pages: 0,        //一共多少页
        total: 0         //一个多少数据
      },
      QueryData: {                    //检索条件
        code: '',
        name: ''
      },
      currentData: null,          //当前操作数据
      currentId: 0,               //当前操作ID

      dialogAddVisible: false,    //添加用户组件是否显示
      componentAddKey: 0,         //添加用户组件的key

      dialogEditVisible: false,   //修改用户组件是否显示
      componentEditKey: 1,        //修改用户组件的key
  
      permissionsData: []         //当前角色对应的所有权限及已授权权限数据
    }
  },
  components: {
    RoleList,
    RoleQuery,
    RoleAdd,
    RoleEdit
  },
  mounted() {
    this.fetchRoleList()
  },
  methods: {
    // index
    // 请求角色列表数据
    fetchRoleList() {
      const listQuery = this.$refs.rolelist ? this.$refs.rolelist.listQuery : null
      const param = {
        listQuery: listQuery,
        QueryData: {data:this.QueryData}
      }

      this.listLoading = true
      getRoleList(param).then(res => {
        this.listLoading = false

        const data = res.data 
        const list = data ? data.items : null
        if(list){
          this.tableData = list
          this.listQueryPagination = {
            page: data.page ? data.page : this.listQueryPagination.page,            //当前页数
            pageSize: data.pageSize ? data.pageSiz : this.listQueryPagination.pageSize,    //当前每页数量
            pages: data.pages ? data.pages : this.listQueryPagination.pages,          //一共多少页
            total: data.total ? data.total : this.listQueryPagination.total          //一个多少数据
          }
        }
      })
    },

    // 提交添加角色数据
    fetchAddRole(data) {
      const param = {
        data: data
      }
      addRole(param).then(res => {
        if(res.success) {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 2 * 1000
          })
          this.dialogAddVisible = false
          this.fetchRoleList()
        }
      })
    },

    // 提交编辑角色数据
    fetchEditRole(data) {
      const param = {
        data: data
      }
      editRole(param).then(res => {
        if(res.success) {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 2 * 1000
          })
          this.dialogEditVisible = false
          this.fetchRoleList()
        }
      })
    },

    // 提交禁用/启用角色数据
    fetchDisableRole() {
      const param = {
        data: {
          id: this.currentId
        }
      }
      disableRole(param).then(res => {
        if(res.success) {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 2 * 1000
          })
          this.fetchRoleList()
        }
      })
    },

    // 提交删除角色数据
    fetchDeleteRole() {
      const param = {
        data: {
          id: this.currentId
        }
      }
      deleteRole(param).then(res => {
        if(res.success) {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 2 * 1000
          })
          this.fetchRoleList()
        }
      })
    },

    // 根据角色请求对应的权限数据
    fetchPermissionsByRole() {
      return new Promise((resolve, reject) => {
        const param = {
          data: this.currentData
        }
        queryPermissionByRole(param).then(res => {
          if(res.success) {
            this.permissionsData = res.data ? res.data : []
            resolve()
          }
        }).catch(res => {
          reject()
        })
      })
    },

    // component
    // 分页数据发生改变：如每页显示条数；当前第几页
    paginationChange(pageParam) {
      this.listQueryPagination.page = pageParam.page
      this.listQueryPagination.pageSize = pageParam.limit
      this.fetchRoleList()
    },

    // 点击查询按钮
    handleSubmitSearch(formInline) {
      this.QueryData = formInline
      this.fetchRoleList()
    },

    // 点击编辑按钮
    handleEdit(row) {
      this.currentData = row
      this.showEditVisible()
    },

    // 点击禁用按钮
    handleDisable(id) {
      this.currentId = id
      this.fetchDisableRole()
    },

    // 点击删除按钮
    handleDelete(id) {
      this.currentId = id
      this.fetchDeleteRole()
    },

    // 点击分配权限按钮
    handleSetPermission(row) {
      this.currentData = row
      this.fetchPermissionsByRole().then(() => {
        this.$router.push({
          path:'/base/setPermission',
          query:{
            roleId: row.id,
            data: this.permissionsData
          }
        })
      })
    },

    // 显示新增弹窗
    showAddVisible() {
      this.componentAddKey += this.changeKeyUnil
      this.dialogAddVisible = true
    },

    // 显示编辑弹窗
    showEditVisible() {
      this.componentEditKey += this.changeKeyUnil
      this.dialogEditVisible = true
    },

    // 组件弹窗提交事件
    itemSubmit(itemCode,data) {
      switch (itemCode) {
        case "roleAdd":
          this.fetchAddRole(data)
        break;
        case "roleEdit":
          this.fetchEditRole(data)
        break;
      }
    },
    // 组件弹窗取消
    itemCancel(itemCode) {
      switch (itemCode) {
        case "roleAdd":
          this.dialogAddVisible = false
        break;
        case "roleEdit":
          this.dialogEditVisible = false
        break;
      }
    }
  }
}
</script>

<style>
</style>
