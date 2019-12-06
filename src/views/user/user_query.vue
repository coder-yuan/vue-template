<template>
  <div id="userQuery" class="query_div">
    <QueryForm :formInline="formInline" @handleSubmitSearch="handleSubmitSearch">
      <template v-slot:queryItem>
        <el-form-item>
          <el-input v-model="formInline.account" placeholder="请输入账号"></el-input>
        </el-form-item>
      </template>
    </QueryForm>
  </div>
</template>

<script type="text/javascript">
import QueryForm from '@/components/QueryForm/index'

export default {
  name: "userQuery",
  props: {
    QueryData: Object
  },
  data() {
    return {
      formInline: {
        account: this.QueryData ? this.QueryData.account : ''
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
