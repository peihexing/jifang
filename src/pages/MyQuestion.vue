<template lang="html">
  <div class="container">
    <el-row>
      <el-col class="col-item" :span="8" v-for="(item,idx) in list" :key="idx">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="ques-title">{{item.name || "未命名"}}</span>
            
          </div>
          <div>
            <div class="ques-deatail">ID:{{item.id}}</div>
            <div class="ques-deatail">创建时间:{{item.createTime}}</div>
            <div class="ques-deatail">问卷类型:{{item.type== 1? "普通问卷": "测评问卷"}}</div>
          </div>
          <div class="b-line"></div>
          <div>
            <el-link type="primary" @click="readQuestion(item.id)">查看问卷<i class="el-icon-view el-icon--right"></i> </el-link>
            <el-link type="primary" style="margin-left: 20px" @click="copyLink(item.id)">发布连接<i class="el-icon-link el-icon--right"></i> </el-link>
            <el-link type="primary" style="margin-left: 20px" @click="gotoStatic(item.id)">统计分析<i class="el-icon-tickets el-icon--right"></i> </el-link>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { getMyQuestions } from "../api/api";
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    let iphone = localStorage.getItem("user");
    getMyQuestions({
      user_phone: iphone
    }).then(res => {
      this.list = res;
    });
  },
  methods: {
    readQuestion(id) {
      let routeUrl = this.$router.resolve({
        path: "/h5",
        query: {
          id: id
        }
      });
      window.open(routeUrl.href, "_blank");
    },
    copyLink(data) {
      //todo
      let href = window.location.href;
      let url = href.replace("myquestion", "h5");
      let msg = `${url}?id=${data}`;
      try {
        var txtEl = document.createElement("textarea");
        txtEl.value = msg;
        document.body.appendChild(txtEl);
        txtEl.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        txtEl.remove();
        Message({
          message: "复制连接成功！",
          type: "success",
          duration: 5 * 1000
        });
      } catch (err) {
        console.log(err);
      }
    },
    gotoStatic(id) {
      this.$router.push({
        path: "/static",
        query: {
          id: id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
}
.ques-title {
  font-size: 20px;
  font-weight: bold;
}
.col-item {
  padding: 15px 15px;
}
.b-line {
  margin: 15px 0;
  border-top: 1px solid #ebeef5;
}
.ques-deatail {
  height: 30px;
  line-height: 30px;
}
</style>
