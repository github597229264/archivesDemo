<template>
	<el-container class="log-analysis-container">
		<el-header class="my-header" style="height: 45px;">日志分析</el-header>
		<el-main>
			<div class="log-analysis-left">
				<div class="log-analysis-left-title">
					<div class="log-analysis-left-title-top">
						<div class="log-analysis-left-title-topl">
							&nbsp;时&nbsp;&nbsp;&nbsp;&nbsp;间：&nbsp;&nbsp;
							<el-date-picker style="width:180px;margin-right: 10px;" v-model="dataStr" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
							</el-date-picker>
							操作人：
							<el-input v-model="uCreator" clearable></el-input>
						</div>
						<el-button type="primary" @click="search">查询</el-button>
					</div>
					<div class="log-analysis-left-titleb">
						<div class="tree">
							操作菜单：
							<allMenuTreeSelect class="allMenu" :defaultOptions="defaultMenuTree" @AllMenuTreeSelectCall="allMenuTreeSelectCall"></allMenuTreeSelect>
						</div>
						操作类型：
						<el-select v-model="type" placeholder="请选择类型" clearable>
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<!--表格-->
				<el-table ref="table" :data="sysLogOptionList" highlight-current-row border style="width: 100%;" :height="tableHeight" @row-click="clickRow">
					<el-table-column label="序号" align="center" width="50px">
						<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
					</el-table-column>
					<el-table-column prop="uCreator" label="创建人" show-overflow-tooltip align="center" width='120'>
					</el-table-column>
					<el-table-column prop="uCreatedate" label="创建时间" align="center" width='100' show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="typeName" label="类型名称" width='80' align="center" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="menuName" label="菜单名称" align="center" show-overflow-tooltip width='120'>
					</el-table-column>
					<el-table-column prop="describe" label="操作内容" align="center" show-overflow-tooltip width='150'>
					</el-table-column>
				</el-table>
				<!--分页-->
				<div class="sysLogOption_page">
					<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
				</div>
			</div>
			<div class="log-analysis-right">
				<sysLogOptionDateilList ref="childSys" :id="id"></sysLogOptionDateilList>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	import pagination from '../../components/Pagination.vue';
	import sysLogOptionDateilList from './SysLogOptionDateilList.vue'
	import allMenuTreeSelect from '../../components/AllMenuTreeSelect.vue';
	export default {
		name: "LogAnalysis", //日志分析
		components: {
			pagination,
			sysLogOptionDateilList,
			allMenuTreeSelect
		},
		data() {
			return {
				defaultMenuTree: "", //树下拉默认数据为空串
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				sysLogOptionList: [], //日志分析主表集合
				options: [ //操作类型0:新增、1：编辑、2、删除、3：查询、4：浏览、5：密码初始化、6：其他
					{
						value: '0',
						label: '新增'
					}, {
						value: '1',
						label: '编辑'
					},
					{
						value: '2',
						label: '删除'
					}, {
						value: '3',
						label: '查询'
					},
					{
						value: '4',
						label: '浏览'
					},
					{
						value: '5',
						label: '密码初始化'
					},
					{
						value: '6',
						label: '其他'
					}
				],
				type: "", //操作类型
				uCreator: "", //操作人姓名
				dataStr: [], //时间
				start: "", //开始时间
				end: "", //结束时间
				id: "", //日志分析主表条目id
				oldData: [], //原始的data
				treeData: [], //表格数据 必须是树形结构的对象数组
				menuid: '', //选中值--必须是完整路径eg:['节点code'] 或 ['父节点code','子节点code']
				treeProps: {
					value: 'code',
					label: 'name',
					children: 'children'
				},
				tableHeight: "380",//给tabale设置高度
			}
		},
		created() {
			this.findSysLogOptionPage();
			this.getData();
		},
		mounted: function() {
			this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 120;
		},
		methods: {
			handleCurrentChange(val) { // 分页导航
				this.pageObj.pageIndex = val;
				this.findSysLogOptionPage();
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.findSysLogOptionPage();
			},
			findSysLogOptionPage() { //日志分析主表分析
				this.$axios({
					/*loading:{
            			isShow:true,//是否显示loading遮罩层
            			target:'.log-analysis-container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
            		},*/
					method: 'post',
					url: this.API.findSysLogOptionPage,
					data: {
						'type': this.type,
						'uCreator': this.uCreator,
						'start': this.start,
						'end': this.end,
						'menuid': this.menuid,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.sysLogOptionList = resData.data.list;
						this.pageObj.total = resData.data.total;
						if(this.sysLogOptionList == "") {
							this.$refs.childSys.changeList();
							return;
						}
						this.id = this.sysLogOptionList[0].id;
						this.$refs.childSys.findSysLogOptionDateilListById(this.id);
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
			clickRow(row) { //选中某一条数据
				this.id = row.id;
				this.$refs.childSys.findSysLogOptionDateilListById(this.id);
			},
			search() { //搜索
				if(this.dataStr === null) {
					this.start = "";
					this.end = "";
				} else if((this.dataStr || this.dataStr != "") && this.dataStr.length > 0) {
					let strDate = this.dataStr;
					this.start = this.commonFun.dateFormat(strDate[0], "yyyyMMdd");
					this.end = this.commonFun.dateFormat(strDate[1], "yyyyMMdd");
				} else {
					this.start = '';
					this.end = '';
				}
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.findSysLogOptionPage();
			},
			getData() { //获取操作菜单
				this.$axios({
					method: 'get',
					url: this.API.menuTreeList
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.oldData = resData.data;
						let mappingObj = {
							childKey: 'id',
							fatherKey: 'parentid'
						};
						this.treeData = this.commonFun.toTreeData3(this.oldData, mappingObj);
					} else {
						this.$message({
							type: 'error',
							message: '获取菜单列表失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			allMenuTreeSelectCall(checkedObj) { //菜单树下拉框组件回调方法--子组件回调数据的方法
				if(checkedObj && checkedObj.id) {
					this.menuid = checkedObj.id;
				} else {
					this.menuid = '';
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.log-analysis-container {
		.my-header {
			padding-top: 15px;
		}
		.el-main {
			height: 100%;
			font-size: 13px;
			background-color: #fff;
			display: flex;
			.log-analysis-left {
				height: 450px;
				width: 50%;
				.el-input {
					width: 100px;
				}
				.log-analysis-left-title {
					margin-bottom: 10px;
					.log-analysis-left-title-top {
						display: flex;
						margin-bottom: 10px;
						justify-content: space-between;
						.log-analysis-left-title-topl {
							display: flex;
							align-items:center;
						}
					}
					.log-analysis-left-titleb {
						display: flex;
						align-items:center;
						.tree {
							display: flex;
							align-items:center;
							.allMenu {
								width: 180px;
								margin-right: 10px;
							}
						}
						.el-select {
							width: 180px;
						}
					}
				}
				.sysLogOption_page {
					margin-top: 10px;
					text-align: right;
				}
			}
			.log-analysis-right {
				width: 49%;
				min-height: 480px;
			}
		}
	}
</style>