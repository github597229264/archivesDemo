<template>
	<div id="staticRoster">
		
		<!--左侧table-->
		<div class="l leftAside" id='dynamicLeft'>
			<!--操作按钮-->
			<div class="leftHead">
				<el-button type="primary" size="small" @click='handleAdd'>添加</el-button>
				<el-button type="danger" size="small" @click='handleCancel'>删除</el-button>
				<el-button type="primary" size="small" @click='handleLook'>查看</el-button>
				<el-button type="primary" size="small" @click='handlePhoto'>生成快照</el-button>

			</div>
			<!--列表-->
			<div class="topheight">
				<el-table ref="leftTable" :height="tableHeight" :data="leftSearchTable" highlight-current-row border @current-change="handleleftSearch" style="width: 100%">
					<el-table-column label="序号" align="center" width="60">
						<template slot-scope="scope">{{dynaLeftPageObj.pageIndex*dynaLeftPageObj.pageSize+scope.$index+1}}</template>
					</el-table-column>
					<el-table-column prop="title" label="名册名称" align="center"></el-table-column>
				</el-table>
			</div>
			<!--分页-->
			<div class="Pagination dyna-l">
				<pagination :pageIndex="dynaLeftPageObj.pageIndex" :total="dynaLeftPageObj.total" :pageSize="dynaLeftPageObj.pageSize" @PageTurning="PageTurning"></pagination>
			</div>
		</div>
		
		<!--右侧table-->
		<div class="contentRight r">
			<!--查询操作栏-->
			<div class="righthead">
					<snapshotdate :selectDeceive='leftChioceObj' :pageIndexChange='pageIndexChange' :pageSizeChange='pageSizeChange' @snapshotdateBack="snapshotdateBack"></snapshotdate>
			</div>
			<!--列表-->
			<div class="topheight1" id='dynamicRight'>
				<el-table ref="singleTable" :data="dynamicRoster" :height="tableHeight" border @current-change="handleCurrentChange" style="width: 100%">
					<el-table-column property="view" label="浏览" fixed width="180" align="center">
						<template slot-scope="scope">
							<el-button type="text" @click="handleHistory(scope.$index, scope.row)">历史信息</el-button>
							<el-button type="text" @click="BrowsePersonal(scope.$index, scope.row)">浏览</el-button>
							<el-button type="text" @click="handleFile(scope.$index, scope.row)" :disabled='scope.row.flag'>数字档案</el-button>
						</template>
					</el-table-column>
					<el-table-column property="a0101" show-overflow-tooltip label="姓名" align="center" width="80"></el-table-column>
					<el-table-column property="a0111a" show-overflow-tooltip label="籍贯" width="80" align="center"></el-table-column>
					<el-table-column property="e10040" show-overflow-tooltip label="工作单位及职务" align="center"></el-table-column>
					<el-table-column property="a0117" show-overflow-tooltip label="民族" align="center" width="80"></el-table-column>
					<el-table-column property="a0141" show-overflow-tooltip label="政治面貌" align="center" width="100"></el-table-column>
					<el-table-column property="a0134" show-overflow-tooltip label="参加工作时间" width='100' align="center"></el-table-column>
					<el-table-column property="a0144" show-overflow-tooltip label="参加组织时间" width='100' align="center"></el-table-column>
					<el-table-column property="e1001" show-overflow-tooltip label="学历" align="center" width="100"></el-table-column>
				</el-table>
			</div>
			<!--分页-->
			<div class="Pagination r">
				<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageDynaRight"></pagination>
			</div>
		</div>
		
		<!--添加弹框-->
		<el-dialog title="新增查询模板" width="70%" :visible.sync="addOrEditShow" v-if='addOrEditShow' :close-on-click-modal="false">
			<dynamicRosterAdd :addType='type' :selectOptionObj='currentRowEdit' :fromAddOrEdit='fromAddOrEdit' @addBackCall='addBackCall'></dynamicRosterAdd>
		</el-dialog>
		
		<!--条件查看弹出层-->
		<el-dialog title="条件查看" width="60%" :visible.sync="look_info" v-if='look_info' :close-on-click-modal="false" append-to-body>
			<look :selectDeceive="leftChioceObj"></look>
		</el-dialog>
		
		<!--生成快照弹出层-->
		<el-dialog title="生成快照" width="60%" :visible.sync="take_photo" v-if='take_photo' :close-on-click-modal="false" append-to-body>
			<snapshot :selectDeceive="snapshotObj" :rosterid='leftChioceObj'  @snapshotBack='snapshotBack'></snapshot>
		</el-dialog>
		
		<!--历史信息弹出层-->
		<el-dialog title="历史信息" width="100%" fullscreen :visible.sync="history_info" v-if='history_info' :close-on-click-modal="false" append-to-body>
			<historyInfo :selectDeceive="rightChioceObj"></historyInfo>
		</el-dialog>
		
		<!--浏览弹出层-->
		<el-dialog title="人员信息" width="100%" fullscreen :visible.sync="browse_personal" v-if='browse_personal' :close-on-click-modal="false" append-to-body>
			<BrowsePersonal :selectDeceive="rightChioceObj"></BrowsePersonal>
		</el-dialog>
		
		<!--数字档案-->
		<el-dialog fullscreen title="档案阅览" :visible.sync="readingArchivesVisible" append-to-body v-if="readingArchivesVisible">
			<NoTimerReadingArchivesList :fileObject="rightChioceObj"></NoTimerReadingArchivesList>
		</el-dialog>
	</div>
</template>

<script>
	import Pagination from '../../../components/Pagination.vue';
	import dynamicRosterAdd from './DynamicRosterAdd.vue';
	import BrowsePersonal from '../../personnelManagement/BrowsePersonal.vue';
	import historyInfo from './historyInfo.vue';
	import look from './look.vue';
	import snapshotdate from './snapshotdate.vue';
	import snapshot from './snapshot.vue';
	import NoTimerReadingArchivesList from '../../archivalBorrowing/NoTimerReadingArchivesList.vue';
	
	export default {
		name: 'staticRoster',
		data() {
			return {
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				dynaLeftPageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: 20, //页大小TODO
				},
				pageIndexChange:{},//page改变
				pageSizeChange:{},//page改变
				addOrEditShow: false, //添加或编辑弹框是否显示
				inputValue: "",
				contentTable: "",
				tableHeight: window.innerHeight * 0.8 - 115,
				leftSearchTable: [],
				dynamicRoster: [],
				fromAddOrEdit: 'add',
				currentRow: {}, //选中行
				currentRowEdit: {}, //编辑回显选中行
				
				browse_personal: false, //编辑人员
				history_info: false, //历史消息
				look_info: false, //查看
				take_photo: false, //生成快照
				leftChioceObj: {}, //左侧列表选中数据
				rightChioceObj: {}, //右侧列表选中数据
				readingArchivesVisible: false, //阅读器弹窗是否显示
				type:0,//type动态1，静态0
				snapshotObj:[],//生成快照选中数据list
				rosterid:'',//名册id
				snapShotList:[],//生成快照所需list
			};
		},
		components: {
			Pagination, //分页组件
			dynamicRosterAdd, //添加弹框
			BrowsePersonal, //浏览
			NoTimerReadingArchivesList, //数字档案
			historyInfo, //历史消息
			look, //查看
			snapshot, //生成快照
			snapshotdate,//生成快照日历列表
		},
		created() {
			this.getLeftSearchList(); //左侧搜索列表
			//			this.changeType(); //改变content数据格式
			//			this.getRosterList(); //动态名册列表
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
//				this.queryFunc();
				this.pageIndexChange=this.pageObj.pageIndex;
				this.pageSizeChange=this.pageObj.pageSize;
			},
			setCurrent(row) {
				this.$refs.singleTable.setCurrentRow(row);
			},
			handleCurrentChange(val) {
				this.rightChioceObj=val;
			},
			handleleftSearch(row) { //左侧查询条件列表被点击
				this.currentRowEdit = row;
				this.leftChioceObj = row;
				this.currentRow = { ...row};
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.changeType(); //改变content数据格式
//				this.queryFunc(); //动态名册列表
				this.snapShotList=this.currentRow;
			},
			changeType() { //改变content数据格式
				if(this.currentRow.content) {
					this.currentRow.content = JSON.parse(this.currentRow.content);
					let a01statusb = this.currentRow.content.a01statusb; //人员类别
					let e10statusb = this.currentRow.content.e10statusb; //档案状态
					let a0501b = this.currentRow.content.a0501b; //职务职级
					let a0141b = this.currentRow.content.a0141b; //政治面貌
					let a0117b = this.currentRow.content.a0117b; //民族
					let a0131b = this.currentRow.content.a0131b; //婚姻状态
					let a0104b = this.currentRow.content.a0104b; //性别
					if(a0104b.length > 0) { //性别
						let str = '';
						for(let i = 0; i < a0104b.length; i++) {

							if(i == a0104b.length - 1) {
								str = str + a0104b[i]
							} else {
								str = str + a0104b[i] + ',';
							}
						};
						this.currentRow.content.a0104b = str;
					} else {
						this.currentRow.content.a0104b = '';
					}
					if(a0131b.length > 0) { //婚姻状态
						let str = '';
						for(let i = 0; i < a0131b.length; i++) {

							if(i == a0131b.length - 1) {
								str = str + a0131b[i]
							} else {
								str = str + a0131b[i] + ',';
							}
						};
						this.currentRow.content.a0131b = str;
					} else {
						this.currentRow.content.a0131b = '';
					}
					if(a0117b.length > 0) { //民族
						let str = '';
						for(let i = 0; i < a0117b.length; i++) {

							if(i == a0117b.length - 1) {
								str = str + a0117b[i]
							} else {
								str = str + a0117b[i] + ',';
							}
						};
						this.currentRow.content.a0117b = str;
					} else {
						this.currentRow.content.a0117b = '';
					}
					if(a01statusb.length > 0) { //人员类别
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
					if(e10statusb.length > 0) { //档案状态
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
					if(a0501b.length > 0) { //职务职级
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
					if(a0141b.length > 0) { //政治面貌
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
						isShow: false,
						target: '#archivesRegister'
					},
					method: 'get',
					url: this.API.getA01Roster,
					params: {
						'pageIndex': this.dynaLeftPageObj.pageIndex,
						'pageSize': this.dynaLeftPageObj.pageSize,
						'type':this.type
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						let list = resData.data.list;
						this.leftSearchTable = list;
						this.dynaLeftPageObj.total = resData.data.total;
						if(list.length > 0 && this.dynaLeftPageObj.pageIndex == '0') {
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
				this.addOrEditShow = true;
			},
			handleCancel() { //删除
				this.$confirm('确定删除选中记录?', '操作提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
						loading: {
							isShow: false,
							target: '#archivesRegister'
						},
						method: 'get',
						url: this.API.deleteStaticRoster,
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
						isShow: false,
						target: '#archivesRegister'
					},
					method: 'post',
					url: this.API.query,
					data: {
						'content': this.currentRow.content
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.snapShotList = resData.data.list;
//						this.pageObj.total = resData.data.total;
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
			BrowsePersonal(index, row) { //浏览
				this.rightChioceObj = this.dynamicRoster[index];
				this.browse_personal = true;
			},
			
			/**
			 * 数字档案
			 */
			handleFile(index, row) {
				this.rightChioceObj = row;
				this.readingArchivesVisible = true;
			},
			handleHistory() { //历史消息
				this.history_info = true;
			},
			handleLook() { //查看
				this.look_info = true;
//				this.chioceObj = row;
			},
			handlePhoto() { //生成快照
				this.take_photo = true;
				this.snapshotObj=this.snapShotList
			},
			snapshotBack(isRefresh){//生成快照回调
				if(isRefresh){
					this.take_photo = false;
					this.getLeftSearchList();
					//TODO
				}
			},
			snapshotdateBack(rightList){//生成快照日历回调
				this.dynamicRoster=rightList.list;
				this.pageObj.total = rightList.total;
			}
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
		width: 35%;
		height: 100%;
		border-right: 1px solid #ccc;
		.leftHead {
			height: 40px;
			line-height: 40px;
		}
		.dyna-l {
			.el-pagination__total {
				display: none !important;
			}
		}
	}
	
	.contentRight {
		width: 64%;
		.righthead {
			width: 100%;
			padding-bottom: 10px;
			height: 40px;
			display: flex;
			justify-content: space-between;
			background: #fff;
		}
	}
	
	.inputContent1 {
		width: 73%;
	}
</style>