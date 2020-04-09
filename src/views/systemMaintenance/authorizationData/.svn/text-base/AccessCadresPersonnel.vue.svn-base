<template>
	<div class="accessCadres-personnel-container">
		<accessCadresComment :id="id" :rightHeight='rightHeight' :flag="flag"></accessCadresComment>
	</div>
</template>
<script>
	import accessCadresComment from './AccessCadresComment.vue'
	export default{
		name:'AccessCadresPersonnel',//干部人员访问权限
		components:{
			accessCadresComment
		},
		props:['id','rightHeight'],
		data(){
			return{
				flag:true,//档案人员规避标志false ，干部人员访问权限：true
			}
		},
		methods:{
			
		}
	}
</script>
<style lang="scss" scoped>
	.accessCadres-personnel-container{
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	}
</style>