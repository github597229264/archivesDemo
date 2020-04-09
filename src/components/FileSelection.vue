<template>
	<div class="table">
		<el-form :inline="true" :model="searchForm" class="demo-form-inline">
			<el-form-item>
				<el-button type="primary" icon="el-icon-check" @click="confirmChioce">确定</el-button>
			</el-form-item>
			<el-form-item>
				<el-input v-model="searchForm.nameAndPinyin" clearable placeholder="输入姓名或拼音"></el-input>
			</el-form-item>
			<el-form-item>
				<OrganizationTreeSelect :defaultOptions="defaultDepartmentID" @OrgTreeSelectCall="orgTreeSelectCall"></OrganizationTreeSelect>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="search" @click="search">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" border class="filesTable" ref="multipleTable" @selection-change="handleSelectionChange" height="250px">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column type="index" label="序号" align="center" width="50">
				<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
			</el-table-column>
			<el-table-column prop="a0101" label="姓名" width="80" align="center"></el-table-column>
			<el-table-column prop="a0111a" label="籍贯" width="150" align="center" show-overflow-tooltip></el-table-column>
			<el-table-column prop="e10040" label="现职单位及职务" align="center" show-overflow-tooltip></el-table-column>
		</el-table>
		<div class="pagination">
			<Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
		</div>
	</div>
</template>

<script>
	import Pagination from './Pagination.vue';
	import OrganizationTreeSelect from './OrganizationTreeSelect.vue';
	export default {
		name: 'FileSelection', //档案选择
		props:['isledger','checkedlist','source','type'],//source界面来源，散材料，档案日常管理添加，人员添加：0，查借阅：1 默认是1
		components: {
			Pagination, //分页组件
			OrganizationTreeSelect//职能机构树形下拉框
		},
		data() {
			return {
				defaultDepartmentID:'',//默认组织机构
				ledger:false,//是否从台账过来的
				tableData: [], //表格数据
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				multipleSelection: [], //选中的数据
				searchForm: {
					departmentID: '', //机构ID
					nameAndPinyin: '' //拼音
				},
			}
		},
		created() {
			if(!this.isledger) return;
			else this.ledger = this.isledger;
		},
		mounted() {
			this.getData();
		},
		computed: {

		},
		methods: {
			getRowKeys(row) {
			    return row.a0100;
			},
			// 分页导航
//			handleCurrentChange(val) {
//				this.pageObj.pageIndex = val;
//				this.getData();
//			},
			/*
			 * 分页组件回调方法--子组件回传数据的方法
			 * @page_obj {Object} 分页信息
			 * page_obj.page_index 当前页下标
			 * page_obj.page_size 页大小
			 */
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getData();
			},
	        /*
	         * 职能机构树形下拉框组件回调方法--子组件回传数据的方法
	         * @param {Object} returnObj 选中数据的对象
	         */
	         orgTreeSelectCall(returnObj){
	        	if(returnObj){
	        		this.searchForm.departmentID = returnObj.id;	
	        	}else{
	        		this.searchForm.departmentID = "";
	        	}
	        },
			/*
			 * 获取表格档案信息的数据 
			 */
			getData() {
				let url = "";
				if(this.source == "0") url = this.API.allPersion;
				else url = this.API.findA01;
				this.$axios({
                	loading:{
            			isShow:true,
            			target:'.filesTable'
            		},
					method: 'post',
					url: url,
					data: {
						'b0000': this.searchForm.departmentID,
						'a0101': this.searchForm.nameAndPinyin,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize,
						'type':this.type
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.tableData = resData.data.list;
						this.pageObj.total = resData.data.total;
					} else {
						this.$message({
							type: 'error',
							message: '查询档案失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("档案选择列表=" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			/*
			 * 查询
			 */
			search() {
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.getData();
			},
			/*
			 * 确定选择的数据 
			 */
			confirmChioce() {
				console.log("====")
				var chioceList = this.multipleSelection;
				if(chioceList.length < 1) {
					this.$message({
						message: '请至少选中一条数据!',
						type: 'warning'
					});
					return;
				}
				if(this.ledger && chioceList.length > 1){//从台账过来的只能选中一条数据
					this.$message({
						message: '请选择一条数据!',
						type: 'warning'
					});
					return;
				}
				//值传回给父组件
				this.$emit('GetChioceFiles', chioceList);
				this.$refs.multipleTable.clearSelection();//清除所有选中项
			},
		     getOnSameItem(arr1, arr2){// 获取两个数据中不同的元素
		        var arr4 = new Array();
		        var sameArray = this.getSameItem(arr1, arr2);
		        // 删除数组一中相同的元素
		        for(var i=0;i<arr1.length;i++){
		            for(var j=0;j<sameArray.length;j++){
		                if(arr1[i]==sameArray[j]){
		                    arr1.splice(i, 1);
		                }
		            }
		        }
		        // 删除数组二中相册的元素
		        for(var i=0;i<arr2.length;i++){
		            for(var j=0;j<sameArray.length;j++){
		                if(arr2[i]==sameArray[j]){
		                    arr2.splice(i, 1);
		                }
		            }
		        }
		        arr4.push(arr1);
		        arr4.push(arr2);
		        return arr4;
		      },
		     getSameItem(arr1, arr2){ // 获取两个数组中相同的元素
		        var arr3 = new Array();
		        // 遍历数组一与数组二添加数组一中的相同元素
		        for(var i=0;i<arr1.length;i++){
		            for(var j=0;j<arr2.length;j++){
		                if(arr1[i]==arr2[j]){
		                    arr3.push(arr1[i]);
		                }
		            }
		        }
		        // 遍历数组二与数组一添加数组二中的相同元素
		        for(var i=0;i<arr2.length;i++){
		            for(var j=0;j<arr1.length;j++){
		                if(arr2[i]==arr1[j]){
		                    arr3.push(arr2[i]);
		                }
		            }
		        }
		        return arr3;
		    },
			/*
			 * 表格选中切换赋值 
			 */
			handleSelectionChange(val) {
				this.multipleSelection = val;
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.filesTable {
		width: 100%;
	}
</style>