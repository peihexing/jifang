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
            <el-input style="width:100%;"
                v-model="result" 
                border
                @blur="handleResult()"
                ></el-input>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          result: ''
      }
  },
  props: {
    idx: Number,
    data: Object
  },
  created() {
    console.log(this)
  },
  methods: {
      handleResult() {
          this.$emit('handleResult',{
              titleId: this.data.id,
              result: this.result,
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
