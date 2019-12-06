<template>
  <div id="roleList" class="table_list">
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
          prop="code"
          align="center" 
          label="编号">
        </el-table-column>

        <el-table-column
          prop="name"
          align="center" 
          label="名称">
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
            <span v-if="checkPermission('role:bind:permission')" >
              <el-button size="mini" @click="handleSetPermission(scope.row)">
                分配权限
              </el-button>
            </span>
            <span v-if="checkPermission('role:disable')" >
              <el-button size="mini" @click="handleDisable(scope.row.id)">
                禁用
              </el-button>
            </span>
            <span v-if="checkPermission('role:edit')" >
              <el-button type="primary" size="mini" @click="handleEdit(scope.row)">
                编辑
              </el-button>
            </span>
            <span v-if="checkPermission('role:delete')" >
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
      <div>
        <router-view />
      </div>
  </div>
</template>

<script type="text/javascript">
import Pagination from '@/components/Pagination/index'

export default {
  name: "roleList",
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
    // 每页数量发生改变
    handleSizeChange(pageParam) {
      this.$emit('paginationChange',pageParam)
    },

    // 当前页码改变
    handleCurrentChange(pageParam) {
      this.$emit('paginationChange',pageParam)
    },

    // 点击编辑按钮
    handleEdit(row) {
      this.$emit('handleEdit',row)
    },

    // 点击禁用按钮
    handleDisable(id) {
      this.$emit('handleDisable',id)
    },

    // 点击删除按钮
    handleDelete(id) {
      this.$emit('handleDelete',id)
    },

    // 点击分配权限按钮
    handleSetPermission(row) {
      this.$emit('handleSetPermission',row)
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
