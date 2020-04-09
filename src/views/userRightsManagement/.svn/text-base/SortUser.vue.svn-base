<template>
	<div class="sort-userManagement-container">
		<div class="sort-userManagement-title">
			<el-button type="primary" @click="restoreData">初始化顺序</el-button>
			<el-button type="primary" @click="moveUp">上移</el-button>
			<el-button type="primary" @click="moveDown">下移</el-button>
			<el-button type="primary" @click='sava'>保存</el-button>
		</div>
		<div class="sort-userManagement-content">
			<!--表格-->
			<el-table class="material_table" ref="table" border style="width: 100%;" highlight-current-row :row-class-name="tableRowClassName" height="350px" :data="sortList" @row-click="clickRow">
				<el-table-column label="序号" align="center" width="60">
					<template slot-scope="scope"> {{scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="uid" label="账户" align="center">
				</el-table-column>
				<el-table-column prop="cn" label="姓名" show-overflow-tooltip align="center">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'SortUserManageMentContainer', //排序
		props: [],
		data() {
			return {
				selectdata: "", //选中的数据
				index: "", //选中数据的下标
                ids: "", //排序的ids
                sortList:[], //表格列表
			}
        },
        created(){
            this.getData();
        },
		methods: {
			tableRowClassName ({row, rowIndex}) { // 把每一行的索引放进row
			    row.index = rowIndex;
			},
			clickRow(row) { //选中某一条数据
				this.selectdata = row;
				this.index = row.index;
            },
            // 获取排序列表
            getData(){
                this.$axios({
					method: 'get',
					url: this.API.sortUserLists,
				}).then((res) => {
                    var resData = res.data;
					if(resData.code == "1") {
						this.sortList = resData.data;
						if(this.sortList.length == 0) {
							this.$message("没有要排序的数据！");
							return;
						}
						if(this.sortList.length == 1) {
							this.$message("只有一条数据,不需要进行排序！");
							return;
						}
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
            // 初始化排序
            restoreData(){
                this.$axios({
                    loading:{
            			isShow:true,
            			target:'.sort-userManagement-container'
            		},
					method: 'get',
					url: this.API.initializationOrder,
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.$message.success('排序成功！');
						this.$emit('sortUserCall',true);
					} else {
						this.$message({
							type: 'error',
							message: '排序失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("排序" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
            },
			//向上移动
			moveUp() {
				if(this.selectdata == "") {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				var that = this;
				console.log(that.sortList[this.index]);
				if(this.index > 0) {
					let upDate = that.sortList[this.index - 1];
					that.sortList.splice(this.index - 1, 1);
					that.sortList.splice(this.index, 0, upDate);
					this.index = this.index - 1;
				} else {
					this.$message('已经是第一条，不可上移');
				}
			},
			moveDown() { //向下移动
				if(this.selectdata == "") {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				var that = this;
				console.log('下移', this.index);
				if((this.index + 1) === that.sortList.length) {
					this.$message('已经是最后一条，不可下移');
				} else {
					let downDate = that.sortList[this.index + 1];
					that.sortList.splice(this.index + 1, 1);
					that.sortList.splice(this.index, 0, downDate);
					this.index = this.index + 1;
				}
			},
			sava() { //保存排序后的数据
				let infoIdsArr = [];
				this.sortList.forEach(item => {
					infoIdsArr.push(item.id);
				});
				if(infoIdsArr.length <= 0) {
					return;
				}
				this.ids = infoIdsArr.join(",").toString();
				this.saveForNet();
			},
			saveForNet() { //发送数据到服务器
				this.$axios({
					method: 'post',
					url: this.API.upAndDown,
					data: {
						'ids': this.ids
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.$message.success('排序成功！');
						this.$emit('sortUserCall',true);
					} else {
						this.$message({
							type: 'error',
							message: '排序失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("排序" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
            }
		}
	}
</script>

<style lang="scss" scoped>
	.sort-userManagement-container {
		height: 100%;
		.sort-userManagement-content{
			margin: 15px 0px;
		}
	}
</style>