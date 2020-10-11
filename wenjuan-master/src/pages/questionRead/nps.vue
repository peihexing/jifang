<template lang="html">
  <div>
        <div class="question">
            {{index}}.{{data.content.rowContent}}:
            <span v-if="data.required" class="asterisk">*</span>
        </div>
        <div class="subtitle">{{data.content.subtitle}}</div>
        <div class="anwser">
            <el-row>
                
                    <span class="nps-title">{{data.options[0].name}}</span>
                
                    <ul class='onscore'>
                        <li :class="idx== data.options.length-1? 'off': 'psn-item'" style="width:30px" v-for="(item,idx) in data.options">{{item.fraction}}</li>
                    </ul>
                
                    <span class="nps-title">{{data.options[data.options.length-1].name}}</span>
                
            </el-row>
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        radioResult: ''
    };
  },
  mounted() {},
  props: {
    data: Object,
    type: String,
    index: Number
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
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
.subtitle{
  color: #8492a6;
  margin-top: 10px;
}
.psn-item{
    text-align: center;
    border: solid 1px #fff;
    cursor: pointer;
    list-style: none;
}
.onscore{
    background: url(../../../static/piont_lv.png);
    background-color: #FFFFFF;
    overflow: hidden;
    border: solid 1px #dbdbdb;
    height: 24px;
    clear: both;
    display: inline-block;
    margin: 0px;
    padding: 0px;
}
.onscore li{
    float: left;
    width: 30px;
    line-height: 22px;
}
.off{
    background: #fff;
    border: solid 1px #fff;
    text-align: center;
    cursor: pointer;
    list-style: none;
}
.nps-title{
    position: relative;
    top: -8px;
    font-weight: bold;
}
</style>
