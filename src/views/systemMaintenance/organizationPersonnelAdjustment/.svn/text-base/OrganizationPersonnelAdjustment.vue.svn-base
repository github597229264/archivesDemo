<template>
	<el-container class="organization_personnel_adjustment-container">
		<el-header class="my-header" style="height: 45px;">机构人员调整</el-header>
		<el-main>
			<div class="organization_personnel_adjustment-left">
				<el-input placeholder="机构名称" v-model="filterText">
				</el-input>
				<div class="tree">
					<organizationTree :filterText="filterText" @getSelect="getSelectData"></organizationTree>
				</div>
			</div>
			<div class="organization_personnel_adjustment-right">
				<div class="title">
					<div class="title-lf">
						<el-button type="primary" @click="adjustOrganization">调整</el-button>
						<el-button type="primary" @click="queryAll">查看全部</el-button>
						<el-button type="primary" @click="sortOrganization" :disabled="flag==false">排序</el-button>
					</div>
					<div class="title-rg">
						<!--<el-input placeholder="干部在职情况" v-model="a01StatusB"></el-input>-->
						<personnelCategoryTreeSelect class="cateTree" @PersonnelCategoryTreeSelectCall="treeSelectCall"></personnelCategoryTreeSelect>
						<el-input placeholder="姓名或拼音" v-model="a0101"></el-input>
						<el-button type="primary" @click="search">查询</el-button>
					</div>
				</div>
				<!--排序弹出层-->
				<el-dialog title="排序" :close-on-click-modal="false" width="60%" :visible.sync="orgainzation_sort_pop" v-if='orgainzation_sort_pop'>
					<orgainzationPersonneSort :sortList="sortList" :id="id" @backSortAdd="getSortBack"></orgainzationPersonneSort>
				</el-dialog>
				<el-dialog title="机构人员调整" :close-on-click-modal="false" width="40%" :visible.sync="orgainzation_adjust_pop" v-if='orgainzation_adjust_pop'>
					<orgainzationPersonneAdjust :sortList="sortList" :a0100="a0100" @backAdd="getBack"></orgainzationPersonneAdjust>
				</el-dialog>
				<!--表格-->
				<el-table class="organization_personnel_adjustment_table" highlight-current-row :height="tableHeight" ref="table" :data="organizationList" border style="width: 100%;" @row-click="clickRow">
					<el-table-column prop="operation" label="浏览" fixed align="center" width="120">
						<template slot-scope="scope">
							<el-button type="text" @click="browsePersonalOnclick(scope.$index, scope.row)">浏览</el-button>
							<el-button type="text" @click="handleFile(scope.$index, scope.row)">数字档案</el-button>
						</template>
					</el-table-column>
					<el-table-column label="序号" align="center" width="50">
						<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
					</el-table-column>
					<el-table-column prop="a0101" label="姓名" align="center" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="a0111a" label="籍贯" align="center" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="e10040" label="现职单位及职务" show-overflow-tooltip align="center" width="140">
					</el-table-column>
					<el-table-column prop="a0117a" label="民族" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="a0141a" label="政治面貌" align="center" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="a0144" label="参加组织日期" align="center" show-overflow-tooltip width="110">
					</el-table-column>
					<el-table-column prop="e1001" label="文化程度" align="center" show-overflow-tooltip>
					</el-table-column>
				</el-table>
				<!--分页-->
				<div class="material_page">
					<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
				</div>
				<!--浏览弹出层-->
				<el-dialog title="人员信息" width="100%" fullscreen :visible.sync="browse_personal" v-if='browse_personal' :close-on-click-modal="false" append-to-body>
					<browsePersonal :fourthShow='fourthShow' :selectDeceive="selectOrganization"></browsePersonal>
				</el-dialog>
				<!--数字档案-->
				<el-dialog fullscreen title="档案阅览" :close-on-click-modal="false" :visible.sync="readingArchivesVisible" append-to-body v-if="readingArchivesVisible">
					<noTimerReadingArchivesList :fileObject="selectOrganization"></noTimerReadingArchivesList>
				</el-dialog>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	import pagination from '../../../components/Pagination.vue';
	import personnelCategoryTreeSelect from '../../../components/PersonnelCategoryTreeSelect.vue';
	import organizationTree from '../OrganizationTree.vue';
	import orgainzationPersonneSort from './OrgainzationPersonneSort.vue';
	import orgainzationPersonneAdjust from './OrgainzationPersonneAdjust.vue';
	import browsePersonal from '../../personnelManagement/BrowsePersonal.vue';
	import noTimerReadingArchivesList from '../../archivalBorrowing/NoTimerReadingArchivesList.vue';

	export default {
		name: "OrganizationPersonnelAdjustment", //机构人员调整
		components: {
			pagination,
			personnelCategoryTreeSelect,
			organizationTree,
			orgainzationPersonneSort,
			orgainzationPersonneAdjust,
			browsePersonal,
			noTimerReadingArchivesList
		},
		data() {
			return {
				fourthShow: 'hidden', //档案利用情况不显示
				filterText: "", //组织机构搜索
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				organizationList: [], //人员列表集合
				id: "", //选中机构的id
				a01StatusB: "", //干部在职情况
				a0101: "", //姓名
				selectOrganization: "", //选中的数据
				selectTree: "", //选中的左边的树
				flag: true, //排序是否显示，true显示，false不显示
				orgainzation_sort_pop: false, //排序对话框
				orgainzation_adjust_pop: false, //机构人员调整的对话框
				tableHeight: 0,//给table设置高度
				a0100: "", //人员id
				browse_personal: false, //浏览显示控件标志
				readingArchivesVisible:false,//数字审核显示控件标志
				sortList:"",//要排序的列表
			};
		},
		watch:{
			organizationList:{
				handler:function(newVal){
					this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 70 - 52 - 41;
				}
			}
		},
		created() {
			this.getCadreCodeDetailList();
		},
		methods: {
			handleCurrentChange(val) { // 分页导航
				this.pageObj.pageIndex = val;
				this.getOrganizationList();
			},
			PageTurning(page_obj) { //分页组件回调方法
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getOrganizationList();
			},
			getOrganizationList() { //获取列表数据
				this.$axios({
					loading:{
            			isShow:true,//是否显示loading遮罩层
            			target:'.organization_personnel_adjustment-container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
            		},
					method: 'post',
					url: this.API.findA01ByOrgIdPage,
					data: {
						'id': this.id,
						'a01StatusB': this.a01StatusB,
						'a0101': this.a0101,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.organizationList = resData.data.list;
						this.pageObj.total = resData.data.total;
						this.selectOrganization = "";
					} else {
						this.$message({
							type: 'error',
							message: '获取数据失败，请刷新重试！'
						});
					}
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
			},
			search() { //搜索
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.getOrganizationList();
			},
			getCadreCodeDetailList() { //获取下拉数据
				this.$axios({
					method: 'get',
					url: this.API.getSysCadreCodeDetailList,
					params: {
						code: this.API.constObj.CadreCodeDetailList[1].id //干部在职情况
					},
					showLoading: false
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.dataList = resData.data;
					} else {
						this.$message({
							type: 'error',
							message: '获取有效证件类型下拉框数据失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("获取有效证件类型下拉框数据=" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})

			},
			getSelectData(data, isFirst,list) { //机构组件返回的数据
				if(!isFirst) {
					this.flag = true;
					this.id = data.id;
				} else {
					this.id = "";
					this.flag = false;
				}
				//第一次进入，刷新右边是全部数据
				this.getOrganizationList();
			},
			treeSelectCall(data) {
				this.a01StatusB = data;
				console.log(data)
			},
			clickRow(row) { //选中某一条数据
				this.selectOrganization = row;
				this.a0100 = row.a0100;
			},
			adjustOrganization() { //调整
				if(this.selectOrganization == "") {
					this.$confirm('请选择人员！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				this.orgainzation_adjust_pop = true;
			},
			sortOrganization() { //排序 
				this.findA01ListByOrgId();
			},
			findA01ListByOrgId(){//获取排序列表
				this.$axios({
					method: 'get',
					url: this.API.findA01ListByOrgId,
					params: {
						'id': this.id
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.sortList = resData.data;
						//TODO:二期恢复初始化数据
						if(this.sortList.length == 0) {
							this.$message("没有要排序的数据！");
							return;
						}
						if(this.sortList.length == 1) {
							this.$message("只有一条数据,不需要进行排序！");
							return;
						}
						this.orgainzation_sort_pop = true;
					} else {
						this.$message({
							type: 'error',
							message: '获取排序列表失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("获取排序列表" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			getSortBack(){//从排序回来的
				this.orgainzation_sort_pop = false;
				this.getOrganizationList();
			},
			getBack() { //调整和排序的返回
				this.orgainzation_adjust_pop = false;
				this.selectOrganization = "";
			},
			browsePersonalOnclick(index, row) { //点击浏览
				this.browse_personal = true;
				this.chioceObj = this.cadreInformationList[index].a0100;
			},
			handleFile(index, row) { //数字档案
				this.selectCadres = row;
				this.readingArchivesVisible = true;
			},
			queryAll(){//查看右边全部数据
				this.id = "";
				this.flag = false;
				this.getOrganizationList();
				
			},
		},
	}
</script>

<style lang="scss">
	.organization_personnel_adjustment-container {
		height: 100%;
		.my-header {
			padding-top: 15px;
		}
		.el-main {
			background-color: #fff;
			height: 450px;
			display: flex;
			.organization_personnel_adjustment-left {
				width: 20%;
				.tree {
					overflow-y: auto;
					height: 455px;
					margin-top: 10px;
				}
			}
			.organization_personnel_adjustment-right {
				width: 79%;
				height: 450px;
				.title {
					display: flex;
					justify-content: space-between;
					margin: 0 0 10px 10px;
					.title-rg {
						display: flex;
						.cateTree {
							width: 200px;
							margin-right: 10px;
						}
						.el-input {
							width: 200px;
							margin-right: 10px;
						}
					}
				}
				.organization_personnel_adjustment_table {
					.el-table__body tr.current-row>td {
						background: #DCEBFA !important;
						color: #606266;
					}
					box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
				}
				.material_page {
					margin-top: 10px;
					text-align: right;
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
	}
</style>