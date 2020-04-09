<template>
	<div class="addOrEditRole">
		<el-form :model="roleForm" :rules="rules" ref="roleForm" label-width="100px" class="demo-ruleForm" size="small">
			<el-row :gutter="15">
				<el-col :span="23">
					<el-form-item label="角色名称" prop="name">
						<el-input v-model="roleForm.name" minLength="2" maxLength="15" placeholder="请输入角色名称(2~15字符)"></el-input>
					</el-form-item>
				</el-col>
				<!--<el-col :span="23">
					<el-form-item label="工作台"  prop="workbenchName">
						<el-input  v-model="roleForm.workbenchName"  maxLength="15" placeholder="请输入工作台(0~15个字符)" readonly></el-input>
					</el-form-item>
				</el-col>-->
				<el-col :span="23">
					<el-form-item label="角色状态" prop="status">
			            <RoleStatusSelect :chioceOptionId="roleForm.status"  @RoleStatusCall="RoleStatusCall"></RoleStatusSelect>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="备注" prop="remarks">
						<el-input type="textarea" v-model="roleForm.remarks" :autosize="{ minRows: 2, maxRows: 7}" maxLength="100" placeholder="请输入备注(0~100个字符)"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button v-if="pageType == 'add' " type="primary" @click="addRoleGroup('roleForm')">添加</el-button>
			<el-button v-else-if="pageType == 'edit'" type="primary" @click="editRoleGroup('roleForm')">保存</el-button>
			<el-button @click="cancelOpt">取 消</el-button>
		</div>
	</div>
</template>

<script>
	import RoleStatusSelect from '../../components/RoleStatusSelect.vue';
	export default {
		name: 'AddOrEditRole', //角色新增和编辑
		components: {
			RoleStatusSelect //角色状态下拉框
		},
		props:['roleObj'],//roleObj选中的预约信息
		data() {
			return {
				roleForm: {
					id:'',//角色id  编辑提交时使用
					name: '', //角色名称
					workbenchid: this.API.constObj.workbench.id, //机构职能
					remarks:'',//备注
					status:'',//角色状态：启用或者禁用
					workbenchName: this.API.constObj.workbench.name //工作台
				},
				pageType:'add',//页面类型 pageType=add 新增/pageType=edit 修改
				rules: {
					name: [{
							required: true,
							message: '请输入角色名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 15,
							message: '角色名称 2-15 个字符',
							trigger: 'blur'
						}
					],
//					workbenchName: [{
//							required: true,
//							message: '请输入工作台',
//							trigger: 'blur'
//						},
//						{
//							min: 0,
//							max: 15,
//							message: '工作台 0-15 个字符',
//							trigger: 'blur'
//						}
//					],
					status: [{
							required: true,
							message: '请选择角色状态',
							trigger: 'blur'
						}
					],
					remarks: [{
							required: false,
							message: '请输入备注',
							trigger: 'blur'
						},
						{
							min: 0,
							max: 100,
							message: '备注在 0-100 个字符',
							trigger: 'blur'
						}
					]
					
				}
			}
		},
		created() {
			if(JSON.stringify(this.roleObj)!="{}"){
				this.pageType = 'edit';
				this.setFormData();//表单赋值
			}else{
				this.pageType ='add';
			}
		},
		mounted() {
		},
		computed: {
			
		},
		methods: {
			/*
	         * 角色状态下拉框组件回调方法--子组件回调数据的方法
	         * @id {String} 选中的id
	         */
	        RoleStatusCall(id){
				this.roleForm.status = id;
	        },
			/*
			 * 取消
			 */
			cancelOpt(){
				this.resetForm();//重置表单
				//调用父组件方法--isRefresh=false不需要刷新父组件的数据
				this.$emit("addOrEditRoleCallBack",false);
			},
			/**
			 * 添加角色
			 * @param formName {Object} form表单名称
			 */
			addRoleGroup(formName) {
				delete this.roleForm.id;//删除表单对象中的id属性
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
		                self.$axios({
		                	loading:{
		            			isShow:true,
		            			target:'.addOrEditRole'
		            		},
		            		method:'post',
		                	url:self.API.saveOrUpdateRole, 
		                	data:self.roleForm
		                }).then((res) => {
		                    var resData = res.data;
		                    if(resData.code =="1"){
		                    	self.$message({
						            type: 'success',
						            message: '添加角色成功!'
						        });
						        self.resetForm();//重置表单
						        //调用父组件方法--isRefresh=true需要刷新父组件的数据
								self.$emit("addOrEditRoleCallBack",true);
		                    }else{
					          	self.$message({
						            type: 'error',
						            message: '添加角色失败，请退出重试！'
					          	});
		                    }
		                }).catch((err) => {
		                	self.$message({
					            type: 'error',
					            message: '请求异常，请检查网络！'
					        });  
		                })
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			/**
			 * 修改角色信息
			 * @param formName {Object} form表单名称
			 */
			editRoleGroup(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
		                self.$axios({
		                	loading:{
		            			isShow:true,
		            			target:'.addOrEditRole'
		            		},
		            		method:'post',
		                	url:self.API.saveOrUpdateRole, 
		                	data:self.roleForm
		                }).then((res) => {
		                    var resData = res.data;
		                    if(resData.code =="1"){
		                    	self.$message({
						            type: 'success',
						            message: '修改角色信息成功!'
						        });
						        self.resetForm();//重置表单
						        //调用父组件方法--isRefresh=true需要刷新父组件的数据
								self.$emit("addOrEditRoleCallBack",true);
		                    }else{
					          	self.$message({
						            type: 'error',
						            message: '修改角色信息失败，请退出重试！'
					          	});
		                    }
		                }).catch((err) => {
		                	self.$message({
					            type: 'error',
					            message: '请求异常，请检查网络！'
					        });  
		                })
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			/**
			 * 表单赋值
			 */
			setFormData(){
				this.roleForm.id=this.roleObj.id;
				this.roleForm.name=this.roleObj.name;
				this.roleForm.workbenchid=this.roleObj.workbenchid;
				this.roleForm.remarks=this.roleObj.remarks;
				this.roleForm.status=this.roleObj.status;
				this.roleForm.workbenchName = this.roleObj.workbenchName;
			},
			/*
			 * 重置表单
			 */
			resetForm(){
				this.pageType ='add';
				this.$refs['roleForm'].resetFields();
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.addOrEditRole {
		.dialog-footer{
			margin-top:15px;
			text-align: center;
		}
		.el-select{
			width:100%;
		}
	}
</style>