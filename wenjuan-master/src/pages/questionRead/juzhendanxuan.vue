<template lang="html">
  <div>
        <div class="question">
            {{index}}.{{data.content.rowContent}}:
            <span v-if="data.required" class="asterisk">*</span>
        </div>
        <div class="subtitle">{{data.content.subtitle}}</div>
        <div class="anwser">
            <el-row class="row-height">
                <el-col v-for="(item, idx) in optionsArr" :key="idx" :span="Math.floor(24/optionsArr.length)">
                    {{item.name}}
                </el-col>
            </el-row>
            <el-row class="row-height" v-for="(item,idx) in scoreArr" :key="idx">
                <el-col v-for="(col, index) in item" :key="index" :span="Math.floor(24/item.length)">
                    <span style="color: #efa030">{{col.name}}</span>
                </el-col>
            </el-row>
            <el-row class="row-height" v-for="(item,idx) in rowContentArr" :key="idx">
                <el-col v-for="(col, index) in item" :key="index" :span="Math.floor(24/item.length)">
                    <span v-if="index===0">{{col.name}}</span>
                    <el-radio  v-if="index!==0 && col.name==questionType.juzhendanxuan"></el-radio>
                    <el-radio  v-if="index!==0 && col.name==questionType.juzhenliangbiao"></el-radio>
                    <el-checkbox v-if="index!==0 && col.name==questionType.juzhenduoxuan"></el-checkbox>
                    <el-input style="width:60%;" v-if="index!==0 && col.name==questionType.tableNumber"></el-input>
                    <el-input style="width:60%;" v-if="index!==0 && col.name==questionType.tabletiankong"></el-input>
                </el-col>
            </el-row>
        </div>
  </div>
</template>

<script>
import CONST from '../questionType/const'
export default {
  data() {
    return {
      optionsArr: [],
      rowContentArr: [],
      questionType: CONST.questionType,
      scoreArr: []
    };
  },
  mounted() {
      this.optionsArr = JSON.parse(JSON.stringify(this.data.options));
      this.optionsArr.unshift({
          name: '-'
      })

      if (this.questionType.juzhenliangbiao == this.type) {
          let row = [];
          row.push({
              name: "分值"
          });
         this.data.options.forEach(opt => {
              row.push({
                  name: opt.fraction
              })
          })
          this.scoreArr.push(row)
      }

      this.data.content.colContent.forEach(item=> {
          let row = [];
          row.push({
            name: item.rowContent  
          });
          this.data.options.forEach(opt => {
              row.push({
                  name: this.type
              })
          })
          this.rowContentArr.push(row);
      })
  },
  props: {
    data: Object,
    type: String,
    index: Number
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}
.question {
  font-size: 20px;
  font-weight: 400;
}
.asterisk {
  color: #ff6d56;
  margin-left: 5px;
  font-size: 25px;
  vertical-align: top;
}
.anwser {
  padding: 16px 0;
}
.input-label {
  height: 44px;
  line-height: 44px;
}
.subtitle {
  color: #8492a6;
  margin-top: 10px;
}
.row-height{
    height: 40px;
}
</style>
