<template>
  <el-upload
    class="avatar-uploader"
    action="https://jsonplaceholder.typicode.com/posts/"
    :show-file-list="false"
    :on-success="handleSuccess"
    :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</template>
<script>
const OSS = require('ali-oss');
const client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAI4Feuk6tbMA8QSd1ahidM',
  accessKeySecret: 'ar61rLOv4Y15I80VyegNfSd4vmnntX',
  bucket: 'yizhuxing'
});

export default {
  data() {
    return {
      imageUrl: ''
    }
    
  },
  methods: {
      handleSuccess() {

      },
      beforeAvatarUpload(file) {
        const isLtSize = file.size / 1024 / 1024 < 0.5;

        if (file.type.indexOf('image') === -1) {
          this.$message.error('请上传图片格式!');
          return false;
        }
        if (!isLtSize) {
          this.$message.error('上传图片大小不能超过 0.5MB!');
          return false
        }
        client.put(new Date().getTime() + file.name, file).then(res => {
          let url = res.url;
          this.imageUrl = url;
          this.$emit('uploadSuccess', url);
        })
      }
  },
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