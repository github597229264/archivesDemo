<template>
	<div class="applyRecord">
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>档案查借阅</el-breadcrumb-item>
			  <el-breadcrumb-item>申请记录</el-breadcrumb-item>
			</el-breadcrumb>
        </div>
        <div class="container">
  			<el-main ref="elMain" :style="{height:mainHeight}">
				<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
					<el-tab-pane v-for="item in tabsData" :label="item.label"  :name="item.name">
						<ApplyRecordList ref="ApplyRecordList" v-if="activeName == item.name" :mainHeight="mainHeight" :tableType="item.tableType"></ApplyRecordList>
					</el-tab-pane>
				</el-tabs>
  			</el-main>
        </div>
	</div>
</template>

<script>
	import ApplyRecordList from './ApplyRecordList.vue';
	export default {
		name: 'ApplyRecord', //申请记录
		components: {
			ApplyRecordList//申请记录列表
		},
		data() {
			return {
				mainHeight:'',//main高度
				activeName: 'canApply',//当前选中的项
				tabsData:[
					{
						label:'可查阅申请',
						name:'canApply',
						tableType:'1'
					},
					{
						label:'已过期申请',
						name:'expireApply',
						tableType:'3'
					},
					{
						label:'全部申请',
						name:'allApply',
						tableType:'2'
					}
				]
			}
		},
		mounted() {
			this.mainHeight = window.innerHeight - this.$refs.elMain.$el.offsetTop- 70;	
		},
		computed: {

		},
		methods: {
			handleClick(tab, event) {
	      	}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.applyRecord {
		.container{
			padding:0 0 30px 0;
		}
	}
</style>