<!--档案专项审核-专项审核认定模块-->
<template>
	<el-container class="special-audit-recognition-container">
		<el-header class="my-header" style="height: 45px;"><h3>专项审核认定</h3></el-header>
		<el-main>
			<div class="special-audit-recognition-title">
				<el-button type="primary" @click="reviewIdentified">审核认定</el-button>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	export default{
		name:"SpecialAuditRecognition.vue",//档案专项审核--专项审核认定模块
		data(){
			return{
				
			}
		},
		methods:{
			reviewIdentified(){//审核认定
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.special-audit-recognition-container {
		height: 100%;
		.my-header {
			padding-top: 15px;
		}
		.el-main {
			background-color: #fff;
			height: 100%;
		}
	}
</style>