<template>
	<div class="getRolePower">
		<el-tree
		  show-checkbox
		  ref="treeMenu"
		  :data="treeData"
		  :node-key="propsData.key"
		  :props="propsData"
		  :default-checked-keys="chioceValue">
		</el-tree>
		<el-row>
			<el-button  type="primary" @click="saveRole">保存</el-button>
			<el-button  >取 消</el-button>
			<!--@click="cancelSet"-->
		</el-row>
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
			      label: 'text'
			   },
		        treeData: [],//树组件 的数据源
		        chioceValue: [],//选中的数据
			}
		},
		created() {
		},
		mounted() {
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
            		method:'get',
                	url:this.API.configurationWorkTree,
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.treeData = this.commonFun.toTreeDataNormal(resData.data.list1,{
							childKey:"id",
							fatherKey:"pid"
						});
						this.chioceValue = resData.data.list2;
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
					
			},
			/**
			 * 保存配置日常办公功能项
			 */
			saveRole(){
				this.chioceValue = this.$refs.treeMenu.getCheckedKeys();
				if(this.chioceValue.length == 0){
					this.$message({
						type: 'warning',
						message: '您还没有选择菜单!'
					});
					return;
				}
				let roleStr='';
				this.chioceValue.forEach(function(value, index, array){
					if(index == array.length-1){
						roleStr +=value;
					}else{
						roleStr +=value+",";
					}
				})
				this.saveRolePower(roleStr);
			},
			/*
			 * 请求后台进行保存角色权限信息操作
			 * @id {String} 分配的角色id，多个以逗号分隔
			 */
			saveRolePower(rolesIdStr) {
				this.$axios({
                	loading:{
            			isShow:true,
            			target:'.setRolePower'
            		},
					method: 'post',
					url: this.API.commonlyUsedMenuSave,
					data: {
						ids: rolesIdStr
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.$message({
							type: 'success',
							message: '角色权限设置成功!'
						});
						//调用父组件方法--isRefresh 是否需要刷新父组件的数据
						this.$emit("SetRolePowerCallBack",true);
					} else {
						this.$message({
							type: 'error',
							message: '保存角色权限失败，请刷新重试！'
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