<template>
	<div class="table">
		<el-table 
			v-loading="loading" 
			element-loading-text="正在加载数据..." 
			element-loading-spinner="el-icon-loading" 
			element-loading-background="rgba(0, 0, 0, 0.5)" 
			:data="tableData" style="width: 100%">
			<el-table-column prop="date" label="日期" width="180">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="180">
			</el-table-column>
			<el-table-column prop="address" label="地址">
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}],
				loading: true
			};
		}
	};
</script>
<style lang="scss" scoped type="text/css">

</style>