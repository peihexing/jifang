<template>
	<div id="app">
		<transition name="fade"
		            mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'app',
	components: {
	}
}

</script>

<style lang="scss">
html{
	height: 100%;
}
body {
	margin: 0px;
	padding: 0px;
	/*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
	// background: #1F2D3D;
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
	height: 100%;
}

#app {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
}

.el-submenu [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.el-menu-item [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.toolbar {
	background: #f2f2f2;
	padding: 10px;
	//border:1px solid #dfe6ec;
	margin: 10px 0px;
	.el-form-item {
		margin-bottom: 10px;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
#app .el-input__inner{
	border-radius: 0px;
}
#app .el-textarea__inner{
	border-radius: 0px;
}
#app .el-button{
	border-radius: 0px;
}
#app .el-tabs__item{
	border-radius: 0px;
}
.delete-btn{
	width: 36px;
    height: 36px;
    border-radius: 100%;
    border: 1px solid #bfcbd9;
    vertical-align: middle;
    margin-left: 15px;
    cursor: pointer;
	display: inline-block;
	background-image: url(../static/delete.png);
	background-size: 26px 26px;
    background-repeat: no-repeat;
    background-position: 4px;
	box-sizing: border-box;
}
.radio-cut .el-radio__label,.radio-cut .el-checkbox__label{
    
	display: none;
}

.h5 .el-radio__inner{
	height: 20px;
	width: 20px;
}
.h5 .el-radio__inner::after {
	width: 8px;
	height: 8px;
}
.sub-title{
    color: #999;
}
.img-anw{
    max-width:100%; 
    height:auto;
}

.static-wrap .el-slider__button-wrapper{
    display: none;
}

.static-wrap .el-table__header-wrapper th{
	background-color: #e4e7eb;
	color: #333;
}
.static-wrap .el-slider__bar{
	border-radius: 3px;
}
.static-wrap .el-slider__runway{
	margin: 9px 0px;
}
</style>