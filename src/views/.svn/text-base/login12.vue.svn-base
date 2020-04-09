<template>
    <div class="login-container">
        <!--logo-->
        <div class="logo">
	        <img src="../assets/img/hs-logo.png" alt="" />
        </div>
        <!--内容-->
        <div class="ms-login">
        	<div class="title" style="background-color: #2B92C2;">
        		<img src="../assets/img/logo-bg-transparent.png" alt="logo" />
        	</div>
        	<div class="content">
        		<div class="left">
        			<img src="../assets/img/Head_portrait01.png" alt="" />
        		</div>
        		<div class="right">
        			<div class="line"></div>
        			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="ms-content">
        				<el-form-item v-if="isShow" label="管档单位：" prop="uAreacode">
							<areaTreeSelect v-model="ruleForm.uAreacode" @areaTreeSelectCall = "getSelect"></areaTreeSelect>
						</el-form-item>
						<el-form-item label="登录账号：" prop="usersName">
							<el-input v-model="ruleForm.usersName" id="name"></el-input>
						</el-form-item>
						<el-form-item label="密码：" prop="password">
							<el-input v-model="ruleForm.password" type="password"></el-input>
						</el-form-item>
		                <div class="login-btn">
		                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
		                    <el-button type="primary" @click="jumpToReadView">查借</el-button>
		                </div>
		            </el-form>
        		</div>
        	</div>
        </div>
        <div class="footer">
        	Copyright@2019. All rights reserved.    中共上海市委组织部    北京航星永志科技有限公司 联合研制
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
            	isShow:true,//false隐藏管档单位
            	selectedOptions:[],//选中值
                ruleForm: {
                	'uAreacode':"",//管档单位
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
        created(){
        	//TODO:上海版要求隐藏管档单位，但是后台需要管档单位的第一条数据,标准版不需要
        	this.getData();
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
            			//target:'.ms-login'//loading遮罩层 添加的dom选择器名称 如：.login or #center
            		},
					method: 'post',//提交方式：get和post，同 params 和 data配合使用
					url: this.API.login,//不需要再添加ip和端口
//					params:{//method ="get" 方式时，传参需要此属性
//						'username': this.ruleForm.usersName,
//						'password': this.$md5(this.ruleForm.password),
//						'uAreacode': this.selectedOptions
//					},
					//method ="post" 方式时，传参需要此属性
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
							if (this.$route.query.redirect) {
							  this.$router.push(this.$route.query.redirect);  // 登录过期重新登录
							} else {
							  this.$router.push('/home');  // 正常登录
							}
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
        	 },
        	 //TODO:上海版要求隐藏管档单位，但是后台需要管档单位的第一条数据,标准版不需要
        	 getData() {//获取树数据的第一项
            	var self = this;
                this.$axios({
					loading:{
            			isShow:false
            		},
            		method:'get',
                	url:this.API.areaTree
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.ruleForm.uAreacode = resData.data[0].code;
                    }else{
			          	self.$message({
				            type: 'error',
				            message: '获取区域树形下拉框数据失败，请刷新重试！'
			          	});     
                    }
                }).catch((err) => {
                	console.log("获取区域树形下拉框数据="+err);
                	self.$message({
			            type: 'error',
			            message: '请求异常，请检查网络！'
			        });  
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
	.login-container{
        position: relative;
        width:100%;
        height:100%;
        background-size: 100%;
        background-image: url('../assets/img/Sign_in.png');
        .logo{
        	padding: 20px;
        	height: 40px;
        	img{
        		height: 100%;
        	}
        }
        .ms-login{
	        position: absolute;
	        left:50%;
	        top:50%;
	        width:500px;
	        height: 260px;
	        margin:-130px 0 0 -250px;
	        border-radius: 5px;
	        background-color: #fff;
	        overflow: hidden;
	        .title{
	        	height: 45px;
	        	text-align: center;
	        	img{
	        		height: 40px;
	        		margin-top: 3px;
	        	}
	        }
	        .content{
	        	display: flex;
	        	justify-content: space-between;
	        	.left{
	        		img{
	        			margin-top:20px;
	        			margin-left: 30px;
	        			border: 1px solid #2B92C2;
	        			padding: 20px;
	        			width:90px;
	        			height:90px;
	        		}
	        	}
	        	.right{
	        		font-size: 12px;
	        		margin-top: 20px;
	        		display: flex;
	        		.line{
	        			width: 1px;
	        			height: 130px;
	        			margin: 0 0 0 30px;
	        			background-color:#A6A9AD;
	        		}
	        		.ms-content{
	        			line-height: 30px;
	        			.el-form-item--small.el-form-item {
						    margin-bottom: 15px;
						}
	        			.login-btn{
	        				text-align: center;
	        			}
	    			}
	        	}
	        }
	    }
	    
        .footer{
		    position: fixed;
		    bottom: 10px;
		    width: 100%;
		    color: #C0C4CC;
		    text-align: center;
        }
    }
</style>