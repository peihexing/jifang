<template lang="html">
  <div class="container" v-loading="loading">
      <div class="tab-wrap static-wrap">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="默认报告" name="first">
            <div v-for="(item,idx) in list">
                <RadioStatic v-if="item.type == questionType.radio" :idx="idx" :count="total" :data="item"></RadioStatic>
                <RadioStatic v-if="item.type == questionType.checkbox" :idx="idx" :count="total" :data="item"></RadioStatic>
                <RadioStatic v-if="item.type == questionType.nps" :idx="idx" :count="total" :data="item"></RadioStatic>
                <Juzhendanxuan v-if="item.type == questionType.juzhendanxuan" :idx="idx" :count="total" :data="item"></Juzhendanxuan>
                <Juzhendanxuan v-if="item.type == questionType.juzhenduoxuan" :idx="idx" :count="total" :data="item"></Juzhendanxuan>
                <Juzhenliangbiao v-if="item.type == questionType.juzhenliangbiao" :idx="idx" :count="total" :data="item"></Juzhenliangbiao>
            </div>  
        </el-tab-pane>
        <el-tab-pane label="分类统计" name="second">
            <el-form label-width="120px">
                <el-form-item label="分类条件选择">
                    <el-col :span="11">
                        <el-select style="width:90%" v-model="selectVal1" @change="selectChangeHandle(1)" clearable placeholder="请选择">
                            <el-option
                            v-for="item in selectOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col class="line" :span="2"></el-col>
                    <el-col :span="11">
                        <el-select style="width:90%" v-model="selectVal2" @change="selectChangeHandle(2)" clearable placeholder="请选择">
                            <el-option
                            v-for="item in selectOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                
            </el-form>
            <div>
                <el-tag v-for="(item, idx) in classStaticTab" 
                    :type="selectTabIndex == idx? '':'info'" 
                    @click="selectTab(idx,item.value)"
                    style="margin: 10px;cursor: pointer;min-width:70px;text-align:center"
                >{{item.name}}</el-tag>
            </div>
            <div v-for="(item,idx) in classList">
                <RadioStatic v-if="item.type == questionType.radio" :idx="idx" :count="classTotal" :data="item"></RadioStatic>
                <RadioStatic v-if="item.type == questionType.checkbox" :idx="idx" :count="classTotal" :data="item"></RadioStatic>
                <RadioStatic v-if="item.type == questionType.nps" :idx="idx" :count="classTotal" :data="item"></RadioStatic>
                <Juzhendanxuan v-if="item.type == questionType.juzhendanxuan" :idx="idx" :count="classTotal" :data="item"></Juzhendanxuan>
                <Juzhendanxuan v-if="item.type == questionType.juzhenduoxuan" :idx="idx" :count="classTotal" :data="item"></Juzhendanxuan>
                <Juzhenliangbiao v-if="item.type == questionType.juzhenliangbiao" :idx="idx" :count="classTotal" :data="item"></Juzhenliangbiao>
            </div>  
        </el-tab-pane>
        <el-tab-pane label="交叉统计" name="third">
            <el-row>
                <el-col :span="12">
                    <div class="header-title"><b>自变量 X</b>&nbsp;&nbsp;（限2题）</div>
                    <div class="grid-content">
                        <div class="option-wrap" >
                            <el-row class="row-style" v-for="(item,idx) in xArr">
                                <div style="display:flex">
                                    <div style="flex:1">
                                        <el-select style="width:100%" v-model="xArr[idx].id" @change="selectChangeHandle(1)" clearable placeholder="请选择">
                                            <el-option
                                            v-for="item in selectXOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width: 50px">
                                        <div class="delete-btn" @click="deleteXHandle(idx)"></div>
                                </div>
                                </div>
                            </el-row>
                            <div style="display:flex" class="row-style">
                                    <div style="flex:1">
                                        <div class="add-item-btn" @click="addX">增加条件</div>
                                    </div>
                                <div style="width: 50px"></div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="header-title"><b>因变量 Y</b>&nbsp;&nbsp;（限10题）</div>
                    <div class="grid-content">
                        <div class="option-wrap" >
                            <el-row class="row-style" v-for="(item,idx) in yArr">
                                <div style="display:flex">
                                        <div style="flex:1">
                                            <el-select style="width:100%" v-model="yArr[idx].id" @change="selectChangeHandle(1)" clearable placeholder="请选择">
                                                <el-option
                                                v-for="item in selectYOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                </el-option>
                                            </el-select>
                                </div>
                                    <div style="width: 50px">
                                    <div class="delete-btn" @click="deleteYHandle(idx)"></div>
                            </div>
                                </div>
                                </el-row>
                            
                            <div style="display:flex" class="row-style">
                                <div style="flex:1">
                                    <div class="add-item-btn" @click="addY">增加条件</div>
                                </div>
                            <div style="width: 50px"></div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-button type="success"  style="width:80%;margin: 15px auto;display: block" @click="submitQuery">交叉分析</el-button>
            <div v-for="(item, idx) in crossTableArr">
                <div class="topic">{{item.topic}}</div>
                <el-table :data="item.content" border style="width: 100%">
                    <el-table-column
                    v-for="(item,idx) in item.header"
                    :prop="item.prop"
                    :label="item.label"
                    :key="idx"
                    ></el-table-column>
                </el-table>
            </div>
        </el-tab-pane>
    </el-tabs>
      </div>
    

  </div>
</template>

<script>
import { Message } from "element-ui";
import { getMyQuestions, analysis, crossAnalysis } from "../api/api";
import RadioStatic from "./questionStatic/radio";
import Juzhendanxuan from "./questionStatic/juzhendanxuan";
import CONST from "./questionType/const";
import mockData from "./questionStatic/data";
import Juzhenliangbiao from "./questionStatic/juzhenliangbiao";

export default {
  data() {
    return {
      id: "",
      questionType: CONST.questionType,
      list: [],
      classList: [],
      activeName: "first",
      total: 0,
      classTotal: 0,
      selectVal1: null,
      selectVal2: null,
      selectOptions: [],
      classStaticTab: [],
      selectTabIndex: -1,
      loading: false,
      xArr: [{
          id: null
      }],
      yArr: [{
          id: null
      }],
      selectXOptions:[],
      selectYOptions:[],
      crossTableArr: []
    };
  },
  components: {
    RadioStatic,
    Juzhendanxuan,
    Juzhenliangbiao
  },
  created() {
    let { id } = this.$route.query;
    this.id = id;
    this.analysis({
      id: id
    });

    this.crossAnalysis();
  },
  methods: {
    handleClick(tab, event) {
      if (this.activeName == "second") {
        this.initQuerySelect();
      } else if (this.activeName == "third") {
        this.initCross();
      }
    },
    analysis(param) {
      this.loading = true;
      analysis(param).then(res => {
        this.loading = false;
        this.list = res.topicInfos;
        this.total = res.count;
        this.$forceUpdate();
      });
    },
    classAnalysis(param) {
      this.loading = true;
      analysis(param).then(res => {
        this.loading = false;
        this.classList = res.topicInfos;
        this.classTotal = res.count;
        this.$forceUpdate();
      });
    },
    initQuerySelect() {
      let questionType = this.questionType;
      let classStaticTypes = [
        questionType.radio,
        questionType.checkbox,
        questionType.nps,
        questionType.scoreradio,
        questionType.scorecheckbox
      ];
      this.list.forEach((item, idx) => {
        debugger;
        if (classStaticTypes.indexOf(item.type + "") !== -1) {
          this.selectOptions.push({
            value: item.id,
            label: (idx+1) + "." + item.content.rowContent
          });
        }
      });
    },
    selectChangeHandle(type) {
      if (!this.selectVal1) {
        this.classStaticTab = [];
        this.selectVal2 = null;
        this.selectTabIndex = -1;
        this.classList = [];
      }
      if (this.selectVal1 === this.selectVal2) {
        return;
      }

      if (this.selectVal1 && type == 2) {
        this.selectTabIndex = -1;
      }

      let arr = [];
      if (this.selectVal1 && !this.selectVal2) {
        this.list.forEach(item => {
          if (item.id == this.selectVal1) {
            item.options.forEach(subItem => {
              arr.push({
                name: subItem.name,
                value: subItem.id
              });
            });
          }
        });
      } else if (this.selectVal1 && this.selectVal2) {
        this.list.forEach(item => {
          if (item.id == this.selectVal1) {
            item.options.forEach(subItem => {
              this.list.forEach(item2 => {
                if (item2.id == this.selectVal2) {
                  item2.options.forEach(subItem2 => {
                    arr.push({
                      name: subItem.name + "-" + subItem2.name,
                      value: subItem.id + "," + subItem2.id
                    });
                  });
                }
              });
            });
          }
        });
      }
      this.classStaticTab = arr;
    },
    selectTab(idx, val) {
      this.selectTabIndex = idx;
      let param = {
        id: this.id
      };
 
      let cond = [];
      if (val.indexOf(",") == -1) {
        cond.push({
          title_id: this.selectVal1,
          option_id: val
        });
      } else {
        let vals = val.split(",");
        cond.push({
          title_id: this.selectVal1,
          option_id: vals[0]
        });
        cond.push({
          title_id: this.selectVal2,
          option_id: vals[1]
        });
      }
      param.conditions = JSON.stringify(cond);
      this.classAnalysis(param);
    },
    crossAnalysis(conventional,dependent) {
      crossAnalysis({
        id: this.id,
        conventional: JSON.stringify(conventional),
        dependent: JSON.stringify(dependent)
      }).then(res => {
        res.forEach(item => {
            let tableHeader = [];
            let content = [];
            let topic = ""
            item.forEach((subItem, idx) => {
                let rowData = {};
                
                if (idx == 0) {
                    tableHeader = [{
                        prop: "first",
                        label: "X\\Y"
                    }]; 
                    
                    if (subItem.preTopicName) {
                        topic = subItem.preTopicName + "["+subItem.topicName+"]";
                    } else {
                        topic = subItem.topicName;
                    }
                }
                rowData["first"] = subItem.options.optionName;
                subItem.options.options.forEach(option => {
                    rowData[option.id] = option.count;
                    if (idx == 0) {
                        tableHeader.push({
                            prop: option.id,
                            label: option.name
                        });
                    }
                }); 
                
                content.push(rowData);
            })
            
            this.crossTableArr.push({
                header: tableHeader,
                content: content,
                topic: topic
            })
        })

        console.log(JSON.stringify(this.crossTableArr));

      });
    },
    initCross() {
        let questionType = this.questionType;
        let XQuestionType = [
            questionType.radio,
            questionType.checkbox,
            questionType.nps,
            questionType.scoreradio,
            questionType.scorecheckbox
        ];
        let YQuestionType = [
            questionType.radio,
            questionType.checkbox,
            questionType.nps,
            questionType.scoreradio,
            questionType.scorecheckbox,
            questionType.juzhendanxuan,
            questionType.juzhenduoxuan,
            questionType.juzhenliangbiao
        ];
        let juzhen = [
            questionType.juzhendanxuan,
            questionType.juzhenduoxuan,
            questionType.juzhenliangbiao
        ];
        this.list.forEach((item,idx) => {
            if (XQuestionType.indexOf(item.type + "") != -1) {
                this.selectXOptions.push({
                    value: item.id,
                    label: (idx+1) + "." + item.content.rowContent
                })
            }
            if(YQuestionType.indexOf(item.type+ "") != -1) {
                if (juzhen.indexOf(item.type+ "") !=-1) {
                    item.content.colContent.forEach(subItem => {
                        this.selectYOptions.push({
                            value: subItem.id,
                            label: (idx+1) + "." + item.content.rowContent + "-" + subItem.rowContent
                        })
                    })
                } else {
                    this.selectYOptions.push({
                        value: item.id,
                        label: (idx+1) + "." + item.content.rowContent
                    })
                }
            }
        })
        console.log(this.selectXOptions);
    },
    deleteXHandle(idx) {
        this.xArr.splice(idx,1);
    },
    deleteYHandle(idx) {
        this.yArr.splice(idx,1);
    },
    addX() {
        if (this.xArr.length == 2) {
            this.$message({
                message: "自变量的个数最多为两个",
                type: "error"
            })
            return
        }
        this.xArr.push({
            id: null
        })
        
    },
    addY() {
        if (this.yArr.length == 10) {
            this.$message({
                message: "自变量的个数最多为10个",
                type: "error"
            })
            return
        }
        this.yArr.push({
            id: null
        })
    },
    submitQuery() {
        console.log(this.xArr,this.yArr);
        this.crossTableArr = [];
        let conventional = [];
        let dependent = [];

        let xflag = false;
        this.xArr.forEach(item => {
            if (item.id) {
                xflag = true;
                conventional.push(item.id);
            }
        })

        let yflag = false;
        this.yArr.forEach(item => {
            if (item.id) {
                yflag = true;
                dependent.push(item.id)
            }
        })

        if (xflag && yflag) {
            this.crossAnalysis(conventional,dependent)
        }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
}

.tab-wrap {
  width: 70%;
  margin-left: 15%;
  margin-top: 30px;
}

.req {
  color: red;
  font-weight: bold;
  position: absolute;
  top: 3px;
  left: -10px;
}
.option-item {
  display: block;
  margin: 10px 15px;
}
.form-wrap {
  width: 100%;
}
.add-item-btn {
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
.header-title {
  height: 30px;
  line-height: 30px;
}
.row-style{
    padding: 10px 20px 10px 0px;
}
.topic{
    margin-top: 20px;
    height: 30px;
    line-height: 30px;
}
</style>
