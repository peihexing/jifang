<template>
  <div class="wrap">
    <div class="question">
      第{{idx+1}}题、{{data.content.rowContent}}
      <span v-if="data.required" class="asterisk">*</span>

      <el-table :data="tableData" border style="width: 100%">
          <el-table-column v-for="(item,idx) in tableHeader" :prop="item.prop" :label="item.label" :key="idx"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      tableHeader: []
    };
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
  methods: {
    init() {
      this.tableData = [];
      this.tableHeader = [];
      
      this.tableHeader.push({
        prop: "0000",
        label: "题目\\选项"
    })
    this.data.content.colContent.forEach((item,idx) => {
        let obj = {"0000": item.rowContent};
        item.options.forEach((item2,idx2) => {
            if (idx == 0) {
                this.tableHeader.push({
                    prop: item2.id,
                    label: item2.name
                })
            };debugger
            let rate = 0;
            if (this.count==0) {
              rate =0;
            } else {
              rate = ((item2.count/this.count)*100).toFixed(2);
            }
            obj[item2.id] = item2.count + "次(" + rate + "%)"
        })
        
        this.tableData.push(obj)
    })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap {
  padding: 20px 15px;
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
.img-anw {
  max-width: 100%;
  height: auto;
}
.option-item {
  margin-top: 6px;
  border: 1px solid #bfcbd9;
  border-radius: 5px;
  padding: 10px 12px;
}
.el-slider__button-wrapper{
    display: none;
}
</style>
