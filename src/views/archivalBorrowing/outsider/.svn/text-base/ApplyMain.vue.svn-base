<template>
	<el-container class="applyMain">
		<el-header height="30%">
			<span>{{oAreaOrganization.name}}</span>
			<el-button type="primary" icon="el-icon-arrow-left" @click="goBackPage">返回</el-button>
		</el-header>
	  	<el-main>
		  <el-row  :gutter="20" type="flex"  justify="center" align="center">
			  <el-col :span="4">
			    <el-card shadow="always"  @click.native="jumpUrl(1)">
			      <img src="../../../assets/img/apply.png"/>
			      <p>档案申请</p>
			    </el-card>
			  </el-col>
			  <el-col :span="4">
			    <el-card shadow="always" @click.native="jumpUrl(2)">
			      <img src="../../../assets/img/view.png"/>
			      <p>查看档案</p>
			    </el-card>
			  </el-col>
			</el-row>
	  	</el-main>
	</el-container>
</template>

<script>
	export default {
		name:'ApplyMain', //查借阅申请主界面
		data() {
			return {
				 oAreaOrganization:{//选中的区域信息
				 	code:'',
				 	name:''
				 },
				 userInfo:{
				 	token:''
				 }
			}
		},
		created() {
			var oParams = this.$route.query;
			if(oParams.areaCode && oParams.areaCode.length > 0 && oParams.areaOrganization && oParams.areaOrganization.length > 0){
			 	this.oAreaOrganization.code = oParams.areaCode;
			 	this.oAreaOrganization.name = decodeURI(oParams.areaOrganization);
			 	this.getData();
			}else{
				this.$alert('选中的区域信息不全，请返回重试!', '信息提示', {
		        	confirmButtonText: '确定',
		        	callback: action => {
		            	this.goBackPage();
		        	}
		        });
			}
		},
		mounted() {
 
		},
		computed: {

		},
		methods: {
			/*
			 * 外来查询人员、临时账户获取token
			 */
			getData() {
				this.$axios({
                	loading:{
            			isShow:true,
            			target:'.applyMain'
            		},
					method: 'get',
					params:{
						uAreacode:this.oAreaOrganization.code
					},
					url: this.API.externalBorrowingPersonnel
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.userInfo.token = resData.data;
						this.$store.commit('saveUser',this.userInfo);
					} else {
						this.$message({
							type: 'error',
							message: '获取用户信息失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			/**
			 * 跳转路由
			 */
			jumpUrl(type){
				let pathUrl = '';
				if(type ==1){
					pathUrl = 'outsiderBorrowApply';
				}else{
					pathUrl = 'checkReadFile';
				}
				this.$router.push({ 
					path: pathUrl,
			        query: {
			           areaOrganization: this.oAreaOrganization.name
			        }}
				);
			},
			/**
			 * 返回上一页
			 */
			goBackPage(){
				this.$store.commit('removeStoreByName',this.API.constObj.loginInfo);
				this.$router.push({ path: "/chioceAreaOrg" });
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.applyMain {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		.el-header{
			display: flex;
    		align-items: center;
    		text-align:center;
    		justify-content:center;
    		position:relative;
			span{
				font-size: 80px;
				color: #303133;
			}
			.el-button{
				position:absolute;
				left: 5vw;
				bottom:50%;
				cursor: pointer;
			}
		}
		.el-main{
			
		}
		.el-card{
			text-align: center;
			background-color: #409EFF;
			img{
				margin-bottom: 15px;
			}
			p{
				color: #FFFFFF;
				font: 20px Extra large;
			}
		}
		.el-card:hover{
			cursor: pointer;
			background-color: rgba(64,158,255,0.7);
		}
	}
</style>