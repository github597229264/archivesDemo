<template>
	<div class="addOrEditUsersGroup">
		<el-form :model="userGroupForm" :rules="rules" ref="userGroupForm" label-width="100px" class="demo-ruleForm" size="small">
			<el-row :gutter="15">
				<el-col :span="23">
					<el-form-item label="机构名称" prop="name">
						<el-input v-model="userGroupForm.name" minLength="3" maxLength="50" placeholder="请输入机构名称(3~50字符)"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="机构职能">
						<el-input type="textarea" v-model="userGroupForm.functions" :autosize="{ minRows: 2, maxRows: 7}" maxLength="100" placeholder="请输入机构职能(0~100个字符)"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="用户组状态" >
						<el-select v-model="userGroupForm.isenable" placeholder="请选择用户组状态">
						    <el-option
						      v-for="item in groupStatus"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="备注">
						<el-input type="textarea" v-model="userGroupForm.remarks" :autosize="{ minRows: 2, maxRows: 7}" maxLength="100" placeholder="请输入备注(0~100个字符)"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button v-if="pageType == 'add'" type="primary" @click="addUserGroup('userGroupForm')">添加</el-button>
			<el-button v-else-if="pageType == 'edit'" type="primary" @click="editUserGroup('userGroupForm')">保存</el-button>
			<el-button @click="cancelOpt">取 消</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'AddOrEditUsersGroup', //用户组新增和编辑
		components: {
		},
		props:['userGroupObj'],//userGroupObj选中的预约信息
		data() {
			return {
				userGroupForm: {
					id:'',//用户组id  编辑提交时使用
					name: '', //机构名称
					functions: '', //机构职能
					remarks:'',//备注
					isenable:true,//状态：启用或者禁用
					pid: '' //根节点id 添加提交时使用
				},
				groupStatus:[//用户组状态
					{value:true,label:"启用"},
					{value:false,label:"禁用"}
				],
				pageType:'add',//页面类型 pageType=add 新增/pageType=edit 修改
				rules: {
					name: [{
							required: true,
							message: '请输入机构名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 50,
							message: '机构名称 3-50 个字符',
							trigger: 'blur'
						}
					]
				}
			}
		},
		created() {
			console.log("11="+this.userGroupObj);
			if(this.userGroupObj.pId && this.userGroupObj.pId.length > 0){
				this.pageType ='add';
				this.userGroupForm.pid = this.userGroupObj.pId;
			}else{
				this.pageType = 'edit';
				this.setFormData();//表单赋值
				delete this.userGroupForm.pid;
				
			}
		},
		mounted() {
		},
		computed: {
			
		},
		methods: {
			/**
			 * 表单赋值
			 */
			setFormData(){
				this.userGroupForm.id=this.userGroupObj.id;
				this.userGroupForm.name=this.userGroupObj.name;
				this.userGroupForm.functions=this.userGroupObj.functions;
				this.userGroupForm.remarks=this.userGroupObj.remarks;
				this.userGroupForm.isenable=this.userGroupObj.isenable;
			},
			/**
			 * 添加用户
			 * @param formName {Object} form表单名称
			 */
			addUserGroup(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
		                self.$axios({
		                	loading:{
		            			isShow:true,
		            			target:'.addOrEditUsersGroup'
		            		},
		            		method:'post',
		                	url:self.API.saveOrUpdateOrganization, 
		                	data:self.userGroupForm
		                }).then((res) => {
		                    var resData = res.data;
		                    if(resData.code =="1"){
		                    	self.$message({
						            type: 'success',
						            message: '添加用户组成功!'
						        });
						        self.resetForm();//重置表单
						        //调用父组件方法--isRefresh=true需要刷新父组件的数据
								self.$emit("UserGroupCallBack",true);
		                    }else{
					          	self.$message({
						            type: 'error',
						            message: '添加用户组失败，请退出重试！'
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
			 * 修改用户组信息
			 * @param formName {Object} form表单名称
			 */
			editUserGroup(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
		                self.$axios({
		                	loading:{
		            			isShow:true,
		            			target:'.addOrEditUsersGroup'
		            		},
		            		method:'post',
		                	url:self.API.saveOrUpdateOrganization, 
		                	data:self.userGroupForm
		                }).then((res) => {
		                    var resData = res.data;
		                    if(resData.code =="1"){
		                    	self.$message({
						            type: 'success',
						            message: '修改用户组信息成功!'
						        });
						        self.resetForm();//重置表单
						        //调用父组件方法--isRefresh=true需要刷新父组件的数据
								self.$emit("UserGroupCallBack",true);
		                    }else{
					          	self.$message({
						            type: 'error',
						            message: '修改用户组信息失败，请退出重试！'
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
			/*
			 * 取消
			 */
			cancelOpt(){
				this.resetForm();//重置表单
				//调用父组件方法--isRefresh=false不需要刷新父组件的数据
				this.$emit("UserGroupCallBack",false);
			},
			/*
			 * 重置表单
			 */
			resetForm(){
				this.pageType ='add';
				this.$refs['userGroupForm'].resetFields();
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.addOrEditUsersGroup {
		.dialog-footer{
			margin-top:15px;
			text-align: center;
		}
		.el-select{
			width:100%;
		}
	}
</style>