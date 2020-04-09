<template>
	<div class="addOrEditPage">
		<el-form :model="pageForm" :rules="rules" ref="pageForm" label-width="100px" class="demo-ruleForm" size="small">
			<el-row :gutter="15">
				<el-col :span="23">
					<el-form-item label="页面名称" prop="name">
						<el-input v-model="pageForm.name" minLength="2" maxLength="12" placeholder="请输入页面名称(2~12字符)"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="编码" prop="code">
						<el-input  v-model="pageForm.code"  minLength="2" maxLength="12" placeholder="请输入编码(2~12个字符)"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="路径" prop="path">
						<el-input type="textarea" v-model="pageForm.path" :autosize="{ minRows: 2, maxRows: 7}" minLength="2" maxLength="100" placeholder="请输入路径(2~100个字符)"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button v-if="pageType == 'add'" type="primary" @click="addOrEditPage('pageForm')">添加</el-button>
			<el-button v-else-if="pageType == 'edit'" type="primary" @click="addOrEditPage('pageForm')">保存</el-button>
			<el-button @click="cancelOpt">取 消</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'AddOrEditPage', //菜单对应子页面新增和编辑
		components: {
		},
		props:['menuObj'],//menuObj选中的预约信息
		data() {
			return {
				pageForm: {
					id:'',//菜单对应子页面id  编辑提交时使用
					menuid:'',//主菜单id
					name: '', //页面名称
					code: '', //编码
					path:''//路径
				},
				pageType:'add',//页面类型 pageType=add 新增/pageType=edit 修改
				rules: {
					name: [{
							required: true,
							message: '请输入页面名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 12,
							message: '机构名称必须是2-12 个字符',
							trigger: 'blur'
						}
					],
					code: [{
							required: true,
							message: '请输入编码',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 12,
							message: '编码必须是2-12 个字符',
							trigger: 'blur'
						}
					],
					path: [{
							required: true,
							message: '路径',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 100,
							message: '路径必须是2-100 个字符',
							trigger: 'blur'
						}
					]
				}
			}
		},
		created() {
			if(this.menuObj.id){
				this.pageType = 'edit';
				this.setFormData();//表单赋值
			}else{
				this.pageType ='add';
			}
			this.pageForm.menuid = this.menuObj.menuId; 
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
				this.pageForm.id=this.menuObj.id;
				this.pageForm.name=this.menuObj.name;
				this.pageForm.code=this.menuObj.code;
				this.pageForm.path=this.menuObj.path;
			},
			/**
			 * 添加/编辑页面
			 * @param formName {Object} form表单名称
			 */
			addOrEditPage(formName) {
				let tooltipText = "修改";
				let self = this;
				if(self.pageType == 'add'){
					tooltipText = "添加";
					delete self.pageForm.id;	
				}
				this.$refs[formName].validate((valid) => {
					if(valid) {
		                self.$axios({
		            		method:'post',
		                	url:self.API.saveMenuChilds, 
		                	data:self.pageForm
		                }).then((res) => {
		                    var resData = res.data;
		                    if(resData.code =="1"){
		                    	self.$message({
						            type: 'success',
						            message: tooltipText+'菜单子页面成功!'
						        });
						        self.resetForm();//重置表单
						        //调用父组件方法--isRefresh=true需要刷新父组件的数据
								self.$emit("AddOrEditPageCallBack",true);
		                    }else if(resData.code =="7"){
					          	self.$message({
						            type: 'error',
						            message: '页面名称或编码重复，请修改！'
					          	});
		                    }else{
					          	self.$message({
						            type: 'error',
						            message: tooltipText+'菜单子页面失败，请退出重试！'
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
				this.$emit("AddOrEditPageCallBack",false);
			},
			/*
			 * 重置表单
			 */
			resetForm(){
				this.pageType ='add';
				this.$refs['pageForm'].resetFields();
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.addOrEditPage {
		.dialog-footer{
			margin-top:15px;
			text-align: center;
		}
		.el-select{
			width:100%;
		}
	}
</style>