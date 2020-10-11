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
                <el-col v-for="(item, idx) in data.options" class="el-col-w" :key="idx" :span="Math.floor(24/data.options.length)">
                    {{item.name}}
                </el-col>
            </el-row>
            <el-row class="radio-cut" v-for="(col, index) in data.content.colContent" :key="index">
                <div class="row-title">{{col.rowContent}}</div>
                <div>
                    <el-checkbox-group v-model="result[index]" style="width:100%" @change="handleResult(col.id,result[index])">
                        <el-col v-for="(item, idx) in data.options" class="el-col-w" :key="idx" :span="Math.floor(24/data.options.length)">
                            <el-checkbox 
                                size="medium"
                                :label="item.id"
                            >.</el-checkbox>
                        </el-col>
                    </el-checkbox-group>
                    <!-- <el-col v-for="(item, idx) in data.options" class="el-col-w" :key="idx" :span="Math.floor(24/data.options.length)">
                            <el-checkbox 
                                size="medium"
                                :label="item.id"
                                @change="checkboxChange(col.id, item.id)"
                            >.</el-checkbox>
                        </el-col> -->
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
              0: [],
              1: [],
              2: [],
              3: [],
              4: [],
              5: [],
              6: [],
              7: [],
              8: [],
              9: [],
              10: []
          },
          resultMap: {}
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
      handleResult(titleId,resultId) {debugger
            let res = JSON.parse(JSON.stringify(resultId));
          this.$emit('handleResult',{
              titleId: titleId,
              result: res.join(','),
              idx: this.idx
          })
      },
      checkboxChange(titleId,resultId) {debugger
          if (!this.resultMap[titleId]) {
              this.resultMap[titleId] = {}
          }
          if (!this.resultMap[titleId][resultId]) {
              this.resultMap[titleId][resultId] = true;
          } else {
              delete this.resultMap[titleId][resultId]
          }
          console.log(this.resultMap);
          this.$emit('handleResult',{
              titleId: titleId,
              result: Object.keys(this.resultMap[titleId]).join(','),
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
</style>
