<template>
  <div id="roleQuery" class="query_div">
    <QueryForm :formInline="formInline" @handleSubmitSearch="handleSubmitSearch">
      <template v-slot:queryItem>
        <el-form-item>
          <el-input v-model="formInline.code" placeholder="请输入编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        
      </template>
    </QueryForm>
  </div>
</template>

<script type="text/javascript">
import QueryForm from '@/components/QueryForm/index'

export default {
  name: "roleQuery",
  props: {
    QueryData: Object
  },
  data() {
    return {
      formInline: {
        code: this.QueryData ? this.QueryData.code : '',
        name: this.QueryData ? this.QueryData.name : ''
      }
    }
  },
  components: {
    QueryForm
  },
  methods: {
    handleSubmitSearch(formInline) {
      this.$emit('handleSubmitSearch',formInline)
    },
  }
}
</script>

<style>
</style>
