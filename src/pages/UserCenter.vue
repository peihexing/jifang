<template>
  <section style="padding: 20px">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" label-width="120px">
        <el-form-item>
          <el-button type="primary" @click="addDialogShow = true">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="userList" highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phoneNumber" label="用户电话"></el-table-column>
      <el-table-column prop="userType" label="用户类型" :formatter="typeFormatter"></el-table-column>
      <el-table-column prop="updateTime" label="创建时间"></el-table-column>
      <el-table-column label="操作" style="text-align:center" width="120" fixed="right">
				<template scope="scope">
					<el-button type="danger" size="small" @click="deleteHandle(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
    </el-table>

    <el-dialog
      title="新增用户"
      width="600px"
      :visible.sync="addDialogShow" 
      :close-on-click-modal="false">
      <el-form ref="form" :model="form" label-width="140px" @submit.prevent="onSubmit" style="margin:20px;min-width:600px;">
        <el-form-item label="姓名" prop="name">
          <el-input style="width: 200px" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone_number">
          <el-input style="width: 200px" v-model="form.phone_number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="addUserConfirm">提交</el-button>
			</div>
    </el-dialog>
  </section>
</template>

<script>
import util from "../common/js/util";
import { getUserList,addUser,deleteUser } from "../api/api";

export default {
  data() {
    return {
      queryParam: {
        phone_number: "",
        page: 1,
        limit: 10
      },
      form: {

      },
      total: 0,
      userList: [],
      listLoading: false,
      addDialogShow: false
    };
  },
  methods: {
      addUserConfirm() {
          addUser(this.form).then(res => {
            this.$message({
                message: "添加成功",
                type: "info"
            });
        });
      },
      typeFormatter(row, column) {
          if (row.userType == 1) {
              return "普通用户"
          } else if (row.userType == 2){
              return "管理员"
          }
      },
    handleCurrentChange(val) {
      this.queryParam.page = val;
      this.getUserList();
    },
    //获取列表
    getUserList() {
      let self = this;
      this.listLoading = true;
      //NProgress.start();
      getUserList(this.queryParam).then(res => {
        self.userList = res;
        self.listLoading = false;
      });
    },
    searchListHandle() {
      this.getUserList();
    },
    deleteHandle() {
        let id = arguments[1].id;
        deleteUser({
            user_id:id
        }).then(res => {
            this.$message({
                message: "删除成功",
                type: "success"
            });
            this.getUserList();
        }) 
    }
  },
  mounted() {
    this.getUserList();
  }
};
</script>

<style scoped>
.row-style {
  height: 40px;
  line-height: 40px;
  overflow: hidden;
}
.demo-table-expand .el-form-item {
  width: 100%;
  margin: 0;
}
.form-item-half {
  width: 48%;
  display: inline-block;
}
</style>