<template>
<div class="login-wrap">
  <el-form :model="loginForm" :rules="rules2" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <div style="text-align: center;margin-bottom: 15px;">
      <img style="width:54px" :src="iconUrl" />
    </div>
    <h3 class="title">智慧机房全景信息平台</h3>
    <el-form-item prop="phone">
      <el-input type="text" v-model="loginForm.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
    </el-form-item>
    <el-form-item prop="msg">
      <el-col :span="16">
        <el-input type="password" v-model="loginForm.msg" auto-complete="off" placeholder="请输短信验证码"></el-input>
      </el-col>
      <el-col :span="8" style="text-align:right">
        <el-button type="success" style="width:100px;" :disabled="isDisabled" @click="getMsgHandle">{{msgBtnText}}</el-button>
      </el-col>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="loginHandle" >登录</el-button>      
    </el-form-item>
  </el-form>
</div>
</template>

<script>
  import { loginByMsg, loginSend } from '../api/api';
  import { Message } from 'element-ui'
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        loginForm: {
          phone: '',
          msg: ''
        },
        rules2: {
          phone: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          msg: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        isDisabled: false,
        msgBtnText: "验证码",
        timeNum: 60,
        iconUrl: './static/logo4.png',
        timerId:null
      };
    },
    methods: {
      
      getMsgHandle() {
        let _this = this;
        if (this.loginForm.phone) {
          loginSend({
            phone_number: _this.loginForm.phone
          }).then(res => {

            Message({
              message: "获取成功",
              type: 'success',
              duration: 5 * 1000
            })
          })

          _this.msgBtnText =  this.timeNum + "秒",
          _this.isDisabled = true;
          
          _this.timerId = setInterval(() => {
            let time = _this.timeNum;
            if (time == 1) {
              _this.msgBtnText = "验证码";
              _this.isDisabled = false;
              _this.timeNum = 60;
              clearInterval(_this.timerId);
            } else {
              let num = time - 1;
              _this.msgBtnText = num + "秒";
              _this.timeNum = num;
              
            }

          }, 1000)

        } else {
          Message({
            message: "请输入手机号",
            type: 'error',
            duration: 5 * 1000
          })
        }
      },
      loginHandle(ev) {
        var _this = this;
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            //NProgress.start();
            var loginParams = { user_phone: this.loginForm.phone, passward: this.loginForm.msg };
            loginByMsg(loginParams).then(data => {
              
              localStorage.setItem('user', this.loginForm.phone);
              this.$router.push({ path: '/create' });
              
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-wrap{
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(https://www.azcgj.com/Public/images/login_bg.jpg);
    background-size: cover;
    background-repeat: no-repeat;
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto 0 auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>