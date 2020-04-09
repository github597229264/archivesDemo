<template>
	<div class="addOrEditMenu">
		<el-form :model="menuForm" :rules="rules" ref="menuForm" label-width="110px" class="demo-ruleForm" size="small">
			<el-row :gutter="15">
				<el-col :span="12">
					<el-form-item label="菜单名称" prop="name">
						<el-input v-model="menuForm.name" placeholder="请输入菜单名称(3~12个字符)" minLength="3" maxLength="12"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="菜单编码" prop="code">
						<el-input v-model="menuForm.code" placeholder="请输入菜单编码(3~36个字符)" minLength="3" maxLength="36"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="菜单图标" prop="style">
						<el-input v-model="menuForm.style" placeholder="请输入菜单图标名(3~100个字符)" minLength="3" maxLength="100"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="上级菜单" prop="parentid">
			            <AllMenuTreeSelect :defaultOptions="defaultMenuTree"  @AllMenuTreeSelectCall="AllMenuTreeSelectCall"></AllMenuTreeSelect>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="菜单分类" prop="type">
			            <ModuleType :chioceOptionId="menuForm.type"  @ModuleTypeCall="ModuleTypeCall"></ModuleType>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="是否启用" prop="isenable">
						<el-select v-model="menuForm.isenable" placeholder="请选择">
						    <el-option
						      v-for="item in isEnable"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="是否超级菜单" prop="issuperuser">
						<el-select v-model="menuForm.issuperuser" placeholder="请选择">
						    <el-option
						      v-for="item in isSuperMenu"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="是否三员" prop="istrilateral">
						<el-select v-model="menuForm.istrilateral" placeholder="请选择">
						    <el-option
						      v-for="item in isTrilateral"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="是否显示" prop="isshow">
						<el-select v-model="menuForm.isshow" placeholder="请选择">
						    <el-option
						      v-for="item in isShow"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="访问地址" prop="path">
						<el-input v-model="menuForm.path" placeholder="请输入访问地址(不超过100个字符)"  minLength="1" maxLength="100"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button v-if="pageType == 'add'" type="primary" @click="addOrEditMenu('menuForm')">添加</el-button>
			<el-button v-else-if="pageType == 'edit'" type="primary" @click="addOrEditMenu('menuForm')">保存</el-button>
			<el-button @click="cancelOperation">取 消</el-button>
		</div>
	</div>
</template>

<script>
	import ModuleType from '../../components/ModuleType.vue';
	import AllMenuTreeSelect from '../../components/AllMenuTreeSelect.vue';
	export default {
		name: 'AddOrEditMenu', //新增和编辑菜单
		components: {
			AllMenuTreeSelect,//菜单树下拉框
			ModuleType//菜单分类
		},
		props:['menuObject'],//menuObject选中的菜单信息
		data() {
			return {
				menuForm: {
					id:'',//菜单id  编辑提交时使用
					name: '', //菜单名称
					path: '', //菜单访问路径
					code: '', //菜单编号
					style:'',//菜单图标
					type: '', //菜单分类
					parentid:'',//父菜单id
					istrilateral: false, //是否三员
					isshow: true, //是否显示
					isenable:true,//是否启用
					issuperuser: false, //是否超级菜单
				},
				defaultMenuTree:[],//默认菜单树选中项
				isTrilateral:[//是否三员
					{value:true,label:"是"},
					{value:false,label:"否"},
				],
				isShow:[//是否显示
					{value:true,label:"是"},
					{value:false,label:"否"},
				],
				isEnable:[//是否启用
					{value:true,label:"是"},
					{value:false,label:"否"},
				],
				isSuperMenu:[//是否超级菜单
					{value:true,label:"是"},
					{value:false,label:"否"},
				],
				pageType:'add',//页面类型 pageType=add 新增/pageType=edit 修改
				rules: {
					name: [{
							required: true,
							message: '请输入菜单名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 12,
							message: '长度在 3 到 12 个字符',
							trigger: 'blur'
						}
					],
					code: [{
							required: true,
							message: '请输入菜单编码',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 36,
							message: '长度在3到 36 个字符',
							trigger: 'blur'
						}
					],
					style:[{
							required: true,
							message: '请输入菜单图标',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 100,
							message: '长度在3到 100 个字符',
							trigger: 'blur'
						}
					],
					path: [{
							required: true,
							message: '请输入访问地址',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 100,
							message: '长度在1到 100 个字符',
							trigger: 'blur'
						}
					],
					type: [{
							required: true,
							message: '请选择菜单分类',
							trigger: 'blur'
						}
					],
					istrilateral: [{
							required: true,
							message: '请选择是否三员',
							trigger: 'blur'
						}
					],
					isenable: [{
							required: true,
							message: '请选择是否启用',
							trigger: 'blur'
						}
					],
					issuperuser: [{
							required: true,
							message: '请选择是否超级菜单',
							trigger: 'blur'
						}
					],
					isshow: [{
							required: true,
							message: '请选择是否显示',
							trigger: 'blur'
						}
					]
				}
			}
		},
		created() {
			if(JSON.stringify(this.menuObject)!=="{}"){
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
	         * 菜单分类下拉框组件回调方法--子组件回调数据的方法
	         * @param {Object} checkedObj 选中对象
	         */
	        ModuleTypeCall(checkedObj){
	        	if(checkedObj.id && checkedObj.id.length > 0){
	        		this.menuForm.type = checkedObj.id;	
	        	}else{
	        		this.menuForm.type = '';
	        	}
	        },
			/*
	         * 菜单树下拉框组件回调方法--子组件回调数据的方法
	         * @param {Object} checkedObj 选中对象
	         */
	        AllMenuTreeSelectCall(checkedObj){
	        	if(checkedObj && checkedObj.id){
	        		this.menuForm.parentid = checkedObj.id;	
	        	}else{
	        		this.menuForm.parentid = '';
	        	}
	        },
			/**
			 * 表单赋值
			 */
			setFormData(){
				this.menuForm.id=this.menuObject.id;
				this.menuForm.name=this.menuObject.name;
				this.menuForm.path=this.menuObject.path;
				this.menuForm.code=this.menuObject.code;
				this.menuForm.type=this.menuObject.type;
				this.menuForm.style=this.menuObject.style;
				this.menuForm.parentid=this.menuObject.parentid;
				this.menuForm.istrilateral=this.menuObject.istrilateral;
				this.menuForm.isshow=this.menuObject.isshow;
				this.menuForm.isenable=this.menuObject.isenable;
				this.menuForm.issuperuser = this.menuObject.issuperuser;
				this.defaultMenuTree.push(this.menuObject.parentid);
			},
			/**
			 * 添加菜单
			 * @param formName {Object} form表单名称
			 */
			addOrEditMenu(formName) {
				let tooltipText = "修改";
				let self = this;
				if(self.pageType == 'add'){
					tooltipText = "添加";
					delete self.menuForm.id;	
				}
				this.$refs[formName].validate((valid) => {
					if(valid) {
		                self.$axios({
		            		method:'post',
		                	url:self.API.saveOrUpdateMenu, 
		                	data:self.menuForm
		                }).then((res) => {
		                    var resData = res.data;
		                    if(resData.code =="1"){
		                    	self.$message({
						            type: 'success',
						            message: tooltipText+'菜单成功!'
						        });
						        self.resetForm();//重置表单
						        //调用父组件方法--isRefresh=true需要刷新父组件的数据
								self.$emit("AddOrEditMenuCallBack",true);
		                    }else if(resData.code =="4"){
					          	self.$message({
						            type: 'error',
						            message: '菜单名称或菜单编码已存在，请修改！'
					          	});
		                    }else{
					          	self.$message({
						            type: 'error',
						            message: tooltipText+'菜单失败，请退出重试！'
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
			 * 取消操作
			 */
			cancelOperation(){
				this.resetForm();//重置表单
				//调用父组件方法--isRefresh=false不需要刷新父组件的数据
				this.$emit("AddOrEditMenuCallBack",false);
			},
			/*
			 * 重置表单
			 */
			resetForm(){
				this.pageType ='add';
				this.$refs['menuForm'].resetFields();
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.addOrEditMenu {
		.dialog-footer{
			margin-top:15px;
			text-align: center;
		}
		.el-select{
			width:100%;
		}
	}
</style>