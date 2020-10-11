<template>
  <div>
    <div class="wrap" v-show="!isFinish">
      <div class="type-item cst-question">
        <div class="type-show"></div>
      </div>
      <div class="first-page" v-show="!startAnwser">
        <div style="font-size: 18px;font-weight: 400;margin-top:30px">{{data.prefix}}</div>
        <el-button class="start-btn" type="primary" @click="handleStartAnwser">点击开始问卷</el-button>
      </div>
      <div v-show="startAnwser" style="padding: 30px 0;">
        <div v-for="(pageData,index) in questionArr" :key="index">
          <div v-show="index==currentPage">
            <div style="padding: 0px 18px" v-for="(item, idx) in pageData" :key="idx">
              <RadioH5
                v-if="item.type == questionType.radio || item.type== questionType.scoreradio"
                :data="item"
                :idx="getIndex(index,idx)"
                @handleResult="handleResult"
              ></RadioH5>
              <CheckboxH5
                v-if="item.type == questionType.checkbox || item.type == questionType.scorecheckbox"
                :data="item"
                :idx="getIndex(index,idx)"
                @handleResult="handleResult"
              ></CheckboxH5>
              <Tiankong
                v-if="item.type == questionType.tiankong"
                :data="item"
                :idx="getIndex(index,idx)"
                @handleResult="handleResult"
              ></Tiankong>
              <Juzhendanxuan
                v-if="item.type == questionType.juzhendanxuan || item.type == questionType.juzhenliangbiao"
                :data="item"
                :idx="getIndex(index,idx)"
                @handleResult="handleResult">
              </Juzhendanxuan>
              <Juzhenduoxuan
                v-if="item.type == questionType.juzhenduoxuan"
                :data="item"
                :idx="getIndex(index,idx)"
                @handleResult="handleResult">
              </Juzhenduoxuan>
              <Juzhenhuadong
                v-if="item.type == questionType.juzhenhuadong"
                :data="item"
                :idx="getIndex(index,idx)"
                @handleResult="handleResult">
              </Juzhenhuadong>
              <tableNumber
                v-if="item.type == questionType.tableNumber"
                :data="item"
                :idx="getIndex(index,idx)"
                @handleResult="handleResult">
              </tableNumber>
              <tabletiankong
                v-if="item.type == questionType.tabletiankong"
                :data="item"
                :idx="getIndex(index,idx)"
                @handleResult="handleResult">
              </tabletiankong>
              <nps
                v-if="item.type == questionType.nps"
                :data="item"
                :idx="getIndex(index,idx)"
                @handleResult="handleResult">
              </nps>
              <multSelect
                v-if="item.type == questionType.multiselect"
                :data="item"
                :idx="getIndex(index,idx)"
                @handleResult="handleResult">
              </multSelect>

            </div>
            <div v-show="showNextBtn">
              <el-button class="start-btn" type="primary" @click="handleNextPage(index)">下一页</el-button>
            </div>
          </div>
        </div>
      </div>

      <div v-show="startAnwser && showSubmitBtn" style="padding: 10px 18px 50px 18px">
        <el-button style="width: 100%" type="primary" @click="submitHandle">提交问卷</el-button>
      </div>
      <transition enter-active-class="animated fadeIn">
        <div class="progress-wrap" v-show="percentage != 0">
          <el-progress style="margin-top:4px" :percentage="percentage" :color="customColor"></el-progress>
        </div>
      </transition>
    </div>
    <div v-show="isFinish">
      <div style="font-size: 18px;font-weight: 400;margin-top:30px;padding: 20px;">{{data.suffix}}</div>
    </div>
    <!-- <div class="footer" v-show="!isFinish">
      <div>版权所有:青岛市城阳区卫生健康局</div>
      <div>技术支持:青岛市城阳区疾病预防控制中心</div>
      <div>青岛正阳心理医院</div>
      <div>Copyright©2020 Allright Reserved</div>
    </div>-->
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import { queryQuestionInfo, commitAnswer } from "../api/api";
import CONST from "./questionType/const";

import RadioH5 from "./questionAnwser/radio";
import CheckboxH5 from "./questionAnwser/checkbox";
import Tiankong from './questionAnwser/tiankong'
import Juzhendanxuan from './questionAnwser/juzhendanxuan'
import Juzhenduoxuan from './questionAnwser/juzhenduoxuan'
import Juzhenhuadong from './questionAnwser/juzhenhuadong'
import tableNumber from './questionAnwser/tableNumber'
import tabletiankong from './questionAnwser/tabletiankong'
import nps from './questionAnwser/nps'
import multSelect from './questionAnwser/multSelect'

import { jsonToHump, jsonToUnderline } from "../api/dataFormatter";

let baseUrl = "http://www.525120.com/medical/assistance/v1.0";

export default {
  name: "Home",
  data() {
    return {
      id: '',
      data: {},
      questionByPage: [],
      questionType: CONST.questionType,
      resultMap: {},
      user: {},
      percentage: 0,
      customColor: "#409eff",
      isFinish: false,
      successImageUrl: "./images/4.png",
      startAnwser: false,
      showNextBtn: false,
      showSubmitBtn: false,
      pageType: null,
      questionArr: [],
      currentPage: 0
    };
  },
  created() {
    let { id } = this.$route.query;
    this.id = id;
    this.queryQuestionInfo(id);
  },
  components: {
    RadioH5,
    CheckboxH5,
    Tiankong,
    Juzhendanxuan,
    Juzhenduoxuan,
    Juzhenhuadong,
    tableNumber,
    tabletiankong,
    nps,
    multSelect
  },
  methods: {
    queryQuestionInfo(id) {
      let self = this;
      queryQuestionInfo({ id: id }).then(res => {
        self.data = res;
        let pageType = JSON.parse(res.pageType);
        pageType.forEach((item, idx) => {
          item.forEach((item2) => {
            if (!self.questionArr[idx]) {
              self.questionArr[idx] = [];
            }
            self.questionArr[idx].push(res.topicInfos[item2]);
          }) 
        })
        if (this.questionArr.length > 1) {
          this.showNextBtn = true;
        } else {
          this.showSubmitBtn = true;
        }
        console.log(this.questionArr);
      });
    },

    handleStartAnwser() {
      this.startAnwser = true;
    },
    handleResult(res) {
      console.log(res);
      this.resultMap[res.titleId] = res;
      this.getFinishPercentage();
    },
    submitHandle() {
      if (this.validate(this.resultMap)) {
        this.request();
      }
    },
    request() {
      let res = [];
      let self = this;
      for (var i in this.resultMap) {
        if (this.resultMap[i]) {
          res.push(this.resultMap[i]);
        }
      }
      if (window.localStorage.getItem("done"+this.data.id)) {
        this.$message({
          message: "您已提交，请勿重复提交",
          type: "error"
        });
        return;
      }
      jsonToUnderline(res);
      let data = {
        user_phone: "",
        pre_id: self.id,
        data: res
      };
      commitAnswer({ data: JSON.stringify(data) }).then(res => {
        debugger;
        self.isFinish = true;
          window.localStorage.setItem("done"+this.data.id, true);
      });
    },
    validate(result) {
      let flag = true;
      one:
      for (var k = 0; k < this.questionArr.length; k++) {
        let questions = this.questionArr[k];
        two:
        for (var i = 0; i < questions.length; i++) {
          if (questions[i].required == 2) {
            let colContent = questions[i].content.colContent;
            if (colContent && colContent.length > 0) {
              three:
              for (var j =0; j < colContent.length; j++) {
                if (!result[colContent[j].id]) {
                  flag = false;
                  this.$message({
                    message: "请您填写第" + this.getIndex(k, i) + "道题！",
                    type: "error"
                  });
                  break one;
                  break two;
                  break three;
                }
              }
            } else {
              let id = questions[i].id;
              if (!result[id]) {
                flag = false;
                this.$message({
                  message: "请您填写第" + this.getIndex(k, i)+ "道题！",
                  type: "error"
                });
                break;
              }

            }
          }
        }
      }

      return flag;
    },
    getIndex(currentPage,currentIndex) {
      let index = currentIndex +1;
      for(var i = 0; i <currentPage; i++) {
        index += this.questionArr[i].length;
      }
      console.log(currentPage,currentIndex,index)
      return index
    },
    validatePage() {
      let result = this.resultMap;
      let flag = true;
      let questions = this.questionArr[this.currentPage];

      one:
      for (var i = 0; i < questions.length; i++) {
        if (questions[i].required == 2) {
          let colContent = questions[i].content.colContent;
          if (colContent && colContent.length > 0) {
            two:
            for (var j =0; j < colContent.length; j++) {
              if (!result[colContent[j].id]) {
                flag = false;
                this.$message({
                  message: "请您填写第" + this.getIndex(this.currentPage, i) + "道题！",
                  type: "error"
                });
                break one;
                break two;
              }
            }
          } else {
            let id = questions[i].id;
            if (!result[id]) {
              flag = false;
              this.$message({
                message: "请您填写第" + this.getIndex(this.currentPage, i)+ "道题！",
                type: "error"
              });
              break;
            }

          }
        }
      }

      return flag;
    },
    getFinishPercentage() {
      let counter = 0;
      for (var k = 0; k < this.questionArr.length; k++) {
        let questions = this.questionArr[k];
  
        for (var i = 0; i < questions.length; i++) {
        
          let colContent = questions[i].content.colContent;
          if (colContent && colContent.length > 0) {

            let flag =true;
            for (var j =0; j < colContent.length; j++) {
              if (!this.resultMap[colContent[j].id]) {
                flag = false;
              }
            }
            if (flag) {
              counter++;
            }
          } else {
            let id = questions[i].id;
            if (this.resultMap[id]) {
              counter++;
            }

          }
          
        }
      }
      this.percentage = Math.ceil(
        (counter / this.data.topicInfos.length) * 100
      );
    },
    handleNextPage(curIndex) {
      if (this.validatePage()) {
        this.currentPage = curIndex + 1;
        document.documentElement.scrollTop = 0;
        if (curIndex == this.questionArr.length - 2) {
          this.showNextBtn = false;
          this.showSubmitBtn = true;
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.first-page {
  margin: 6% 2%;
  box-shadow: 0px 0px 10px #999;
  border: 1px solid #ccc;
  background-color: #fff;
  text-align: center;
  border-radius: 10px;
  color: #000;
  text-align: left;
}
.first-page div {
  font-size: 18px;
  font-weight: 400;
  margin-top: 30px;
  padding: 0px 19px;
  line-height: 30px;
}
.text-wrap {
  margin: 0;
  padding: 30px 18px;
  background-color: transparent;
  box-shadow: none;
}
.progress-wrap {
  height: 30px;
  position: fixed;
  bottom: 0;
  padding: 0 18px;
  width: 100%;
  background-color: #fff;
  padding: 0px 18px;
  box-sizing: border-box;
  border-top: 1px solid #ccc;
  z-index: 9999;
}

.thx {
  font-size: 34px;
  padding: 40px 30px 50px 44px;
  text-align: center;
  font-weight: 500;
}
.start-btn {
  width: 200px;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  display: inherit;
}
.footer {
  color: rgb(153, 153, 153);
  font-size: 16px;
  line-height: 30px;
  text-align: center;
}
.type-show {
  margin: 20px auto 0;
  background-image: url(../../static/sprites_bg_2x.png);
  background-size: 386px 320px;
}

.cst-question .type-show {
  width: 231px;
  height: 157px;
  background-position-x: 0px;
  background-position-y: 0px;
}
.cst-question {
  background-color: rgba(71, 157, 230, 0.94);
  padding: 7px;
  height: 185px;
}
</style>
