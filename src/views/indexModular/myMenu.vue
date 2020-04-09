<template>
	<div class="disposeDaily">
		<div class="title">
			<el-button type="primary" @click="initSort">恢复默认</el-button>
			<el-button type="primary" @click="saveList">保存</el-button>
			<el-button type="primary" @click="saveSort">排序</el-button>
		</div>
		<el-table 
			:data="tableData" 
			style="width: 100%;margin-bottom: 20px;" 
			row-key="id" 
			border 
			:expand-row-keys="expandRowKeys" 
			:tree-props="{children: 'children', hasChildren: 'hasChildren'}"
			highlight-current-row
			@row-click='clickRow'
		>
			
			<el-table-column prop="date" label="序号" width="80">
			</el-table-column>
			
			<el-table-column prop="name" label="系统菜单" width="250" align="center">
			</el-table-column>
			
			<el-table-column label="别名(可修改)" align="center">
				<template slot-scope="scope">
					<el-input v-if="scope.row.inEdit" v-model="scope.row.alias"></el-input>
					<span v-else>{{scope.row.alias}}</span>
				</template>
			</el-table-column>
			
			<el-table-column label="操作" align="center">
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          @click="handleEdit(scope.$index,scope.row)">
		          	{{scope.row.inEdit ? "确 定" : "编 辑"}}
		        </el-button>
		      </template>
		    </el-table-column>
		    
		</el-table>
		<!--分页-->
		<!--<div class="material_page">
			<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
		</div>-->
		
		<!--选择弹窗-->
		<el-dialog 
			title="配置日常办公功能项" 
			width="60%" 
			:visible.sync="chioce_show" 
			v-if='chioce_show' 
			:close-on-click-modal="false" 
			append-to-body
		>
			<disposeChioce @SetRolePowerCallBack='SetRolePowerCallBack'></disposeChioce>
		</el-dialog>
		
		<!--排序弹窗-->
		<el-dialog title="排序" width="40%" :visible.sync="sort_show" v-if='sort_show' :close-on-click-modal="false" append-to-body>
			<SortDetail :menuid='menuid' @sortDetCallBack='sortDetCallBack'></SortDetail>
		</el-dialog>
	</div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import disposeChioce from './disposeChioce.vue';
	import SortDetail from './SortDetail.vue';

	export default {
		name: 'disposeDaily',
		components: {
			Pagination, //分页组件
			disposeChioce, //配置日常办公功能项
			SortDetail,//排序
		},
		data() {
			return {
				tableData: [], //表格数据
				originalData:[],//原始数据格式，非tree型
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				chioce_show: false, //配置日常办公功能项弹窗
				sort_show: false, //选择
				selectList: "", //选中某一行数据
				_index: null, //选中数据行的下标
				isChange: false, //排序是否触发
				expandRowKeys:[], // 默认展开行 keys Array
				menuid:[],//排序传入的obj
			}
		},
		created() {
			this.getDailyList(); //日常配置列表
		},
		methods: {
			clickRow(row) { //选中某一条数据
				this.menuid = row;
				this._index = row.index;
			},
			
			tableRowClassName({
				row,
				rowIndex
			}) { // 把每一行的索引放进row
				row.index = rowIndex;
			},
			
			PageTurning(page_obj) {//分页组件回调方法
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getDailyList(); //个人菜单列表
			},
			
			getDailyList() { //个人菜单列表
				this.$axios({
					//             		loading:{
					//          			isShow:false
					//          		},
					method: 'get',
					url: this.API.findMyUserMenusList
				}).then((res) => {
					var resData = res.data;
					resData.data.forEach(item => {
						Object.assign(item,{
							inEdit:false,
						})
					})
					if(resData.code == "1") {
						let fatherAndChildObj = {
							childKey: "menuid",
							fatherKey: "parentId"
						};
						this.tableData = this.commonFun.toTreeDataNormal(resData.data, fatherAndChildObj);
						
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
			
			choiceFunc() { //选择按钮
				this.chioce_show = true;
			},
			
			SetRolePowerCallBack(isRefresh) { //选择回调
				if(isRefresh) {
					this.chioce_show = false;
					this.getDailyList();
				}
			},
			
			sortDetCallBack(isRefresh){
				if(isRefresh) {
					this.sort_show = false;
					this.getDailyList();
				}
			},
			
			initSort() { //初始化排序
				this.$axios({
					methods: 'get',
					url: this.API.restoreDefaultMyUserMenus
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.$message({
							type: 'success',
							message: '数据恢复成功！'
						});
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
			
			saveSort(){//选择
				this.sort_show=true;
			},
			
			saveList() { //保存
				this.treeDataToList(this.tableData)
				console.log(this.originalData);
				this.$axios({
					methods: 'get',
					url: this.API.updateMyUserMenus,
					params: JSON.stringify(this.originalData[0])
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.$message({
							message: "保存成功！",
							type: "success"
						});
						this.tableData.forEach(item => {
							Object.assign(item,{
								inEdit:false,
							})
						})
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
			},
			
			//change inedit
			handleEdit(index,row){
				row.inEdit = !row.inEdit
			},
			
			treeDataToList(data){ //tree转非tree，递归
				if(data && data.length > 0){
					data.forEach(item => {
						let tempItem = {...item};
						delete tempItem.children;
						delete tempItem.inEdit;
						this.originalData.push(tempItem);
						if(item.children && item.children.length > 0){
							this.treeDataToList(item.children);
						}
					})
				}
			},
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.title {
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