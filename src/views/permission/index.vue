<template>
  <div id="permission">
    <div class="query_bar">
      <span>
        <PermissionQuery 
        :QueryData="QueryData"
        @handleSubmitSearch="handleSubmitSearch"/>
      </span>
      <span v-if="checkPermission('permission:add')" >
        <el-button icon="el-icon-edit" @click="showAddVisible">添加权限</el-button>
      </span>
    </div>
    <div class="content">
      <PermissionAdd 
      :key="componentAddKey"
      :dialogAddVisible="dialogAddVisible"
      @itemSubmit="itemSubmit"
      @itemCancel="itemCancel"
      />

      <PermissionEdit 
      :key="componentEditKey"
      :dialogEditVisible="dialogEditVisible"
      :data="currentData"
      @itemSubmit="itemSubmit"
      @itemCancel="itemCancel"
      />

      <PermissionList 
      ref="permissionlist"
      :tableData="tableData" 
      :listQueryPagination="listQueryPagination"
      :isLoading="listLoading"
      @paginationChange="paginationChange"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
      @handleDisable="handleDisable"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import {getPermissionList, addPermission, editPermission, disablePermission, deletePermission} from '@/api/permission'
import PermissionList from './permission_list'
import PermissionQuery from './permission_query'
import PermissionAdd from './permission_add'
import PermissionEdit from './permission_edit'

export default {
  name: "permission",
  data() {
    return {
      changeKeyUnil: 2,               //组件key每次改变数量

      listLoading: true,              //是否显示加载状态
      tableData: [],                  //角色列表数据
      listQueryPagination: {          //列表分页参数  
        page: 1,                      //当前页数
        pageSize: 5,                  //当前每页数量
        pages: 0,                     //一共多少页
        total: 0                      //一个多少数据
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
    }
  },
  components: {
    PermissionList,
    PermissionQuery,
    PermissionAdd,
    PermissionEdit
  },
  mounted() {
    this.fetchPermissionList()
  },
  methods: {
    // index
    // 根据检索条件分页请求权限数据
    fetchPermissionList() {
      const listQuery = this.$refs.permissionlist ? this.$refs.permissionlist.listQuery : null
      const param = {
        listQuery: listQuery,
        QueryData: {data:this.QueryData}
      }

      this.listLoading = true
      getPermissionList(param).then(res => {
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
    
    // 提交添加权限数据
    fetchAddPermission(data) {
      const param = {
        data: data
      }
      addPermission(param).then(res => {
        if(res.success) {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 2 * 1000
          })
          this.dialogAddVisible = false
          this.fetchPermissionList()
        }
      })
    },

    // 提交编辑权限数据
    fetchEditPermission(data) {
      const param = {
        data: data
      }
      editPermission(param).then(res => {
        if(res.success) {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 2 * 1000
          })
          this.dialogEditVisible = false
          this.fetchPermissionList()
        }
      })
    },

    // 提交禁用权限数据
    fetchDisablePermission() {
      const param = {
        data: this.currentData
      }
      disablePermission(param).then(res => {
        if(res.success) {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 2 * 1000
          })
          this.fetchPermissionList()
        }
      })
    },

    // 提交删除权限数据
    fetchDeletePermission() {
      const param = {
        data: this.currentData
      }
      deletePermission(param).then(res => {
        if(res.success) {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 2 * 1000
          })
          this.fetchPermissionList()
        }
      })
    },

    // component
    // 分页数据发生改变：如每页显示条数；当前第几页
    paginationChange(pageParam) {
      this.listQueryPagination.page = pageParam.page
      this.listQueryPagination.pageSize = pageParam.limit
      this.fetchPermissionList()
    },

    // 点击查询按钮
    handleSubmitSearch(formInline) {
      this.QueryData = formInline
      this.fetchPermissionList()
    },

    // 点击编辑按钮
    handleEdit(row) {
      this.currentData = row
      this.showEditVisible()
    },

    // 点击禁用按钮
    handleDisable(row) {
      this.currentData = row
      this.fetchDisablePermission()
    },

    // 点击删除按钮
    handleDelete(row) {
      this.currentData = row
      this.fetchDeletePermission()
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
        case "permissionAdd":
          this.fetchAddPermission(data)
        break;
        case "permissionEdit":
          this.fetchEditPermission(data)
        break;
      }
    },

    // 组件弹窗取消
    itemCancel(itemCode) {
      switch (itemCode) {
        case "permissionAdd":
          this.dialogAddVisible = false
        break;
        case "permissionEdit":
          this.dialogEditVisible = false
        break;
      }
    }
  }
}
</script>

<style>
</style>
