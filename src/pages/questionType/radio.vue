<template lang="html">
  <div class="container">
      <el-form ref="form" class="form-wrap" :model="form" label-width="80px">
        <el-form-item label="题目">
          <el-input v-model="form.rowContent"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.subtitle"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox-group v-model="form.required">
            <el-checkbox label="必答" name="type"></el-checkbox>
            <uploadFile @uploadSuccess="uploadTopicImgHandle"></uploadFile>
          </el-checkbox-group>
        </el-form-item>
        <div class="option-wrap" >
        <el-form-item label="选项" v-for="(item,idx) in form.options">
          <el-row>
            <el-input v-model="item.name"></el-input>
            <uploadFile @uploadSuccess="uploadItemImgHandle($event,idx)"></uploadFile>
            <div class="delete-btn" @click="deleteHandle(idx)"></div>
          </el-row>
        </el-form-item>
        <el-form-item label="">
          <div class="add-item-btn" @click="add">新建选项</div>
        </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="onSubmit">完成编辑</el-button>
        </el-form-item>
      </el-form> 
  </div>
</template>

<script>
import uploadFile from '../uploadFile'

export default {
  data () {
    return {
      form: {
        rowContent: "",
        subtitle: "",
        required: true,
        options: []
      }
    }
  },
  components: {
    uploadFile
  },
  watch: {
    data: {
      immediate: true, // 这句重要
      handler(val) {
        this.init(val);
      }
    }
  },
  mounted() {
    this.init(this.data);
  },
  props: {
      data: Object,
      type: String
  },
  methods: {
    init(val) {
      let data = JSON.parse(JSON.stringify(val));
      this.form.rowContent = data.content && data.content.rowContent;
      this.form.subtitle = data.content && data.content.subtitle;
      this.form.required = data.required;
      this.form.options = data.options || [{
        name: "选项1"
      },{
        name: "选项2"
      }];
    },
    uploadTopicImgHandle(url) {
      this.form.picture = url;
    },
    uploadItemImgHandle(url, index) {
      this.form.options[index].picture = url;
    },
    onSubmit() {
      this.$emit('onSubmit', {
        type: this.type,
        data: this.form
      })
    },
    onCancel() {
      this.$emit('onCancel', {
        type: this.type
      })
    },
    add() {
      this.form.options.push({
        name: ""
      })
    },
    deleteHandle(idx) {
      this.form.options.splice(idx,1);
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  position: relative;
}
.req{
    color: red;
    font-weight: bold;
    position: absolute;
    top: 3px;
    left: -10px;
}
.option-item{
    display: block;
    margin: 10px 15px;
}
.form-wrap{
  width: 100%;
}
.add-item-btn{
    display: inline-block;
    zoom: 1;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    border: 1px dashed #e0e0e0;
    padding-left: 10px;
    background: #fafafa;
    color: #b2b2b2;
    cursor: pointer;
    height: 36px;
    line-height: 36px;
}
.option-wrap .el-input{
  width: 80%;
}
.option-wrap .el-input{
  width: 80%;
}
.option-wrap .add-item-btn{
  width: 80%;
}
</style>
