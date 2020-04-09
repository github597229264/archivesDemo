<template>
	<div class="add-organizational-competence-container">
		<organizationCheckBoxTree :addFlag='flag' :id='id' @getAddBack='addBack'></organizationCheckBoxTree>
	</div>
</template>

<script>
	import organizationCheckBoxTree from '../OrganizationCheckBoxTree.vue';
	export default {
		name: "AddOrganizationalCompetence", //添加组织机构权限
		props: ['id'],
		components: {
			organizationCheckBoxTree
		},
		data() {
			return {
				flag: true, //添加界面的返回	
			}
		},
		methods:{
			addBack(){
				this.$emit('getAddBack',"");
			}
		},
	}
</script>

<style lang="scss" scoped>
	.add-organizational-competence-container {
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	}
</style>