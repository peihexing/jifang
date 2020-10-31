<template>
  <div class="swiper">
    <swiper ref="mySwiper" class="swiper-com" :options="swiperOptions">
      <swiper-slide>
        <div class="swiper-item" id="echart1" :key="1"></div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-item" id="echart2" :key="2"></div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-item" id="echart3" :key="3"></div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import echarts from "echarts";

import { getCountInfo } from "../../api/api";

// import style (>= Swiper 6.x)
import "swiper/swiper-bundle.css";
export default {
  data() {
    return {
      swiperOptions: {
        slidesPerView: "auto",

        width: "100%",
        height: "130px",
        // Some Swiper option/callback...
      },
    };
  },
  mounted() {
    getCountInfo({
      end_time: new Date().getTime()/1000,
      start_time: ((new Date().getTime())/1000 - 30*24*3600)
    }).then(res=> {
      debugger
      let xArr = [],yArr1=[],yArr2=[],yArr3=[];
      let handleNum =0,metreNum=0, singalNum=0,switchNum =0;
     
      res.forEach(item=> {
        xArr.push(item.date);
        yArr1.push(item.normalDay);
        yArr2.push(item.exceptDay);
        yArr3.push(item.score);
        handleNum+=item.handleNum;
        metreNum+=item.metreNum;
        singalNum+=item.singalNum;
        switchNum+=item.switchNum;

      })


      this.drawLine(xArr,yArr1,yArr2);
      this.drawPie(metreNum,singalNum,switchNum,handleNum);
      this.drawLine2(xArr,yArr3);
    })
   
    
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  directives: {
    swiper: directive,
  },
  methods: {
    handleResult(titleId, resultId) {},
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
    drawLine(xArr,yArr1,yArr2) {
      let option = {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "10",
          left: "30",
          right: "30",
          bottom: "30",
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: xArr,
            axisLine: {
              lineStyle: {
                color: "#131725",
              },
            },
            axisLabel: {
              textStyle: {
                color: "#4AADFF",
                fontSzie: 12,
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#131725",
              },
            },
            axisLabel: {
              textStyle: {
                color: "#4AADFF",
                fontSzie: 12,
              },
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
          },
        ],
        series: [
          {
            name: "设备正常天数",
            smooth: true,
            type: "line",
            stack: "总量",
            areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(1,132,213,0.4)",
                  },
                  {
                    offset: 0.8,
                    color: "rgba(1,132,213,0.1)",
                  },
                ],
                false
              ),
              shadowColor: "rgba(0,0,0,0.1)",
            },
            lineStyle: {
              color: "#0184D5", //#0184D5
              width: 2,
            },
            symbol: "circle",
            showSymbol: false,
            itemStyle: {
              color: "#0184d5",
              borderColor: "rgba(221,220,107,.1)",
              borderWidth: 12,
            },
            data: yArr1,
          },
          {
            name: "设备异常天数",
            smooth: true,
            type: "line",
            stack: "总量",
            areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(255,76,159,0.4)",
                  },
                  {
                    offset: 0.8,
                    color: "rgba(255,76,159,0.1)",
                  },
                ],
                false
              ),
              shadowColor: "rgba(0,0,0,0.1)",
            },
            lineStyle: {
              color: "#FF4C9F", //#0184D5
              width: 2,
            },
            symbol: "circle",
            showSymbol: false,
            itemStyle: {
              color: "#FF4C9F",
              borderColor: "rgba(221,220,107,.1)",
              borderWidth: 12,
            },
            data:  yArr2,
          }
        ],
      };

      let myEcharts1 = echarts.init(document.getElementById("echart1"));
      myEcharts1.setOption(option);
    },
    drawLine2(xArr,yArr1) {
      let option = {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "10",
          left: "30",
          right: "30",
          bottom: "30",
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: xArr,
            axisLine: {
              lineStyle: {
                color: "#131725",
              },
            },
            axisLabel: {
              textStyle: {
                color: "#4AADFF",
                fontSzie: 12,
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#131725",
              },
            },
            axisLabel: {
              textStyle: {
                color: "#4AADFF",
                fontSzie: 12,
              },
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
          },
        ],
        series: [
          {
            name: "安全态势得分",
            smooth: true,
            type: "line",
            stack: "总量",
            areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(1,132,213,0.4)",
                  },
                  {
                    offset: 0.8,
                    color: "rgba(1,132,213,0.1)",
                  },
                ],
                false
              ),
              shadowColor: "rgba(0,0,0,0.1)",
            },
            lineStyle: {
              color: "#0184D5", //#0184D5
              width: 2,
            },
            symbol: "circle",
            showSymbol: false,
            itemStyle: {
              color: "#0184d5",
              borderColor: "rgba(221,220,107,.1)",
              borderWidth: 12,
            },
            data: yArr1,
          }
        ],
      };

      let myEcharts1 = echarts.init(document.getElementById("echart3"));
      myEcharts1.setOption(option);
    },
    drawPie(metreNum,singalNum,switchNum,handleNum) {
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        color: ["#065aab","#066eab","#0682ab","#0696ab","#06a0ab"],
        legend: {
          orient: "vertical",
          left: 10,
          itemHeight: 10,
          itemWidth:10,
          textStyle: {
            color: "#ffffff"
          },
          data: ["电压异常量", "信号灯异常量", "开关异常量", "把手异常量", "环境异常量"],
        },
        series: [
          {
            name: "异常量统计",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            center:['50%','45%'],
            labelLine: {
              show: false,
            },
            data: [
              { value: metreNum, name: "电压异常量" },
              { value: singalNum, name: "信号灯异常量" },
              { value: switchNum, name: "开关异常量" },
              { value: handleNum, name: "把手异常量" },
              // { value: 1548, name: "环境异常量" },
            ],
          },
        ],
      };

      let myEcharts1 = echarts.init(document.getElementById("echart2"));
      myEcharts1.setOption(option);
    },
  },
};
</script>

<style scoped>
.swiper {
  height: 130px;
  /* background-color: red; */
  width: 600px;
}
.swiper-com {
  width: 100%;
  height: 130px;
}
.swiper-item {
  height: 130px;
  color: #fff;
  margin: 0 auto;
  width: 90%;
}
.swiper-pagination .swiper-pagination-bullet{
    border-radius: 0px;
}
.listA_banner .swiper-pagination span{
    width: 48px;
    height: 4px;
    background-color: #fff;
}
.listA_banner .swiper-container .swiper-pagination-bullet-active{
    background-color: #FF3939;
}
</style>
