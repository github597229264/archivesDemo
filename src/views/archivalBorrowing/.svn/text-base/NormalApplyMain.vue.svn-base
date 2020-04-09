<template>
	<el-container class="normalApplyMain">
		<el-header height="30%">
			<span>{{areaOrganization}}</span>
			<i class="iconfont gd-tuichu1" @click="goBackPage"></i>
		</el-header>
	  	<el-main>
		  <el-row  :gutter="20" type="flex"  justify="center" align="center">
			  <el-col :span="4">
			    <el-card shadow="always"  @click.native="jumpUrl(1)">
			      <img src="../../assets/img/apply.png"/>
			      <p>档案申请</p>
			    </el-card>
			  </el-col>
			  <el-col :span="4">
			    <el-card shadow="always"  @click.native="jumpUrl(2)">
			      <img src="../../assets/img/view.png"/>
			      <p>查看档案</p>
			    </el-card>
			  </el-col>
			</el-row>
	  	</el-main>
	</el-container>
</template>

<script>
	export default {
		name:'NormalApplyMain', //查借阅申请主界面--标准版
		data() {
			return {
				 areaOrganization:this.API.constObj.areaName,
				 userInfo:{
				 	token:''
				 }
			}
		},
		created() {
			this.getData();
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
            			target:'.normalApplyMain'
            		},
					method: 'get',
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
			           areaOrganization: this.areaOrganization
			        }}
				);
			},
			/**
			 * 返回上一页
			 */
			goBackPage(){
				this.$router.go(-1);
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.normalApplyMain {
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
			i{
				position:absolute;
				right:50px;
				font-size: 50px;
				cursor: pointer;
				color: #409EFF;
			}
			i:hover{
				color: rgba(64,158,255,0.7);
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