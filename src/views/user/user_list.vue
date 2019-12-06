<template>
  <div id="userList" class="table_list">
    <el-table
      v-loading="isLoading"
      :data="tableData"
      :border="showBorder"
      style="width: 96%">
        <el-table-column
          prop="id"
          align="center" 
          width="80"
          label="ID">
        </el-table-column>

        <el-table-column
          prop="account"
          align="center" 
          label="账号">
        </el-table-column>

        <el-table-column
          prop="email"
          align="center" 
          label="邮箱">
        </el-table-column>

        <el-table-column
          prop="address"
          align="center" 
          label="地址">
        </el-table-column>

        <el-table-column
          prop="birthday"
          align="center" 
          label="生日">
        </el-table-column>

        <el-table-column
          prop="disabled"
          align="center" 
          label="状态">
          <template slot-scope="scope">
              {{ scope.row.disabled | disableFilter}}
          </template>
        </el-table-column>

        <el-table-column
          prop="actions"
          align="center" 
          width="400"
          label="操作">
          <template slot-scope="scope">
            <span v-if="checkPermission('user:bind:role')" >
              <el-button size="mini" @click="handleSetRole(scope.row.id)">
                设置角色
              </el-button>
            </span>
            <span v-if="checkPermission('user:edit')" >
              <el-button size="mini" @click="handleEditPwd(scope.row.id)">
                修改密码
              </el-button>
            </span>
            <span v-if="checkPermission('user:disable')" >
              <el-button size="mini" @click="handleDisable(scope.row.id)">
                禁用
              </el-button>
            </span>
            <span v-if="checkPermission('user:edit')" >
              <el-button type="primary" size="mini" @click="handleEdit(scope.row)">
                编辑
              </el-button>
            </span>
            <span v-if="checkPermission('user:delete')" >
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
                删除
              </el-button>
            </span>  
          </template>  
        </el-table-column>
      </el-table>
      <div class="block">
        <pagination 
        v-show="listQueryPagination.total>0" 
        :total="listQueryPagination.total" 
        :page.sync="listQuery.page" 
        :limit.sync="listQuery.limit" 
        :pageSizes="[5,10,20]"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        />
      </div>
  </div>
</template>

<script type="text/javascript">
import Pagination from '@/components/Pagination/index'

export default {
  name: "userList",
  props: {
    tableData: Array,
    listQueryPagination: Object,
    isLoading: Boolean
  },
  data() {
    return {
      listQuery: {
        page: this.listQueryPagination.page,
        limit: this.listQueryPagination.pageSize
      },
      showBorder: true
    }
  },
  components: {
    Pagination
  },
  methods: {
    handleEditPwd(id) {
      this.$emit('handleEditPwd',id)
    },
    handleEdit(row) {
      this.$emit('handleEdit',row)
    },
    handleDisable(id) {
      this.$emit('handleDisable',id)
    },
    handleDelete(id) {
      this.$emit('handleDelete',id)
    },
    handleSetRole(id) {
      this.$emit('handleSetRole',id)
    },

    // 每页数量发生改变
    handleSizeChange(pageParam) {
      this.$emit('paginationChange',pageParam)
    },
    // 当前页码改变
    handleCurrentChange(pageParam) {
      this.$emit('paginationChange',pageParam)
    }
  },
  filters: {
    disableFilter(disable) {
      return disable ? "禁用" : "正常"
    }
  }
}
</script>

<style>
</style>
