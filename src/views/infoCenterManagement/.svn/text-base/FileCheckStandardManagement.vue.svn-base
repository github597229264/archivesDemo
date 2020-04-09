<template>
	<div class="fileCheckStandardManagement">
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>信息中心管理</el-breadcrumb-item>
			  <el-breadcrumb-item>档案审核标准</el-breadcrumb-item>
			</el-breadcrumb>
        </div>
        <div class="container">
  			<el-main>
				<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
					<el-tab-pane label="实体档案"  name="entityFiles">
						<FileCheckStandardList v-if="activeName == 'entityFiles'" :archivesTypeId="archivesTypeId"></FileCheckStandardList>
					</el-tab-pane>
					<el-tab-pane label="电子档案"  name="electronicArchives">
						<FileCheckStandardList v-if="activeName == 'electronicArchives'" :archivesTypeId="archivesTypeId"></FileCheckStandardList>
					</el-tab-pane>
				</el-tabs>
  			</el-main>
        </div>
	</div>
</template>

<script>
	import FileCheckStandardList from './FileCheckStandardList.vue';
	export default {
		name: 'FileCheckStandardManagement', //档案审核标准管理
		components: {
			FileCheckStandardList//档案审核标准列表
		},
		data() {
			return {
				activeName: 'entityFiles',//当前选中的项
				archivesTypeId:this.API.constObj.fileTypeList2[0].id//档案类型id
			}
		},
		created() {

		},
		mounted() {

		},
		computed: {

		},
		methods: {
			handleClick(tab, event) {
				if( tab.name == 'entityFiles'){//实体档案
					this.archivesTypeId =this.API.constObj.fileTypeList2[0].id; 
				}else{//电子档案
					this.archivesTypeId =this.API.constObj.fileTypeList2[1].id;
				}
	      	}
		}
	}
</script>
<style lang="scss" scoped>
	.fileCheckStandardManagement {
		.container{
			height: 510px;
			padding:0 0 30px 0;
		}
	}
    .el-main /deep/ .el-tabs__header{
        margin: 0;
    }
</style>
