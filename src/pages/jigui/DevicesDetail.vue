<template>
  <div class="wrap">
    <div class="nav-bar" @click="backHome">
      <div class="btn-icon"></div>
      <div class="btn-text"></div>
    </div>
    <div class="wrap-left">
      <div class="wraning-box" style="padding-bottom:10px">
        <div class="title">设备描述</div>
        <div class="content">
          <div style="display:inline-block;" class="lineHeight">设备归属：{{description.site}}</div>
          <div style="display:inline-block;margin-left:30px" class="lineHeight">机构号：{{description.eleccabinetid}}</div>
          <div style="display:inline-block;margin-left:30px" class="lineHeight" v-show="description.deviceid">设备ID：{{description.deviceid}}</div>
          <div class="lineHeight">设备描述：{{description.name}}</div>
          <div class="lineHeight">
            <el-row>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class='row-item'>
                    <div class='row-item-left'>生产厂家：</div>
                    <div class='row-item-right'>
                      <div v-if="!isEditing">{{description.manufacturer}}</div>
                      <input type="text" v-model="description.manufacturer" v-if="isEditing">
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">
                  <div class='row-item'>
                    <div class='row-item-left lineHeight'>管理部门：</div>
                    <div class='row-item-right'>
                      <div v-if="!isEditing">{{description.management}}</div>
                      <input type="text" v-model="description.management" v-if="isEditing">
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="6"><div class="grid-content bg-purple">
                <div class='row-item'>
                    <div class='row-item-left lineHeight'>管理人员：</div>
                    <div class='row-item-right'>
                      <div v-if="!isEditing">{{description.principal}}</div>
                      <input type="text" v-model="description.principal" v-if="isEditing">
                    </div>
                  </div></div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple-light">
                <div class='row-item'>
                    <div class='row-item-left lineHeight'>联系电话：</div>
                    <div class='row-item-right'>
                      <div v-if="!isEditing">{{description.phone}}</div>
                      <input type="text" v-model="description.phone" v-if="isEditing">
                    </div>
                  </div></div></el-col>
            </el-row>
            
          </div>
          <div class="bottom-wrap">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <div class='row-item'>
                    <div class='row-item-left' style="width:120px">设备包含信号类型:</div>
                    <div class='row-item-right'>
                      <div>{{description.singalType}}</div>
                      <!-- <div v-if="!isEditing">{{description.singalType}}</div> -->
                      <!-- <input type="text" v-model="description.singalType" v-if="isEditing"> -->
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                <div style="padding-top:10px">
                    <div class="btn-self ver-aligin" v-if="!isEditing" style="float:right;color:#4BD5F5" @click="editDescription">配置</div>
                    <div class="btn-self ver-aligin" v-if="isEditing" style="float:right;color:#4BD5F5" @click="saveDescription">保存</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>


      <div style="display:flex;flex-direction:row;padding: 0px 20px;" >
        <div class="wraning-box-full" style="width:298px;" v-show="showMoniter">
          <div class="title">监控设定</div>
          <div class="box-content" style="padding:0px 20px;color:#fff;font-size:12px;color: #2595e3">
            <!-- 电压设定 -->
            <div>
              <div class="setting-item" v-show="settingType == '00001'">
                <span class="setting-label">正常范围：</span><input style="width:60px" type="text" v-model="meterStartValue"/> V 至 <input type="text" style="width:60px" v-model="meterEndValue"/> V
              </div>
              <!-- <div class="setting-item" v-show="settingType == '00001'">
                <span class="setting-label">目前：</span>{{currentMeterValue}}V
              </div> -->
              <div class="setting-item">{{settingType == '00002'?"红灯异常:":"报警等级："}}
                <div class="waring-level" :class="{'waring-level-active': chooseIdx == 1}" @click="chooseLevel(1)">一级</div>
                <div class="waring-level" :class="{'waring-level-active': chooseIdx == 2}" @click="chooseLevel(2)">二级</div>
                <div class="waring-level" :class="{'waring-level-active': chooseIdx == 3}" @click="chooseLevel(3)">三级</div>
                <div class="waring-level" :class="{'waring-level-active': chooseIdx == 4}" @click="chooseLevel(4)">四级</div>
              </div>
              <div class="setting-item" v-show="settingType == '00002'">{{settingType == '00002'?"黄灯异常:":"报警等级："}}
                <div class="waring-level" :class="{'waring-level-active': chooseIdx1 == 1}" @click="chooseLevel1(1)">一级</div>
                <div class="waring-level" :class="{'waring-level-active': chooseIdx1 == 2}" @click="chooseLevel1(2)">二级</div>
                <div class="waring-level" :class="{'waring-level-active': chooseIdx1 == 3}" @click="chooseLevel1(3)">三级</div>
                <div class="waring-level" :class="{'waring-level-active': chooseIdx1 == 4}" @click="chooseLevel1(4)">四级</div>
              </div>
              <div class="setting-item" v-show="settingType == '00001'">
                说明: 当表显电压值超出设定范围时触发告警。
              </div>
              <div class="setting-item" v-show="settingType == '00002'">
                说明: 绿灯亮为正常运行，故障状态依照设定告警。
              </div>
              <div class="setting-item" v-show="settingType == '00003' || settingType == '00004'">
                说明: 开关状态仅监控状态改变，当状态改变时触发告警。
              </div>
              <div class="btn-self" style="float: right;margin-top: 10px;" @click="okSetting()">确定</div>
            </div>
          </div>
        </div>

        <div class="wraning-box-full" style="flex:1">
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
      </div>
      <div class="wraning-box">
        <div class="title">安全态势分析</div>
      </div>
    </div>
    <div class="wrap-right">
      <div class="devices-box">
        <div class="title-bar">
          <div class="title-before-icon">
          </div>
          <div class="title-1">T12 1号通信电源屏</div>
          
        </div>
        <div class="title-2">ATC 1# 通信电源柜</div>
        <div class="device-level-1">
          <div class="level-1-left">
            <div  class="dianyabiao" v-for="(item,idx) in devices1" :key="idx" @click="gotoDevice(item,devicesIdMap[1])">
                <div class="metre-num">{{item.metervalue}}</div>
            </div>
            
          </div>
          <div class="level-1-right" style="padding-top:30px;">
            <div class="power-box">

            </div>
            <div class="power-text">
              <div class="power-t"></div>
            </div>
          </div>
        </div>
        <div class="device-level-2">
          <div class="screen"></div>
        </div>
        <div class="device-level-3">
          <div class="light" v-for="(item,idx) in devices2" :key="idx"  @click="gotoDevice(item,devicesIdMap[2])">
            <div class="light-red" v-show="item.redlightstatus==1"></div>
            <div class="light-yellow" v-show="item.yellowlightstatus==1"></div>
            <div class="light-gray" v-show="item.greenlightstatus==0"></div>
          </div> 
        </div>
        <div class="device-level-3">
          <div class="light" v-for="(item,idx) in devices3" :key="idx"  @click="gotoDevice(item,devicesIdMap[3])">
            <div class="light-red" v-show="item.redlightstatus==1"></div>
            <div class="light-yellow" v-show="item.yellowlightstatus==1"></div>
            <div class="light-gray" v-show="item.greenlightstatus==0"></div>
          </div> 
        </div>
        <div class="device-level-4">
          <div class="banshou-box" v-for="(item,idx) in devices4" :key="idx"  @click="gotoDevice(item,devicesIdMap[4])">
            <div class="banshou-top"></div>
            <div class="banshou-bottom" :class="{'banshou-bottom-90deg':item.handlestatus!=1}"></div>
          </div>
        </div>
        <div class="device-level-5">
          <div class="switch" v-for="(item,idx) in devices5" :key="idx"  @click="gotoDevice(item,devicesIdMap[5])">
            <div :class="{'light-open':item.redlightstatus==1,'light-close':item.redlightstatus==0}"></div>
            <div :class="{'swith-open':item.switchstatus==1,'swith-close':item.switchstatus==0}"></div>
          </div>
          
        </div>
        <div class="device-level-6">
          <div class="switch" v-for="(item,idx) in devices6" :key="idx"  @click="gotoDevice(item, devicesIdMap[6])">
            <div :class="{'light-open':item.redlightstatus==1,'light-close':item.redlightstatus==0}"></div>
            <div :class="{'swith-open':item.switchstatus==1,'swith-close':item.switchstatus==0}"></div>
          </div>
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
      <div class="dialog-deal-psn">处理人：<input type="text" style="width:200px" v-model="dialogPsn"></div>
      <div class="dialog-btns">
        <div class="close-btn" @click="clozeDialog">关闭</div>
        <div class="done-btn" @click="okDialog">已处理，解除告警</div>
      </div>
    </div>
  </div>
</template>

<script>

import { 
  getSignalInfo,
  getExceptInfo,
  exceptDeal,
  getDeviceDescription,
  holdinfo,
  metreAdd,
  getInfoDetail
} from "../../api/api";

export default {
  data() {
    return {
      startDate: "",
      endDate: "",
      form:{},
      devices1: [],
      devices2: [],
      devices3: [],
      devices4: [],
      devices5: [],
      devices6: [],
      devicesIdMap: {},
      eleccabinetid:"",
      warningList: [],
      dialogShow:false,
      dialogMsg: "",
      dialogContent:"",
      warinTitle: "",
      dialogPsn: "",
      description: {},
      isEditing: false,
      showMoniter:false,
      settingType: "",
      currentMeterValue: "",
      chooseIdx: "",
      chooseIdx1:"",
      meterStartValue:"",
      meterEndValue:"",
      setting: {},
      chooseSignalId: ""
    };
  },
  created() {
    let self = this;
    let { id } = this.$route.query;
    this.eleccabinetid = id;
    self.update();
    self.getDeviceDescription(id,1);
    window.setInterval(function() {
      self.update();
    }, 5000)
  },
  methods: {
    chooseLevel(idx) {
      this.chooseIdx = idx;
    },
    chooseLevel1(idx) {
      this.chooseIdx1 = idx;
    },
    okSetting() {
//       id： 设备ID
// singalId： 信号ID type=5的时候singalId传字符串 milieu
// type: 1-电压，2-信号灯， 3- 把手， 4- 开关, 5 - 设备环境报警（断电等）
// grade: 报警等级，1，2，3，4  如果是红绿灯，这个为红灯的报警等级
// grade_v: 只有信号是信号灯，才传这个值。改值表示黄灯报警等级

      let param = {};
      switch(this.settingType) {
        case '00001':
          param = {
            id: this.setting.deviceId,
            singalId: this.setting.signalId,
            type:'1',
            grade: this.chooseIdx,
            metreMin: this.meterStartValue,
            metreMax: this.meterEndValue

          }
          break;
        case '00002':
          param = {
            id: this.setting.deviceId,
            singalId: this.setting.signalId,
            type:'2',
            grade: this.chooseIdx,
            grade_v: this.chooseIdx1
          }
          break;
        case '00003':
          param = {
            id: this.setting.deviceId,
            singalId: this.setting.signalId,
            type:'3',
            grade: this.chooseIdx
          }
          break;
        case '00004':
          param = {
            id: this.setting.deviceId,
            singalId: this.setting.signalId,
            type:'4',
            grade: this.chooseIdx
          }
          break;
      }
      param.eleccabinetid = this.eleccabinetid;
      console.log("监控设定",param);
      metreAdd(param).then(res=> {
         this.$message({
            message: "监控设定成功",
            type: "success"
        });
      })

    },
    gotoDevice(device, deviceProperty) {
      console.log(device,deviceProperty);
      this.chooseIdx = "";
      this.chooseIdx1="";
      this.meterStartValue="";
      this.meterEndValue="";
      this.showMoniter = true;
      this.settingType = deviceProperty.type;
      let deviceId = deviceProperty.id;
      let signalId ="";
      
      switch(this.settingType) {
        case "00001":
          signalId = device.metreid;
          this.currentMeterValue = device.metervalue;
          break;
        case "00002":
          signalId = device.lightid;
          break;
        case "00003":
          signalId = device.handleid;
          break;
        case "00004":
          signalId = device.switchid;
          break;
      };
      this.chooseSignalId = signalId;
      this.setting = {
        deviceId: deviceId,
        signalId: signalId
      }
      this.getDeviceDescription(deviceId,2);

      getInfoDetail({
        eleccabinetid: this.eleccabinetid,
        deviceid:deviceId,
        singalId: signalId
      }).then(res => {
        console.log(res);debugger
        this.chooseIdx = res.grade;
        this.chooseIdx1 = res.gradeV; debugger
        this.meterStartValue = res.metreMin;
        this.meterEndValue = res.metreMax;

      })
    },
    editDescription() {
      this.isEditing = true;
    },
    saveDescription() {
      this.isEditing = false;
      this.holdinfo(this.eleccabinetid, 1);
    },
    holdinfo(id,type) {
      let self = this;
       
      holdinfo({
        id: id,
        type: type,
        manufacturer: self.description.manufacturer,
        management: self.description.management,
        principal: self.description.principal,
        phone: self.description.phone,
        singalType: self.description.singalType
      }).then(res=> {

      })
    },
    clozeDialog() {
      this.dialogShow = false;
    },
    update(){
      this.getSignalInfo(this.eleccabinetid);
      this.getExceptInfo(this.eleccabinetid,1);
    },
    okDialog() {
      this.dialogShow = false;
      this.dealWithWaring();
    },
    dealWithWaring() {
      let self = this;
      exceptDeal({
        id: self.waring.id,
        type: self.waring.type,
        resultDescription: self.dialogContent,
        handler: self.dialogPsn
      }).then(res=>{
        // self.updateLogs();
        self.getExceptInfo(self.eleccabinetid,1);
      })
    },
    showWarinDetail(waring) {
      this.dialogShow = true;
      this.waring =waring;
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
    getExceptInfo(id,type) {
      let self = this;
      getExceptInfo({
        id: id,
        type:type
      }).then(res=> {
        self.warningList = res;
      })
    },
    getSignalInfo(eleccabinetid) {
      let self = this;
      getSignalInfo({
        eleccabinetid:  eleccabinetid
      }).then(res =>{
          res.data.devices.forEach(item => {
            let level = item.deviceid.split('-')[0];
            switch(level) {
              case '001':
                self.devicesIdMap['1'] = {
                  id: item.deviceid,
                  type: '00001'
                };
                self.devices1 = item.meters.sort(function(a,b) {
                  return Number(a.metreid)-Number(b.metreid);
                });
                break;
              case '002':
                self.devicesIdMap['2'] = {
                  id: item.deviceid,
                  type: '00002'
                };
                self.devices2 = item.lights.sort(function(a,b) {
                  return Number(a.lightid)-Number(b.lightid);
                });
                break;
              case '003':
                self.devicesIdMap['3'] = {
                  id: item.deviceid,
                  type: '00002'
                };;
                self.devices3 = item.lights.sort(function(a,b) {
                  return Number(a.lightid)-Number(b.lightid);
                });
                break;
              case '004':
                self.devicesIdMap['4'] = {
                  id: item.deviceid,
                  type: '00003'
                };;
                self.devices4 = item.handles.sort(function(a,b) {
                  return Number(a.handleid)-Number(b.handleid);
                });
                break;
              case '005':
                self.devicesIdMap['5'] = {
                  id: item.deviceid,
                  type: '00004'
                };;
                self.devices5 = item.switchs.sort(function(a,b) {
                  return Number(a.switchid)-Number(b.switchid);
                });
                break;
              case '006':
                self.devicesIdMap['6'] = {
                  id: item.deviceid,
                  type: '00004'
                };;
                self.devices6 = item.switchs.sort(function(a,b) {
                  return Number(a.switchid)-Number(b.switchid);
                });
                break;
            }
          })
      })
    },
    startDateChagne() {},
    backHome( ) {
      this.$router.push({
        path: '/'
      })
    },
    getDeviceDescription(id, type) {
      let self = this;
      getDeviceDescription({
        id,
        type
      }).then(res=> {
        
        self.description = res;
      })
    },
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
  font-family: PingFang-SC-Bold;
}
.wrap-left {
  flex: 1;
  height: 100%;
  position: relative;
}
.wrap-right {
  width: 480px;
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
.wraning-box-full {
  font-size: 12px;
  padding-bottom: 15px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(../../../static/waring-box.png);
}
.devices-box {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 322px;
  height: 550px;
  background-image: url(../../../static/bg@2x.png);
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
.content{
  color: #2696E4;
  padding: 0px 20px;
}
.msg-wrap {
  display: flex;
  padding: 14px 0px;
  border-bottom: 1px solid #061E50;
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

.nav-bar{
  position: absolute;
  top: -14px;
  left: 20px;
  cursor: pointer;
}
.btn-icon{
  width: 22px;
  height: 20px;
  display: inline-block;
  background-image: url(../../../static/backicon.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.btn-text{
  width: 70px;
  height: 15px;
  display: inline-block;
  background-image: url(../../../static/backhome.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  top: -3px;
  left: 5px;
}
.title-bar{
  height: 27px;
  width: 142px;
  background-image: url(../../../static/13@2x.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: inline-block;
}
.title-before-icon{
  top: 4px;
  left: 4px;
  height: 19px;
  width: 12px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(../../../static/title-icon.png);
  position: absolute;
}
.title-1{
  display: inline-block;
  color: #2595e3;
  transform: scale(0.8,0.8);
  font-style: italic;
  position: relative;
  top: 3px;
  left: 6px;
}
.title-2{
  display: inline-block;
  color: #2595e3;
  transform: scale(0.8,0.8);
  font-style: italic;
  position: relative;
  top: 5px;
  left: -24px;
}
.dianyabiao{
  width: 72px;
  height: 47px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(../../../static/metar.png);
  display: inline-block;
  position: relative;
  margin: 0px 5px;
}
.device-level-1{
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}
.device-level-5,.device-level-6{
  padding: 5px;
  text-align: center;
}
.device-level-2,.device-level-3,.device-level-4{
  border-bottom: 1px solid #325184;
}
.device-level-3{
  text-align: center;
}
.level-1-left{
  width: 230px;
  overflow: auto;
  text-align: center;
}
.power-box{
  width: 40px;
  height: 40px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(../../../static/椭圆.png);
}
.power-text{
  width: 50px;
  height: 18px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(../../../static/text.png);
}
.power-t{
  transform: scale(0.5,0.5);
}
.screen{
  margin-left:113px;
  width: 90px;
  height: 51px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(../../../static/280@2x.png);
}
.light{
  position: relative;
  margin: 5px 3px;
  width: 66px;
  height: 70px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(../../../static/light.png);
  display: inline-block;
}
.banshou-box{
  margin-top: 5px;
  display: inline-block;
  text-align: center;
  margin: 0 20px;
}
.banshou-top{
  width: 60px;
  height: 18px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(../../../static/text.png);
}
.banshou-bottom{
  width: 21px;
  height: 39px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(../../../static/手柄@2x.png);
  display: inline-block;
}
.banshou-bottom-90deg{
  transform: rotate(-90deg);
}
.device-level-4{
  text-align: center;
  padding-top: 5px;
}
.row-item{
  display: flex;
  flex-direction: row;
}
.row-item-left{
  width: 70px;
}
.row-item-right{
  padding: 0 10px;
  flex: 1;
}

input{
  width: 100%;
  border: 1px solid #156EBE;
  background-color: #010730;
  color: #fff;
  height: 18px;
  line-height: 18px;
  padding-left: 5px;
  color: #156EBE;
}
.lineHeight{
  line-height: 28px;
  position: relative;
  padding-left: 15px;
}
.bottom-wrap{
  line-height: 30px;
  padding-top: 10px;
  padding-left: 15px;
  position: relative;
}
.switch{
  position: relative;
  width: 30px;
  height: 50px;
  overflow: hidden;
  display: inline-block;
}
.light-open{
  position: absolute;
  width: 45px;
  height: 45px;
  top: -13px;
  left: -8px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(../../../static/light-open.png);
}
.swith-open{
  position: absolute;
  top: 20px;
  width: 28px;
  height: 29px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(../../../static/switch-open.png);

}
.light-close{
  position: absolute;
  width: 35px;
  height: 35px;
  top: -8px;
  left: -4px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(../../../static/light-close.png);
}
.swith-close{
  position: absolute;
  top: 20px;
  width: 28px;
  height: 29px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(../../../static/switch-close.png);

}
.metre-num{
  color: #B22323;
  position: absolute;
  width: 72px;
  text-align: center;
  top: 5px;
}
.light-red{
  position: absolute;
  top: 3px;
  left: 10px;
  background-color: red;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.light-yellow{
  position: absolute;
  top: 3px;
  left: 30px;
  background-color: rgb(221, 221, 43);
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.light-gray{
  position: absolute;
  top: 2px;
  left: 48px;
  background-color:rgb(114, 126, 114);
  width: 9px;
  height: 9px;
  border-radius: 50%;
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
.setting-item{
  height: 30px;
  line-height: 30px;
}
.waring-level{
    display: inline-block;
    width: 41px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    border: 1px solid #2696E4;
    font-size: 12px;
    cursor: pointer;
}
.waring-level-active{
  border: 1px solid #1bff8b;
}
.setting-label{
  width: 64px;
  display: inline-block;
}
.lineHeight::after{
  position: absolute;
    top: 12px;
    left: 2px;
    z-index: 999;
    background-color: #3DD7FB;
    clear: both;
    content: "";
    display: block;
    height: 6px;
    width: 6px;
    border-radius: 50%;
}
.bottom-wrap::after{
  position: absolute;
  top: 22px;
  left: 2px;
  z-index: 999;
  background-color: #3DD7FB;
  clear: both;
  content: "";
  display: block;
  height: 6px;
  width: 6px;
  border-radius: 50%;
}
</style>
