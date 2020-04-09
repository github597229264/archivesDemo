<template>
	<div class="personnelsAuthorization">
		<el-form :model="submitForm" :rules="rules" ref="submitForm"  label-width="115px" class="demo-ruleForm" size="small">
			<el-row :gutter="15">
				<el-col :span="12">
					<el-form-item label="查借阅理由">
						<el-input v-model="submitForm.cyly" placeholder="请输入查借阅理由" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="申请人">
						<el-input v-model="submitForm.userName" placeholder="请输入申请人" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="详细描述">
						<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}" v-model="submitForm.describe" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="查阅时间">
						<el-date-picker v-model="submitForm.applyDate" type="daterange" range-separator="至" start-placeholder="选择开始日期" end-placeholder="选择结束日期" format="yyyy-MM-dd HH:mm" disabled class="autoForm">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="授权查阅时间" prop="applyDate2"> 
						<el-date-picker v-model="submitForm.applyDate2" type="datetimerange" range-separator="至" start-placeholder="选择开始日期" end-placeholder="选择结束日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" @blur="getDate" @change="getDate" class="autoForm">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<!--电子档案-->
				<el-col :span="6"  v-if="submitForm.rstype ==API.constObj.fileTypeList[0].id">
					<el-form-item label="查阅时限(分钟)">
						<el-input v-model="submitForm.readingtime" placeholder="查阅时限(分钟)" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="18" v-if="submitForm.rstype ==API.constObj.fileTypeList[0].id">
					<el-form-item label="查档时长(分钟)">
						<el-slider
						  v-model="submitForm.readingtime2"
						  :min=10
						   :max=maxReadingTime
					      show-input>
					    </el-slider>
					</el-form-item>
				</el-col>
				<!--纸质档案-->
				<el-col :span="24" v-if="submitForm.rstype ==API.constObj.fileTypeList[1].id">
					<el-form-item label="说明" prop="describe2">
						<el-input type="textarea" v-model="submitForm.describe2" :autosize="{ minRows: 1, maxRows: 2}" minLength="1" maxLength="100"  placeholder="请输入说明（如领取地址、注意事项、联系人、联系方式等,长度在1-100个字符）"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-row>
			<el-col :span="23">
				<!--电子档案-->
				<el-table id="fileTable" ref="multipleTable" v-if="submitForm.rstype ==API.constObj.fileTypeList[0].id"  :data="chioceFileData" class="chioceFileTable" empty-text="没有数据，请刷新试试" border height="230px" @select="handleSelect" @select-all="handleSelectAll">
					<el-table-column type="selection" prop="id" label="选择"  width="50" :selectable="filterCheckbox"></el-table-column>
					<el-table-column type="index"label="序号" align="center"></el-table-column>
					<el-table-column prop="authorizeType" label="授权说明" width="80" align="center"></el-table-column>
					<el-table-column prop="a0101" label="姓名" width="100"></el-table-column>
					<el-table-column prop="a0111a" label="籍贯" width="120"></el-table-column>
					<el-table-column prop="e10040" label="现职单位及职务" min-width="130" show-overflow-tooltip></el-table-column>
					<el-table-column prop="isImpower" label="授权状态" width="80">
						<template slot-scope="scope">
							<span v-if="scope.row.isImpower===true">已授权</span>
							<span v-else-if='scope.row.isImpower===false'>已拒绝</span>
							<span v-else></span>
						</template>
					</el-table-column>
					<el-table-column prop="existImage" label="档案状态" width="120">
						<template slot-scope="scope">
					        <el-tag :type="scope.row.existImage === true ? 'warning' : 'success'"
					          disable-transitions>{{scope.row.existImage === true ? '无目录或图片' : '有目录或图片'}}</el-tag>
					    </template>
					</el-table-column>
					<el-table-column label="操作" width="80" align="center" fixed="right" v-if="submitForm.rstype ==API.constObj.fileTypeList[0].id">
						<template slot-scope="scope">
							<el-button type="text" v-if="scope.row.existImage===true" class="gray">区域授权</el-button>
							<el-button type="text" v-else @click="filesAuthorize(scope.$index, scope.row)">区域授权</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!--纸质档案-->
				<el-table id="fileTable"    ref="multipleTable" v-if="submitForm.rstype ==API.constObj.fileTypeList[1].id"  :data="chioceFileData" class="chioceFileTable" empty-text="没有数据，请刷新试试" border height="230px"  @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="50" align="center" ></el-table-column>
					<el-table-column type="index"label="序号" align="center"></el-table-column>
					<el-table-column prop="a0101" label="姓名" width="100"></el-table-column>
					<el-table-column prop="a0111a" label="籍贯" width="120"></el-table-column>
					<el-table-column prop="e10040" label="现职单位及职务"  show-overflow-tooltip></el-table-column>
					<el-table-column prop="isImpower" label="状态" width="80">
						<template slot-scope="scope">
							<span v-if="scope.row.isImpower===true">已授权</span>
							<span v-else-if='scope.row.isImpower===false'>已拒绝</span>
							<span v-else></span>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="authorizePersonnel(1)">授权</el-button>
			<el-button  @click="authorizePersonnel(2)">拒绝</el-button>
		</div>
		<!--个人档案授权弹出框 -->
		<el-dialog class="outDialog" title='档案授权' :visible.sync="authorizeVisible" width="50%" append-to-body v-if="authorizeVisible" :close-on-click-modal="false">
			<ArchivesAuthorize :chioceFile="chioceFile"  @AuthorizeCallBack="AuthorizeCallBack"></ArchivesAuthorize>
		</el-dialog>
	</div>
</template>

<script>
	import ArchivesAuthorize from './ArchivesAuthorize.vue';
	export default {
		name:'PersonnelsAuthorization', //人员授权
		components: {
			ArchivesAuthorize//个人档案十大类授权
		},
		props:{
			applyId:{//申请单id
				type:String,
				required:true
			},
			archivesType:{//档案类型id--电子档案id/纸质档案id
				type:String,
				required:true
			}
		},
		data() {
			return {
				submitForm: {
					cyly:'',//查阅理由id
					userName:'',//申请人
					describe:'',//详细描述
					readingtime:0,//授权时长
					rstype:'',//档案类型id
					id:'',//申请id
					applyDate: [], //查阅日期--日期控件专用
					applyDate2: [], //授权查阅日期--日期控件专用
					readingtime2:0,//授权时长
					impowerstarttime:'',////授权开始日期
					impowerendtime:'',//授权结束日期
					describe: '', //说明
					describe2:'',//详细描述
				},
				multipleSelection: [],//选中的数据--纸质档案授权操作专用
				personsCheckbox: [],//选中项--电子档案专用
				submitData:[],//需要提交的数据
				chioceFile:{},//选中的人员
				authorizeVisible:false,//授权弹窗的是否显示
				maxReadingTime:480,//最大查阅时长（分钟）--根据起止日期计算 默认480
				effectiveData:[],//有效数据
				chioceFileData: [], //选中的档案人员数据
				areaAuthData:[],//区域授权数据
				rules: {
					applyDate2: [
						{required:true,message: '请选择授权查阅时间',trigger:'change'},
						{
							validator:function(rule,value,callback){
								let currTime = new Date().getTime();
								let startTime = new Date(value[0]).getTime();
								let endTime = new Date(value[1]).getTime();
					            if(startTime < currTime || endTime < currTime){
					                callback(new Error("授权开始和结束时间必须大于当前时间"));
					            }else if((endTime - startTime)/1000 < 600){
					                callback(new Error("授权结束时间至少要比开始时间晚10分钟"));
					            }else{
					            	callback();
					            }
					        }, 
					    	trigger: 'change'
					    }
					],
					readingtime: [{required:true,message: '请输入查档时长',trigger: 'blur'}],
					describe2: [
						{required:true,message: '请输入说明',trigger: 'blur'},
						{
							min: 1,
							max: 100,
							message: '长度在 1 到 100 个字符',
							trigger: 'blur'
						}]
				}
			}
		},
		created() {
			if(this.applyId && this.applyId.length && this.archivesType && this.archivesType.length){
				this.getFilesById();//根据授权id获取档案人员信息列表
			}else{
				console.log("参数异常");
			}
		},
		mounted() {

		},
		computed: {

		},
		watch:{
			/**
        	 * 监听readingDate 参数值
        	 */
			"applyForm.applyDate2":{
	 			handler: function(newVal,oldVal){
					if(newVal==undefined || newVal.length ==0){
						this.maxReadingTime = 480;
					}
				}
			}
		},
		methods: {
			/**
			 * 过滤checkbox 当existImage=true时 checkbox不可选
			 * @param {Object} row 当前数据对象
			 * @param {Number} index 当前下标
			 * @return {Boolean} enableCheck 当前checkbox是否可选
			 */
			filterCheckbox(row, index){
				let enableCheck = true;
				if(row.existImage){
					enableCheck = false;
				}
				return enableCheck;
			},
			/**
			 * 表单赋值
			 */
			setForm(applyObj){
				this.submitForm.cyly = applyObj.purpose;//查阅理由
				this.submitForm.userName = applyObj.applymanname;//申请人
				this.submitForm.describe = applyObj.describe;//详细描述
				this.submitForm.readingtime = applyObj.readingtime;//授权时长
				this.submitForm.rstype = applyObj.rstype;//档案类型id
				this.submitForm.readingtime2 = applyObj.impowertime;
				this.submitForm.describe2 = applyObj.powerdescribe;
				this.submitForm.applyDate=[new Date(applyObj.readingstarttime), new Date(applyObj.readingendtime)];
			},
			/**
			 * 表格选中值改变事件
			 * @param {Array} valList 选中的数据
			 */
			handleSelectionChange(valList) {
		      this.multipleSelection = valList;
		    },
		    /**
		     * 当用户手动勾选数据行的 Checkbox 时触发的事件
		     * @param {Array} selection 已选中的集合
		     * @param {Object} row 当前选中或取消选中的对象
		     */
		    handleSelect(selection,row){
		    	if(selection.length > 0){
		    		var isSelected = this.isChecked(selection,row);
		    		if(isSelected){//选中操作
						this.editAuthorizeType(row,true);
						this.multipleSelection.push(row);
						this.submitData.push({
							id:row.id,//授权的id
							isAll:"1",//授权类型 1= 全部授权 2=区域授权
							a0100:row.a0100//人员编号a0100
						});
					}else{//取消选中操作
						this.editAuthorizeType(row,false);
						for(let i=0;i< this.submitData.length;i++){
							if(this.submitData[i].id == row.id){
								this.submitData.splice(i,1);
								break;
							}
						}
						for(let i=0;i< this.multipleSelection.length;i++){
							if(this.multipleSelection[i].id == row.id){
								this.multipleSelection.splice(i,1);
								break;
							}
						}
					}
		    	}else{
		    		this.editAuthorizeType(row,false);
		    		this.multipleSelection = [];
		    		this.submitData = [];
		    	}
		    },
		    /**
		     * 当用户手动勾选全选 Checkbox 时触发的事件
		     * @param {Array} selection 已选中的集合
		     */
		    handleSelectAll(selection){
		    	if(selection.length > 0){//全选
		    		selection.forEach((item,index)=>{
		    			this.editAuthorizeType(item,true);
						this.multipleSelection.push(item);
						this.submitData.push({
							id:item.id,//授权的id
							isAll:"1",//授权类型 1= 全部授权 2=区域授权
							a0100:item.a0100//人员编号a0100
						});
		    		})
		    	}else{//取消全选
				 	this.dataOperation(this.chioceFileData);
		    		this.multipleSelection = [];
		    		this.submitData = [];
		    	}
		    },
		    /**
		     * checkbox的操作类型是否是选中
		     * @params {Array} data 数据列表
		     * @params {Object} row 当前数据对象
		     * @return {Boolean} isExist 该操作是否为选中操作
		     */
		    isChecked(data,row){
		    	let isExist = false;
		    	data.forEach((item,index)=>{
		    		if(item.id === row.id){
		    			isExist = true;
		    		}
		    	});
		    	return isExist;
		    },
		    /**
		     * 操作源数据中的授权类型字段
		     */
		    editAuthorizeType(row,isEdit){
		    	if(isEdit == true){
			    	for(let i=0;i<this.chioceFileData.length;i++){
			    		if(row.id == this.chioceFileData[i].id){
			    			this.chioceFileData[i].authorizeType = "全部选择";
			    			break;
			    		}
			    	}
		    	}else{
		    		for(let i=0;i<this.chioceFileData.length;i++){
						if(row.id == this.chioceFileData[i].id){
							this.chioceFileData[i].authorizeType = "未选择";
							if(this.areaAuthData.length>0){
								for(let n=0;n<this.areaAuthData.length;n++){
									if(row.id == this.areaAuthData[n].id){
										this.chioceFileData[i].authorizeType = "区域授权";
										break;
									}
								}
							}
							break;
			    		}
					}
		    	}
		    },
		    /**
		     * 计算已授权的人员档案--电子档案授权专用
		     * @return {Array} newData 提交的部分数据集
		     */
		    computedAuthorizated(){
		    	var newData = [...this.submitData];
		    	//areaAuthData和submitData数据比对，以submitData数据为主，将submitData中没有的数据追加到newData中
		    	this.areaAuthData.forEach((item1,index)=>{
			    	//查找数组中是否已存在该对象
					let isExisted = this.submitData.findIndex((item2, index, arr)=> {
					    return item2.id == item1.id;
					})
					if(isExisted == -1){
						newData.push(item1);
					}
		    	});
		    	return newData;
		    },
			/*
			 * 监听获取日期 
			 * @param dateObj {Array} 选中的日期，分别为开始日期和结束日期
			 */
			getDate(dateObj){
				if(dateObj && dateObj.length == 2){
					this.submitForm.impowerstarttime = this.commonFun.dateFormat(dateObj[0],"yyyy-MM-dd HH:mm");
					this.submitForm.impowerendtime = this.commonFun.dateFormat(dateObj[1],"yyyy-MM-dd HH:mm");
					let time1 = new Date(this.submitForm.impowerstarttime).getTime();
					let time2 = new Date(this.submitForm.impowerendtime).getTime();
					this.maxReadingTime =parseInt((time2-time1)/1000/60);
				}
			},
			/**
			 * 个人档案授权组件回调方法
			 */
			AuthorizeCallBack(){
				this.authorizeVisible = false;
				let count = -1;
				this.multipleSelection = [];
		    	this.submitData = [];
				//查找数组中是否已存在该对象
				let isExisted = this.areaAuthData.findIndex((item, index, arr)=> {
				    return item.id == this.chioceFile.id;
				})
				if(isExisted == -1){
					this.areaAuthData.push({
						id:this.chioceFile.id,//授权的id
						isAll:"2",//授权类型 1= 全部授权 2=区域授权
						a0100:this.chioceFile.a0100//人员编号a0100
	    			});
				}
				this.getFilesById();
			},
			/**
			 * 根据授权id获取档案人员信息列表
			 */
			getFilesById(){
				let self = this;
                this.$axios({
                	loading:{
            			isShow:true,
            			target:'.personnelsAuthorization'
            		},
            		method:'get',
                	url:this.API.getA01BySplit, 
                	params:{
	                    id: this.applyId,
	                    stype:this.commonFun.recognitionFileType(this.archivesType)+"",//档案类型
                	}
                }).then((res) => {
                    let resData = res.data;
                    if(resData.code =="1"){
                    	this.setForm(resData.data.split);//表单赋值
                    	self.chioceFileData = self.dataOperation(resData.data.list);
                    }else{
			          	self.$message({
				            type: 'error',
				            message: '查询档案人员信息失败，请刷新重试！'
			          	});     
                    }
                }).catch((err) => {
                	self.$message({
			            type: 'error',
			            message: '请求异常，请检查网络！'
			        });  
                })
			},
			/**
			 * 数据处理
			 * @param {Array} data 数据源
			 */
			dataOperation(data){
				var newData = [];
				for(let i=0;i<data.length;i++){
					data[i].authorizeType = "未选择";
					if(this.areaAuthData.length>0){
						for(let n=0;n<this.areaAuthData.length;n++){
							if(data[i].id == this.areaAuthData[n].id){
								data[i].authorizeType = "区域授权";
								break;
							}
						}
					}
					newData.push(data[i]);
				}
				return newData;
			},
			/**
			 * 授权 选中的档案
			 * @param index {Number} 选中的列表行号
			 * @param row {Object} 选中行的数据对象
			 */
			filesAuthorize(index,row){
				this.chioceFile = row;
                this.authorizeVisible=true;
			},
			/*
			 * 授权全部档案
			 * @param {Number} type 授权类型 type=1 授权；type=2 拒绝
			 */
			authorizePersonnel(type){
				let self = this;
				let data = {};
				let requestUrl = this.API.electronAccredit;//请求的接口   默认电子档案接口
				if(this.archivesType == this.API.constObj.fileTypeList[0].id){//电子档案
					let fileInfoList =[];
					if(type ==1){//授权
						this.rules.applyDate2[0].required = true;
						fileInfoList=this.computedAuthorizated();//计算已授权的人员档案
						data ={
							stype:type+"",//1为授权 2 为拒绝
							impowerstarttime:this.submitForm.impowerstarttime,//授权开始时间
							impowerendtime:this.submitForm.impowerendtime,//授权结束时间
							impowerTime:this.submitForm.readingtime2,//授权时长
							data:JSON.stringify(fileInfoList)//选择的人员档案列表
						};
					}else{//拒绝
						this.rules.applyDate2[0].required = false;
						fileInfoList=this.refuseData(this.archivesType);//计算已授权的人员档案
						data ={
							stype:type+"",//1为授权 2 为拒绝
							data:JSON.stringify(fileInfoList)//选择的人员档案列表
						};
					}
					if(fileInfoList.length < 1){
						self.$message({
				            type: 'warning',
				            message: '您还没有选择人员档案!'
				        });
				        return;
					}
				}else{//纸质档案
					if(type ==1){//授权
						this.rules.applyDate2[0].required = true;
						this.rules.describe2[0].required = true;
						let fileInfoObj=this.paperFileData();//计算已授权的人员档案
						data ={
							id:fileInfoObj.id,//选择的授权的 拆分 id 多个 用逗号拼接
							a0101:fileInfoObj.a0101,//选择授权 人员的姓名 多个 空格拼接
							stype:type+"",//1为授权 2 为拒绝
							impowerstarttime:this.submitForm.impowerstarttime,//授权开始时间
							impowerendtime:this.submitForm.impowerendtime,//授权结束时间
							powerdescribe:this.submitForm.describe2//说明
						};
						if(fileInfoObj.totalOption < 1){
							self.$message({
					            type: 'warning',
					            message: '您还没有选择人员档案!'
					        });
					        return;
						}
					}else{
						this.rules.applyDate2[0].required = false;
						this.rules.describe2[0].required = false;
						let fileInfoObj=this.refuseData(this.archivesType);//计算已授权的人员档案
						data ={
							id:fileInfoObj.id,//选择的授权的 拆分 id 多个 用逗号拼接
							a0101:fileInfoObj.a0101,//选择授权 人员的姓名 多个 空格拼接
							stype:type+"",//1为授权 2 为拒绝
							impowerstarttime:this.submitForm.impowerstarttime,//授权开始时间
							impowerendtime:this.submitForm.impowerendtime,//授权结束时间
							powerdescribe:this.submitForm.describe2//说明
						};
					}
					requestUrl = this.API.entityAccredit;
				}
				this.$refs["submitForm"].validate((valid) => {
					if(valid) {
						this.authorizeRequest(requestUrl,data);
					}
				});
			},
			/**
			 * 纸质档案授权操作专用数据处理
			 * @return {Object} saveObj 数据对象
			 * @return {String} saveObj.id id字符串，多个用逗号分隔
			 * @return {String} saveObj.a0101 姓名字符串，多个用空格分隔
			 */
			paperFileData(){
				var self = this;
				let saveObj={
					totalOption:this.multipleSelection.length,
					id:"",
					a0101:""
				};
				this.multipleSelection.forEach(function(row,index,array){
    				if(index == array.length-1){
    					saveObj.id+=row.id;
    					saveObj.a0101+=row.a0101;
    				}else{
    					saveObj.id+=row.id+",";
    					saveObj.a0101+=row.a0101+" ";
    				}
				});
				return saveObj;
			},
			/**
			 * 拒绝操作所需的数据--电子档案和纸质档案的拒绝操作
			 * @param {String} 档案类型 ：电子档案Id、纸质档案Id
			 */
			refuseData(type){
				let saveData=[];
				let saveObj={
					id:"",
					a0101:""
				};
				for(let i=0;i<this.chioceFileData.length;i++){
		    		saveData.push({
						id:this.chioceFileData[i].id//授权的id
    				});
    				if(i == this.chioceFileData.length-1){
    					saveObj.id+=this.chioceFileData[i].id;
    					saveObj.a0101+=this.chioceFileData[i].a0101;
    				}else{
    					saveObj.id+=this.chioceFileData[i].id+",";
    					saveObj.a0101+=this.chioceFileData[i].a0101+" ";
    				}
			    }
				if(type  == this.API.constObj.fileTypeList[0].id){//电子档案
					return saveData;
				}else{//纸质档案
					return saveObj;
				}
			},
			/*
			 * 授权档案请求
			 * @param {String} apiUrl 请求接口的名称
			 * @param {Array} data 提交的数据
			 */
			authorizeRequest(apiUrl,data){
				this.$axios({
                	loading:{
            			isShow:true,
            			target:'.personnelsAuthorization'
            		},
            		method:'post',
                	url:apiUrl, 
                	data:data
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.$message({
				            type: 'success',
				            message: '档案授权成功'
			          	});  
			          	//回调父组件方法
                    	this.$emit("AuthorizationCallBack");
                    }else if(resData.code =="8"){
                    	this.$message({
				            type: 'error',
				            message: resData.message
			          	});  
                    }else{
			          	this.$message({
				            type: 'error',
				            message: '档案授权失败，请刷新重试！'
			          	});     
                    }
                }).catch((err) =>{
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
	.personnelsAuthorization {
		.el-row {
			.el-col {
				.chioceFileTable {
					margin: 10px 0 10px 0;
				}
				.el-form-item{
					.autoForm{
						width:100%;
					}
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