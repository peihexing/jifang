<template>
  <div class="">
    <div class="question">
        {{idx}}.{{data.content.rowContent}}:
        <span v-if="data.required" class="asterisk">*</span>
    </div>
    <img class="img-anw" v-if="data.content.picture" :src="data.content.picture"/>
    <div class="sub-title">{{data.content.subtitle}}</div>
    <div class="anwser">
        <el-checkbox-group 
                v-model="checkList"
                @change="handleChange()">
                 <div class="option-item"
                    v-for="(item, idx) in data.options" 
                    :key="idx">
                    <img v-if="item.picture" class="img-anw" :src="item.picture" />
                    <el-checkbox 
                        style="width:100%;"
                        :label="item.id" 
                        :key="item.id"
                        >{{item.name}}
                    </el-checkbox>
                </div>
            </el-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          radioResult: '',
          checkList: [],
          textarea: '',
          user: {}
      }
  },
  props: {
    idx: Number,
    data: Object
  },
  created() {
    console.log(this)
  },
  methods: {
      handleChange() {
          this.$emit('handleResult',{
              titleId: this.data.id,
              result: this.checkList.join(','),
              idx: this.idx
          })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.question{
    font-size: 20px;
    font-weight: 400;
}
.asterisk{
    color: #ff6d56;
    margin-left: 5px;
    font-size: 25px;
    vertical-align: top;
}
.anwser{
    padding: 16px 0;
}
.input-label{
    height: 44px;
    line-height: 44px;
}
.img-anw{
    max-width:100%; 
    height:auto;
}
.option-item{
    margin-top: 6px;
    border: 1px solid #bfcbd9;
    border-radius: 5px;
    padding: 10px 12px;
}
</style>
