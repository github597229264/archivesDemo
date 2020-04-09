<template>
    <div class="login-container">
    	<div class="login-container-center">
    			<div class="login-container-centent">
    				<div class="login-container-centent1">
	    				<div class="title">用户登录</div>
	    				<!--<el-input placeholder="请输入用户名" prefix-icon="el-icon-search" v-model="input2"></el-input>
	    				<el-input placeholder="请输入密码" prefix-icon="el-icon-search" v-model="input2"></el-input>-->
	    				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100%" class="ms-content">
	        				<el-form-item v-show="isShow" label="管档单位：" prop="uAreacode" style="margin-left: 0px;">
								<areaTreeSelect v-model="ruleForm.uAreacode" @areaTreeSelectCall = "getSelect"></areaTreeSelect>
							</el-form-item>
							<el-form-item  prop="usersName">
								<el-input v-model="ruleForm.usersName" id="name" placeholder="请输入用户名" prefix-icon="iconfont gd-mima"></el-input>
							</el-form-item>
							<el-form-item  prop="password">
								<el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" prefix-icon="iconfont gd-yonghu"></el-input>
							</el-form-item>
			                <div class="login-btn">
			                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
			                    <el-button type="primary" @click="jumpToReadView">查借</el-button>
			                </div>
			            </el-form>
		            </div>
    			</div>
    			<div class="login-container-bottom">
					<div class="login-container-bottom-left">
						<div>中共上海市委组织部</div>
						<div>北京航星永志科技有限公司</div>
					</div>
					<span>联合研制</span>
				</div>
    	</div>
    </div>
</template>

<script>
	import areaTreeSelect from '../components/AreaTreeSelect.vue';
    export default {
    	name:"login",//登录
    	components: {
    		areaTreeSelect
		},
        data: function(){
            return {
            	isShow:true,//是否隐藏管档单位
            	selectedOptions:[],//选中值
                ruleForm: {
                	'uAreacode':undefined,//管档单位
                    'usersName': '档案管理员',//登录账户
                    'password': '12345abcde'//密码
                },
                rules: {
                	/*uAreacode: [
                       { required: true, message: '请选择管档单位', trigger: 'blur' }
                    ],*/
                    usersName: [
                       { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
						{min: 6,max: 20,message: '长度在 6到 20 个字符',trigger: 'change'}
                    ]
                },
                userInfo:''//登录用户信息
            }
        },
        methods: {
        	 submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        return false;
                    } 
                    this.login();
                });
            },
            login(){//登录
            	this.$axios({
            		loading:{
            			isShow:false,//是否显示loading遮罩层
            			text:"正在登录，请稍后...",//loading 上的提示文字
            		},
					method: 'post',//提交方式：get和post，同 params 和 data配合使用
					url: this.API.login,//不需要再添加ip和端口
					data: {
						username: this.ruleForm.usersName,
						password: this.$md5(this.ruleForm.password),
						uAreacode: this.ruleForm.uAreacode
					}
				}).then((res) => {
					var resData = res.data;
					let resCode = parseInt(resData.code);
					
					switch(resCode){
						case 1:
							this.userInfo = resData.data;
							this.$store.commit('saveUser',resData.data);
							this.$router.push('/home');  // 正常登录
	                    	break;
                    	case 2:
                    		this.$message({
					            type: 'error',
					            message: "账号或密码错误，请重试！"
				          	});
                    		break;
                    	case 5:
                    		this.$message({
					            type: 'error',
					            message: "账号已禁用，不能登录！"
				          	});
                    		break;
					}
					
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
            },
            /*
             * 跳转到查借界面
             */
            jumpToReadView(){
            	this.$router.push({
					path: '/chioceAreaOrg'
				});
            },
	        /*
	         * 区域机构树形下拉框组件回调方法--子组件回传数据的方法
	         * @param {Object} returnObj 选中的数据对象
	         */
        	 getSelect(returnObj){
		        if(returnObj){
        	 		this.ruleForm.uAreacode = returnObj.code;
		        }else{
		        	this.ruleForm.uAreacode = "";
		        }
        	 }
        }
    }
</script>

<style lang="scss">
	.login-container{
		width: 100%;
		height: 100%;
		/*height: calc(100% - 100px);*/
		.login-container-center{
			height: 100%;
			width:100%;
			background: url('../assets/img/login.png') no-repeat 0 0;
			background-size: 100% 100%;
			
			.login-container-centent{
				position:relative;
				width: 19%;
			    height: 28%;
				left:52%;
				top: 31.2%;
			    /*background-color: red;*/
			    .login-container-centent1{
			    	position:absolute;
			    	top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					text-align: center;
					padding: 15px;
					width: 300px;
   					height: 180px;
			    	.title{
				    	margin-bottom: 12px;
					    font-size: 20px;
					    font-weight: bold;
				    }
				    .el-form-item__content{
				    	width: 100%;
				    	margin-left: 0px !important;
				    }
				    .el-input--small .el-input__inner {
					    height: 40px;
					    line-height: 40px;
					  }
				    .el-form-item {
					    margin-bottom: 12px;
					}
					.login-btn{
						display: flex;
						justify-content:center;
					}
					.gd-mima{
				    	font-size:18px;
				    	margin-top: 2px;
				    }
				    .gd-yonghu{
				    	font-size: 18px;
				    	margin-top: 2px;
				    }
			    }
			}
			.login-container-bottom{
			    width: 240px;
    			height: 50px;
			    font-size: 13px;
			    position:relative;
			    left: 50%;
			    bottom: -62%;
			    transform: translate(-50%, -50%);
			    display: flex;
			    align-items: center;
			    .login-container-bottom-left{
			    	margin-right:15px;
			    	div{
			    		margin-bottom: 10px;
			    	}
			    }
			}
		}
	}
</style>