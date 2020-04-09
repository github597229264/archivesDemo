<template>
	<replayCollectionNotice :isDetail="isDetail" :checkedCollectionNotice="checkedCollectionNotice"></replayCollectionNotice>
</template>

<script>
	import replayCollectionNotice from './ReplayCollectionNotice.vue'
	
	export default{
		name:"CollectionNoticeDetail",//档案在线预审----催收通知---查看
		props:['checkedCollectionNotice'],
		components:{
			replayCollectionNotice
		},
		data(){
			return{
				isDetail:true,//从查看过去的，false是从回复过去的
			}
		}
	}
</script>

<style lang='css'>
</style>