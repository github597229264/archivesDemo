<template>
	<div class="book">
		<el-form :model="borrowForm" :rules="rules" ref="borrowForm" label-width="100px" class="demo-ruleForm" size="small">
			<el-row :gutter="15">
				<el-col :span="13">
					<el-form-item label="预约人部门" prop="appointorDep">
						<el-input v-model="borrowForm.appointorDep" placeholder="请输入预约人部门"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="10">
					<el-form-item label="预约人" prop="appointor">
						<el-input v-model="borrowForm.appointor" placeholder="请输入预约人"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="13">
					<el-form-item label="查借阅类型" prop="applyTypeId">
						<div class="applyTypeIdSelect">
			                <ApplyTypeSelect :chioceOptionId="borrowForm.applyTypeId"  @ApplyTypeCall="ApplyTypeCall"></ApplyTypeSelect>
			           </div>
					</el-form-item>
				</el-col>
				<el-col :span="10">
					<el-form-item label="联系方式" prop="contactWay">
						<el-input v-model="borrowForm.contactWay" placeholder="请输入联系方式"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="13">
					<el-form-item label="预约时间" prop="appointDate">
						<el-date-picker 
							v-model="borrowForm.appointDate" 
							type="daterange" 
							range-separator="至" 
							start-placeholder="选择预约开始日期" 
							end-placeholder="选择预约结束日期" 
							value-format="yyyy-MM-dd"  
							@blur="getDate" 
							@change="getDate"
							>
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="10">
					<el-form-item label="身份证号" prop="IDNumber">
						<el-input v-model="borrowForm.IDNumber" placeholder="请输入身份证号"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="详细描述" prop="describe">
						<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}" v-model="borrowForm.describe"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-row>
			<el-col :span="23">
			  <el-button type="primary" @click="chioceFileVisible = true">选择档案</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="23">
				<el-table :data="chioceFileData" class="chioceFileTable" empty-text="暂无数据，请先选择档案" border height="190px">
					<el-table-column fixed label="操作" width="80" align="center">
						<template slot-scope="scope">
							<el-button type="text" @click="delFileOwner(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
					<el-table-column type="index" label="序号" width="50"></el-table-column>
					<el-table-column prop="a0101" label="姓名" width="100"></el-table-column>
					<el-table-column prop="a0104" label="性别" width="80"></el-table-column>
					<el-table-column prop="a0107" label="出生日期" width="100"></el-table-column>
					<el-table-column prop="a0117" label="民族" width="140"></el-table-column>
					<el-table-column prop="a0111a" label="籍贯"></el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<el-dialog width="60%" height="50%" title="档案选择" :visible.sync="chioceFileVisible"  append-to-body  :close-on-click-modal="false">
			<FileSelection @GetChioceFiles="getChioceFiles"></FileSelection>
		</el-dialog>
		<div slot="footer" class="dialog-footer">
			<el-button v-if="pageType == 'add'" type="primary" @click="addBook('borrowForm')">立即预约</el-button>
			<el-button v-else-if="pageType == 'edit'" type="primary" @click="editBook('borrowForm')">立即保存</el-button>
			<el-button @click="cancelBook">取 消</el-button>
		</div>
	</div>
</template>

<script>
	import FileSelection from '../../components/FileSelection.vue';
	import ApplyTypeSelect from '../../components/ApplyTypeSelect.vue';
	export default {
		name: 'Book', //预约和编辑
		components: {
			FileSelection,//选择档案组件
			ApplyTypeSelect //查借阅类型下拉框
		},
		props:['bookObj'],//bookObj选中的预约信息
		data() {
			let self = this;
			return {
				chioceFileVisible: false,
				borrowForm: {
					id:'',//预约id  编辑提交时使用
					appointor: '', //预约人
					appointDate: '', //预约日期--日期控件专用
					appointStartDate: '', //预约开始日期
					appointEndDate: '', //预约结束日期
					applyTypeId: '', //查借阅类型
					appointorDep: '', //预约人部门
					contactWay: '', //联系方式
					IDNumber: '', //身份证号
					describe: '', //描述
					fileID:'',//选择的档案的id 逗号拼接
					fileName:''//选择的档案人的姓名 空格拼接
				},
				pageType:'add',//页面类型 pageType=add 新增/pageType=edit 修改
				chioceFileData: [], //选中的档案人员数据
				rules: {
					appointor: [{
							required: true,
							message: '请输入预约人',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 50,
							message: '长度在 3 到 50 个字符',
							trigger: 'blur'
						}
					],
					appointorDep: [{
							required: true,
							message: '请输入预约人部门',
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
							min: 11,
							max: 11,
							message: '长度必须是 11位字符',
							trigger: 'blur'
						}
					],
					applyTypeId: [{
						required: true,
						message: '请选择查借阅类型',
						trigger: 'change'
					}],
					appointDate: [
						{
							required: true,
							message: '请选择预约起始时间',
							trigger: ['change','blur']
						},
						{
							validator:function(rule,value,callback){
								let currTime = new Date().getTime();
								let startTime = new Date(value[0]).getTime();
								let endTime = new Date(value[1]).getTime();
					            if(startTime < currTime || endTime < currTime){
					                callback(new Error("预约开始和结束时间必须大于当前时间"));
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
			if(JSON.stringify(this.bookObj)!=="{}"){
				this.pageType = 'edit';
				this.setFormData();//表单赋值
				this.getFilesById();//根据预约id获取档案人员信息列表
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
				this.borrowForm.applyTypeId = id;
	        },
			/**
			 * 表单赋值
			 */
			setFormData(){
				this.borrowForm.id=this.bookObj.id;
				this.borrowForm.appointor=this.bookObj.appointor;
				this.borrowForm.appointStartDate=this.bookObj.appointstartdate;
				this.borrowForm.appointEndDate=this.bookObj.appointenddate;
				this.borrowForm.applyTypeId=this.bookObj.applyTypeId;
				this.borrowForm.appointorDep=this.bookObj.appointordep;
				this.borrowForm.contactWay=this.bookObj.contactway;
				this.borrowForm.IDNumber=this.bookObj.idnumber;
				this.borrowForm.describe=this.bookObj.describe;
				this.borrowForm.appointDate=[new Date(this.bookObj.appointstartdate), new Date(this.bookObj.appointenddate)];
			},
			/**
			 * 根据预约id获取档案人员信息列表
			 */
			getFilesById(){
                this.$axios({
                	loading:{
            			isShow:true,
            			target:'.book'
            		},
            		method:'get',
                	url:this.API.getA01ByBorrowAndReadId, 
                	params:{
	                    'id': this.bookObj.id
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
					this.borrowForm.appointStartDate = dateObj[0];
					this.borrowForm.appointEndDate = dateObj[1];
				}
			},
			/**
			 * 添加查借预约
			 * @param formName {Object} form表单名称
			 */
			addBook(formName) {
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
							appointor: self.borrowForm.appointor, //预约人
							appointstartdate: self.borrowForm.appointStartDate, //预约开始日期
							appointenddate:  self.borrowForm.appointEndDate, //预约结束日期
							applytype:  self.borrowForm.applyTypeId, //查借阅类型
							appointordep:  self.borrowForm.appointorDep, //预约人部门
							contactway:  self.borrowForm.contactWay, //联系方式
							idnumber:  self.borrowForm.IDNumber, //身份证号
							describe:  self.borrowForm.describe, //描述
							a0100:self.borrowForm.fileID,
							name:self.borrowForm.fileName
						};
						
		                self.$axios({
		                	loading:{
		            			isShow:true,
		            			target:'.book'
		            		},
		            		method:'post',
		                	url:self.API.addBorrowAndRead, 
		                	data:submitObj
		                }).then((res) => {
		                    var resData = res.data;
		                    if(resData.code =="1"){
		                    	self.$message({
						            type: 'success',
						            message: '预约成功!'
						        });
						        self.resetForm();//重置表单
						        //调用父组件方法--isRefresh=true需要刷新父组件的数据
								self.$emit("BookCallBack",true);
		                    }else{
					          	self.$message({
						            type: 'error',
						            message: '预约失败，请退出重试！'
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
			 * 修改查借预约
			 * @param formName {Object} form表单名称
			 */
			editBook(formName) {
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
							id: self.borrowForm.id,//预约id
							appointor: self.borrowForm.appointor, //预约人
							appointstartdate: self.borrowForm.appointStartDate, //预约开始日期
							appointenddate:  self.borrowForm.appointEndDate, //预约结束日期
							applytype:  self.borrowForm.applyTypeId, //查借阅类型
							appointordep:  self.borrowForm.appointorDep, //预约人部门
							contactway:  self.borrowForm.contactWay, //联系方式
							idnumber:  self.borrowForm.IDNumber, //身份证号
							describe:  self.borrowForm.describe, //描述
							a0100:self.borrowForm.fileID,
							name:self.borrowForm.fileName
						};
		                self.$axios({
		                	loading:{
		            			isShow:true,
		            			target:'.book'
		            		},
		            		method:'post',
		                	url:self.API.updateBorrowAndRead, 
		                	data:submitObj
		                }).then((res) => {
		                    var resData = res.data;
		                    if(resData.code =="1"){
		                    	self.$message({
						            type: 'success',
						            message: '预约修改成功!'
						        });
						        self.resetForm();//重置表单
						        //调用父组件方法--isRefresh=true需要刷新父组件的数据
								self.$emit("BookCallBack",true);
		                    }else{
					          	self.$message({
						            type: 'error',
						            message: '预约修改失败，请退出重试！'
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
			 * 取消预约
			 */
			cancelBook(){
				this.resetForm();//重置表单
				//调用父组件方法--isRefresh=false不需要刷新父组件的数据
				this.$emit("BookCallBack",false);
			},
			/*
			 * 重置表单
			 */
			resetForm(){
				this.pageType ='add';
				this.chioceFileVisible=false;
				this.chioceFileData =[];
				this.$refs['borrowForm'].resetFields();
			},
			/*
			 * 获取选择的档案数据组件回调方法--子组件回传数据的方法
			 * @fileList {Array} 选中的档案数据列表
			 */
			getChioceFiles(fileList) {
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
				let fileList='',nameList='';
				that.chioceFileData.forEach(function(value, index, array){
					if(index == array.length-1){
						fileList +=value.a0100;
						nameList +=value.a0101;
					}else{
						fileList +=value.a0100+",";
						nameList +=value.a0101+" ";
					}
				})
				that.borrowForm.fileID =fileList;
				that.borrowForm.fileName =nameList;
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.book {
		.el-row {
			.el-col {
				.chioceFileTable {
					margin: 10px 0 10px 0;
				}
				.el-date-picker{
					width:200px;
				}
			}
		}
		.dialog-footer{
			text-align: center;
		}
	}
</style>