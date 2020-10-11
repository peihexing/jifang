<template lang="html">
   <div class="container">
        <div class="left-nav">
            <el-tabs type="border-card" style="width: 180px">
                <el-tab-pane label="题目问卷">
                    <ul class="type-wrap">
                        <li class="type-item"  
                            v-for="(item, index) in questionTypes" 
                            :key="index"
                            @click="selectQuestionTypeHandle(item)">
                            <i class="icon"></i>
                            {{item.name}}
                        </li>
                    </ul>
                </el-tab-pane>
            </el-tabs>
        </div>
    <div style="flex:1;padding:40px;overflow:auto">
        <el-tabs v-model="activeName" type="card" >
            <el-tab-pane class="edit-container" label="问卷编辑" name="first" >
                <div class="question-wrap">
                    <span class="demonstration">问卷题目</span>
                    <el-input
                        type="text"
                        v-model="data.title"
                        placeholder="请填写问卷题目"
                    >
                    </el-input>
                </div>
                <div class="question-wrap">
                    <span class="demonstration">开卷语</span>
                    <el-input
                        type="textarea"
                        placeholder="开卷语"
                        v-model="data.prefix"
                        :maxlength="300"
                        :show-word-limit="true"
                    >
                    </el-input>
                </div>
                <div class="question-wrap" v-for="(item, idx) in data.questions" :key="idx">
                    <!-- 题型查看 -->
                    <div class="read-mask">
                        <div class="panel" @click="editQuestionHandle(idx)" >
                          <div class="btn-wrap" v-show="idx!== editIndex">
                            <div class="btn-line" @click.stop="insertPage(idx)" v-if="item.type !== questionType.pageType">在此题后面插入分页</div>
                            <div class="btn-item" @click.stop="deleteQues(idx)"><div class="btn-icon up-icon"></div>删除</div>
  
                            <div class="btn-item" @click.stop="upHandle(idx,-1)"><div class="btn-icon up-icon"></div>上移</div>
                            <div class="btn-item" @click.stop="upHandle(idx,1)"><div class="btn-icon down-icon"></div>下移</div>
                            <div class="btn-item" @click.stop="upHandle(idx,2)"><div class="btn-icon top-icon"></div>最前</div>
                            <div class="btn-item" @click.stop="upHandle(idx,3)"><div class="btn-icon bottom-icon"></div>最后</div>
                          </div>
                        </div>
                        <Radioread v-if="item.type === questionType.radio && idx!== editIndex"
                            :data="item" 
                            :type="item.type"
                            :index="getIndex(idx)"
                        ></Radioread>
                        <Radioread v-if="item.type === questionType.scoreradio && idx!== editIndex"
                            :data="item" 
                            :type="item.type"
                            :index="getIndex(idx)"
                        ></Radioread>
                        <Checkboxread v-if="item.type === questionType.checkbox && idx!== editIndex"
                            :data="item" 
                            :type="item.type"
                            :index="getIndex(idx)"
                        ></Checkboxread>
                        <Checkboxread v-if="item.type === questionType.scorecheckbox && idx!== editIndex"
                            :data="item" 
                            :type="item.type"
                            :index="getIndex(idx)"
                        ></Checkboxread>
                        <TiankongRead v-if="item.type === questionType.tiankong && idx!== editIndex"
                            :data="item" 
                            :type="item.type"
                            :index="getIndex(idx)"
                        ></TiankongRead>
                        <JuzhendanxuanRead v-if="item.type === questionType.juzhendanxuan && idx!== editIndex"
                            :data="item" 
                            :type="item.type"
                            :index="getIndex(idx)"
                        ></JuzhendanxuanRead>
                        <JuzhendanxuanRead v-if="item.type === questionType.juzhenduoxuan && idx!== editIndex"
                            :data="item" 
                            :type="item.type"
                            :index="getIndex(idx)"
                        ></JuzhendanxuanRead>
                        <JuzhendanxuanRead v-if="item.type === questionType.juzhenliangbiao && idx!== editIndex"
                            :data="item" 
                            :type="item.type"
                            :index="getIndex(idx)"
                        ></JuzhendanxuanRead>
                        <JuzhendanxuanRead v-if="item.type === questionType.tableNumber && idx!== editIndex"
                            :data="item" 
                            :type="item.type"
                            :index="getIndex(idx)"
                        ></JuzhendanxuanRead>
                        <JuzhendanxuanRead v-if="item.type === questionType.tabletiankong && idx!== editIndex"
                            :data="item" 
                            :type="item.type"
                            :index="getIndex(idx)"
                        ></JuzhendanxuanRead>
                        <JuzhenhuadongRead v-if="item.type === questionType.juzhenhuadong && idx!== editIndex"
                            :data="item" 
                            :type="item.type"
                            :index="getIndex(idx)"
                        ></JuzhenhuadongRead>
                        <NpsRead v-if="item.type === questionType.nps && idx!== editIndex"
                            :data="item" 
                            :type="item.type"
                            :index="getIndex(idx)"
                        ></NpsRead>
                        <multSelectRead v-if="item.type === questionType.multiselect && idx!==editIndex" 
                            :data="item" 
                            :type="item.type"
                            :index="getIndex(idx)"
                        ></multSelectRead>
                    </div>
                    


                    <!-- 题型编辑 -->
                    <div v-if="idx=== editIndex" class="cur-type">当前题型: {{getQuestionDesc(item.type)}}</div>
                    <Radio v-if="item.type === questionType.radio && idx=== editIndex" 
                        :data="item" 
                        :type="item.type"
                        @onSubmit="questionSubmitHandle" @onCancel="questionCancelHandle"></Radio>
                    <Radio v-if="item.type === questionType.checkbox && idx=== editIndex" 
                        :data="item" 
                        :type="item.type"
                        @onSubmit="questionSubmitHandle" @onCancel="questionCancelHandle"></Radio>
                    <Tiankong v-if="item.type === questionType.tiankong && idx=== editIndex"
                        :data="item" 
                        :type="item.type"
                        @onSubmit="questionSubmitHandle" @onCancel="questionCancelHandle"
                        ></Tiankong>
                    <Juzhendanxuan v-if="item.type === questionType.juzhendanxuan && idx=== editIndex"
                        :data="item" 
                        :type="item.type"
                        @onSubmit="questionSubmitHandle" @onCancel="questionCancelHandle"
                        ></Juzhendanxuan>
                    <Juzhendanxuan v-if="item.type === questionType.juzhenduoxuan && idx=== editIndex"
                        :data="item" 
                        :type="item.type"
                        @onSubmit="questionSubmitHandle" @onCancel="questionCancelHandle"
                        ></Juzhendanxuan>
                    <Juzhenliangbiao v-if="item.type === questionType.juzhenliangbiao && idx=== editIndex"
                        :data="item" 
                        :type="item.type"
                        @onSubmit="questionSubmitHandle" @onCancel="questionCancelHandle"
                        ></Juzhenliangbiao>
                    <Juzhenhuadong v-if="item.type === questionType.juzhenhuadong && idx=== editIndex"
                        :data="item" 
                        :type="item.type"
                        @onSubmit="questionSubmitHandle" @onCancel="questionCancelHandle"
                        ></Juzhenhuadong>  

                    <Juzhendanxuan v-if="item.type === questionType.tableNumber && idx=== editIndex"
                        :data="item" 
                        :type="item.type"
                        @onSubmit="questionSubmitHandle" @onCancel="questionCancelHandle"
                        ></Juzhendanxuan>
                    <Juzhendanxuan v-if="item.type === questionType.tabletiankong && idx=== editIndex"
                        :data="item" 
                        :type="item.type"
                        @onSubmit="questionSubmitHandle" @onCancel="questionCancelHandle"
                        ></Juzhendanxuan>
                    <Nps v-if="item.type === questionType.nps && idx=== editIndex"
                        :data="item" 
                        :type="item.type"
                        @onSubmit="questionSubmitHandle" @onCancel="questionCancelHandle"
                        ></Nps>
                    <score v-if="item.type === questionType.scoreradio && idx=== editIndex"
                        :data="item" 
                        :type="item.type"
                        @onSubmit="questionSubmitHandle" @onCancel="questionCancelHandle"
                        ></score>
                    <score v-if="item.type === questionType.scorecheckbox && idx=== editIndex"
                        :data="item" 
                        :type="item.type"
                        @onSubmit="questionSubmitHandle" @onCancel="questionCancelHandle"
                        ></score>
                    <multSelect v-if="item.type === questionType.multiselect && idx=== editIndex"
                        :data="item" 
                        :type="item.type"
                        @onSubmit="questionSubmitHandle" @onCancel="questionCancelHandle"
                        ></multSelect>
                        
                    <div class="page-type-wrap" v-if="item.type === questionType.pageType">[第{{getPage(idx)}}页]</div> 
                </div>
                <div class="question-wrap">
                    <span class="demonstration">结束语</span>
                    <el-input
                        type="textarea"
                        placeholder="请填写结束语"
                        v-model="data.suffix"
                        :maxlength="300"
                        :show-word-limit="true"
                    >
                    </el-input>
                </div>
                <el-button type="success" v-show="editIndex == -1" style="width:80%;margin: 15px auto;display: block" @click="submitQuestion">提交问卷</el-button>
            </el-tab-pane>
        </el-tabs>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import questionData from "../data/questionConfig.js";
import Radio from "./questionType/radio";
import Tiankong from "./questionType/Tiankong";
import Juzhendanxuan from "./questionType/juzhenduoxuan";
import Juzhenliangbiao from "./questionType/juzhenliangbiao";
import Juzhenhuadong from "./questionType/juzhenhuadong";
import Nps from "./questionType/nps";
import multSelect from './questionType/multSelect'
import score from './questionType/score'

// 题型展示
import Radioread from "./questionRead/radio";
import Checkboxread from "./questionRead/checkbox";
import TiankongRead from "./questionRead/tiankong";
import JuzhendanxuanRead from "./questionRead/juzhendanxuan";
import JuzhenhuadongRead from "./questionRead/juzhenhuadong";
import NpsRead from "./questionRead/nps";
import multSelectRead from './questionRead/multSelect'

import CONST from "./questionType/const";
import { addQuestion, commitAnswer } from "../api/api";
import { jsonToHump, jsonToUnderline } from "../api/dataFormatter";

export default {
  data() {
    return {
      questionType: CONST.questionType,
      questionTypes: [],
      questionTypeMap: [],
      activeName: "first",
      data: {
        title: "",
        prefix: "为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！",
        suffix: "您的答卷已经提交，感谢您的参与！",
        qtype: '1',
        pageType: "",
        questions: []
      },
      editIndex: -1,
      pageType: []
    };
  },
  components: {
    Radio,
    Tiankong,
    Juzhendanxuan,
    Juzhenliangbiao,
    Juzhenhuadong,
    Nps,
    multSelect,
    Radioread,
    Checkboxread,
    TiankongRead,
    JuzhendanxuanRead,
    JuzhenhuadongRead,
    NpsRead,
    multSelectRead,
    score
  },
  created() {
    let { type } = this.$route.query;
    if (type == "ceping") {
      this.questionTypes = questionData.ceping;
      this.data.qtype = '2'
    } else {
      this.questionTypes = questionData.custom;
      this.data.qtype = '1'
    }
    this.questionTypeMap = questionData.custom;
  },
  methods: {
    getQuestionDesc(type) {
      let res = ""
      this.questionTypeMap.forEach(item=> {
        if (item.type === type) {
          res = item.name
        }
      })

      return res;
    },
    deleteQues(index) {
      this.data.questions.splice(index, 1);
      this.editIndex= -1;
    },
    insertPage(idx) {
      let item = {
        type: this.questionType.pageType
      }
      this.data.questions.splice(idx+1, 0, item);
 
    },
    upHandle(currentIndex, toIndex) {
      if (toIndex === -1) {
        if (currentIndex>0) {
          let d = this.data.questions[currentIndex-1];
          this.data.questions[currentIndex-1] = this.data.questions[currentIndex];
          this.data.questions[currentIndex] = d;
        }
      } else if (toIndex == 1) {
        if (currentIndex < this.data.questions.length-1) {
          let d = this.data.questions[currentIndex+1];
          this.data.questions[currentIndex+1] = this.data.questions[currentIndex];
          this.data.questions[currentIndex] = d;
        }
      } else if (toIndex == 2) {
          let d = this.data.questions[0];
          this.data.questions[0] = this.data.questions[currentIndex];
          this.data.questions[currentIndex] = d;
      } else if (toIndex ==3){
        let len = this.data.questions.length-1;
          let d = this.data.questions[len];
          this.data.questions[len] = this.data.questions[currentIndex];
          this.data.questions[currentIndex] = d;
      }
      this.$forceUpdate();

    },
    submitQuestion() {
        this.addQuestion();
    },
    selectQuestionTypeHandle(target) {
        var self = this;
        
        if (this.editIndex === -1) {
            // 新增
            this.editIndex = this.data.questions.length;
            let demo = {};
            if (target.type.indexOf('A') != -1) {
                demo = JSON.parse(JSON.stringify(target.demo));
                console.log('demo', demo);
            } else {
                CONST.questionDemo.forEach(item=> {
                  if (item.type === target.type) {
                      demo = JSON.parse(JSON.stringify(item));
                  }
              })
            }
            console.log('demo', demo);
            this.data.questions.push(demo);

        } else {
            // 修改
            let demo = {};
            if (target.type.indexOf('A') != -1) {
                demo = JSON.parse(JSON.stringify(target.demo));
                
                // this.data.questions[this.editIndex].type = target.demo.type;
            } else {
                CONST.questionDemo.forEach(item=> {
                    if (item.type === target.type) {
                        demo = JSON.parse(JSON.stringify(item));
                    }
                })

              // this.data.questions[this.editIndex].type = target.type;
            }
            console.log('demo', demo);
            self.$set(this.data.questions,this.editIndex,demo);
            console.log(demo);
             
        }
        self.$forceUpdate()
    },
    editQuestionHandle(index) {
      this.editIndex = index;
    },
    questionSubmitHandle(target) {
      this.data.questions[this.editIndex] = {
        index: this.editIndex,
        type: target.type,
        required: target.data.required,
        content: {
          rowContent: target.data.rowContent,
          subtitle: target.data.subtitle,
          colContent: target.data.colContent || [],
          picture: target.data.picture
        },
        options: target.data.options
      };
      console.log(this.data.questions);
      this.editIndex = -1;
    },
    questionCancelHandle(target) {
      this.editIndex = -1;
    },
    addQuestion() {
      if (this.data.questions.length == 0) {
          Message({
            message: "请新增问卷",
            type: 'error',
            duration: 5 * 1000
          })
          return;
      }
      let phone = localStorage.getItem('user');
      if (!phone) {
        Message({
          message: "未登录",
          type: 'error',
          duration: 5 * 1000
        })
        return;
      }

      let num = 0;
      let quesIndex = 0;
      let page = [];
      let questions = JSON.parse(JSON.stringify(this.data.questions));
      jsonToUnderline(questions);
      questions.forEach((item,idx) => {
        //处理分页
        if (item.type === this.questionType.pageType) {
          num++;
        } else {
          if (!page[num]) {
            page[num] = [quesIndex];
          } else {
            page[num].push(quesIndex);
          }
          quesIndex++;
        }

        //处理是否必填
        if (item.required === true) {
          item.required = 2;
        } else {
          item.required = 1;
        }
      });


      // 去掉分页
      for(var i = questions.length -1; i>0; i--) {
        if (questions[i].type === this.questionType.pageType) {
          questions.splice(i, 1);
        }
      }

      let data = {
        name: this.data.title,
        phone: phone,
        qtype: this.data.qtype, //1普通 2测评
        prefix: this.data.prefix,
        suffix: this.data.suffix,
        page_type: JSON.stringify(page),
        topic_infos: questions
      };
      addQuestion({ 
        data: JSON.stringify(data) 
      }).then(res => {
        this.$router.push({
          path: '/myquestion',
          query: {
              type: this.type
          }
        })
      });
    },
    getPage(idx) {
      let num = 1;
      for(var i = 0; i< idx; i++) {
        if (this.data.questions[i].type === this.questionType.pageType) {
          num++;
        }
      }
      return num;
    },
    getIndex(idx) {
      let index = 0;

      for (var i =0; i <= idx; i++) {
        if(this.data.questions[i].type !== this.questionType.pageType) {
          index++;
        }
      } 

      return index;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
}
.left-nav {
  padding: 40px 20px;
}
.question-wrap {
  padding: 20px 40px 40px 40px;
  border-bottom: 1px solid #e0e0e0 !important;
}
.question-wrap:hover {
  background-color: #fafafa;
  cursor: pointer;
}
.type-wrap {
  list-style: none;
  padding: 0;
  margin: 0;
}
.type-item {
  height: 38px;
  line-height: 38px;
  border: 1px solid #e0e0e0;
  background-color: #fff;
  margin-bottom: 3px;
  cursor: pointer;
}
.icon {
  background-image: url(../../static/sprites_ico.png);
  background-position: -51px -438px;
  width: 16px;
  height: 16px;
  background-size: 479px 454px;
  display: inline-block;
  vertical-align: middle;
  margin: 0px 6px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 18px;
  margin-bottom: 20px;
}
.read-mask {
  position: relative;
}
.read-mask .panel {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 999;
}
.edit-container {
  overflow: auto;
}
.btn-wrap{
  position: absolute;
  bottom: -32px;
  right: 0;
}
.btn-item{
  height: 25px;
    width: 54px;
    display: inline-block;
    border: 1px solid #e0e0e0;
    line-height: 25px;
    text-align: right;
    padding-right: 11px;
    color: #8492a6;
    position: relative;
}
.btn-icon{
  position: absolute;
  top: 2px;
  left: 5px;
  display:inline-block;
  width: 20px;
  height: 20px;
  background-image: url("../../static/icoall.png");
}
.up-icon{
  background-position: -223px -40px;
}
.down-icon{
  background-position: -285px -40px;
}
.top-icon{
  background-position: -346px -40px;
}
.bottom-icon{
  background-position: -406px -40px;
}
.btn-line{
  display: inline-block;
  margin-right: 50px;
  text-decoration-line: underline;
  color: #409EFF;
}
.cur-type{
    height: 40px;
    font-size: 17px;
}
</style>
