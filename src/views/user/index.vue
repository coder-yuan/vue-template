<template>
  <div id="user">
    <div class="query_bar">
      <span>
        <UserQuery 
        ref="userquery"
        :QueryData="QueryData"
        @handleSubmitSearch="handleSubmitSearch"/>
      </span>
      <span v-if="checkPermission('user:add')" >
        <el-button icon="el-icon-edit" @click="showUserAddVisible" >添加用户</el-button>
      </span>
    </div>
    <div class="content">
      <UserAdd 
      :dialogAddUserVisible="dialogAddUserVisible" 
      :key="componentAddUserKey"
      @itemCancel="itemCancel" 
      @itemSubmit="itemSubmit"
      />
      
      <UserEdit 
      :dialogEditUserVisible="dialogEditUserVisible" 
      :key="componentEditUserKey"
      :data="currentUserData"
      @itemCancel="itemCancel" 
      @itemSubmit="itemSubmit"
      />

      <UserPassword 
      :dialogEditPwdVisible="dialogEditPwdVisible"
      :key="componentEditPwdKey"
      :userId="currentUserId"
      @itemCancel="itemCancel" 
      @itemSubmit="itemSubmit"
      />

      <UserSetRole 
      :key="componentSetRoleKey"
      :rolesData="rolesData"
      :currentRoles="currentRoles"
      :dialogSetRoleVisible="dialogSetRoleVisible"
      @itemCancel="itemCancel"
      @itemSubmit="itemSubmit"
      />

      <UserList 
      ref="userlist"
      :tableData="tableData" 
      :listQueryPagination="listQueryPagination"
      :isLoading="listLoading"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
      @handleDisable="handleDisable"
      @handleEditPwd="handleEditPwd"
      @handleSetRole="handleSetRole"
      @paginationChange="paginationChange"
      />
    </div>
    
  </div>
</template>

<script type="text/javascript">
import { getUserList, registerUser, editUser, deleteUser, disableUser, updatePwd, getRolesByUser, setRolesByUser } from '@/api/user'
import {getRoleList} from '@/api/role'
import UserList from './user_list'
import UserQuery from './user_query'
import UserAdd from './user_add'
import UserEdit from './user_edit'
import UserPassword from './user_password'
import UserSetRole from './user_setrole'

export default {
  name: "user",
  data() {
    return {
      changeKeyUnil: 4,                 //组件key每次改变数量

      listLoading: true,                //是否显示加载状态
      tableData: [],                    //用户列表数据
      listQueryPagination: {            //用户列表分页参数  
        page: 1,                        //当前页数
        pageSize: 5,                    //当前每页数量
        pages: 0,                       //一共多少页
        total: 0                        //一个多少数据
      },          
      QueryData: {                      //检索条件
        account: ''
      },
      rolesData: [],                    //所有角色数据
                                            
      currentUserData: null,            //当前操作用户数据
      currentUserId: 0,                 //当前操作用户ID
      currentRoles: [],                 //当前用户所对应的角色集合

      dialogAddUserVisible: false,      //添加用户组件是否显示
      componentAddUserKey: 0,           //添加用户组件的key

      dialogEditUserVisible: false,     //修改用户组件是否显示
      componentEditUserKey: 1,          //修改用户组件的key

      dialogEditPwdVisible: false,      //修改用户密码组件是否显示
      componentEditPwdKey: 2,           //修改密码组件的key

      dialogSetRoleVisible: false,      //修改用户密码组件是否显示
      componentSetRoleKey: 3            //修改密码组件的key
    }
  },
  components: {
    UserList,
    UserQuery,
    UserAdd,
    UserEdit,
    UserPassword,
    UserSetRole
  },
  mounted() { 
    this.fetchUserList()
    this.fetchRoleList()
  },
  methods: {
    // index
    // 请求用户列表数据
    fetchUserList() { 
      const listQuery = this.$refs.userlist ? this.$refs.userlist.listQuery : null
      const param = {
        listQuery: listQuery,
        QueryData: {data:this.QueryData}
      }

      this.listLoading = true
      getUserList(param).then(res => {
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

    // 请求所有角色数据
    fetchRoleList() {
      const param = {
         listQuery: {page: 0, limit: 10000},
         QueryData: {data:null}
      }
      this.listLoading = true 
      getRoleList(param).then(res => {
        console.log('res',res);
        
        this.listLoading = false
        const list = res.data ? res.data.items : null
        if(list) {
          this.rolesData = list
        }
      })
    },

    // 提交新增用户数据
    fetchAddUser(data) {
      const param = {
        data: data
      }
      registerUser(param).then(res => {
        if(res.success) {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 2 * 1000
          })
          this.dialogAddUserVisible = false
          this.fetchUserList()
        }
      })
    },

    // 提交编辑用户数据
    fetchEditUser(data) {
      const param = {
        data: data
      }
      editUser(param).then(res => {
        if(res.success) {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 2 * 1000
          })
          this.dialogEditUserVisible = false
          this.fetchUserList()
        }
      })
    },

    // 提交禁用用户数据
    fetchDisable(id) {
      disableUser(id).then(res => {
        if(res.success) {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 2 * 1000
          })
          this.fetchUserList()
        }
      })
    },

    // 提交删除指定用户数据
    fetchDeleteUser(id) {
      deleteUser(id).then(res => {
        if(res.success) {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 2 * 1000
          })
          this.fetchUserList()
        }
      })
    },

    // 提交修改用户密码
    fetchEditPwd(data) {
      
      const param = {
        id: data.id,
        data: {
          password: data.pass
        }
      }
      updatePwd(param).then(res => {
        if(res.success) {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 2 * 1000
          })
          this.dialogEditPwdVisible = false
          this.fetchUserList()
        }
      })
    },

    // 请求用户对应角色数据
    fetchRolesByUser(id) {
      getRolesByUser(id).then(res => {
        if(res.success) {
          let roles = res.data.roles ? res.data.roles : []
          roles.forEach(role => {
            this.currentRoles.push(role.id)
          });
        }
        this.showSetRoleVisible(id)
      })
    },

    // 提交设置用户对应角色数据
    fetchSetRole(data) {
      let param = {
        data: {
          user_id: this.currentUserId,
          roles: data
        }
      }
      setRolesByUser(param).then(res => {
        if(res.success) {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 2 * 1000
          })
          this.dialogSetRoleVisible = false
          this.fetchUserList()
        }
      })
    },

    
    // 打开新增用户弹窗
    showUserAddVisible() {
      this.componentAddUserKey += this.changeKeyUnil
      this.dialogAddUserVisible = true
    },

    // 打开编辑用户弹窗
    showUserEditVisible() {
      this.componentEditUserKey += this.changeKeyUnil
      this.dialogEditUserVisible = true
    },

    // 打开修改密码弹窗
    showUserEditPwdVisible(id) {
      this.currentUserId = id
      this.componentEditPwdKey += this.changeKeyUnil
      this.dialogEditPwdVisible = true
    },

    // 打开设置角色弹窗
    showSetRoleVisible(id) {
      this.currentUserId = id
      this.componentSetRoleKey += this.changeKeyUnil
      this.dialogSetRoleVisible = true
    },

    // components

    // 分页数据发生改变：如每页显示条数；当前第几页
    paginationChange(pageParam) {
      this.listQueryPagination.page = pageParam.page
      this.listQueryPagination.pageSize = pageParam.limit
      this.fetchUserList()
    },

    // 点击查询按钮
    handleSubmitSearch(formInline) {
      this.QueryData = formInline
      this.fetchUserList()
    },

    // 组件点击取消
    itemCancel(itemCode) {
      switch (itemCode) {
        case "userAdd":
          this.dialogAddUserVisible = false
        break;
        case "userEdit":
          this.dialogEditUserVisible = false
        break;
        case "userPwd":
          this.dialogEditPwdVisible = false
        break;
        case "userSetRole":
          this.dialogSetRoleVisible = false
        break;
      }
    },

    // 组件点击提交
    itemSubmit(itemCode,data) {
      switch (itemCode) {
        case "userAdd":
          this.fetchAddUser(data)
        break;
        case "userEdit":
          this.fetchEditUser(data)
        break;
        case "userPwd":
          this.fetchEditPwd(data)
        break;
        case "userSetRole":
          this.fetchSetRole(data)
        break;
      }
    },

    // 点击修改密码按钮
    handleEditPwd(id) {
      this.showUserEditPwdVisible(id)
    },

    // 点击编辑按钮
    handleEdit(row) {
      this.currentUserData = row
      this.showUserEditVisible()
    },

    // 点击删除按钮
    handleDelete(id) {
      this.fetchDeleteUser(id)
    },

    // 点击禁用按钮
    handleDisable(id) {
      this.fetchDisable(id)
    },

    // 点击设置角色按钮
    handleSetRole(id) {
      this.fetchRolesByUser(id)
    }

    
  }
  
}
</script>

<style>
</style>
