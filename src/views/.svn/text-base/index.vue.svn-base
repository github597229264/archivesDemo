<template>
	<div class="index">
		<!--日常办公-->
		<div class="Daily-office">
			<DailyOffice></DailyOffice>
		</div>
		<!--主要板块-->
		<div class="main-block">
			<!--干部人员大数据-->
			<bigData></bigData>
			<!-- 系统通知 -->
			<systemInforms></systemInforms>
			<!-- 知识库 -->
			<knowledgeBase></knowledgeBase>
			<!--档案台账管理-->
			<ledgerModual></ledgerModual>
			<!--待办事项-->
			<toDoList></toDoList>
		</div>
	</div>
</template>

<script>
	import DailyOffice from "./indexModular/dailyOffice.vue";//日常办公
	import ledgerModual from "./indexModular/ledgerModual.vue";//档案台账管理
	import toDoList from "./indexModular/toDoList.vue";//待办事项
	import systemInforms from "./indexModular/SystemInforms.vue"; //系统通知
	import knowledgeBase from "./indexModular/KnowledgeBase.vue";//知识库
	import bigData from "./indexModular/bigData/bigData.vue";//知识库
	
	export default {
		name: 'index',
		components: {
			DailyOffice,//日常办公
			ledgerModual,//档案台账管理
			toDoList,//待办事项
			systemInforms, //系统通知
			knowledgeBase,//知识库
			bigData,//干部人员大数据
		},
		data() {
			return {
				
			}
		},
		created() {
			
		},
		methods: {
			
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.main-block {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.index{
		overflow: auto;
		height:100%;
	}
</style>