<template>
  <div class="wrap">
    <div class="question">
        第{{idx+1}}题、{{data.content.rowContent}}
        <span v-if="data.required" class="asterisk">*</span>
        <div style="font-size:14px">
            <span><b>本题有效填写人次: </b>{{count}} 次 &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span v-show="data.type=='11'"><b>平均分: </b>{{aver}}</span>
        </div>

        <el-table
            :data="tableData"
            border
            :row-class-name="tableHeaderClass"
            style="width: 100%">
            <el-table-column
            prop="name"
            label="选项">
            </el-table-column>
            <el-table-column
            prop="count"
            label="小计">
            </el-table-column>
            <el-table-column
            prop="rate"
            label="比例">
                <template slot-scope="scope">
                    <div style="display:flex;">
                        <div style="flex:1"><el-slider style="height:0px" v-model="scope.row.rate"></el-slider></div>
                        <div style="width: 100px;padding-left:15px">{{scope.row.rate.toFixed(2)}}%</div>
                    </div>
                    
                </template>
            </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          tableData: [],
          aver: 0
      }
  },
  props: {
    data: Object,
    idx: Number,
    count: Number
  },
  watch: {
    data: {
      immediate: true, // 这句重要
      handler(val) {
        this.init();
      }
    }
  },
  created() {
      
  },
  methods: {
      init() {debugger
          this.tableData= [];
          this.aver= 0;
          let totalScore = 0;
            this.data.options.forEach(item => {
                let rt = 0;
                if (this.count != 0) {
                    rt = (item.count/this.count) *100;
                }

                this.tableData.push({
                    name: item.name,
                    count: item.count,
                    rate: rt
                })

                if (this.data.type == '11') {
                    totalScore += item.count * item.fraction;
                }
            });

            let rate = 0;
            if (this.count==0) {
              rate =0;
            } else {
              rate = (totalScore/this.count).toFixed(2);
            }
            this.aver = rate;
      },
      tableHeaderClass() {
          return 'header-row-class'
      }
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap{
    padding: 20px 15px;
}
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
