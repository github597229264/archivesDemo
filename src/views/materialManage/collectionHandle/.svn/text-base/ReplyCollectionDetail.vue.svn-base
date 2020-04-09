<template>
	<replyCollectionHandle :isDetail="isDetail" :replyCollectionHandleObj='replyCollectionHandleObj'></replyCollectionHandle>
</template>

<script>
	import replyCollectionHandle from './ReplyCollectionHandle.vue';
	export default{
		name:"ReplyCollectionDetail",//查看界面
		components:{
			replyCollectionHandle
		},
		props:['replyCollectionHandleObj'],
		data(){
			return{
				isDetail:true,//从查看过去的，false是从回复过去的
			}
		},
	}
</script>

<style>
</style>