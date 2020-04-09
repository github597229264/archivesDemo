<template>
	<div class="disposeDaily">
		<div class="title">
			<el-button type="primary" @click="choiceFunc">选择</el-button>
			<el-button type="primary" @click="initSort">初始化排序</el-button>
			<el-button type="primary" @click="upGo">上移</el-button>
			<el-button type="primary" @click="downGo">下移</el-button>
			<el-button type="primary" @click="saveSort">保存</el-button>
		</div>
		<el-table :data="tableData" style="width:100%;height:500px;overflow: auto;" @row-click="clickRow" :row-class-name="tableRowClassName" highlight-current-row border>
			<el-table-column label="序号" align="center" width="80">
					<template slot-scope="scope">{{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
				</el-table-column>
			<el-table-column prop="name" label="菜单名称" align="center" show-overflow-tooltip>
			</el-table-column>
		</el-table>
		<!--分页-->
		<div class="material_page">
			<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
		</div>
		<!--选择弹窗-->
		<el-dialog title="配置日常办公功能项" width="60%" :visible.sync="chioce_show" v-if='chioce_show' :close-on-click-modal="false" append-to-body>
			<disposeChioce @SetRolePowerCallBack='SetRolePowerCallBack'></disposeChioce>
		</el-dialog>
	</div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import disposeChioce from './disposeChioce.vue';
	
	export default {
		name: 'disposeDaily',
		components: {
			Pagination, //分页组件
			disposeChioce,//配置日常办公功能项
		},
		data() {
			return {
				tableData: [], //表格数据
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				chioce_show:false,//配置日常办公功能项弹窗
				sort_show:false,//选择
				selectList: "", //选中某一行数据
				_index: null ,//选中数据行的下标
				isChange: false, //排序是否触发
			}
		},
		created() {
			this.getDailyList();//日常配置列表
		},
		methods: {
			clickRow(row) { //选中某一条数据
				this.selectList = row;
				this._index = row.index;
			},
			tableRowClassName({
				row,
				rowIndex
			}) { // 把每一行的索引放进row
				row.index = rowIndex;
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getDailyList(); //日常配置列表
			},
			getDailyList() { //日常配置列表
				this.$axios({
//             		loading:{
//          			isShow:false
//          		},
					method: 'get',
					url: this.API.configurationWorkList
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.tableData = resData.data;
					} else {
						this.$message({
							type: 'error',
							message: '获取工作台信息失败，请刷新！'
						});
					}
				}).catch((err) => {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			choiceFunc(){//选择按钮
				this.chioce_show=true;
			},
			SetRolePowerCallBack(isRefresh){//选择回调
				if(isRefresh){
					this.chioce_show=false;
					this.getDailyList();
				}
			},
			initSort(){//初始化排序
				this.$axios({
//             		loading:{
//          			isShow:false
//          		},
					method: 'get',
					url: this.API.initialOrderMyCommonlyUsedMenu
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.tableData = resData.data;
					} else {
						this.$message({
							type: 'error',
							message: '获取工作台信息失败，请刷新！'
						});
					}
				}).catch((err) => {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			upGo() { //上移
				if(this.selectList == "") {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				let index = this._index, // 当前index
					fieldData = this.tableData; //表格数据
				if(index != 0) {
					fieldData[index] = fieldData.splice(index - 1, 1, fieldData[index])[0];
					this._index--;
					this.isChange = true;
				} else {
					this.$message('已经是第一条，不可上移');
				}
			},
			downGo() { //下移
				if(this.selectList == "") {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				let index = this._index,
					fieldData = this.tableData;
				if(index != fieldData.length - 1) {
					fieldData[index] = fieldData.splice(index + 1, 1, fieldData[index])[0];
					this._index++;
					this.isChange = true;
				} else {
					this.$message('已经是最后一条，不可下移');
				}
			},
			saveSort() { //保存排序
				let ids = [];
				this.tableData.forEach(v => {
					ids.push(v.id);
				});
				this.$axios({
					methods: 'get',
					url: this.API.upAndDownMyCommonlyUsedMenu,
					params: {
						ids: ids.join(",")
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.$message({
							message: "排序成功！",
							type: "success"
						});
						this.tableData = resData.data;
//						this.$emit("sortDetCallBack", true);
					} else {
						this.$message({
							type: "error",
							message: "保存失败，请刷新重试！"
						});
					}
				}).catch((err) => {
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
	.title{
		margin-bottom: 10px;
	}
	.el-table {
		max-height: 57vh;
		overflow: auto;
	}
	
	.material_page {
		margin-top: 10px;
		text-align: right;
	}
</style>