<template lang="html">
  <div>
        <div class="question">
            {{index}}.{{data.content.rowContent}}:
            <span v-if="data.required" class="asterisk">*</span>
        </div>
        <div class="subtitle">{{data.content.subtitle}}</div>
        <div class="anwser">
          <div style="margin-top: 6px">
              <div class="mul-select"></div>
          </div>
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
.mul-select{
    background-image: url('../../../static/click.png');
    height: 30px;
    border: 1px solid #bfcbd9;
    background-repeat: no-repeat;
    background-position: 11px;
}
</style>
