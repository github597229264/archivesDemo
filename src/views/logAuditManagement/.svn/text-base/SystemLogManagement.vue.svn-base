<template>
	<el-container class="systemLog-management-container">
		<el-header class="my-header" style="height: 45px;">系统日志管理</el-header>
		<el-main>
			<div class="systemLog-management-title">
				<div class="systemLog-management-title-left">
					操作状态：
					<el-select v-model="status" placeholder="请选择" clearable>
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					操作人：
					<el-input v-model="uCreator" clearable></el-input>
					ip：
					<el-input v-model="ip" clearable></el-input>
					时间：
					<el-date-picker v-model="data" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</div>
				<div class="systemLog-management-title-right">
					<el-button type='primary' @click="search">查询</el-button>
				</div>
			</div>
			<!--表格-->
			<el-table ref="table" :data="systemLogList" border style="width: 100%;" :height="tableHeight">
				<el-table-column label="序号" align="center" width="60px">
					<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
				</el-table-column>
				<el-table-column prop="uCreator" label="操作人" show-overflow-tooltip align="center">
				</el-table-column>
				<el-table-column prop="ip" label="IP地址" align="center">
				</el-table-column>
				<el-table-column prop="statusValue" label="操作状态" width='100' align="center">
				</el-table-column>
				<el-table-column prop="describe" label="简要说明" align="center" width="200" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="uCreatedate" label="时间" align="center">
				</el-table-column>
			</el-table>
			<!--分页-->
			<div class="material_page">
				<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	import pagination from '../../components/Pagination.vue';
	export default {
		name: "SystemLogManagement", //系统日志管理
		components: {
			pagination
		},
		data() {
			return {
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				systemLogList: [], //系统日志集合
				status: "", //操作状态
				uCreator: "", //操作人
				ip: "", //ip
				data: "", //时间
				startDateStr: "", //开始时间
				endDateStr: "", //结束时间
				options: [{
					value: '0',
					label: '异常'
				}, {
					value: '1',
					label: '成功'
				}],
				tableHeight: "400",//给tabale设置高度
			}
		},
		created() {
			this.findSystemLogPage();
		},
		mounted: function() {
			this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 145;
		},
		methods: {
			handleCurrentChange(val) { // 分页导航
				this.pageObj.pageIndex = val;
				this.findSystemLogPage();
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.findSystemLogPage();
			},
			findSystemLogPage() { //系统日志列表查询
				this.$axios({
					loading:{
            			isShow:true,//是否显示loading遮罩层
            			target:'.systemLog-management-container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
            		},
					method: 'post',
					url: this.API.findSystemLogPage,
					data: {
						'status': this.status,
						'ip': this.ip,
						'startDateStr': this.startDateStr,
						'endDateStr': this.endDateStr,
						'uCreator': this.uCreator,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.systemLogList = resData.data.list;
						this.pageObj.total = resData.data.total;
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
			search() { //搜索
				if(this.data === null){
					this.startDateStr = "";
					this.endDateStr = "";
				}else if((this.data || this.data != "") && this.data.length > 0){
					let strDate = this.data;
					this.startDateStr = this.commonFun.dateFormat(strDate[0], "yyyyMMdd");
					this.endDateStr = this.commonFun.dateFormat(strDate[1], "yyyyMMdd");
				}else{
					this.startDateStr = "";
					this.endDateStr = "";
				}
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.findSystemLogPage();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.systemLog-management-container {
		.my-header {
			padding-top: 15px;
		}
		.el-main {
			font-size: 13px;
			background-color: #fff;
			height: 100%;
			.systemLog-management-title {
				display: flex;
				justify-content: space-between;
				margin-bottom: 10px;
				.el-select {
					width: 120px;
					margin-right: 15px;
				}
				.el-input {
					width: 120px;
					margin-right: 15px;
				}
			}
			.material_page {
				margin-top: 10px;
				text-align: right;
			}
		}
	}
</style>