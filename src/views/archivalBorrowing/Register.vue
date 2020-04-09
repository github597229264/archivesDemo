<template>
	<div class="register">
		<el-form :model="registerFrom" :rules="rules" ref="registerFrom" label-width="100px" class="demo-ruleForm" size="small">
			<el-row :gutter="15">
				<el-col :span="14">
					<el-form-item label="查阅人部门" prop="applyManOrg">
						<el-input v-model="registerFrom.applyManOrg" placeholder="请输入查阅人的部门"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="9">
					<el-form-item label="查借阅类型" prop="applyTypeId">
						<div class="applyTypeIdSelect">
			                <ApplyTypeSelect :chioceOptionId="registerFrom.applyTypeId"  @ApplyTypeCall="ApplyTypeCall"></ApplyTypeSelect>
			           </div>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item label="查阅人姓名" prop="applyManName">
						<el-input v-model="registerFrom.applyManName" placeholder="输入查阅人姓名"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item label="联系方式" prop="contactWay">
						<el-input v-model="registerFrom.contactWay" placeholder="请输入联系方式"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="9">
					<el-form-item label="查借阅目的" prop="purposeId">
						<div class="readReasonsSelect">
			                <ReadReasonsSelect :chioceOptionId="registerFrom.purposeId"  @ReadReasonsCall="ReadReasonsCall"></ReadReasonsSelect>
			           </div>
					</el-form-item>
				</el-col>
				<el-col :span="14">
					<el-form-item label="登记日期" prop="registerDate">
						<el-date-picker v-model="registerFrom.registerDate" type="daterange" range-separator="至" start-placeholder="选择查阅开始日期" end-placeholder="选择查阅结束日期" value-format="yyyy-MM-dd"  @blur="getDate" @change="getDate">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="9">
					<el-form-item label="身份证号码" prop="IDNumber">
						<el-input v-model="registerFrom.IDNumber" placeholder="请输入身份证号"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="详细描述" prop="describe">
						<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}" v-model="registerFrom.describe"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-row  v-if="pageType == 'add'">
			<el-col :span="23">
			  <el-button type="primary" @click="chioceFileVisible = true">选择档案</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="23">
				<el-table :data="chioceFileData" class="chioceFileTable" empty-text="暂无数据，请先选择档案" border height="190px">
					<el-table-column fixed label="操作" width="80" align="center" v-if="pageType == 'add'">
						<template slot-scope="scope">
							<el-button type="text" @click="delFileOwner(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
					<el-table-column type="index" label="序号" width="50"></el-table-column>
					<el-table-column prop="a0101" label="姓名" width="100"></el-table-column>
					<el-table-column prop="a0104" label="姓别" width="80"></el-table-column>
					<el-table-column prop="a0107" label="出生日期" width="100"></el-table-column>
					<el-table-column prop="a0117" label="民族" width="140"></el-table-column>
					<el-table-column prop="a0111a" label="籍贯"></el-table-column>
					<el-table-column prop="isReturn" label="是否归还"  width="100"  v-if="pageType == 'edit'"></el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<el-dialog width="60%" height="50%" title="档案选择" :visible.sync="chioceFileVisible"  append-to-body v-if="pageType == 'add'">
			<FileSelection @GetChioceFiles="getChioceFiles"></FileSelection>
		</el-dialog>
		<div slot="footer" class="dialog-footer">
			<el-button v-if="pageType == 'add'" type="primary" @click="addRegister('registerFrom')">立即登记</el-button>
			<el-button v-else-if="pageType == 'edit'" type="primary" @click="editRegister('registerFrom')">立即保存</el-button>
			<el-button @click="cancelRegister">取 消</el-button>
		</div>
	</div>
</template>

<script>
	import FileSelection from '../../components/FileSelection.vue';
	import ApplyTypeSelect from '../../components/ApplyTypeSelect.vue';
	import ReadReasonsSelect from '../../components/ReadReasonsSelect.vue';
	
	export default {
		name:'Register', //登记和编辑
		components: {
			FileSelection,//选择档案组件
			ApplyTypeSelect, //查借阅类型下拉框
			ReadReasonsSelect//查借阅理由或目的下拉框
		},
		props:['registerObj'],//registerObj选中的登记信息
		data() {
			let self = this;
			return {
				chioceFileVisible: false,
				registerFrom: {
					id:'',//登记id
					applyManName: '', //登记人
					registerDate: '', //登记日期--日期控件专用
					readingStartTime: '', //登记开始日期
					readingEndTime: '', //登记结束日期
					applyTypeId: '', //查借阅类型
					purposeId:'',//查借阅目的
					applyManOrg: '', //登记人部门
					contactWay: '', //联系方式
					IDNumber: '', //身份证号
					describe: '', //描述
					fileID:''//选择的档案的id 逗号拼接
				},
				pageType:'add',//页面类型 pageType=add 新增/pageType=edit 修改
				chioceFileData: [], //选中的档案人员数据
				rules: {
					applyManName: [{
							required: true,
							message: '请输入登记人',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 50,
							message: '长度在 3 到 50 个字符',
							trigger: 'blur'
						}
					],
					applyManOrg: [{
							required: true,
							message: '请输入登记人部门',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 50,
							message: '长度在 2 到 50 个字符',
							trigger: 'blur'
						}
					],
					contactWay: [{
							required: true,
							message: '请输入联系方式',
							trigger: 'blur'
						},
						{
							min: 7,
							max: 11,
							message: '长度在7到 11 个字符',
							trigger: 'blur'
						}
					],
					applyTypeId: [{
						required: true,
						message: '请选择查借阅类型',
						trigger: 'change'
					}],
					purposeId: [{
						required: true,
						message: '请选择查借阅目的',
						trigger: 'change'
					}],
					registerDate: [
						{
							required: true,
							message: '请选择登记起止日期',
							trigger: ['change','blur']
						},
						{
							validator:function(rule,value,callback){
								let currTime = new Date().getTime();
								let startTime = new Date(value[0]).getTime();
								let endTime = new Date(value[1]).getTime();
					            if(startTime < currTime || endTime < currTime){
					                callback(new Error("登记开始和结束时间必须大于当前时间"));
					            }else{
					            	callback();
					            }
					        }, 
					    	trigger: 'change'
					    }
					],
					IDNumber: [
						{
							required: true,
							message: '请输入身份证号',
							trigger: 'blur'
						},
						{
							validator:function(rule,value,callback){
					            if(self.commonFun.checkIdCard(value) == false){
					                callback(new Error("身份证号无效!"));
					            }else{
					                callback();
					            }
					        }, 
					    	trigger: 'blur'
					    }
					],
					describe: [{
						required: false,
						message: '请输入详细描述',
						trigger: 'blur'
					}]
				}
			}
		},
		created() {
			if(JSON.stringify(this.registerObj)!=="{}"){
				this.pageType = 'edit';
				this.setFormData();//表单赋值
				this.getFilesById();//根据登记id获取档案人员信息列表
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
	         * 查借阅类型下拉框组件回调方法--子组件回调数据的方法
	         * @id {String} 选中的id
	         */
	        ApplyTypeCall(id){
				this.registerFrom.applyTypeId = id;
	        },
			/*
	         * 查借阅理由或目的下拉框组件回调方法--子组件回调数据的方法
	         * @id {String} 选中的id
	         */
	        ReadReasonsCall(id){
				this.registerFrom.purposeId = id;
	        },
			/**
			 * 表单赋值
			 */
			setFormData(){
				this.registerFrom.id=this.registerObj.id,//登记id
				this.registerFrom.applyManName=this.registerObj.applymanname;
				this.registerFrom.readingStartTime=this.registerObj.readingstarttime;
				this.registerFrom.readingEndTime=this.registerObj.readingendtime;
				this.registerFrom.applyTypeId=this.registerObj.applyTypeId;
				this.registerFrom.purposeId=this.registerObj.purposeId;
				this.registerFrom.applyManOrg=this.registerObj.applymanorg;
				this.registerFrom.contactWay=this.registerObj.contactway;
				this.registerFrom.IDNumber=this.registerObj.idnumber;
				this.registerFrom.describe=this.registerObj.describe;
				this.registerFrom.registerDate=[new Date(this.registerObj.readingstarttime), new Date(this.registerObj.readingendtime)];
			},
			/**
			 * 根据登记id获取档案人员信息列表
			 */
			getFilesById(){
                this.$axios({
                	loading:{
            			isShow:true,
            			target:'.register'
            		},
            		method:'get',
                	url:this.API.getA01BySite, 
                	params:{
	                    'id': this.registerObj.id
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.chioceFileData = resData.data;
                    	this.concatParams(this);//拼装参数
                    }else{
			          	this.$message({
				            type: 'error',
				            message: '查询档案人员信息失败，请刷新重试！'
			          	});     
                    }
                }).catch((err) => {
                	console.log("查询档案人员信息列表="+err);
                	this.$message({
			            type: 'error',
			            message: '请求异常，请检查网络！'
			        });  
                })
			},
			/*
			 * 监听获取日期 
			 * @param dateObj {Array} 选中的日期，分别为开始日期和结束日期
			 */
			getDate(dateObj){
				if(dateObj && dateObj.length == 2){
					this.registerFrom.readingStartTime = dateObj[0];
					this.registerFrom.readingEndTime = dateObj[1];
				}
			},
			/**
			 * 添加查借登记
			 * @param formName {Object} form表单名称
			 */
			addRegister(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(self.chioceFileData.length < 1){
						self.$message({
				            type: 'warning',
				            message: '您还没有选择档案!'
				        });
				        return;
					}
					if(valid) {
						let submitObj={
							applymanname: self.registerFrom.applyManName, //登记人
							readingstarttime: self.registerFrom.readingStartTime, //登记开始日期
							readingendtime:  self.registerFrom.readingEndTime, //登记结束日期
							applytype:  self.registerFrom.applyTypeId, //查借阅类型id
							purpose: self.registerFrom.purposeId,//查借阅理由id
							applymanorg:  self.registerFrom.applyManOrg, //登记人部门
							contactway:  self.registerFrom.contactWay, //联系方式
							idnumber:  self.registerFrom.IDNumber, //身份证号
							describe:  self.registerFrom.describe, //描述
							a0100:self.registerFrom.fileID
						};
						
		                self.$axios({
		                	loading:{
		            			isShow:true,
		            			target:'.register'
		            		},
		            		method:'post',
		                	url:self.API.register, 
		                	data:submitObj
		                }).then((res) => {
		                    var resData = res.data;
		                    if(resData.code =="1"){
		                    	self.$message({
						            type: 'success',
						            message: '登记成功!'
						        });
						        self.resetForm();//重置表单
						        //调用父组件方法--isRefresh=true需要刷新父组件的数据
								self.$emit("RegisterCallBack",true);
		                    }else{
					          	self.$message({
						            type: 'error',
						            message: '登记失败，请退出重试！'
					          	});
		                    }
		                }).catch((err) => {
		                	console.log("登记="+err);
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
			 * 修改查借登记
			 * @param formName {Object} form表单名称
			 */
			editRegister(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(self.chioceFileData.length < 1){
						self.$message({
				            type: 'warning',
				            message: '您还没有选择档案!'
				        });
				        return;
					}
					if(valid) {
						let submitObj={
							id: self.registerFrom.id,//登记id
							applymanname: self.registerFrom.applyManName, //登记人
							readingstarttime: self.registerFrom.readingStartTime, //登记开始日期
							readingendtime:  self.registerFrom.readingEndTime, //登记结束日期
							applytype:  self.registerFrom.applyTypeId, //查借阅类型id
							purpose: self.registerFrom.purposeId,//查借阅理由id
							applymanorg:  self.registerFrom.applyManOrg, //登记人部门
							contactway:  self.registerFrom.contactWay, //联系方式
							idnumber:  self.registerFrom.IDNumber, //身份证号
							describe:  self.registerFrom.describe //描述
						};
						
		                self.$axios({
		                	loading:{
		            			isShow:true,
		            			target:'.register'
		            		},
		            		method:'post',
		                	url:self.API.updateSite, 
		                	data:submitObj
		                }).then((res) => {
		                    var resData = res.data;
		                    if(resData.code =="1"){
		                    	self.$message({
						            type: 'success',
						            message: '登记保存成功!'
						        });
						        self.resetForm();//重置表单
						        //调用父组件方法--isRefresh=true需要刷新父组件的数据
								self.$emit("RegisterCallBack",true);
		                    }else{
					          	self.$message({
						            type: 'error',
						            message: '登记保存失败，请退出重试！'
					          	});
		                    }
		                }).catch((err) => {
		                	console.log("登记保存="+err);
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
			 * 取消登记
			 */
			cancelRegister(){
				console.log(1111);
				this.resetForm();//重置表单
				//调用父组件方法--isRefresh=false不需要刷新父组件的数据
				this.$emit("RegisterCallBack",false);
			},
			/*
			 * 重置表单
			 */
			resetForm(){
				this.pageType ='add';
				this.chioceFileVisible=false;
				this.chioceFileData =[];
				this.$refs['registerFrom'].resetFields();
			},
			/*
			 * 获取选择的档案数据组件回调方法--子组件回传数据的方法
			 * @fileList {Array} 选中的档案数据列表
			 */
			getChioceFiles(fileList) {
				console.log("FileList=" + JSON.stringify(fileList));
				//合并数组并去重
				this.chioceFileData = this.commonFun.concatArray(this.chioceFileData,fileList,"a0100");
				this.concatParams(this);//拼装参数
				this.chioceFileVisible = false;
			},
			/**
			 * 删除 选中的档案
			 * @param index {Number} 选中的列表行号
			 * @param row {Object} 选中行的数据对象
			 */
			delFileOwner(index,row){
				this.chioceFileData.splice(index, 1);
				this.concatParams(this);//拼装参数
			},
			/**
			 * 拼装参数
			 * @param that {Number} this对象
			 */
			concatParams(that){
				let fileList='';
				that.chioceFileData.forEach(function(value, index, array){
					if(index == array.length-1){
						fileList +=value.a0100;
					}else{
						fileList +=value.a0100+",";
					}
				})
				that.registerFrom.fileID =fileList;
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.register {
		.el-row {
			.el-col {
				.chioceFileTable {
					margin: 10px 0 10px 0;
				}
			}
		}
		.dialog-footer{
			text-align: center;
		}
	}
</style>