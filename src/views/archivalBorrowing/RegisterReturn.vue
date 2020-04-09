<template>
	<div class="registerReturn">
		<el-form :model="registerFrom" ref="registerFrom"  label-width="100px" class="demo-ruleForm" size="small">
			<el-row :gutter="15">
				<el-col :span="14">
					<el-form-item label="查阅人部门">
						<el-input v-model="registerFrom.applyManOrg" placeholder="请输入查阅人的部门" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="9">
					<el-form-item label="查借阅类型">
						<el-input v-model="registerFrom.applyType" placeholder="请输入查借阅类型" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item label="查阅人姓名">
						<el-input v-model="registerFrom.applyManName" placeholder="请输入查阅人姓名" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item label="联系方式">
						<el-input v-model="registerFrom.contactWay" placeholder="请输入联系方式" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="9">
					<el-form-item label="查借阅目的">
			           <el-input v-model="registerFrom.purpose" placeholder="请输入查借阅目的" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="14">
					<el-form-item label="登记时间">
						<el-date-picker v-model="registerFrom.registerDate" type="daterange" range-separator="至" start-placeholder="选择登记开始日期" end-placeholder="选择登记结束日期" value-format="yyyy-MM-dd" disabled>
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="9">
					<el-form-item label="身份证号码">
						<el-input v-model="registerFrom.IDNumber" placeholder="请输入身份证号" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="详细描述">
						<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}" v-model="registerFrom.describe" readonly></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-row>
			<el-col :span="23">
				<el-table :data="chioceFileData" class="chioceFileTable" empty-text="暂无数据，请先选择档案" border height="200px">
					<el-table-column fixed label="操作" width="80" align="center">
						<template slot-scope="scope">
							<el-button type="text" v-if="scope.row.isReturn === '是'" class="gray">归还</el-button>
							<el-button type="text" v-else @click="returnFiles(scope.$index, scope.row)">归还</el-button>
						</template>
					</el-table-column>
					<el-table-column type="index" label="序号" width="50"></el-table-column>
					<el-table-column prop="a0101" label="姓名" width="100"></el-table-column>
					<el-table-column prop="a0104" label="姓别" width="80"></el-table-column>
					<el-table-column prop="a0107" label="出生日期" width="100"></el-table-column>
					<el-table-column prop="a0117" label="民族" width="140"></el-table-column>
					<el-table-column prop="a0111a" label="籍贯"></el-table-column>
	                <el-table-column prop="isReturn" label="是否已归还" sortable width="110"  align="center">
	                	<template slot-scope="scope">
					        <el-tag
					          :type="scope.row.isReturn === '否' ? 'warning' : 'success'"
					          disable-transitions>{{scope.row.isReturn}}</el-tag>
					    </template>
	                </el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<div slot="footer" class="dialog-footer">
			<el-button v-if="isAllReturned == true" type="primary" @click="returnAll">已归还全部</el-button>
			<el-button v-else type="primary" @click="returnAll">归还全部</el-button>
			<el-button  @click="closeReturn">关闭</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name:'RegisterReturn', //登记归还
		components: {},
		props:['registerObj'],//registerObj选中的登记信息
		data() {
			return {
				registerFrom: {
					id:'',//登记id
					applyManName: '', //登记人
					registerDate: '', //登记日期--日期控件专用
					readingStartTime: '', //登记开始日期
					readingEndTime: '', //登记结束日期
					applyType: '', //查借阅类型
					purpose:'',//查借阅目的
					applyManOrg: '', //登记人部门
					contactWay: '', //联系方式
					IDNumber: '', //身份证号
					describe: '', //描述
					fileID:''//选择的档案的id 逗号拼接
				},
				noReturnFiles:'',//还未归还的档案Id
				isAllReturned:false,//是否已全部归还 
				chioceFileData: [] //选中的档案人员数据
			}
		},
		created() {
			if(JSON.stringify(this.registerObj)!=="{}"){
				this.setFormData();//表单赋值
				this.getFilesById();//根据登记id获取档案人员信息列表
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
				this.registerFrom.id=this.registerObj.id,//登记id
				this.registerFrom.applyManName=this.registerObj.applymanname;
				this.registerFrom.readingStartTime=this.registerObj.readingstarttime;
				this.registerFrom.readingEndTime=this.registerObj.readingendtime;
				this.registerFrom.applyType=this.registerObj.applyType;
				this.registerFrom.purpose=this.registerObj.purpose;
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
				let self = this;
                this.$axios({
                	loading:{
            			isShow:true,
            			target:'.chioceFileTable'
            		},
            		method:'get',
                	url:this.API.getA01BySite, 
                	params:{
	                    id: this.registerObj.id
                	}
                }).then((res) => {
                    let resData = res.data;
                    if(resData.code =="1"){
                    	self.chioceFileData = resData.data;
                    	self.countNoReturnFiles();//统计未归还的档案列表
                    }else{
			          	self.$message({
				            type: 'error',
				            message: '查询档案人员信息失败，请刷新重试！'
			          	});     
                    }
                }).catch((err) => {
                	console.log("查询档案人员信息列表="+err);
                	self.$message({
			            type: 'error',
			            message: '请求异常，请检查网络！'
			        });  
                })
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
							BorrowAndReadAppoint:{
								applyManName: self.registerFrom.applyManName, //登记人
								readingStartTime: self.registerFrom.readingStartTime, //登记开始日期
								appointEndDate:  self.registerFrom.appointEndDate, //登记结束日期
								applyTypeId:  self.registerFrom.applyTypeId, //查借阅类型
								applyManOrg:  self.registerFrom.applyManOrg, //登记人部门
								contactWay:  self.registerFrom.contactWay, //联系方式
								IDNumber:  self.registerFrom.IDNumber, //身份证号
								describe:  self.registerFrom.describe, //描述
							},
							a0100:self.registerFrom.fileID
						};
						
		                self.$axios({
		                	loading:{
		            			isShow:true,
		            			target:'.chioceFileTable'
		            		},
		            		method:'post',
		                	url:self.API.addBorrowAndRead, 
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
								self.$emit("RegisterReturnCallBack",true);
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
			/* 
			 * 统计未归还的人员档案列表
			 */
			countNoReturnFiles(){
				let fileIdList =[],fileId='';
				this.chioceFileData.forEach(function(row,index){
					if(row.isReturn == "否"){
						fileIdList.push(row);
					}
				})
				fileIdList.forEach(function(row,index){
						if(index == fileIdList.length-1){
							fileId +=row.a0100;
						}else{
							fileId +=row.a0100+",";
						}
				})
				this.noReturnFiles = fileId; 
				if(fileIdList.length < 1){
					this.isAllReturned = true;
				}else{
					this.isAllReturned = false;
				}
			},
			/*
			 * 关闭归还
			 */
			closeReturn(){
				
				if(!this.isAllReturned){
					this.$emit("RegisterReturnCallBack",false);
				}else{
					//调用父组件方法--isRefresh=false不需要刷新父组件的数据
					this.$emit("RegisterReturnCallBack",true);
				}
				this.resetForm();//重置表单
			},
			/*
			 * 重置表单
			 */
			resetForm(){
				this.noReturnFiles='';
				this.isAllReturned=false; 
				this.chioceFileData =[];
				this.$refs['registerFrom'].resetFields();
			},
			/**
			 * 归还 选中的档案
			 * @param index {Number} 选中的列表行号
			 * @param row {Object} 选中行的数据对象
			 */
			returnFiles(index,row){
                this.returnRequest(row.a0100,true);
			},
			/*
			 * 归还全部档案
			 */
			returnAll(){
				if(!this.isAllReturned){
					this.returnRequest(this.noReturnFiles,false);
				}else{
					this.$emit("RegisterReturnCallBack",true);	
				}
			},
			/*
			 * 归还档案请求
			 * @param {String} fileId 需要归还的档案id，用逗号分隔 eg:"aaa,bbb"
			 * @param {String} isRefTab 是否刷新档案人员信息列表
			 */
			returnRequest(fileId,isRefTab){
				this.$axios({
                	loading:{
            			isShow:true,
            			target:'.chioceFileTable'
            		},
            		method:'post',
                	url:this.API.giveBackSite, 
                	data:{
	                    id: this.registerObj.id,
	                    a0100:fileId
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.$message({
				            type: 'success',
				            message: '档案归还成功'
			          	});  
                    	if(isRefTab){
                    		this.getFilesById();//根据登记id获取档案人员信息列表	
                    	}else{
							this.$emit("RegisterReturnCallBack",true);
						}
                    	
                    }else{
			          	this.$message({
				            type: 'error',
				            message: '档案归还失败，请刷新重试！'
			          	});     
                    }
                }).catch((err) => {
                	console.log("档案归还="+err);
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
	.registerReturn {
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
	.gray{
        color: #dcdfe6;
    }
</style>