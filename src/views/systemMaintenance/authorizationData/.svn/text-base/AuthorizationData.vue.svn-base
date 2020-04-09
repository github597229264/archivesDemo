<template>
	<el-container class="authorization-data-container" id="authorization-data-container">
		<el-header class="my-header" style="height: 45px;">数据授权</el-header>
		<el-main>
			<!--左边部分-->
			<div class="authorization-data-left">
				<div class="authorization-data-left-title">
					<el-button type='primary' size="mini" @click="authorizedfilesPagePop=true">查看档案</el-button>
					<div class="authorization-data-left-tr">
						<userGroupTreeSelect v-model="orgId" @UserGroupTreeSelectCall="UserGroupTreeSelectCall" :defaultOptions="defaultOptions"></userGroupTreeSelect>
						<el-input class="myinput" placeholder="姓名或账户" v-model="cn"></el-input>
						<el-button type='primary' size="mini"  @click='search'>查询</el-button>
					</div>
				</div>
				<!--表格-->
				<el-table class="material_table" ref="table" highlight-current-row  :data="commonPowerUserList" border style="width: 100%;" @row-click="clickRow" :height="tableHeight">
					<el-table-column label="序号" align="center" width="60">
						<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
					</el-table-column>
					<el-table-column prop="cn" label="姓名" align="center" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="uid" label="账户" align="center" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="stationName" label="岗位" align="center" show-overflow-tooltip>
					</el-table-column>
				</el-table>
				<!--分页-->
				<div class="material_page">
					<pagination :pageIndex="pageObj.pageIndex" :enableSmall='true' :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
				</div>
			</div>
			<!--右边部分-->
			<div class="authorization-data-right">
				<el-tabs v-model="activeName" @tab-click="handleClick" type="border-card" tabPosition="top|right">
					<el-tab-pane label="组织机构权限" name="first">
						<organizationalCompetence :rightHeight="rightHeight" :id="id"></organizationalCompetence>
					</el-tab-pane>
					<el-tab-pane label="干部人员访问权限" name="second">
						<accessCadresPersonnel  :rightHeight="rightHeight" :id="id"></accessCadresPersonnel>
					</el-tab-pane>
					<el-tab-pane label="档案人员规避" name="third">
						<dossierAvoidance :rightHeight="rightHeight" :id="id"></dossierAvoidance>
					</el-tab-pane>
				</el-tabs>
			</div>
			<!--授权档案-->
			<el-dialog title="授权档案" width="80%" :close-on-click-modal="false" :visible.sync="authorizedfilesPagePop" v-if='authorizedfilesPagePop'>
				<authorizedfilesPage :id="id" @getAddBack="getAddBack"></authorizedfilesPage>
			</el-dialog>
		</el-main>
	</el-container>
</template>

<script>
	import pagination from '../../../components/Pagination.vue';
	import userGroupTreeSelect from '../../../components/UserGroupTreeSelect.vue';
	import organizationalCompetence from'./OrganizationalCompetence.vue';
	import accessCadresPersonnel from'./AccessCadresPersonnel.vue';
	import dossierAvoidance from'./DossierAvoidance.vue';
	import authorizedfilesPage from'./AuthorizedfilesPage.vue';
	
	export default {
		cn: "AuthorizationData", //数据授权
		components: {
			pagination,
			userGroupTreeSelect,
			organizationalCompetence,
			accessCadresPersonnel,
			dossierAvoidance,
			authorizedfilesPage
		},
		data() {
			return {
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				commonPowerUserList: [], //用户列表页
				tableHeight: 0,//给table设置高度
				rightHeight:0,//右边table高度
				selectUser: "", //选中的用户
				cn: "", //姓名或账户
				orgId: "", //用户树选中的数据
				activeName: 'first',
				id:"",//选中的用户的id
				authorizedfilesPagePop:false,//授权档案的是否显示
				defaultOptions:"",//默认数据为空
			}
		},
		watch: {
			commonPowerUserList: {
				handler: function(newVal) {
					this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 70 - 52 - 31;
				}
			}
		},
		mounted(){
			this.rightHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 70 - 52 - 41 - 51;
			console.log(this.rightHeight)
		},
		created() {
			this.findCommonPowerUser();
			console.log("===");
		},
		methods: {
			UserGroupTreeSelectCall(data) { //用户树返回的数据
				this.orgId = data.id;
			},
			handleCurrentChange(val) { // 分页导航
				this.pageObj.pageIndex = val;
				this.findCommonPowerUser();
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.findCommonPowerUser();
			},
			findCommonPowerUser() { //数据授权可以授权的用户列表页
				this.$axios({
					/*loading:{
            			isShow:true,//是否显示loading遮罩层
            			target:'#authorization-data-container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
            		},*/
					method: 'get',
					url: this.API.findCommonPowerUser,
					params: {
						'orgId': this.orgId,
						'cn': this.cn,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.commonPowerUserList = resData.data.list;
						this.pageObj.total = resData.data.total;
						if(this.commonPowerUserList.length > 0) this.id = resData.data.list[0].id;
					} else {
						this.$message({
							type: 'error',
							message: '查询组织机构管理失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("查询组织机构管理" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			clickRow(row) { //选中某一条数据
				this.selectUser = row;
				this.id = row.id
			},
			search() {
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.findCommonPowerUser();
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			getAddBack(){//从授权档案列表回来的
				this.authorizedfilesPagePop = false;
			}
		}
	}
</script>

<style lang="scss">
	.authorization-data-container {
		.my-header {
			padding-top: 15px;
		}
		.el-main {
			font-size: 13px;
			background-color: #fff;
			display: flex;
			.authorization-data-left {
				width: 40%;
				.authorization-data-left-title {
					display: flex;
					justify-content: space-between;
					margin-bottom: 10px;
					.authorization-data-left-tr {
						display: flex;
						.el-input{
							width: 130px;
						}
						.myinput {
							margin: 0 5px;
							width: 100px;
						}
					}
				}
				.material_page {
					margin-top: 10px;
					
					text-align: right;
				}
				.el-pagination{
					margin-bottom: 0px !important;
				}
			}
			.authorization-data-right {
				width: 59%;
				.el-tabs{
				}
			}
		}
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
	}
</style>