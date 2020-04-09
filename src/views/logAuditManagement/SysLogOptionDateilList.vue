<template>
	<div class="syslogoption-dateil-container">
		<!--表格-->
		<el-table ref="table" :data="sysLogOptionDateilList" border style="width: 100%;" :height="tableHeight">
			<el-table-column label="序号" align="center" width="50px">
				<template slot-scope="scope"> {{scope.$index+1}} </template>
			</el-table-column>
			<!--<el-table-column prop="uCreator" label="创建人" show-overflow-tooltip align="center" width='120'>
			</el-table-column>
			<el-table-column prop="uCreatedate" label="创建时间" align="center" width='100' show-overflow-tooltip>
			</el-table-column>-->
			<el-table-column prop="tableName" label="表中文名称" align="center" show-overflow-tooltip width='120'>
			</el-table-column>
			<el-table-column prop="tableCode" label="表英文名称 " align="center" show-overflow-tooltip width='120'>
			</el-table-column>
			<el-table-column prop="tableConclumName" label="列中文名称" width='120' align="center" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="tableConclum" label="列英文名称 " align="center" show-overflow-tooltip width='120'>
			</el-table-column>
			<el-table-column prop="oldvalue" label="修改前值 " align="center" show-overflow-tooltip width='120'>
			</el-table-column>
			<el-table-column prop="newvalue" label="新值 " align="center" show-overflow-tooltip width='100'>
			</el-table-column>

		</el-table>
	</div>
</template>

<script>
	export default {
		name: "SysLogOptionDateilList", //日志分析的右边 日志分析子表信息
		mounted: function() {
			this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 90;
		},
		data() {
			return {
				sysLogOptionDateilList: [], //日志分析子表列表
				tableHeight: "450",//给tabale设置高度
			}
		},
		methods: {
			changeList() { //当操作人信息发生变化，并且数据为空时调用
				this.sysLogOptionDateilList = [];
			},
			findSysLogOptionDateilListById(id) { //日志分析子表信息
				this.$axios({
					method: 'get',
					url: this.API.findSysLogOptionDateilListById,
					params: {
						"id": id
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.sysLogOptionDateilList = resData.data.list;
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
		}
	}
</script>

<style lang="scss" scoped>
	.syslogoption-dateil-container {
		width: 100%;
	}
</style>