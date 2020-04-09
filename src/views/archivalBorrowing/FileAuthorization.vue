<template>
	<div class="fileAuthorization">
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>档案授权</el-breadcrumb-item>
			</el-breadcrumb>
        </div>
        <div class="container">
  			<el-main ref="elMain" :style="{height:mainHeight}">
				<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
					<el-tab-pane v-for="item in tabsData" :label="item.label"  :name="item.name">
						<AuthorizationList ref="authorizationList" v-if="activeName == item.name" :mainHeight="mainHeight" :tableType="item.tableType"></AuthorizationList>
					</el-tab-pane>
				</el-tabs>
  			</el-main>
        </div>
	</div>
</template>

<script>
	import AuthorizationList from './AuthorizationList.vue';
	export default {
		name: 'FileAuthorization', //档案授权
		components: {
			AuthorizationList//授权列表
		},
		data() {
			return {
				mainHeight:'',//main高度
				activeName: 'fileAuthorization',//当前选中的项
				tabsData:[
					{
						label:'档案授权',
						name:'fileAuthorization',
						tableType:'1'
					},
					{
						label:'快捷授权',
						name:'mainHeight',
						tableType:'2'
					},
					{
						label:'重新授权',
						name:'againAuthorization',
						tableType:'3'
					}
				]
			}
		},
		created() {

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
	.fileAuthorization {
		.container{
			padding:0 0 30px 0;
		}
	}
</style>