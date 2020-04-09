<template>
	<el-tabs v-model="activeName" type="card" >
		<el-tab-pane label="申请" name="1">
			<ArchivesDetailFlagList v-if="activeName == '1'" :selectDeceive="selectId" :selectArchtypeId="ArchtypeId" :selectFlagId="1"></ArchivesDetailFlagList>
		</el-tab-pane>
		<el-tab-pane label="审批" name="2">
			<ArchivesDetailFlagList v-if="activeName == '2'" :selectDeceive="selectId" :selectArchtypeId="ArchtypeId"  :selectFlagId="2"></ArchivesDetailFlagList>
		</el-tab-pane>
		<el-tab-pane label="授权" name="3">
			<ArchivesDetailFlagList v-if="activeName == '3'" :selectDeceive="selectId" :selectArchtypeId="ArchtypeId"  :selectFlagId="3"></ArchivesDetailFlagList>
		</el-tab-pane>
	</el-tabs>
</template>

<script>
	//import vPinyin from '../../common/vue-py.js';
	import ArchivesDetailFlagList from './ArchivesDetailFlagList.vue';

	export default {
		name:'ArchivesDetail',
		props: ['selectDeceive','selectArchtypeId'],
		components: {
			ArchivesDetailFlagList,//档案申请、审核、授权列表切换
		},

		data() {
			return {
				activeName: '1',//菜单状态
				selectId:'',
				ArchtypeId:'',
			}
		},
		mounted() {
		
		},
		created(){
			this.selectId=this.selectDeceive;
			this.ArchtypeId=this.selectArchtypeId;
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>

</style>