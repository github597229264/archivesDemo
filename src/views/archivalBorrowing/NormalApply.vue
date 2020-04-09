<template>
	<div class="normalApply"  :style="{height:normalApplyHeight}">
		<el-row>
    		<el-col :span="11" align="left">
    			<el-button size="small"  type="primary"  icon="el-icon-arrow-left" @click="prevStep">上一步</el-button>
    		</el-col>
	    	<el-col :span="11" align="right">
				<el-button size="small"  type="primary"   @click="addApply('applyForm')" >提交申请
					<i class="el-icon-arrow-right el-icon--right"></i>
				</el-button>
			</el-col>
		</el-row>
		<el-form :model="applyForm" :rules="rules" ref="applyForm" label-width="120px" class="demo-ruleForm" size="small">
			<el-row :gutter="10">
				<el-col :span="22" class="areaTitle">
					<strong>申请信息</strong>
					<span>（带 * 为必填项，其它为选填项）</span>
				</el-col>
				<el-col :span="12">
					<el-form-item label="查阅理由" prop="purpose">
			            <ReadReasonsSelect :chioceOptionId="applyForm.purpose"  @ReadReasonsCall="ReadReasonsCall"></ReadReasonsSelect>
					</el-form-item>
				</el-col>
				<el-col :span="10">
					<el-form-item label="查借阅类型" prop="applytype">
			            <ApplyTypeSelect :chioceOptionId="applyForm.applytype"  @ApplyTypeCall="ApplyTypeCall"></ApplyTypeSelect>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="档案类型" prop="rstype">
			            <FileTypeSelect :chioceOptionId="applyForm.rstype"  @FileTypeCall="FileTypeCall"></FileTypeSelect>
					</el-form-item>
				</el-col>
				<el-col :span="10">
					<el-form-item label="查阅起止时间" prop="readingDate">
						<el-date-picker v-model="applyForm.readingDate" type="datetimerange" range-separator="至" start-placeholder="查借阅开始日期" end-placeholder="查借阅结束日期" format="yyyy-MM-dd HH:mm"  value-format="yyyy-MM-dd HH:mm" @change="getDate" @blur="getDate" class="autoForm">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="22">
					<el-form-item label="查档时限(分钟)" prop="readingtime">
						<el-slider
						  v-model="applyForm.readingtime"
						  :min=10
						   :max=maxReadingTime
					      show-input>
					    </el-slider>
					</el-form-item>
				</el-col>
				<el-col :span="22">
					<el-form-item label="详细描述" prop="describe">
						<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 5}" v-model="applyForm.describe" maxlength='200' placeholder="请输入详细描述(0-200个字符)"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script>
	import ApplyTypeSelect from '../../components/ApplyTypeSelect.vue';
	import ReadReasonsSelect from '../../components/ReadReasonsSelect.vue';
	import FileTypeSelect from '../../components/FileTypeSelect.vue';
	export default {
		name: 'NormalApply', //外单位查借阅申请
		props:[
			'defaultTables',//选中的数据
			'mainHeight'//main标签高度
		],
		components: {
			ApplyTypeSelect, //查借阅类型下拉框
			ReadReasonsSelect,//查借阅理由
			FileTypeSelect//档案类型
		},
		data() {
			return {
				applyForm: {
					readingtime:'',//查阅时长（分钟）
					applytype: '', //查借阅类型id
					readingstarttime: '', //查阅开始日期
					readingendtime: '', //查阅结束日期
					rstype:'',//档案类型
					purpose:'',//查借阅目的
					describe:'',//详细描述
					readingDate: [] //查阅人日期--日期控件专用
				},
				normalApplyHeight:'',//页面高度
				maxReadingTime:480,//最大查阅时长（分钟）--根据起止日期计算 默认480
				fileID:'',//选择档案人员的id 多个用逗号拼接
				fileName:'',//选择的档案人的姓名 逗号拼接
				chioceFileData: [], //选中的档案人员数据
				rules: {
					readingtime: [{
							required: true,
							message: '请输入查档时限',
							trigger: 'blur'
						}
					],
					applytype: [{
						required: true,
						message: '请选择查借阅类型',
						trigger: 'change'
					}],
					purpose: [{
						required: true,
						message: '请选择查借阅理由',
						trigger: 'change'
					}],
					rstype: [{
						required: true,
						message: '请选择档案类型',
						trigger: 'change'
					}],
					applytype: [{
						required: true,
						message: '请选择查借阅类型',
						trigger: 'change'
					}],
					readingDate: [
						{required: true,message: '请选择查借阅起止时间',trigger:'change'},
						{
							validator:function(rule,value,callback){
								let currTime = new Date().getTime();
								let startTime = new Date(value[0]).getTime();
								let endTime = new Date(value[1]).getTime();
					            if(startTime < currTime || endTime < currTime){
					                callback(new Error("查借阅开始和结束时间必须大于当前时间"));
					            }else if((endTime - startTime)/1000 < 600){
					                callback(new Error("查借阅结束时间至少要比开始时间晚10分钟"));
					            }else{
					            	callback();
					            }
					        }, 
					    	trigger: 'change'
					    }
					],
					describe: [
						{
							required: false,
							message: '请输入详细描述',
							trigger: 'blur'
						},{
							min: 0,
							max: 200,
							message: '长度在0到 200 个字符',
							trigger: 'blur'
						}
					]
				}
			}
		},
		created() {
			
		},
		mounted() {
			
		},
		computed: {
			
		},
		watch:{
			/**
        	 * 监听readingDate 参数值
        	 */
			"applyForm.readingDate":{
	 			handler: function(newVal,oldVal){
					if(newVal==undefined || newVal.length ==0){
						this.maxReadingTime = 480;
					}
				}
			},
        	/**
        	 * 监听 defaultTables 参数值
        	 */
        	defaultTables(newVal,oldVal){
        		this.chioceFileData = [...newVal];//改变数组在内存中的引用指向
        		this.normalApplyHeight = this.mainHeight- 52;
        	}
		},
		methods: {
			/*
	         * 查借阅类型下拉框组件回调方法--子组件回调数据的方法
	         * @param {String} id 选中的id
	         */
	        ApplyTypeCall(id){
				this.applyForm.applytype = id;
	        },
			/*
	         * 查借阅理由下拉框组件回调方法--子组件回调数据的方法
	         * @param {String} id 选中的id
	         */
	        ReadReasonsCall(id){
				this.applyForm.purpose = id;
	        },
			/*
	         * 档案类型下拉框组件回调方法--子组件回调数据的方法
	         * @param {String} id 选中的id
	         */
	        FileTypeCall(id){
				this.applyForm.rstype = id;
	        },
			/*
			 * 监听获取日期 
			 * @param dateObj {Array} 选中的日期，分别为开始日期和结束日期
			 */
			getDate(dateObj){
				if(dateObj && dateObj.length == 2){
					this.applyForm.readingstarttime =this.commonFun.dateFormat(dateObj[0],"yyyy-MM-dd HH:mm");
					this.applyForm.readingendtime = this.commonFun.dateFormat(dateObj[1],"yyyy-MM-dd HH:mm");
					let time1 = new Date(this.applyForm.readingstarttime).getTime();
					let time2 = new Date(this.applyForm.readingendtime).getTime();
					this.maxReadingTime =parseInt((time2-time1)/1000/60);
				}
			},
			/**
			 * 新增外单位查询人员申请
			 * @param formName {Object} form表单名称
			 */
			addApply(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let submitObj={
							readingtime:self.applyForm.readingtime,
							applytype:self.applyForm.applytype,
							readingstarttime:self.applyForm.readingstarttime,
							readingendtime:self.applyForm.readingendtime,
							rstype:self.applyForm.rstype,
							purpose:self.applyForm.purpose,
							describe:self.applyForm.describe,
							data:JSON.stringify(self.chioceFileData)
						};
		                self.$axios({
		            		loading:{
		            			isShow:true,
		            			text:"查借阅申请处理耗时可能较长,请耐心等候..."
		            		},
		            		method:'post',
		                	url:self.API.borrowAndReadApplyer, 
		                	data:submitObj
		                }).then((res) => {
		                    var resData = res.data;
		                    if(resData.code =="1"){
		                    	self.$message({
						            type: 'success',
						            message: '申请成功!'
						        });
						        //值传回给父组件
            					self.$emit('changeStep',4);
						        //路由跳转到 查借阅授权的主界面
						        self.$router.push({ path: '/applyRecord' })
						        
		                    }else{
					          	self.$message({
						            type: 'error',
						            message: '申请失败，请返回重试！'
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
		     * 上一步
		     */
		    prevStep(){
		    	//值传回给父组件
            	this.$emit('changeStep',2);
		    }
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.normalApply {
		overflow-y: auto;
		.el-row {
			.areaTitle{
				margin: 10px 0 20px 0;
				strong{
					font:18px large;
				}
				span{
					color:#F56C6C;
					font:12px Extra Small;
				}
			}
			.el-col{
				.el-form-item{
					.autoForm{
						width:100%;
					}
				}
			}
		}
	}
</style>