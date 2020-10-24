<template>
  <div class="wrap">
    <div class="nav-bar">
      <div class="btn-icon"></div>
      <div class="btn-text"></div>
    </div>
    <div class="wrap-left">
      <div class="wraning-box">
        <div class="title">设备描述</div>
        <div class="content">
          <div>设备归属：蒙东鄂尔多斯特高压变电站信息通信机房</div>
        </div>
      </div>


      <div class="wraning-box">
        <div class="title">告警信息</div>
        <div class="box-content">
          <div class="msg-wrap">
            <div class="msg-left">
              <div class="notice-icon ver-aligin"></div>
            </div>
            <div class="msg-mid">
              2020.7.2日10点37分，鄂尔多斯机房电源柜报警信息数据异常，建议程序员对数据进行排查...
            </div>
            <div class="msg-right">
              <div class="btn-self ver-aligin">查看</div>
            </div>
          </div>
          <div class="msg-wrap">
            <div class="msg-left">
              <div class="notice-icon ver-aligin"></div>
            </div>
            <div class="msg-mid">
              2020.7.2日10点37分，鄂尔多斯机房电源柜报警信息数据异常，建议程序员对数据进行排查...
            </div>
            <div class="msg-right">
              <div class="btn-self ver-aligin">查看</div>
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
            <div  class="dianyabiao">

            </div>
            <div  class="dianyabiao">

            </div>
            <div  class="dianyabiao">

            </div>
            <div  class="dianyabiao">

            </div>
          </div>
          <div class="level-1-right">
            <div class="power-box">

            </div>
            <div class="power-text">
              <div class="power-t">1组蓄电池电压监视器</div>
            </div>
          </div>
        </div>
        <div class="device-level-2">
          <div class="screen"></div>
        </div>
        <div class="device-level-3">
          <div class="light"></div>
          <div class="light"></div>
          <div class="light"></div>
          <div class="light"></div>
        </div>
        <div class="device-level-3">
          <div class="light"></div>
          <div class="light"></div>
          <div class="light"></div>
          <div class="light"></div>
        </div>
        <div class="device-level-4">
          <div class="banshou-box">
            <div class="banshou-top"></div>
            <div class="banshou-bottom"></div>
          </div>
          <div class="banshou-box">
            <div class="banshou-top"></div>
            <div class="banshou-bottom banshou-bottom-90deg"></div>
          </div>
        </div>
        <div class="device-level-5">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: "",
      endDate: "",
    };
  },
  created() {},
  methods: {
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
  width: 480px;
  height: 100%;
  display: flex;
}
.wraning-box {
  margin: 15px 20px;
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
  width: 80px;
  height: 60px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(../../../static/277.png);
  display: inline-block;
}
.device-level-1{
  display: flex;
  flex-direction: row;
  margin-top: 10px;
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
  height: 20px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(../../../static/289@2x.png);
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
  width: 70px;
  height: 74px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(../../../static/4@2x.png);
  display: inline-block;
}
.banshou-box{
  display: inline-block;
  text-align: center;
  margin: 0 20px;
}
.banshou-top{
  width: 60px;
  height: 20px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(../../../static/289@2x.png);
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
}
</style>
