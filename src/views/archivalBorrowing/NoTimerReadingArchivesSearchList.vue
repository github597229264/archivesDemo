<template>
	<el-container class="noTimerReadingArchivesSearchList">
		<el-header>
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				  <el-form-item label="选择单位">
				    <el-select v-model="formInline.region" placeholder="活动区域">
				      <el-option label="区域一" value="shanghai"></el-option>
				      <el-option label="区域二" value="beijing"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="被查阅人">
				    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="search">查询</el-button>
				    <el-button type="primary" @click="searchMore">高级查询</el-button>
				  </el-form-item>
			</el-form>
		</el-header>
		 <el-container>
			<el-aside width="300px">
				<el-row>
					<el-select v-model="value" placeholder="请选择档案人员">
					    <el-option
					      v-for="item in cities"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					      <span class="floatLeftSpan">{{ item.label }}</span>
					      <span class="floatRightSpan">{{ item.value }}</span>
					    </el-option>
					</el-select>
				</el-row>
				<div style="width: 100%;text-align: center;margin: 10px 0;">
					<el-radio-group v-model="pictureSharpness" size="small">
						<el-radio label="1" border>原始图</el-radio>
		  				<el-radio label="2" border>高清图</el-radio>
		  			</el-radio-group>
				</div>
				<el-row class="listTitle">
					<span>档案列表</span>
				</el-row>
				<el-menu>
					<el-submenu v-for="archives in archivesList" >
						<template slot="title">
							<i class="iconfont gd-dangan"></i>
							{{archives.name}}
						</template>
						<el-menu-item-group v-for="childItem in archives.children">
							<el-menu-item  index="childItem.code">
								<el-tooltip class="item" effect="dark" :content="childItem.name" placement="top">
							       <span>{{childItem.name}}</span>
							    </el-tooltip>
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-aside>
	
			<el-main>
				 <img src="../../assets/img/fileCover.jpg" class="image">
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		name: 'NoTimerReadingArchivesSearchList', //阅览档案--无倒计时有查询
		components: {},
		data(){
			return {
				pictureSharpness:"1",//图像清晰度
				applyInfo:{},//申请信息
				archivesList:[],//十大类档案
				formInline: {
		          user: '',
		          region: ''
		        },
				cities: [
			 		{
			          value: 'Beijing',
			          label: '北京'
			        }, {
			          value: 'Shanghai',
			          label: '上海'
			        }, {
			          value: 'Nanjing',
			          label: '南京'
			        }, {
			          value: 'Chengdu',
			          label: '成都'
			        }, {
			          value: 'Shenzhen',
			          label: '深圳'
			        }, {
			          value: 'Guangzhou',
			          label: '广州'
			        }
		        ],
		        value: ''
			}
		},
		created() {
			this.readForm = this.$route.params;
			this.getDataById(); //根据预约id获取档案人员信息列表
		},
		mounted() {
			
		},
		computed: {

		},
		methods: {
			/**
			 * 查询
			 */
			search() {
		        console.log('submit!');
		    },
		    /**
		     * 高级查询
		     */
			searchMore() {
		        console.log('submit!');
		    },
			/**
			 * 根据预约id获取档案人员信息列表
			 */
			getDataById() {
				this.$axios({
					loading:{
            			isShow:true,
            			target:'.noTimerReadingArchivesSearchList'
            		},
					method: 'get',
					url: this.API.lookArchives,
					params: {
						id: this.id, //申请单id
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.applyInfo = resData.data.split;
						this.archivesList =this.commonFun.toTreeData2(resData.data.list);
					} else {
						this.$message({
							type: 'error',
							message: '查询档案信息失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("查询档案人员信息列表=" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.noTimerReadingArchivesSearchList {
		height: 570px; 
		border: 1px solid #eee;
		.el-header {
			background-color: #ffffff;
			color: #ffffff;
			height: 60px;
			align-items: center;
			font-size: 22px;
			.mainFont{
				margin:0 15px;
				color: #303133;
			}
		}
		.el-aside {
			background-color: #FFFFFF;
			color: #333;
			padding-top: 10px;
			.listTitle{
				background-color: #B3C0D1;
				height: 30px;
				line-height: 30px;
				span{
					color: #FFFFFF;	
				}
			}
			.el-row{
				text-align: center;
				.el-progress{
					margin: 5px 0 10px;
					span{
						margin: 0 5px;
					}
				}
				.el-select{
					width: 98%;
					margin: 0 1%;
					.floatLeftSpan{
						float: left;
					}
					.floatRightSpan{
						float: right; 
						color: #8492a6; 
						font-size: 13px
					}
				}
			}
			.el-menu{
				.el-menu-item{
					margin: 0;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
			.el-menu-item, .el-submenu__title{
				height: 40px;
	    		line-height: 40px;
			}
			.el-submenu .el-menu-item{
				height: 40px;
			    line-height: 40px;
			    padding: 0 10px 0 45px;
			}
			.el-menu-item-group__title{
				padding: 0;
			}
		}

		.el-main{
			background-color: #E9EEF3;
			text-align: center;
			justify-content: center;
			align-items: center;
			img{
				height: 100%;
			}
			
		}
	}
</style>