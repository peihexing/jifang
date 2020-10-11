<template>
  <div style="display: inline-block;vertical-align: middle;margin-left:15px">
    <div class="img-opt" @click="showDialog = true"></div>
    <el-dialog title="图片上传" :visible.sync="showDialog" >
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload >
    </el-dialog>
  </div>
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
      imageUrl: '',
      showDialog: false
    }
    
  },
  methods: {
      handleSuccess() {

      },
      beforeAvatarUpload(file) {
        const isLtSize = file.size / 1024 / 1024 < 1;

        if (file.type.indexOf('image') === -1) {
          this.$message.error('请上传图片格式!');
          return false;
        }
        if (!isLtSize) {
          this.$message.error('上传图片大小不能超过 1MB!');
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
.img-opt{
  height: 30px;
  width: 30px;
  background-image: url("../../static/icoall.png");
  background-position: -50px -218px;
}
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