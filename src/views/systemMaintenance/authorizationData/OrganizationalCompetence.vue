<template>
	<div class="organizational-competence-container">
		<!--头部-->
		<div class="organizational-competence-title">
			<el-button type='primary' @click="addOrganizationalCompetencePop=true">添加</el-button>
			<el-button type='danger' @click="delOrganizationalCompetence">删除</el-button>
		</div>
		<!--表格-->
		<div class="myTable" :style="{height: tableHeight}">
			<el-table :data="organizationalCompetenceList" class="table" @selection-change="changeFun" empty-text="没有数据，请刷新试试" border>
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column prop="b0001" label="机构名称" align="center"></el-table-column>
				<el-table-column prop="typeName" label="是否虚拟" align="center"></el-table-column>
				<el-table-column prop="isManualName" label="是否自动" align="center"></el-table-column>
			</el-table>
		</div>
		<!--分页-->
		<div class="material_page">
			<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
		</div>
		<!--新增-->
		<el-dialog title="添加组织机构权限" width="30%" :close-on-click-modal="false" max-height="400px" :visible.sync="addOrganizationalCompetencePop" v-if='addOrganizationalCompetencePop'>
			<addOrganizationalCompetence :id="id" @getAddBack="getAddBack"></addOrganizationalCompetence>
		</el-dialog>
	</div>
</template>
<script>
	import pagination from '../../../components/Pagination.vue';
	import addOrganizationalCompetence from './AddOrganizationalCompetence.vue';

	export default {
		name: 'OrganizationalCompetence', //组织机构权限
		components: {
			pagination,
			addOrganizationalCompetence
		},
		props: ['id','rightHeight'],
		data() {
			return {
				personsCheckbox: "", //
				chioceFileData: "",
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				organizationalCompetenceList: [], //根据用户id查询授权组织机构
				addOrganizationalCompetencePop: false, //添加是否显示
				multipleSelection: [], //选中的数据
				ids: "", //删除的选择的机构id，以逗号分隔
				tableHeight:'',//table高度
			}
		},
		watch: {
			id: {
				handler(newVal) {
					console.log('newVal' + newVal);
					if(newVal != undefined) this.findPowerArchPowerOrgPage();
				},
			},
			rightHeight: {
				handler(newVal){
					this.tableHeight = this.rightHeight +'px';
					console.log(this.tableHeight);
				}
			}
		},
		methods: {
			handleCurrentChange(val) { // 分页导航
				this.pageObj.pageIndex = val;
				this.findPowerArchPowerOrgPage();
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.findPowerArchPowerOrgPage();
			},
			findPowerArchPowerOrgPage() { //获取组织机构集合
				console.log('this.id,' + this.id);
				this.$axios({
					method: 'get',
					url: this.API.findPowerArchPowerOrgPage,
					params: {
						'id': this.id,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.organizationalCompetenceList = resData.data.list;
						this.pageObj.total = resData.data.total;
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
			getAddBack() { //添加返回的数据
				this.addOrganizationalCompetencePop = false;
				this.findPowerArchPowerOrgPage();
			},
			delOrganizationalCompetence() { //删除选中的数据
				let flag = false; //true：含有自动的，false：不含自动的
				if(this.multipleSelection == "") {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				this.multipleSelection.forEach(item => {
					if(!item.ismanual) {
						flag = true;
						this.$confirm('系统内置，不允许删除！', '提示', {
							confirmButtonText: '确定',
							showCancelButton: false,
							type: 'warning',
							center: true
						});
						return;
					}
				})
				this.ids  = this.commonFun.joinTgetherId(this.multipleSelection,this.ids,'id');
				if(flag) return;
				this.delFormNet();
			},
			changeFun(val) { //复选框状态改变
				this.multipleSelection = val;
			},
			delFormNet() { //从服务器删除数据
				this.$axios({
					method: 'post',
					url: this.API.deletePowerArchPowerOrgs,
					data: {
						'id': this.id,
						'ids': this.ids
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.$message({
							message: '删除成功！',
							type: 'success'
						});
						this.ids = "";
						this.findPowerArchPowerOrgPage();
					} else {
						this.$message({
							type: 'error',
							message: '删除失败，请刷新重试！'
						});
					}
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
			}
		}
	}
</script>
<style lang="scss">
	.organizational-competence-container {
		.organizational-competence-title {
			margin: 10px 0;
		}
		.material_page {
			margin-top: 10px;
			text-align: right;
		}
		.myTable{
			overflow: auto;
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