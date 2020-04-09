<template>
	<div class="addOrEditUsers">
		<el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm" size="small">
			<el-row :gutter="15">
				<el-col :span="23">
					<el-form-item label="姓名" prop="cn">
						<el-input v-model="userForm.cn" placeholder="请输入姓名(2~12个字符)" minLength="2" maxLength="12"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="登录账户" prop="uid">
						<el-input v-model="userForm.uid" placeholder="请输入登录账户(2~30个字符)"  minLength="2" maxLength="30"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="岗位" >
						<div class="satationSelect">
			                <StationSelect :chioceOptionId="userForm.stationsid"  @StationSelectCall="StationSelectCall"></StationSelect>
			           </div>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="用户状态" >
						<div class="userStatusSelect">
			                <UserStatusSelect :chioceOptionId="userForm.status"  @UserStatusCall="UserStatusCall"></UserStatusSelect>
			           </div>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="是否三员">
						<el-select v-model="userForm.isinitial" placeholder="请选择">
						    <el-option
						      v-for="item in isTrilateral"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button v-if="pageType == 'add'" type="primary" @click="addUser('userForm')">添加</el-button>
			<el-button v-else-if="pageType == 'edit'" type="primary" @click="editUser('userForm')">保存</el-button>
			<el-button @click="cancelBook">取 消</el-button>
		</div>
	</div>
</template>

<script>
	import UserStatusSelect from '../../components/UserStatusSelect.vue';
	import StationSelect from '../../components/StationSelect.vue';
	export default {
		name: 'AddOrEditUsers', //用户新增和编辑
		components: {
			UserStatusSelect, //用户状态下拉框
			StationSelect//岗位下拉框
		},
		props:['userObj'],//userObj选中的预约信息
		data() {
			return {
				userForm: {
					id:'',//预约id  编辑提交时使用
					cn: '', //预约人
					stationsid: '', //岗位id
					uid: '', //登录账户名
					status: '', //状态id：启用或者禁用
					isinitial: false //是否三员
				},
				isTrilateral:[//是否三员
					{value:true,label:"是"},
					{value:false,label:"否"},
				],
				pageType:'add',//页面类型 pageType=add 新增/pageType=edit 修改
				rules: {
					cn: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 12,
							message: '长度在 2 到 12 个字符',
							trigger: 'blur'
						}
					],
					uid: [{
							required: true,
							message: '请输入登录账户名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 30,
							message: '长度在2 到 30 个字符',
							trigger: 'blur'
						}
					]
				}
			}
		},
		created() {
			if(JSON.stringify(this.userObj)!=="{}"){
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
	         * 岗位下拉框组件回调方法--子组件回调数据的方法
	         * @id {String} 选中的id
	         */
	        StationSelectCall(id){
				this.userForm.stationsid = id;
	        },
			/*
	         * 用户状态下拉框组件回调方法--子组件回调数据的方法
	         * @id {String} 选中的id
	         */
	        UserStatusCall(id){
				this.userForm.status = id;
	        },
			/**
			 * 表单赋值
			 */
			setFormData(){
				this.userForm.id=this.userObj.id;
				this.userForm.cn=this.userObj.cn;
				this.userForm.uid=this.userObj.uid;
				this.userForm.stationsid=this.userObj.stationsid;
				this.userForm.status=this.userObj.status;
				this.userForm.isinitial=this.userObj.isinitial;
			},
			/**
			 * 添加用户
			 * @param formName {Object} form表单名称
			 */
			addUser(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
		                self.$axios({
		                	loading:{
		            			isShow:true,
		            			target:'.addOrEditUsers'
		            		},
		            		method:'post',
		                	url:self.API.saveUser, 
		                	data:self.userForm
		                }).then((res) => {
		                    var resData = res.data;
		                    if(resData.code =="1"){
		                    	self.$message({
						            type: 'success',
						            message: '添加用户成功!'
						        });
						        self.resetForm();//重置表单
						        //调用父组件方法--isRefresh=true需要刷新父组件的数据
								self.$emit("UserCallBack",true);
		                    }else if(resData.code =="4"){
					          	self.$message({
						            type: 'error',
						            message: '姓名或登录账户已存在，请修改！'
					          	});
		                    }else{
					          	self.$message({
						            type: 'error',
						            message: '添加用户失败，请退出重试！'
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
			 * 修改用户信息
			 * @param formName {Object} form表单名称
			 */
			editUser(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
		                self.$axios({
		                	loading:{
		            			isShow:true,
		            			target:'.addOrEditUsers'
		            		},
		            		method:'post',
		                	url:self.API.updateUser, 
		                	data:self.userForm
		                }).then((res) => {
		                    var resData = res.data;
		                    if(resData.code =="1"){
		                    	self.$message({
						            type: 'success',
						            message: '修改用户信息成功!'
						        });
						        self.resetForm();//重置表单
						        //调用父组件方法--isRefresh=true需要刷新父组件的数据
								self.$emit("UserCallBack",true);
		                    }else if(resData.code =="4"){
					          	self.$message({
						            type: 'error',
						            message: '姓名或登录账户已存在，请修改！'
					          	});
		                    }else{
					          	self.$message({
						            type: 'error',
						            message: '修改用户信息失败，请退出重试！'
					          	});
		                    }
		                }).catch((err) => {
		                	console.log("预约保存="+err);
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
			 * 取消预约
			 */
			cancelBook(){
				this.resetForm();//重置表单
				//调用父组件方法--isRefresh=false不需要刷新父组件的数据
				this.$emit("UserCallBack",false);
			},
			/*
			 * 重置表单
			 */
			resetForm(){
				this.pageType ='add';
				this.$refs['userForm'].resetFields();
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.addOrEditUsers {
		.dialog-footer{
			margin-top:15px;
			text-align: center;
		}
		.el-select{
			width:100%;
		}
	}
</style>