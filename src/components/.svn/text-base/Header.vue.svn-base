<template>
	<div class="header">
		<div class="logo">
			<img src="../assets/img/logo-bg-transparent-shanghai.png" alt="logo" />
		</div>
		<div class="header-right">
			<div class="header-user-con">
				<!-- 全屏显示 -->
				<div class="btn-fullscreen" @click="handleFullScreen">
					<el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
						<i class="el-icon-rank"></i>
					</el-tooltip>
				</div>
				<!-- 消息中心 -->
				<div class="btn-bell" @click="newsFuc">
					<el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
						<i class="el-icon-bell"></i>
					</el-tooltip>
					<span class="btn-bell-badge" v-if="message"></span>
				</div>
				<!-- 用户头像 -->
				<div class="user-avator">
					<img src="../assets/img/main-logo.png" alt="用户头像">
				</div>
				<!-- 用户名下拉菜单 -->
				<el-dropdown class="user-name" trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
                        {{username}} 
                        <i class="el-icon-caret-bottom"></i>
                    </span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item divided command="changePassword">修改密码</el-dropdown-item>
						<el-dropdown-item divided command="personalMenu">个人菜单</el-dropdown-item>
						<el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<!-- 修改密码弹出框 -->
		<el-dialog title="修改密码" width="360px" :visible.sync="changePsw" class="xgmm">
			<el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm" size="small"> 
				<el-row :gutter="15">
					<el-col :span="23">
						<el-form-item label="原密码" prop="oldPassword">
							<el-input placeholder="请输入姓名(6~12个字符)" minLength="6" maxLength="12" type="password" v-model="userForm.oldPassword"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="23">
						<el-form-item label="新密码" prop="newPassword">
							<el-input placeholder="请输入新密码(6~12个字符)" type="password" v-model="userForm.newPassword"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="23">
						<el-form-item label="确认新密码" prop="confirmPassword">
							<el-input placeholder="请再次输入新密码(6~12个字符)" type="password" v-model="userForm.confirmPassword"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer" align="center">
				<el-button type="primary" @click="save">保存</el-button>
				<el-button @click="cancelSubmit">取消</el-button>
			</div>
		</el-dialog>
		<!--消息弹窗-->
		<el-dialog title="消息列表" width="60%" :visible.sync="news_show" v-if='news_show' :close-on-click-modal="false" append-to-body>
			<News @newsCall='newsCall'></News>
		</el-dialog>
		<!--个人菜单弹框-->
		<el-dialog title="个人菜单" width="40%" :visible.sync="myMenu" v-if='myMenu' :close-on-click-modal="false" append-to-body>
			<MyMenu @newsCall='newsCall'></MyMenu>
		</el-dialog>
	</div>
</template>
<script>
	import bus from '../common/bus';
	import News from '../views/news/News'; //消息
	import MyMenu from '../views/indexModular/myMenu'; //消息
	export default {
		name: 'Header', //头部组件
		components: {
			News,//消息
			MyMenu,//个人菜单
		},
		data() {
			var validateCheckPass = (rule, value, callback) => {
				if(value.length == 0) {
					callback(new Error('请再次输入新密码'));
				} else if(value !== this.userForm.newPassword) {
					callback(new Error('两次输入的新密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				intervalTimer:'',//消息定时器
				news_show: false, //消息弹框是否显示
				userForm: {
					oldPassword: '', //原密码
					newPassword: '', //新密码
					confirmPassword: '', //确认新密码
				},
				collapse: true,
				fullscreen: false,
				name: '默认用户名',
				message: 0,
				userInfo: {}, //用户
				changePsw: false, //修改密码显示框
				myMenu:false,//个人菜单显示框
				rules: {
					oldPassword: [{
							required: true,
							message: '请输入原密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 12,
							message: '长度在 6 到 12 个字符',
							trigger: 'blur'
						}
					],
					newPassword: [{
							required: true,
							message: '请输入新密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 12,
							message: '长度在 6 到 12 个字符',
							trigger: 'blur'
						}
					],
					confirmPassword: [{
						required: true,
						validator: validateCheckPass,
						trigger: 'blur'
					}]
				}
			}
		},
		created(){
			this.getToDoList();
			this.intervalTimer=setInterval(()=>{
				this.getToDoList();
			}, 60000)
		},
		computed: {
			username() {
				this.userInfo = this.$store.state.user;
				if(this.userInfo) {
					return this.userInfo.cn ? this.userInfo.cn : this.name;
				} else {
					this.$router.push({
						path: '/login'
					});
					return "";
				}
			}
		},
		methods: {
			newsFuc() { //消息
				this.news_show = true;
			},
			newsCall(total){//消息回调
				this.message=total;
			},
			getToDoList() {//消息
				this.$axios({
					loading:{
            			isShow:false,
            		},
					method: 'get',
					url: this.API.findmessageReminderPage,
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.message= resData.data.total;
					} else {
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}
				}).catch((err) => {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			// 用户名下拉菜单选择事件
			handleCommand(command) {
				if(command == 'loginout') {
					this.existLogin();
				} else if(command == 'changePassword') {
					this.changePsw = true;
				} else if(command == 'personalMenu'){
					this.myMenu = true;
				}
			},
			// 侧边栏折叠
			collapseChage() {
				this.collapse = !this.collapse;
				bus.$emit('collapse', this.collapse);
			},
			// 全屏事件
			handleFullScreen() {
				let element = document.documentElement;
				if(this.fullscreen) {
					if(document.exitFullscreen) {
						document.exitFullscreen();
					} else if(document.webkitCancelFullScreen) {
						document.webkitCancelFullScreen();
					} else if(document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if(document.msExitFullscreen) {
						document.msExitFullscreen();
					}
				} else {
					if(element.requestFullscreen) {
						element.requestFullscreen();
					} else if(element.webkitRequestFullScreen) {
						element.webkitRequestFullScreen();
					} else if(element.mozRequestFullScreen) {
						element.mozRequestFullScreen();
					} else if(element.msRequestFullscreen) {
						// IE11
						element.msRequestFullscreen();
					}
				}
				this.fullscreen = !this.fullscreen;
			},
			/**
			 * 点击 修改密码
			 */
			save() {
				this.$refs["userForm"].validate((valid) => {
					if(valid) {
						this.changePswFromNet();
					} else {
						return false;
					}
				});
			},
			/**
			 * 取消 
			 */
			cancelSubmit() {
				this.$refs["userForm"].resetFields();
				this.changePsw = false;
			},
			/**
			 *请求服务器修改密码 
			 */
			changePswFromNet() {
				this.$axios({
               		loading:{
            			isShow:false,
            			target:'.xgmm'
            		},
					method: 'post',
					url: this.API.updatePassWord,
					data: {
						'password': this.$md5(this.userForm.oldPassword),
						'passwordNew': this.$md5(this.userForm.newPassword)
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.$message({
							type: 'success',
							message: '修改密码成功，请重新登录!'
						});
						this.cancelSubmit();
						//清除消息计时
						clearInterval(this.intervalTimer);
						//清除token信息并跳转到登录页面
						this.commonFun.againLogin(false);
						
					} else if(resData.code == "6") {
						this.$message({
							type: 'error',
							message: '原密码错误，请检查！'
						});
					} else {
						this.$message({
							type: 'error',
							message: '修改密码失败，请检查密码！'
						});
					}
				}).catch((err) => {
					console.log("连接错误" + err);
				})
			},
			/**
			 * 退出登录 
			 */
			existLogin() {
				this.$axios({
					loading:{
            			isShow:false
            		},
					method: 'get',
					url: this.API.loginOut
				});
				//清除消息计时
				clearInterval(this.intervalTimer);
				//清除token信息并跳转到登录页面
				this.commonFun.againLogin(false);
				
			}

		},
		mounted() {
			if(document.body.clientWidth < 1500) {
				this.collapseChage();
			}
		},
		destroyed(){
			//清除消息计时
			clearInterval(this.intervalTimer);
		}
	}
</script>
<style lang="scss" type="text/css">
	.header {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 70px;
		font-size: 22px;
		color: #fff;
		.el-dialog {
			position: absolute;
			top: 50%;
			left: 50%;
			margin: 0 !important;
			transform: translate(-50%, -50%);
			max-height: calc(100% - 30px);
			max-width: calc(100% - 30px);
			display: flex;
			flex-direction: column;
			background-color: #fff;
			.el-dialog__body {
				overflow: auto;
			}
		}
		.xgmm .el-dialog__body {
			padding: 15px 20px 5px 20px;
		}
		.xgmm .el-input--prefix {
			margin-bottom: 16px;
		}
		.xgmm .el-input__prefix {
			line-height: 40px;
		}
		.xgmm .el-input__prefix i {
			font-size: 18px;
		}
		.collapse-btn {
			float: left;
			padding: 0 21px;
			cursor: pointer;
			line-height: 70px;
		}
		.logo {
			float: left;
			width: 250px;
			height: 70px;
			line-height: 70px;
			img {
				margin-left: 15px;
				width: 410px;
				height: 45px;
			}
		}
		.header-right {
			float: right;
			padding-right: 50px;
			.header-user-con {
				display: flex;
				height: 70px;
				align-items: center;
				.btn-fullscreen {
					transform: rotate(45deg);
					margin-right: 5px;
					font-size: 24px;
					position: relative;
					width: 30px;
					height: 30px;
					text-align: center;
					border-radius: 15px;
					cursor: pointer;
				}
				.btn-bell {
					position: relative;
					width: 30px;
					height: 30px;
					text-align: center;
					border-radius: 15px;
					cursor: pointer;
					.el-icon-bell {
						color: #fff;
					}
					.btn-bell-badge {
						position: absolute;
						right: 0;
						top: -2px;
						width: 8px;
						height: 8px;
						border-radius: 4px;
						background: #f56c6c;
						color: #fff;
					}
				}
				.user-avator {
					margin-left: 20px;
					img {
						display: block;
						width: 40px;
						height: 40px;
						border-radius: 50%;
						border: 1px solid #fff;
					}
				}
				.user-name {
					margin-left: 10px;
					.el-dropdown-link {
						color: #fff;
						cursor: pointer;
					}
					.el-dropdown-menu__item {
						text-align: center;
					}
				}
			}
		}
	}
</style>