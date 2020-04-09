<!--台账管理模块-->
<template>
	<div class="ledger-container">
		<div class="title">台账管理</div>
		<div class="content">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="统计" name="first">
					<ledgerStatistical v-if="isChildUpdate1"></ledgerStatistical>
				</el-tab-pane>
				<el-tab-pane label="总览" name="second">
					<ledgerOverview v-if="isChildUpdate2"></ledgerOverview>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import ledgerOverview from './LedgerOverview.vue';
	import ledgerStatistical from './LedgerStatistical.vue';
	export default {
		name:"LedgerManage",//台账管理
		data() {
			return {
				activeName: 'first',
				isChildUpdate1: true,
				isChildUpdate2: false
			};
		},
		created() {
			console.log("========");
			//			this.getPagerList();
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
				if(tab.name == "first") {
					this.isChildUpdate1 = true;
					this.isChildUpdate2 = false;
				} else if(tab.name == "second") {
					this.isChildUpdate1 = false;
					this.isChildUpdate2 = true;
				}
			},
			getTotal(data) { //获取总览返回的数据
				console.log("=====");
				this.data = data;
			}
		},
		components: {
			ledgerOverview,
			ledgerStatistical
		}
	};
</script>

<style lang="scss" scoped>
	.ledger-container {
		.title {
			line-height: 35px;
			margin: 0 auto;
		}
		.content {
			background-color: #fff;
		}
	}
</style>