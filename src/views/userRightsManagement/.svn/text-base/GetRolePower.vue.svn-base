<template>
	<div class="getRolePower">
		<el-tree
		  :data="treeData"
		  :node-key="propsData.key"
		  :props="propsData">
		</el-tree>
	</div>
</template>

<script>
	export default {
		name: 'GetRolePower', //获取角色权限
		props:['roleObj'],//选中的角色id
		data() {
			return {
				propsData:{//重置key映射字段名
			      key: 'id',
			      label: 'name'
			    },
			    roleId:'',//角色id
		        treeData: []//树组件 的数据源
			}
		},
		created() {
		},
		mounted() {
			this.roleId = this.roleObj.id;
			this.getData();//获取角色权限信息
		},
		computed: {

		},
		methods: {
			/**
			 * 获取角色权限信息
			 */
			getData() {
                this.$axios({
                	loading:{
            			isShow:true,
            			target:'.getRolePower'
            		},
            		method:'get',
                	url:this.API.viewPower, 
                	params:{
                		id:this.roleId
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.treeData = this.commonFun.toTreeData(resData.data);
                    }else{
			          	this.$message({
				            type: 'error',
				            message: '获取角色权限信息失败，请退出重试！'
			          	});
                    }
                }).catch((err) => {
                	this.$message({
			            type: 'error',
			            message: '请求异常，请检查网络！'
			        });  
                })
					
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.getRolePower {
		.el-tree{
			height:300px;	
			overflow-y: auto
		}
	}

</style>