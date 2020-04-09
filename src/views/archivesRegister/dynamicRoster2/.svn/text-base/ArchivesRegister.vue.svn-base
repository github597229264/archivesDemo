<template>
	<div id="archivesRegister">
		<div ref="table" >
			<!--标题-->
			<div class="head">
				<h4>档案名册</h4>
			</div>
			
			<el-tabs type="border-card">
				<!--动态名册-->
				<el-tab-pane label="动态名册">
					<dynamicRoster></dynamicRoster>
				</el-tab-pane>
				
				<!--静态名册-->
				<el-tab-pane label="静态名册">
                	<staticRoster></staticRoster>
            </el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<script>
	import dynamicRoster from './dynamicRoster.vue';//动态名册
	import staticRoster from './staticRoster.vue';//静态名册
	
	export default {
		data() {
			return {
				
			};
		},
		components: {
			dynamicRoster,//动态名册
			staticRoster,//静态名册
		},
		created() {
		
		},
		methods: {
//			this.tableHeight=window.innerHeight -this.$refs.leftTable.$el.offsetTop-40-52-70-120;
		},

	};
</script>
<style lang="scss" scoped type="text/css">
	.head {
		width: 100%;
		height: 40px;
		line-height: 40px;
		background-color: #f5f5f5;
		border-bottom: 1px solid #ccc;
		h4 {
			padding-left: 15px;
			font-size: 16px;
		}
	}
	
	.topheight {
		margin-top: 15px;
	}
	
	.topheight1 {
		margin-top: 5px;
	}
	
	.leftAside {
		width: 35%;
		height: 100%;
		border-right: 1px solid #ccc;
		.leftHead {
			height: 40px;
			line-height: 40px;
		}
		.dyna-l{
			.el-pagination__total{
				display: none !important;
			}
		}
	}
	
	.contentRight {
		width: 64%;
		.righthead {
			width: 100%;
			padding-top: 10px;
			height: 40px;
			.inputContent {
				width: 22%;
			}
		}
	}
	
	.inputContent1 {
		width: 73%;
	}
</style>