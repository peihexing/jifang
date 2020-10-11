<template>
  <div>
    <el-tag
      :key="tag"
      v-for="tag in data"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >{{tag}}</el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    ></el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">添加</el-button>
  </div>
</template>

<style>
.el-tag {
  background-color: #ecf5ff;
    display: inline-block;
    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    color: #409eff;
    border: 1px solid #d9ecff;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

<script>
export default {
  data() {
    return {
      inputVisible: false,
      inputValue: ""
    };
  },
  props: {
    data:Array,
    default() {
        return [];
    }
  },
  methods: {
    handleClose(tag) {
      this.data.splice(this.data.indexOf(tag), 1);
      this.$emit('tagChange', this.data);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.data.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
      this.$emit('tagChange', this.data);
    }
  }
};
</script>