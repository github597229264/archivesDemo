<template>
    <div class="dataCodeManagement">
        <div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>信息中心管理</el-breadcrumb-item>
			  <el-breadcrumb-item>数据代码维护</el-breadcrumb-item>
			</el-breadcrumb>
        </div>
        <el-container>
        	<el-aside width="60%">
        		<DataCodeList @DataCodeListCall="DataCodeListCall"></DataCodeList>
        	</el-aside>
        	<el-main>
	           <DataCodeContentList ref="DataCodeContent"></DataCodeContentList>
			</el-main>
       	</el-container>
    </div>
</template>

<script>
	import DataCodeList from './DataCodeList.vue';
	import DataCodeContentList from './DataCodeContentList.vue';
    export default {
        name: 'DataCodeManagement',//数据代码管理
	    components:{
	        DataCodeList,//数据字典列表
	        DataCodeContentList//数据字典内容管理
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
        	DataCodeListCall(obj){
        		this.$refs.DataCodeContent.pageObj.pageIndex=this.API.constObj.pageIndex;
        		this.$refs.DataCodeContent.pageObj.pageSize=this.API.constObj.pageSize;
        		this.$refs.DataCodeContent.pageObj.total = 0;
				if(JSON.stringify(obj)!=="{}"){
					this.dictionaryObject = obj;
					this.$refs.DataCodeContent.getData(this.dictionaryObject);
				}else{
					this.dictionaryObject = {};
					this.$refs.DataCodeContent.tableData=[];
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
    .dataCodeManagement{
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
