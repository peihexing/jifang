<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="6" class="logo">
				<img class="logo-img" :src="logoUrl"/>
				调查问卷
			</el-col>
			<el-col :span="14">
				<el-menu
					:default-active="activeIndex"
					class="el-menu-demo"
					mode="horizontal"
					@select="handleSelect">
					<el-menu-item index="/create" style="font-size:18px">创建问卷</el-menu-item>
					<el-menu-item index="/myquestion" style="font-size:18px">我的问卷</el-menu-item>
					<el-menu-item v-if="showUserCenter" index="/userCenter" style="font-size:18px">用户中心</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="4" class="userinfo">
				<span class="userinfo-wrap" style="height:36px;">
					<img class="" :src="cluster"/>
					<span class="">{{sysUserName}}</span>
				</span>
				<span class="logout" @click="logout">退出登录</span>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<transition name="fade" mode="out-in">
				<router-view></router-view>
			</transition>
		</el-col>
	</el-row>
</template>

<script>
	const logoUrl = './static/logo4.png';
	const cluster = './static/cluster.png'
	import {getUserList} from '../api/api'
	export default {
		data() {
			return {
				sysName:'',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '',
				logoUrl: logoUrl,
				cluster:cluster,
				activeIndex: "1",
				showUserCenter: false
			}
		},
		created() {
			getUserList({
				user_type: 2
			}).then(res => {
				res.forEach(item => {
					if (this.sysUserName == item.phoneNumber) {
						this.showUserCenter = true;
					}
				})
			});
		},
		methods: {
			
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
				this.$router.push({
					path: key
				})
			},
			//退出登录
			logout: function () {debugger
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					localStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});
			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
				if (!this.collapsed) {
					document.querySelector(".menu-collapsed ul").style.width = "100%";
					this.logoUrl = logoUrl;
				} else {
					// this.logoUrl = '';
				}
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		},
		mounted() {
			var user = localStorage.getItem('user');
			if (user) {
				this.sysUserName = user;
			}

		}
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';
	
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background-color: #FFFFFF;
			font-size: 14px;
			color: #262626;
			margin: 0 auto;
			box-shadow: 0px 1px 8px 0px rgba(0,0,0,0.12), 0px 1px 0px 0px rgba(232,232,232,1);
			.el-menu-demo{
				background-color: #fff;
			}
			.userinfo-wrap{
				height: 36px;
				display: inline-block;
				width: 150px;
				line-height: 36px;
				background: #f0f0f0;
				border-radius: 999px;
				margin-top: 10px;
				img{
    				height: 28px;
					margin-left: 5px;
				}
				span{
					height: 36px;
					line-height: 36px;
					display: inline-block;
					vertical-align: text-bottom;
				}
			}
			}
			.logo {
				//width:230px;
				height:60px;
				font-size: 22px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {width: 40px;
					float: left;
					margin: 10px 10px;
					
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			// overflow: hidden;
		}
	

	.logo-img{
		border: 2px solid #fff;
    	border-radius: 100%;
    	box-sizing: border-box;
    	height: 40px;
    	width: 40px;
	}
	.logout{
		position: absolute;
		display: inline-block;
		height: 60px;
		line-height: 60px;
		cursor: pointer;
		margin-left: 20px;
	}
</style>