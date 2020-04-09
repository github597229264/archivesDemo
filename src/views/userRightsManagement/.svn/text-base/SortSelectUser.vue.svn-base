<template>
	<div class="sort-userGroup-container">
		<div class="sort-userGroup-title">
			<el-button type="primary" @click="resetSort">初始化顺序</el-button>
			<el-button type="primary" @click="moveUp">上移</el-button>
			<el-button type="primary" @click="moveDown">下移</el-button>
			<el-button type="primary" @click='sava'>保存</el-button>
		</div>
		<div class="sort-userGroup-content">
			<!--表格-->
			<el-table class="material_table" ref="sortTable" border style="width: 100%;" highlight-current-row :row-class-name="tableRowClassName" height="350px" :data="sortList" @row-click="clickRow">
				<el-table-column label="序号" align="center" width="60">
					<template slot-scope="scope"> {{scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="name" label="名称" align="center">
				</el-table-column>
				<el-table-column prop="parentName" label="上级机构" show-overflow-tooltip align="center">
				</el-table-column>
                <el-table-column prop="uAreaCodeName" label="所属管档单位" show-overflow-tooltip align="center">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>

export default {
	name:"sortUserGroupContainer",
	//import引入的组件需要注入到对象中才能使用
	components: {},
	props:[],

	data() {
		return {
			selectdata: "", //选中的数据
			index: "", //选中数据的下标
			ids: "", //排序的ids
			sortList:[], //表格数据
		};
	},

	//监听属性 类似于data概念
	computed: {},

	//监控data中的数据变化
	watch: {},

	//方法集合
	methods: {
		tableRowClassName ({row, rowIndex}) { // 把每一行的索引放进row
			    row.index = rowIndex;
		},
		clickRow(row) { //选中某一条数据
				this.selectdata = row;
				this.index = row.index;
		},
		getData(){
			this.$axios({
				loading: {
					isShow: true, //是否显示loading遮罩层
					target:'.sort-userGroup-container'
				},
				method: 'get',
				url: this.API.findUserOrganizationList
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
		//初始化排序
        resetSort(){
            this.$axios({
				loading:{
					isShow:true,
					target:'.material_table'
				},
				method: 'get',
				url: this.API.userOrgInitializationOrder 
			}).then((res) => {
				var resData = res.data;
				if (resData.code == "1") {
					this.$message({
						message: "初始化排序完成！",
						type: "success"
					});
					this.$emit("sortUserCall",true);
				}else{
					this.$message({
						type: "error",
						message: "初始化排序失败，请刷新重试！"
					});
				}
			}).catch((err) => {
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
				url: this.API.userOrgUpAndDown,
				data: {
					'ids': this.ids
				}
			}).then((res) => {
				var resData = res.data;
				if(resData.code == "1") {
					this.$message.success('排序成功！');
					this.$emit('sortUserCall',true);
					this.$refs.sortTable.setCurrentRow({});
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
	},

	//生命周期 - 创建完成（可以访问当前this实例）
	created() {
		this.getData();
	},

	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {

	},

	beforeCreate() {}, //生命周期 - 创建之前

	beforeMount() {}, //生命周期 - 挂载之前

	beforeUpdate() {}, //生命周期 - 更新之前

	updated() {}, //生命周期 - 更新之后

	beforeDestroy() {}, //生命周期 - 销毁之前

	destroyed() {}, //生命周期 - 销毁完成

	activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发

}

</script>

<style lang="scss" scoped>
	.sort-userGroup-container {
		height: 100%;
		.sort-userGroup-title{ margin:15px 0px;}
		.sort-userGroup-content{
			margin: 15px 0px;
		}
	}
</style>