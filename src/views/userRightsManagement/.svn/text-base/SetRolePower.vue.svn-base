<template>
	<div class="setRolePower">
		<el-row>
			<el-button type="primary"  @click="checkedBack">还原</el-button>
			<el-button type="primary"  @click="checkedAll">全选</el-button>
			<el-button type="primary"  @click="resetChecked">取消全选</el-button>
			<el-button  type="primary" @click="saveRole">保存</el-button>
			<el-button  @click="cancelSet">取 消</el-button>
		</el-row>
		<el-tree
		  show-checkbox
		  ref="treeMenu"
		  :data="treeData"
		  :node-key="propsData.key"
		  :props="propsData"
		  :default-checked-keys="chioceValue">
		</el-tree>
	</div>
</template>

<script>
	export default {
		name: 'SetRolePower', //设置角色权限
		props:['roleObj'],//选中的角色id
		data() {
			return {
				propsData:{//重置key映射字段名
			      key: 'id',
			      label: 'name'
			    },
			    roleId:'',//角色id
			    oldTreeData:[],//树组件 的原始数据源
		        treeData: [],//树组件 的数据源
		        oldChioceValue:[],//原始选中的数据
		        chioceValue: []//选中的数据
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
			 * 全选
			 */
		    checkedAll() {
		        this.$refs.treeMenu.setCheckedNodes(this.oldTreeData);
		        this.chioceValue = this.$refs.treeMenu.getCheckedKeys();
		    },
			/**
			 * 取消全选
			 */
		    resetChecked() {
		        this.$refs.treeMenu.setCheckedKeys([]);
		        this.chioceValue = this.$refs.treeMenu.getCheckedKeys();
		    },
			/*
			 * 取消
			 */
			cancelSet(){
				//调用父组件方法--isRefresh 是否需要刷新父组件的数据
				this.$emit("SetRolePowerCallBack",false);
			},
			/*
			 * 还原
			 */
			checkedBack(){
				this.$refs.treeMenu.setCheckedKeys(this.oldChioceValue);
				this.chioceValue = this.$refs.treeMenu.getCheckedKeys();
			},
			
			/**
			 * 保存设置的角色
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
			/**
			 * 获取角色权限信息
			 */
			getData() {
                this.$axios({
                	loading:{
            			isShow:true,
            			target:'.setRolePower'
            		},
            		method:'get',
                	url:this.API.roleMenuTree, 
                	params:{
                		id:this.roleId
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.oldTreeData = resData.data.menuTreeList;
                    	this.treeData = this.commonFun.toTreeData(resData.data.menuTreeList);
                    	this.chioceValue = resData.data.arrayRole;
                    	this.oldChioceValue =resData.data.arrayRole; 
                    	console.log(this.treeData);
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
					method: 'get',
					url: this.API.saveOrUpdateRoleMenu,
					params: {
						id: this.roleId,
						menuid:rolesIdStr
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
	.setRolePower {
		
		.el-tree{
			margin-top:10px;
			height:300px;	
			overflow-y: auto
		}
	}

</style>