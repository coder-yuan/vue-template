<template>
  <div id="avatar" >
    <el-upload
      class="avatar-uploader"
      name="avatar"
      :headers="requestHeaders"
      :action="requestAction"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex';
var {requestBaseUrl} = require('@/settings.js');

export default {
  name: "avatar",
  props: {
    avatar: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      imageUrl: this.avatar ? this.avatar.file_url : '',
      requestAction: requestBaseUrl+'/api/v1/file',
      requestHeaders: {
        Authorization : "Bearer " + this.$store.getters.token.access_token
      }
    }
  },
  computed: {
  },
  methods: {
    handleAvatarSuccess(res, file) {
        let avatarFile = res.data
        this.imageUrl = avatarFile.file_url
        // 更新用户头像
      this.$emit('updateUserAvatar',avatarFile)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
