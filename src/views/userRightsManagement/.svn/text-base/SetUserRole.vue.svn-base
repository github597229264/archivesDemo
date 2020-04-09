<template>
	<div class="setUserRole">
		<el-transfer v-model="chioceValue" :data="transferData" :props="propsData" :titles="titleName" :button-texts="buttonName"></el-transfer>
		<div slot="footer" class="dialog-footer">
			<el-button  type="primary" @click="saveRole">保存</el-button>
			<el-button @click="cancelSet">取 消</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'SetUserRole', //设置用户角色
		props:['chioceUserId'],//选中的用户id
		data() {
			return {
				buttonName:['到左边', '到右边'],//自定义按钮标题
				titleName:['全部角色', '分配的角色'],//自定义列表标题
				propsData:{//重置key映射字段名
			      key: 'id',
			      label: 'name'
			    },
			    userId:'',//用户id
		        transferData: [],//Transfer组件 的数据源
		        chioceValue: []//选中的数据
			}
		},
		created() {
		},
		mounted() {
			this.userId = this.chioceUserId;
			this.getData();//获取用户角色信息
		},
		computed: {

		},
		methods: {
			/**
			 * 获取用户角色信息
			 */
			getData() {
                this.$axios({
                	loading:{
            			isShow:true,
            			target:'.setUserRole'
            		},
            		method:'get',
                	url:this.API.findRoles, 
                	params:{
                		id:this.userId
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.transferData = resData.data.powerRoles;
                    	this.chioceValue = resData.data.userRoleIds;
                    	console.log(this.transferData);
                    }else{
			          	this.$message({
				            type: 'error',
				            message: '获取用户角色信息失败，请退出重试！'
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
			 * 取消
			 */
			cancelSet(){
				//调用父组件方法--isRefresh 是否需要刷新父组件的数据
				this.$emit("SetUserRoleCallBack",false);
			},
			/**
			 * 保存设置的角色
			 */
			saveRole(){
				if(this.chioceValue.length == 0){
					this.$message({
						type: 'waring',
						message: '分配角色列表不能为空!'
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
				this.saveUserRole(roleStr);
			},
			/*
			 * 请求后台进行保存分配角色信息操作
			 * @id {String} 分配的角色id，多个以逗号分隔
			 */
			saveUserRole(rolesIdStr) {
				this.$axios({
                	loading:{
            			isShow:true,
            			target:'.setUserRole'
            		},
					method: 'post',
					url: this.API.roleSetting,
					data: {
						id: this.userId,
						roleIds:rolesIdStr
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.$message({
							type: 'success',
							message: '用户角色设置成功!'
						});
						//调用父组件方法--isRefresh 是否需要刷新父组件的数据
						this.$emit("SetUserRoleCallBack",true);
					} else {
						this.$message({
							type: 'error',
							message: '保存角色失败，请刷新重试！'
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
	.setUserRole {
		.dialog-footer{
			margin-top:15px;
			text-align: center;
		}
		.el-select{
			width:100%;
		}
	}
</style>