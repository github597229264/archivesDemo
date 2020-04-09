<template>
	<div class="approvelHistoryList">
		<el-steps :active="flowData.length"  align-center process-status="finish">
		  	<el-step v-for="item in flowData" :title="item.name" :description="item.gw"></el-step>
		</el-steps>
		<el-table :data="tableData" border class="table" height="250px">
			<el-table-column prop="workflowstage" label="流程阶段" width="80" align="center"></el-table-column>
			<el-table-column prop="approvestep" label="具体审批步骤" width="120" align="center" show-overflow-tooltip></el-table-column>
			<el-table-column prop="name" label="操作人类型" width="100" align="center"></el-table-column>
			<el-table-column prop="gw" label="操作人岗位" width="100" align="center"></el-table-column>
			<el-table-column prop="approvedate" label="审核时间" width="130" align="center"></el-table-column>
			<el-table-column prop="approver" label="审核人" width="100" align="center"></el-table-column>
			<el-table-column prop="sStatue" label="状态" width="80" align="center"></el-table-column>
			<el-table-column prop="sResult" label="结果" width="80" align="center"></el-table-column>
			<el-table-column prop="reason" label="批注" min-width="80" align="center" show-overflow-tooltip></el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		name: 'ApprovelHistoryList', //审批历史列表
		components: {},
		props:["applyId"],//申请单id
		data() {
			return {
				tableData: [], //表格数据
				flowData: [] //流程数据
			}
		},
		created() {
		},
		mounted() {
			this.getData();
		},
		computed: {

		},
		methods: {
			/*
			 * 获取申请审批历史 
			 */
			getData() {
				this.$axios({
					loading:{
            			isShow:true,
            			target:'.approvelHistoryList'
            		},
					method: 'get',
					url: this.API.approvaled,
					params: {
						id:this.applyId
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.tableData = resData.data.flows;
						this.flowData = resData.data.flow;
						this.flowData.push({
							"gw": "",
                        	"name": "完成"
						});
					} else {
						this.$message({
							type: 'error',
							message: '查询审批历史列表失败，请刷新重试！'
						});
					}
				}).catch((err) =>{
					console.log("查询审批历史列表=" + err);
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
	.approvelHistoryList {
		width: 100%;
		.el-steps{
			margin-bottom: 20px;
		}
	}
</style>