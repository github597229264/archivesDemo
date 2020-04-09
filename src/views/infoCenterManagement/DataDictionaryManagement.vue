<template>
    <div class="dataDictionaryManagement">
        <div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>信息中心管理</el-breadcrumb-item>
			  <el-breadcrumb-item>数据字典维护</el-breadcrumb-item>
			  <el-breadcrumb-item>数据字典列表</el-breadcrumb-item>
			</el-breadcrumb>
        </div>
        <el-container>
        	<el-aside width="60%">
        		<DataDictionaryList @DataDictionaryListCall="DataDictionaryListCall"></DataDictionaryList>
        	</el-aside>
        	<el-main>
	           <DataDictionaryContentList ref="DataDictionaryContent"></DataDictionaryContentList>
			</el-main>
       	</el-container>
    </div>
</template>

<script>
	import DataDictionaryList from './DataDictionaryList.vue';
	import DataDictionaryContentList from './DataDictionaryContentList.vue';
    export default {
        name: 'DataDictionaryManagement',//数据字典管理
	    components:{
	        DataDictionaryList,//数据字典列表
	        DataDictionaryContentList//数据字典内容管理
	    },
        data() {
            return {
                dictionaryObject:{}//数据字典对象

            }
        },
        created() {
        },
        mounted(){
        	
        },
        computed: {

        },
        methods: {
	        /*
	         * 数据字典列表组件回调方法--子组件回调数据的方法
	         * @params {Object} obj选中的数据
	         */
        	DataDictionaryListCall(obj){
				if(JSON.stringify(obj)!=="{}"){
					this.dictionaryObject = obj;
					this.$refs.DataDictionaryContent.getData(this.dictionaryObject);
				}else{
					this.dictionaryObject = {};
					this.$refs.DataDictionaryContent.tableData=[];
				}
        	},
	        /*
	         * 未被选择用户列表组件回调方法--子组件回调数据的方法
	         * @params {Array} arr选中的数据
	         */
        	NotSelectedUserCall(arr){
        		this.addUserList = arr;
        		this.addUserVisible = false;
				let roleStr='';
				this.addUserList.forEach(function(row, index, array){
					if(index == array.length-1){
						roleStr +=row.id;
					}else{
						roleStr +=row.id+",";
					}
				})
        		this.addUserToGroup(roleStr);
        	}
        }
    }

</script>
<style  lang="scss" scoped>
    .dataDictionaryManagement{
        font-size: 14px;
        .el-container{
        	background-color: #fff;
	        .el-aside{
	        	border-right: solid 1px #E4E7ED;
	        }
        }
    }
    .gray{
        color: #dcdfe6;
    }
    .red{
        color: #ff0000;
    }
    .el-main{
        padding: 0;
    }
</style>
