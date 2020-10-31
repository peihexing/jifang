<template>
  <div class="wrap">
    <div class="wrap-left">
      <div class="wraning-box">
        <div class="title">告警信息</div>
        <div class="box-content">
          <div class="msg-wrap" v-for="(item,idx) in warningList" :key="idx">
            <div class="msg-left">
              <div class="notice-icon ver-aligin"></div>
            </div>
            <div class="msg-mid">
              {{item.description}}
            </div>
            <div class="msg-right">
              <div class="btn-self ver-aligin" @click="showWarinDetail(item)">查看</div>
            </div>
          </div>
        </div>
      </div>

      <div class="wraning-box">
        <div class="title">运行日志</div>
        <div class="search-wrap">
          <div class="data-cp">
            {{ formatDate(startDate) }}
            <div class="date-picker">
              <el-date-picker
                v-model="startDate"
                type="date"
                placeholder="选择日期"
                @change="startDateChagne"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="date-line">至</div>
          <div class="data-cp">
            {{ formatDate(endDate) }}
            <div class="date-picker">
              <el-date-picker
                v-model="endDate"
                type="date"
                placeholder="选择日期"
                @change="startDateChagne"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="search-btn" @click="searchLog()">搜索</div>
        </div>
        <div class="box-content">
          <div class="msg-wrap" v-for="(item,idx) in logList" :key="idx">
            <div class="msg-left">
              <div class="log-icon ver-aligin"></div>
            </div>
            <div class="msg-mid">
              {{item.description}}
            </div>
            <div class="msg-right">
              <div class="btn-self ver-aligin" @click="gotoLogDetail(item)">查看</div>
            </div>
          </div>
          <div class="under-line" v-for="(item,idx) in logList" :key="idx" v-show="idx!=(logList.length-1)"></div>
        </div>
      </div>

      <div class="wraning-box">
        <div class="title">安全态势分析</div>
        <Statics></Statics>
      </div>
    </div>
    <div class="wrap-right">
      <div class="devices-box">
        <div class="device-12" @click="gotoDeviceDetail()">
          <div class="device-left"></div>
          <div class="device-right">12</div>
        </div>
      </div>
    </div>
    <div class="dialog" v-show="dialogShow">
      <div class="dialog-title">
        告警（{{warinTitle}}）
      </div>
      <div class="dialog-msg" >
        {{dialogMsg}}
      </div>
      <div class="dialog-text">处理方法：</div>
      <div class="dialog-content">
        <textarea v-model="dialogContent"></textarea>
      </div>
      <div class="dialog-deal-psn">处理人：<input type="text" v-model="dialogPsn"></div>
      <div class="dialog-btns">
        <div class="close-btn" @click="clozeDialog">关闭</div>
        <div class="done-btn" @click="okDialog" v-show="showDealBtn">已处理，解除告警</div>
      </div>
    </div>
  </div>
</template>

<script>

import { 
  getExceptInfo,
  exceptDeal,
  getExceptLog
} from "../../api/api";

import Statics from './static.vue'


export default {
  data() {
    return {
      startDate: new Date(2020,9,1),
      endDate: new Date(),
      dialogShow:false,
      dialogMsg: "",
      dialogContent:"",
      eleccabinetid:"md.xt.010012",
      warningList: [],
      logList: [],
      warinTitle: "",
      dialogPsn: "",
      waring: {},
      log: {},
      showDealBtn:true
    };
  },
  components: {
    Statics
  },
  created() {
    let self = this;
    self.updateLogs();
    window.setInterval(function() {
      self.getExceptInfo(self.eleccabinetid,1);
    }, 10000);
  },
  methods: {
    clozeDialog() {
      this.dialogShow = false;
    },
    okDialog() {
      this.dialogShow = false;
      this.dealWithWaring();
    },
    showWarinDetail(waring) {
      this.waring =waring;
      this.showDealBtn = true;
      this.dialogShow = true;
      switch(waring.grade) {
        case 1:
          this.warinTitle = "一级";
          break;
        case 2:
          this.warinTitle = "二级";
          break;
        case 3:
          this.warinTitle = "三级";
          break;
        case 4:
          this.warinTitle = "四级";
          break;
        case 5:
          this.warinTitle = "五级";
          break;
        default:
          this.warinTitle = waring.grade+"级";
          break;

      }
      
      this.dialogMsg = waring.description;
      this.dialogContent = "";
      this.dialogPsn = "";

    },
    gotoLogDetail(log) {
      this.log = log;
      this.dialogShow = true;
      this.showDealBtn = false;
       switch(log.grade) {
        case 1:
          this.warinTitle = "一级";
          break;
        case 2:
          this.warinTitle = "二级";
          break;
        case 3:
          this.warinTitle = "三级";
          break;
        case 4:
          this.warinTitle = "四级";
          break;
        case 5:
          this.warinTitle = "五级";
          break;
        default:
          this.warinTitle = log.grade+"级";
          break;

      }
      
      this.dialogMsg = log.description;
      this.dialogContent = log.resultDescription;
      this.dialogPsn = log.handler;
    },
    getExceptInfo(id,type) {debugger
      let self = this;
      getExceptInfo({
        id: id,
        type:type
      }).then(res=> {
        self.warningList = res;
      })
    },
    gotoDeviceDetail() {
      this.$router.push({
          path: '/detail',
          query: {
              id: this.eleccabinetid
          }
        })
    },
    searchLog() {
      this.getExceptLog(this.eleccabinetid,1);
    },
    dealWithWaring() {
      let self = this;
      exceptDeal({
        id: self.waring.id,
        type: self.waring.type,
        resultDescription: self.dialogContent,
        handler: self.dialogPsn
      }).then(res=>{
        self.updateLogs();
      })
    },
    getExceptLog(id,type) {
      let self = this;
      getExceptLog({
        id: id,
        type: type,
        start_time: Math.round(self.startDate.getTime()/1000),
        end_time:  Math.round(self.endDate.getTime()/1000)
      }).then(res=> {
        debugger
        self.logList =res;
      })
    },
    updateLogs() {
      this.getExceptInfo(this.eleccabinetid,1);
      this.getExceptLog(this.eleccabinetid,1);
    },
    startDateChagne() {},
    formatDate(date) {
      if (date) {
        var date = new Date(date);

        var year = date.getFullYear(),
          month = date.getMonth() + 1, //月份是从0开始的
          day = date.getDate(),
          hour = date.getHours(),
          min = date.getMinutes(),
          sec = date.getSeconds();
        var newTime =
          year +
          " - " +
          (month < 10 ? "0" + month : month) +
          " - " +
          (day < 10 ? "0" + day : day);

        return newTime;
      } else {
        return "选择日期";
      }
    },
  },
};
</script>

<style scoped>
.wrap {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.wrap-left {
  flex: 1;
  height: 100%;
  position: relative;
}
.wrap-right {
  width: 690px;
  height: 100%;
  display: flex;
}
.wraning-box {
  font-size: 12px;
  margin: 15px 20px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(../../../static/waring-box.png);
}
.devices-box {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 658px;
  height: 550px;
  background-image: url(../../../static/box-line-2.png);
  align-self: center;
  position: relative;
  margin: auto;
}
.title {
  color: #fff;
  height: 17px;
  line-height: 17px;
  padding: 10px 22px;
  background-size: 12px 22px;
  background-position: 10px 8px;
  background-repeat: no-repeat;
  background-image: url(../../../static/title-icon.png);
}
.box-content {
  overflow-y: auto;
  height: 125px;
}
.msg-wrap {
  display: flex;
  padding: 14px 0px;
}
.under-line{
  border-bottom: 1px solid #061E50;
  width: 96%;
  margin: auto;
}
.msg-left {
  width: 60px;
  display: flex;
}
.msg-mid {
  flex: 1;
  color: #2595e3;
}
.msg-right {
  width: 90px;
  display: flex;
}
.ver-aligin {
  align-self: center;
}
.notice-icon {
  width: 18px;
  height: 16px;
  margin-left: 15px;
  background-image: url(../../../static/tongzhi@2x.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.log-icon {
  width: 18px;
  height: 16px;
  margin-left: 15px;
  background-image: url(../../../static/comiisfariji@2x.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.btn-self {
  width: 61px;
  height: 25px;
  background-image: url(../../../static/btn.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: #1bff8b;
  text-align: center;
  line-height: 25px;
  font-size: 12px;
  cursor: pointer;
  margin: auto;
}
.device-12 {
  position: absolute;
  width: 42px;
  height: 34px;
  background-color: #00fcff;
  top: 67px;
  left: 61px;
}
.device-left {
  width: 7px;
  height: 34px;
  display: inline-block;
  border-right: 1px solid rgb(29, 173, 255);
}
.device-right {
  color: #fff;
  font-size: 15px;
  transform: rotate(-90deg);
  display: inline-block;
  text-align: center;
  position: absolute;
  top: 9px;
  left: 13px;
  cursor: pointer;
}
.search-wrap {
  padding: 0px 10px;
  position: relative;
}
/* 日期 */
.data-cp {
  display: inline-block;
  width: 140px;
  height: 20px;
  background-image: url(../../../static/data-bar.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: #fff;
  text-align: center;
  line-height: 20px;
  position: relative;
}
.date-line {
  display: inline-block;
  color: #fff;
}
.date-picker {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 140px;
  height: 20px;
  overflow: hidden;
}

.search-btn {
  width: 50px;
  height: 20px;
  background-image: url(../../../static/btn.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  right: 30px;
  top: 1px;
  color: #1bff8c;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
}

::-webkit-scrollbar {
  width: 10px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(59, 138, 209, 0.1);
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(255, 0, 0, 0.4);
}
.dialog{
  position: fixed;
  top: 100px;
  left: 50%;
  z-index: 9999;
  margin-left: -431px;
  width: 862px;
  height: 405px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(../../../static/msg-box.png);
  background-color: #010736;
}
.dialog-title{
  color: #F45353;
  font-size: 17px;
  background-size: 326px 4px;
  background-repeat: no-repeat;
  background-position: 273px 22px;
  background-image: url(../../../static/warin-level.png);
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-weight: bold;

}
.dialog-msg{
  width: 769px;
  height: 82px;
  padding-top: 20px;
  overflow-y: auto;
  margin: 0 auto;
  color: #2696E4;
  line-height: 26px;
}
.dialog-text{
  color: #fff;
  width: 769px;
  margin: 0 auto;
  padding-bottom: 15px;
}
.dialog-content{
  width: 769px;
  height: 90px;
  border: 1px solid #0F5A8F;
  margin: 0 auto;
  overflow: hidden;
}
.dialog-content textarea{
  background-color: #010736;
  width: 100%;
  height: 90px;
  color: #2696E4;
  border: none;
  padding: 5px;
}
.dialog-btns{
  width: 769px;
  margin: 20px auto;
}
.dialog .close-btn{
  width: 85px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #2696E4;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(../../../static/close-btn.png);
  float: left;
  cursor: pointer;
}
.dialog .done-btn{
  text-align: center;
  width: 171px;
  height: 40px;
  line-height: 40px;
  background-size: 100% 100%;
  color: #1BFF8C;
  background-repeat: no-repeat;
  background-image: url(../../../static/btn-icon.png);
  float: right;
  cursor: pointer;
}
.dialog-deal-psn{
  width: 769px;
  margin: 0 auto;
  height: 30px;
  color: #fff;
  padding-top: 20px;
}
.dialog-deal-psn input{
  background-color: #010736;
  border: 1px solid #2696E4;
  color: #2696E4;
  padding-left: 5px;
  height: 26px;
}
</style>
