<template lang="html">
  <div class="container">
    <div class="question-type-wrap">
        <div class="type-item cst-question">
            <div class="type-show"></div>
            <p class="title">创建普通问卷</p>
            <p class="sub-title">从一份空白问卷开始创建</p>
            <div class="create-btn" @click="createCustQuestionHandle">开始</div>
        </div>
        <div class="type-item ceping-quesiton">
            <div class="type-show"></div>
            <p class="title">创建测评问卷</p>
            <p class="sub-title">从一份空白问卷开始创建</p>
            <div class="create-btn" @click="createCePingQuestionHandle">开始</div>
        </div>
    </div>
    <el-dialog
      title="请输入问卷标题"
      :visible.sync="dialogVisible"
      width="30%">
      <el-input v-model="questionTitle" placeholder="请输入内容"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createQuestionOK">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const cstImg = './static/sprites_bg_2x.png';
const cepingImg = './static/sprites_bg_3x.png';
export default {
  data () {
    return {
      cstImg: cstImg,
      cepingImg: cepingImg,
      dialogVisible: false,
      questionTitle: "",
      type: "" //问卷类型
    }
  },
  created () {
   
  },
  methods: {
      createCustQuestionHandle() {
          // this.dialogVisible = true;
          this.questionTitle = "";
          this.type = "custom";
          this.$router.push({
          path: '/editquestion',
            query: {
                type: this.type
            }
          })
      },
      createCePingQuestionHandle() {
          // this.dialogVisible = true;
          this.questionTitle = "";
          this.type="ceping";
          this.$router.push({
            path: '/editquestion',
            query: {
                type: this.type
            }
          })
      },
      createQuestionOK() {
        //todo  新增问卷服务

        this.$router.push({
          path: '/editquestion',
          query: {
              type: this.type
          }
        })
      }
  }
}
</script>

<style lang="scss" scoped>

.container {
  
}
.question-type-wrap{
    text-align: center;
    margin-top: 120px;
}
.type-item{
      width: 600px;
      height: 450px;
      display: inline-block;
      img{
           width: 386px;
           height:  320px;
      }
  }

  .cst-question{
      background-color: rgba(71, 157, 230, 0.94);
  }

  .ceping-quesiton{
      background-color:rgba(144, 214, 126, 0.94);
  }
  .type-show{
    
    margin: 70px auto 0;
    background-image: url(../../static/sprites_bg_2x.png);
    background-size: 386px 320px;
  }
  .cst-question .type-show{
    width: 154px;
    height: 152px;
    background-position-x:-232px;
    background-position-y:0px;
  }
  .ceping-quesiton .type-show{
    width: 231px;
    height: 157px;
    background-position-x:0px;
    background-position-y:0px;
  }
  .title{
    color: #ffffff;
    margin-bottom: 0;
    font-size: 24px;
    font-weight: normal;
    -webkit-font-smoothing: antialiased;
    margin-top: 30px;
  }
  .sub-title{
    color: #ffffff;
    margin-top: 0;
    font-size: 18px;
    font-weight: normal;
    -webkit-font-smoothing: antialiased;
    margin-bottom: 38px;
  }
  .create-btn{
    width: 105px;
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    border-radius: 3px;
    border: 1px solid #fff;
    color: #fff;
    text-align: center;
    text-decoration: none;
    transition: all 150ms ease-in-out;
    cursor: pointer;
    display: inline-block;
    *display: inline;
    *zoom: 1;
    box-sizing: border-box;
    border-radius: 2px;
  }
  .create-btn:hover{
    background-color: #fff;
    color: #4597df;
  }
</style>
