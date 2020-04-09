<template>
	<div class="fileApprove">
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>档案审批</el-breadcrumb-item>
			</el-breadcrumb>
        </div>
        <div class="container">
  			<el-main>
				<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
					<el-tab-pane label="待审批列表"  name="fileApprove">
						<ApproveList v-if="activeName == 'fileApprove'" :tableType="1"></ApproveList>
					</el-tab-pane>
					<el-tab-pane label="已审批列表"  name="quickAuthorization">
						<ApproveList v-if="activeName == 'quickAuthorization'" :tableType="2"></ApproveList>
					</el-tab-pane>
				</el-tabs>
  			</el-main>
        </div>
	</div>
</template>

<script>
	import ApproveList from './ApproveList.vue';
	export default {
		name: 'FileApprove', //档案审批
		components: {
			ApproveList//审批列表
		},
		data() {
			return {
				activeName: 'fileApprove',//当前选中的项
			}
		},
		created() {

		},
		mounted() {

		},
		computed: {

		},
		methods: {
			handleClick(tab, event) {
	        	console.log(tab, event);
	      	}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.fileApprove {
		.container{
			    height: 510px;
			padding:0 0 30px 0;
		}
	}
</style>