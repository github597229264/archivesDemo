<template>
	<div class="organization-presonne-sort-container">
		<div class="organization-presonne-sort-container-title">
			<!--<el-button type="primary" @click="restoreData">初始化顺序</el-button>-->
			<el-button type="primary" @click="moveUp">上移</el-button>
			<el-button type="primary" @click="moveDown">下移</el-button>
			<el-button type="primary" @click='sava'>保存</el-button>
		</div>
		<!--表格-->
		<el-table class="material_table" ref="table" highlight-current-row :row-class-name="tableRowClassName" height="350px" :data="sortList" border style="width: 100%;" @row-click="clickRow">
			<el-table-column label="序号" align="center" width="60">
				<template slot-scope="scope"> {{scope.$index+1}}</template>
			</el-table-column>
			<el-table-column prop="a0101" label="姓名" align="center" width="120">
			</el-table-column>
			<el-table-column prop="a0111a" label="籍贯" show-overflow-tooltip align="center" width="180">
			</el-table-column>
			<el-table-column prop="e10040" label="现职单位及职务" show-overflow-tooltip align="center">
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		name: "OrgainzationPersonneSort", //机构人员调整排序
		props:['id','sortList'],//id
		data() {
			return {
				selectdata:"",//选中的数据
				index:"",//选中数据的下标
				a0100s:'',//列表的ids
			}
		},
		methods: {
			tableRowClassName ({row, rowIndex}) { // 把每一行的索引放进row
			    row.index = rowIndex;
			},
			clickRow(row) { //选中某一条数据
				this.selectdata = row;
				this.index = row.index;
			},
			//向上移动
			moveUp() {
				if(this.selectdata == ""){
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
			moveDown() {//向下移动
				if(this.selectdata == ""){
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
			sava(){//保存排序后的数据
				let infoIdsArr = [];
				this.sortList.forEach(item => {
					infoIdsArr.push(item.a0100);
				});
				if(infoIdsArr.length <= 0) {
					return;
				}
				this.a0100s = infoIdsArr.join(",").toString();	
				this.saveForNet();
			},
			saveForNet(){//发送数据到服务器
				this.$axios({
					method: 'get',
					url: this.API.upAndDownB0A01,
					params: {
						'a0100s': this.a0100s,
						'id':this.id
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.$message.success('排序成功！');
						this.$emit('backSortAdd');
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

<style lang="scss">
	.organization-presonne-sort-container {
		.organization-presonne-sort-container-title {
			display: flex;
			margin-bottom: 10px;
		}
		.el-table__body tr.current-row>td {
		        background: #DCEBFA !important;
		        color:#606266;
		}
	}
</style>