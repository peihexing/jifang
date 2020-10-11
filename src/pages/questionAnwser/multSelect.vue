<template>
  <div class="">
    <div class="question">
        {{idx}}.{{data.content.rowContent}}:
        <span v-if="data.required" class="asterisk">*</span>
    </div>
    <img class="img-anw" v-if="data.content.picture" :src="data.content.picture"/>
    <div class="sub-title">{{data.content.subtitle}}</div>
    <div class="anwser">
        <div style="margin-top: 6px">
            <el-select 
                v-model="value1" 
                v-show="titleArr.length>0" 
                :placeholder="'请选择'+titleArr[0]" 
                @change="firstHandle">
                <el-option
                v-for="item in firstLevelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
                </el-option>
            </el-select>
            <el-select v-model="value2" v-show="titleArr.length>1" :placeholder="'请选择'+titleArr[1]" @change="secHandle">
                <el-option
                v-for="item in secLevelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="value3" v-show="titleArr.length>2" :placeholder="'请选择'+titleArr[2]" @change="thirdHandle">
                <el-option
                v-for="item in thirdLevelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          result: '',
          titleArr: [],
          firstLevelOptions: [],
          secLevelOptions: [],
          thirdLevelOptions: [],
          secMap: {},
          thirdMap: {},
          value1: "",
          value2: "",
          value3: ""
      }
  },
  props: {
    idx: Number,
    data: Object
  },
  created() {
    console.log(this)
    let str = this.data.options[0].name;
    let sp = '_$_';
    let arr = str.replace(/\n/g,sp).split(sp);
    this.titleArr = arr[0].split('/');

    for(var i = 1; i< arr.length;i++) {
        let options = arr[i].split('/');
        
        if (!this.secMap[options[0]]) {
            this.secMap[options[0]] = []
        }
        this.secMap[options[0]].push(options[1]);

        if (!this.thirdMap[options[1]]) {
            this.thirdMap[options[1]] = []
        }
        this.thirdMap[options[1]].push(options[2])

        
    }
    Object.keys(this.secMap).forEach(item => {
        this.firstLevelOptions.push({
            value: item,
            label: item
        })
        this.secMap[item] = this.unique(this.secMap[item]);
    })

     Object.keys(this.thirdMap).forEach(item => {
        this.thirdMap[item] = this.unique(this.thirdMap[item]);
    })
    
  },
  methods: {
      handleResult() {
          this.$emit('handleResult',{
              titleId: this.data.id,
              result: this.result,
              idx: this.idx
          })
      },
       unique (arr) {
        return Array.from(new Set(arr))
    },
    firstHandle() {
        let arr =[];
        this.secMap[this.value1].forEach(item => {
            arr.push({
                value: item,
                label: item
            })
        })
        this.secLevelOptions = arr;
        this.thirdLevelOptions = [];
        this.value2 = '';
        this.value3 = '';
        if (this.titleArr.length == 1) {
            this.$emit('handleResult',{
              titleId: this.data.id,
              result: this.value1,
              idx: this.idx
            })
        }
    },
    secHandle() {
        let arr = [];
        this.thirdMap[this.value2].forEach(item => {
            arr.push({
                value: item,
                label: item
            })
        })
        this.thirdLevelOptions = arr;
        this.value3 = '';
        if (this.titleArr.length == 2) {
            this.$emit('handleResult',{
              titleId: this.data.id,
              result: `${this.value1},${this.value2}`,
              idx: this.idx
            })
        }
    },
    thirdHandle() {
        this.$emit('handleResult',{
            titleId: this.data.id,
            result: `${this.value1},${this.value2},${this.value3}`,
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
</style>
