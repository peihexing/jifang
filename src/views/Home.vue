<template>
	<div class="container">
		<el-col :span="24" class="header">
			<div class="header-title">
				<div class="title-left"></div>
				<div class="title-m"></div>
				<div class="title-right"></div>
			</div>
		</el-col>
		<el-col :span="24" class="main">
			<transition name="fade" mode="out-in">
				<router-view></router-view>
			</transition>
		</el-col>
	</div>
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
			// getUserList({
			// 	user_type: 2
			// }).then(res => {
			// 	res.forEach(item => {
			// 		if (this.sysUserName == item.phoneNumber) {
			// 			this.showUserCenter = true;
			// 		}
			// 	})
			// });
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
		background-image: url(../../static/bg-notitle.png);
		background-size: 100% 100%;
    background-repeat: no-repeat;
	}
	.header-title{
		height: 50px;
		width: 100%;
		display: flex;
		flex-direction: row;
	}
	.title-left{
		background-image: url(../../static/title-left.png);
		background-size: 100% 100%;
		height: 50px;
		flex: 1;
	}
	.title-m{
		height: 50px;
		background-image: url(../../static/title-m.png);
		background-size: 100% 100%;
		width: 739px;
	}
	.title-right{
		background-image: url(../../static/title-right.png);
		background-size: 100% 100%;
		height: 50px;
		flex: 1;
	}
	.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 50px;
			bottom: 0px;
			// overflow: hidden;
		}
</style>