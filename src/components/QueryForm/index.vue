<template>
  <div id="QueryForm" class="query_form_div">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <slot name="queryItem"></slot>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "QueryForm",
  props: {
    formInline: Object
  },
  data() {
    return {
    }
  },
  methods: {
    onSubmit() {
      this.$emit('handleSubmitSearch',this.formInline)
    }
  }
}
</script>

<style>
  .query_form_div {
    display: inline;
  }
  .query_form_div form{
    display: inline;
  }
</style>
