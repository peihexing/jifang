<template>
  <div class="">
    <div class="question">
        {{idx}}.{{data.content.rowContent}}:
        <span v-if="data.required" class="asterisk">*</span>
    </div>
    <img class="img-anw" v-if="data.content.picture" :src="data.content.picture"/>
    <div class="sub-title">{{data.content.subtitle}}</div>
    <div class="anwser h5">
        <div class="anwser-box">
            <el-row class="row-height" >
                <el-col class="el-col-l" :span="12">
                    {{data.options[0].name}}
                </el-col>
                <el-col class="el-col-r" :span="12">
                    {{data.options[1].name}}
                </el-col>
            </el-row>
            <el-row class="radio-cut" v-for="(col, index) in data.content.colContent" :key="index">
                <div class="row-title">{{col.rowContent}}</div>
                <div style="padding: 0 20px;">
                    <el-slider v-model="result[index]" 
                        :min="Number(data.options[0].name)" 
                        :max="Number(data.options[1].name)"
                        @change="handleResult(col.id, result[index])"></el-slider>
                </div>
            </el-row>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          result: {
              0: 0,
              1: 0,
              2: 0,
              3: 0,
              4: 0,
              5: 0,
              6: 0,
              7: 0,
              8: 0,
              9: 0,
              10: 0
          }
      }
  },
  props: {
    idx: Number,
    data: Object
  },
  created() {
    console.log(this)
    this.data.content.colContent.forEach(item => {
        this.result[item.id] = ""
    })
    
  },
  methods: {
      handleResult(titleId,resultId) {
          this.$emit('handleResult',{
              titleId: titleId,
              result: resultId,
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
.row-height{
    min-height: 40px;
    background-color: #e5e5e5;
    padding: 10px 0;
}
.el-col-w{
    text-align: center;
}
.row-title{
    height: 36px;
    line-height: 36px;
    padding-left: 15px;
}

.anwser-box{
    margin-top: 6px;
    border-radius: 5px;
    overflow: hidden;
    padding-bottom: 15px;
    background-color: #fafafa;
}
.el-col-l{
    text-align: left;
    padding-left: 20px;
}
.el-col-r{
    text-align: right;
    padding-right: 20px;
}
</style>
