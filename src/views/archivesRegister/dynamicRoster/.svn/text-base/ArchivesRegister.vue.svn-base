<template>
	<div id="archivesRegister">
		<div ref="table" >
			<div class="head">
				<h4>档案名册</h4>
			</div>
			<el-tabs type="border-card">
				<el-tab-pane label="动态名册">
					<div class="l leftAside" id='dynamicLeft'>
						<div class="leftHead">
							<el-button type="primary" size="small" @click='handleAdd'>添加</el-button>
							<el-button type="primary" size="small" @click='handleEdit'>编辑</el-button>
							<el-button type="danger" size="small" @click='handleCancel'>删除</el-button>
						</div>
						<div class="topheight">
							<el-table ref="leftTable" :height="tableHeight" :data="leftSearchTable" highlight-current-row border @current-change="handleleftSearch" style="width: 100%">
								<el-table-column label="序号" align="center" width="60">
									<template slot-scope="scope">{{dynaLeftPageObj.pageIndex*dynaLeftPageObj.pageSize+scope.$index+1}}</template>
								</el-table-column>
								<el-table-column prop="title" label="名册名称" align="center"></el-table-column>
							</el-table>
						</div>
						<div class="Pagination l">
							<pagination :pageIndex="dynaLeftPageObj.pageIndex" :total="dynaLeftPageObj.total" :pageSize="dynaLeftPageObj.pageSize" :enableSmall='isTotal' @PageTurning="PageTurning"></pagination>
						</div>
					</div>

					<div class="contentRight r">
						<div class="righthead">
							<el-button type="primary" icon="el-icon-search" class="r" @click="queryFunc">查询</el-button>
							<el-input type="text" v-model="dynaQueryName" class="inputContent r" placeholder="姓名或者拼音"></el-input>
						</div>
						<div class="topheight1" id='dynamicRight'>
							<el-table ref="singleTable" :height="tableHeight" :data="dynamicRoster" highlight-current-row border @current-change="handleCurrentChange" style="width: 100%">
								<el-table-column property="view" label="浏览" fixed width="120" align="center">
									<template slot-scope="scope">
										<!--<el-button class="el-icon-edit-outline l"></el-button>
                                    <el-button class="el-icon-picture l"></el-button> -->
										<el-button type="text" @click="editPersonal(scope.$index, scope.row)">编辑</el-button>
										<el-button type="text" @click="handleFile(scope.$index, scope.row)" :disabled='scope.row.flag'>数字档案</el-button>
									</template>
								</el-table-column>
								<el-table-column property="a0101" show-overflow-tooltip label="姓名" align="center" width="80"></el-table-column>
								<el-table-column property="a0111a" show-overflow-tooltip label="籍贯" width="80" align="center"></el-table-column>
								<el-table-column property="e10040" show-overflow-tooltip label="工作单位及职务" align="center"></el-table-column>
								<el-table-column property="a0117a" show-overflow-tooltip label="民族" align="center" width="80"></el-table-column>
								<el-table-column property="a0141a" show-overflow-tooltip label="政治面貌" align="center" width="100"></el-table-column>
								<el-table-column property="a0134" show-overflow-tooltip label="参加工作时间" width='100' align="center"></el-table-column>
								<el-table-column property="a0144" show-overflow-tooltip label="参加组织时间" width='100' align="center"></el-table-column>
								<el-table-column property="e1001" show-overflow-tooltip label="学历" align="center" width="100"></el-table-column>
							</el-table>
						</div>
						<div class="Pagination r">
							<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageDynaRight"></pagination>
						</div>
					</div>
				</el-tab-pane>

			</el-tabs>
		</div>
		<!--添加弹框-->
		<el-dialog :title="dynamicTitle" width="70%" :visible.sync="addOrEditShow" v-if='addOrEditShow' :close-on-click-modal="false">
			<dynamicRosterAdd :selectOptionObj='currentRowEdit' :fromAddOrEdit='fromAddOrEdit' :allObj='leftSearchTable' @addBackCall='addBackCall'></dynamicRosterAdd>
		</el-dialog>
		<!--编辑弹出层-->
		<el-dialog title="编辑信息" width="100%" fullscreen :visible.sync="edit_personal" v-if='edit_personal' :close-on-click-modal="false" append-to-body :before-close='getEditBack'>
			<EditPersonal :selectDeceive="chioceObj"></EditPersonal>
		</el-dialog>
		<!--数字档案-->
		<el-dialog fullscreen title="档案阅览" :visible.sync="readingArchivesVisible" append-to-body v-if="readingArchivesVisible">
			<NoTimerReadingArchivesList :fileObject="chioceObj"></NoTimerReadingArchivesList>
		</el-dialog>
	</div>
</template>
<script>
	import Pagination from '../../../components/Pagination.vue';
	import dynamicRosterAdd from './DynamicRosterAdd.vue';
	import EditPersonal from '../../personnelManagement/EditPersonal.vue';
	import NoTimerReadingArchivesList from '../../archivalBorrowing/NoTimerReadingArchivesList.vue';
	export default {
		data() {
			return {
				isTotal:true,//不现实总页数
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				dynaLeftPageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小TODO
				},
				addOrEditShow: false, //添加或编辑弹框是否显示
				inputValue: "",
				contentTable: "",
//				tableHeight: window.innerHeight * 0.8 - 115,
				tableHeight: '',
				leftSearchTable: [],
				dynamicRoster: [],
				fromAddOrEdit: 'add',
				dynamicTitle:'新增查询模板',
				currentRow: {}, //选中行
				currentRowEdit: {}, //编辑回显选中行
				dynaQueryName: '', //动态查询名字
				edit_personal: false, //编辑人员
				chioceObj: {}, //人员编辑选中数据
				readingArchivesVisible: false, //阅读器弹窗是否显示
			};
		},
		components: {
			Pagination, //分页组件
			dynamicRosterAdd, //添加弹框
			EditPersonal, //编辑
			NoTimerReadingArchivesList, //数字档案
		},
		created() {
			this.getLeftSearchList(); //左侧搜索列表
		},
		mounted(){
			this.tableHeight=window.innerHeight -this.$refs.leftTable.$el.offsetTop-40-52-70-120;
		},
		methods: {
			//分页组件回调方法
			PageTurning(page_obj) {
				this.dynaLeftPageObj.pageIndex = page_obj.page_index;
				this.dynaLeftPageObj.pageSize = page_obj.page_size;
				this.getLeftSearchList();
			},
			PageDynaRight(page_obj) { //分页组件回调方法---动态-右侧列表
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.queryFunc();
			},
			setCurrent(row) {
				this.$refs.singleTable.setCurrentRow(row);
			},
			handleCurrentChange(val) {
				console.log(val)
			},
			handleleftSearch(row) { //左侧查询条件列表被点击
				this.currentRowEdit = row;
				this.currentRow = { ...row};
				this.pageObj.pageIndex=this.API.constObj.pageIndex;
				this.changeType(); //改变content数据格式
				this.queryFunc(); //动态名册列表
			},
			changeType() { //改变content数据格式
				if(this.currentRow.content) {
					this.currentRow.content = JSON.parse(this.currentRow.content);
					let a01statusb = this.currentRow.content.a01statusb; //人员类别
					let e10statusb = this.currentRow.content.e10statusb; //档案状态
					let a0501b = this.currentRow.content.a0501b; //职务职级
					let a0141b = this.currentRow.content.a0141b; //政治面貌
					let a0104b = this.currentRow.content.a0104b; //性别
					if(a0104b.length > 0) {//性别
						let str = '';
						for(let i = 0; i < a0104b.length; i++) {
							
							if(i == a0104b.length - 1) {
								str = str + a0104b[i]
							}else{
								str = str + a0104b[i] + ',';
							}
						};
						this.currentRow.content.a0104b = str;
					} else {
						this.currentRow.content.a0104b = '';
					}
					if(a01statusb.length > 0) {
						let str = '';
						for(let i = 0; i < a01statusb.length; i++) {

							if(i == a01statusb.length - 1) {
								str = str + a01statusb[i]
							} else {
								str = str + a01statusb[i] + ',';
							}
						};
						this.currentRow.content.a01statusb = str;
					} else {
						this.currentRow.content.a01statusb = '';
					}
					if(e10statusb.length > 0) {
						let str = '';
						for(let i = 0; i < e10statusb.length; i++) {

							if(i == e10statusb.length - 1) {
								str = str + e10statusb[i]
							} else {
								str = str + e10statusb[i] + ',';
							}
						};
						this.currentRow.content.e10statusb = str;
					} else {
						this.currentRow.content.e10statusb = '';
					}
					if(a0501b.length > 0) {
						let str = '';
						for(let i = 0; i < a0501b.length; i++) {

							if(i == a0501b.length - 1) {
								str = str + a0501b[i]
							} else {
								str = str + a0501b[i] + ',';
							}
						};
						this.currentRow.content.a0501b = str;
					} else {
						this.currentRow.content.a0501b = '';
					}
					if(a0141b.length > 0) {
						let str = '';
						for(let i = 0; i < a0141b.length; i++) {

							if(i == a0141b.length - 1) {
								str = str + a0141b[i]
							} else {
								str = str + a0141b[i] + ',';
							}
						};
						this.currentRow.content.a0141b = str;
					} else {
						this.currentRow.content.a0141b = '';
					}
					this.currentRow.content = JSON.stringify(this.currentRow.content);
				}
			},
			getLeftSearchList() { //左侧搜索列表
				this.$axios({
					loading: {
						isShow: true,
						target: '#archivesRegister'
					},
					method: 'get',
					url: this.API.getA01Roster,
					params: {
						'pageIndex': this.dynaLeftPageObj.pageIndex,
						'pageSize': this.dynaLeftPageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						let list = resData.data.list;
						this.leftSearchTable = list;
						this.dynaLeftPageObj.total = resData.data.total;
						if(list.length > 0 && this.dynaLeftPageObj.pageIndex=='0') {
							this.currentRow = list[0].content;
							this.$refs.leftTable.setCurrentRow(list[0]);
						}
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
			handleAdd() { //添加
				this.fromAddOrEdit = 'add';
				this.dynamicTitle='新增查询模板';
				this.addOrEditShow = true;
				
			},
			handleEdit() { //编辑
				this.fromAddOrEdit = 'edit';
				this.dynamicTitle='编辑查询模板';
				this.addOrEditShow = true;
				this.currentRowEdit.content = JSON.parse(this.currentRowEdit.content);
			},
			handleCancel() { //删除
				this.$confirm('确定删除选中记录?', '操作提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
						loading: {
							isShow: true,
							target: '#archivesRegister'
						},
						method: 'get',
						url: this.API.deleteRoster,
						params: {
							id: this.currentRowEdit.id
						}
					}).then((res) => {
						var resData = res.data;
						if(resData.code == "1") {
							this.getLeftSearchList();
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
				}).catch(() => {

				});
			},
			queryFunc() { //查询
				this.$axios({
					loading: {
						isShow: true,
						target: '#archivesRegister'
					},
					method: 'post',
					url: this.API.query,
					data: {
						id: this.currentRowEdit.id,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize,
						'content': this.currentRow.content,
						'a0101': this.dynaQueryName
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.dynamicRoster = resData.data.list;
						this.pageObj.total = resData.data.total;
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
			addBackCall(Refresh) { //添加回调
				if(Refresh) {
					this.addOrEditShow = false;
					this.getLeftSearchList();
				}
			},

			editPersonal(index, row) { //人员信息编辑
				this.chioceObj = this.dynamicRoster[index];
				this.edit_personal = true;
			},
			getEditBack(done) { //编辑回调
				this.queryFunc();
				this.edit_personal = false;
			},
			/**
			 * 数字档案
			 */
			handleFile(index, row) {
				this.chioceObj = row;
				this.readingArchivesVisible = true;
			},
		},

	};
</script>
<style lang="scss" scoped type="text/css">
	.head {
		width: 100%;
		height: 40px;
		line-height: 40px;
		background-color: #f5f5f5;
		border-bottom: 1px solid #ccc;
		h4 {
			padding-left: 15px;
			font-size: 16px;
		}
	}
	
	.topheight {
		margin-top: 15px;
	}
	
	.topheight1 {
		margin-top: 5px;
	}
	
	.leftAside {
		width: 30%;
		height: 100%;
		border-right: 1px solid #ccc;
		.leftHead {
			height: 40px;
			line-height: 40px;
		}
		.l{
			.el-pagination__total{
				display: none !important;
			}
		}
	}
	
	.contentRight {
		width: 69%;
		.righthead {
			width: 100%;
			padding-top: 10px;
			height: 40px;
			.inputContent {
				width: 22%;
			}
		}
	}
	
	.inputContent1 {
		width: 73%;
	}
</style>