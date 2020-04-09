<template>
<div class="addAccesscadres-comment-container">
	<el-form :inline="true" :model="searchForm" class="demo-form-inline">
			<el-form-item>
				<el-button type="primary" icon="el-icon-check" @click="confirmChioce">确定</el-button>
			</el-form-item>
			<el-form-item>
				<el-input v-model="searchForm.nameAndPinyin" placeholder="输入姓名或拼音"></el-input>
			</el-form-item>
			<el-form-item>
				<organizationTreeSelect :isShow="isShow" :defaultOptions="defaultDepartmentID" @OrgTreeSelectCall="orgTreeSelectCall"></organizationTreeSelect>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="search" @click="search">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange" height="250px">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column type="index" label="序号" align="center" width="50">
				<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
			</el-table-column>
			<el-table-column prop="a0101" label="姓名" width="100" align="center" show-overflow-tooltip></el-table-column>
			<el-table-column prop="a0111a" label="籍贯" width="150" align="center" show-overflow-tooltip></el-table-column>
			<el-table-column prop="e10040" label="现职单位及职务" align="center" show-overflow-tooltip></el-table-column>
		</el-table>
		<div class="pagination">
			<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
		</div>
</div>
</template>

<script>
	import pagination from '../../../components/Pagination.vue';
	import organizationTreeSelect from '../../../components/OrganizationTreeSelect.vue';
	export default{
		name:'AddAccessCadresComment',//档案人员规避,干部人员范文的添加
		components: {
			pagination, //分页组件
			organizationTreeSelect//职能机构树形下拉框
		},
		props:['flag','id'],
		data(){
			return{
				defaultDepartmentID:'',//默认组织机构
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
				isShow:true,
				a0100s:"",//选中id ,选择的档案人员a0100，以逗号分隔
			}
		},
		created(){
			this.getData();
		},
		methods: {
			// 分页导航
			handleCurrentChange(val) {
				this.pageObj.pageIndex = val;
				this.getData();
			},
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
	         * @param {Array} val 选中项的值
	         */
	        orgTreeSelectCall(val){
	        	if(val){
	        		this.searchForm.departmentID = val.id;	
	        	}else{
	        		this.searchForm.departmentID = "";
	        	}
	        },
			/*
			 * 获取表格档案信息的数据 
			 */
			getData() {
				let url = "";
				if(this.flag) url = this.API.findA01ByUserIdPage;
				else url = this.API.findNotPowerArchPoweExcludePage;
				this.$axios({
					method: 'post',
					url: url,
					data: {
						'id':this.id,
						'b0000': this.searchForm.departmentID,
						'a0101': this.searchForm.nameAndPinyin,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.tableData = resData.data.list;
						this.pageObj.total = resData.data.total;
					} else {
						this.$message({
							type: 'error',
							message: '查询失败，请刷新重试！'
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
				this.a0100s   = this.commonFun.joinTgetherId(chioceList,this.a0100s,'a0100');
				//选中的数据上传服务器
				this.saveChioce();
			},
			saveChioce(){//选中的数据上传服务器
				let url = "";
				if(this.flag) url = this.API.savePowerArchPowerPerson;
				else url = this.API.savePowerArchPoweExcludes;
				this.$axios({
					method: 'post',
					url: url,
					data: {
						'id':this.id,
						'a0100s': this.a0100s
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.a0100s = "";
						let msg = "";
						if(this.flag) msg = "保存干部人员访问权限";
						else msg = "保存档案人员规避",
						//值传回给父组件
						this.$refs.multipleTable.clearSelection();//清除所有选中项
						this.$message({
							type: 'success',
							message: msg
						});
						this.$emit('getAddback', "");
					} else {
						this.$message({
							type: 'error',
							message: '保存失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("保存=" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
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

<style lang="scss" scoped>
	.addAccesscadres-comment-container{
		
	}
</style>