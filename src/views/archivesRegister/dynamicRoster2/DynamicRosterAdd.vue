<template>
	<div class='dynamicRosterAdd'>
		<el-form ref="form" :model="form" :rules="rules" label-width="80px">
			
			<el-form-item label="名册名称" label-width='120px' prop="title">
				<el-input v-model="form.title" class="inp" maxlength='80'></el-input>
			</el-form-item>
			
			<el-form-item label="简要说明" label-width='120px'>
				<el-input type="textarea" maxlength='200' v-model="form.comments" class="inp"></el-input>
			</el-form-item>
			
			<div class="form-title">自定义查询条件</div>
			
			<div class="form-main">
				
				<el-form-item label="性别" label-width='120px'>
					<el-checkbox-group v-model="form.content.a0104b">
						<el-checkbox key='1' label="1">男</el-checkbox>
						<el-checkbox key='2' label="2">女</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				
				<el-form-item label="民族" prop='data7C5723D2' label-width='120px'>
					<el-checkbox-group v-model="form.content.a0117b">
						<el-checkbox v-for='(item,index) in data7C5723D2' :label="item.code" :name='item.name' :key='index'>{{item.name}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				
				<el-form-item label="籍贯" label-width='120px'>
					<el-input v-model="form.content.a0111a" maxlength='50'></el-input>
				</el-form-item>
				
				<el-form-item label="出生年月" label-width='120px'>
					<div class="block">
					    <el-date-picker
					      v-model="birthDate"
					      value-format="yyyyMMdd"
					      type="daterange"
					      range-separator="至"
					      start-placeholder="开始日期"
					      end-placeholder="结束日期">
					    </el-date-picker>
					</div>
				</el-form-item>
				
				<el-form-item label="出生地" label-width='120px'>
					<el-input v-model="form.content.a0114a" maxlength='50'></el-input>
				</el-form-item>
				
				<el-form-item label="婚姻状态" prop='dataAD79F7FC' label-width='120px'>
					<el-checkbox-group v-model="form.content.a0131b">
						<el-checkbox v-for='(item,index) in dataAD79F7FC' :label="item.code" :key='index'>{{item.name}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				
				<el-form-item label=" 参加工作日期" label-width='120px'>
					<div class="block">
					    <el-date-picker
					      v-model="jobDate"
					      value-format="yyyyMMdd"
					      type="daterange"
					      range-separator="至"
					      start-placeholder="开始日期"
					      end-placeholder="结束日期">
					    </el-date-picker>
					</div>
				</el-form-item>
				
				<el-form-item label="参加组织日期" label-width='120px'>
					<div class="block">
					    <el-date-picker
					      v-model="organizeDate"
					      value-format="yyyyMMdd"
					      type="daterange"
					      range-separator="至"
					      start-placeholder="开始日期"
					      end-placeholder="结束日期">
					    </el-date-picker>
					</div>
				</el-form-item>
				
				<el-form-item label="档案状态" prop='data311AFB4B' label-width='120px'>
					<el-checkbox-group v-model="form.content.e10statusb">
						<el-checkbox 
							v-for='(item,index) in data311AFB4B' 
							:label="item.code" 
							:key='index'>
							{{item.name}}
						</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				
				<el-form-item label="人员类别" prop='data44B625FE' label-width='120px'>
					<el-checkbox-group v-model="form.content.a01statusb">
						<el-checkbox 
							v-for='(item,index) in data44B625FE' 
							:label="item.code" 
							:key='index'>
							{{item.name}}
						</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				
				<el-form-item label="毕业时间" label-width='120px'>
					<div class="block">
					    <el-date-picker
					      v-model="graduationDate"
					      value-format="yyyyMMdd"
					      type="daterange"
					      range-separator="至"
					      start-placeholder="开始日期"
					      end-placeholder="结束日期">
					    </el-date-picker>
					</div>
				</el-form-item>
				
				<el-form-item label="现职时间" label-width='120px'>
					<div class="block">
					    <el-date-picker
					      v-model="presentJobDate"
					      value-format="yyyyMMdd"
					      type="daterange"
					      range-separator="至"
					      start-placeholder="开始日期"
					      end-placeholder="结束日期">
					    </el-date-picker>
					</div>
				</el-form-item>
				
				<el-form-item label=" 工作单位及职务" label-width='120px'>
					<el-input v-model="form.content.e10040" maxlength='200'></el-input>
				</el-form-item>
				
				<el-form-item label="职务职级" prop='dataCDE75543' label-width='120px'>
					<el-checkbox-group v-model="form.content.a0501b">
						<el-checkbox 
							v-for='(item,index) in dataCDE75543' 
							:label="item.code" 
							:key='index'>
							{{item.name}}
						</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				
				<el-form-item label=" 在职学历信息" label-width='120px'>
					<el-input v-model="form.content.e1007" maxlength='200'></el-input>
				</el-form-item>
				
				<el-form-item label=" 全日制学历信息" label-width='120px'>
					<el-input v-model="form.content.e1005" maxlength='200'></el-input>
				</el-form-item>
				
				<el-form-item label="政治面貌" prop='data37B05E7C' label-width='120px'>
					<el-checkbox-group v-model="form.content.a0141b">
						<el-checkbox 
							v-for='(item,index) in data37B05E7C' 
							:label="item.code" 
							:key='index'>
							{{item.name}}
						</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				
			</div>
			<el-form-item class="button">
				<el-button type="primary" @click="onSubmit">保存</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import Pagination from '../../../components/Pagination.vue';

	export default {
		name: 'dynamicRosterAdd',
		components: {

		},
		props:['selectOptionObj','fromAddOrEdit','addType'],
		data() {
			return {
				form: {
					title: '',//名册名称
					comments: '',//简要说明
					content:{//内容 条件json 字符串
						a0141b:[],//政治面貌
						a0104b:[],//性别
						a0111a:'',//籍贯
						a0114a:'',//出生地
						e10statusb:[],//档案状态
						a01statusb:[],//人员类别
						e10040:'',//工作单位及职务
						a0501b:[],//职务职级
						a0117b:[],//民族
						a01072:'',//出生年月开始时间
						a01073:'',//出生年月结束时间
						a0131b:[],//婚姻状态
						a01348:'',//参加工作日期开始时间
						a01349:'',//参加工作日期结束时间
						a01441:'',//参加组织日期开始时间
						a01442:'',//参加组织日期结束时间
						e10031:'',//毕业时间开始时间
						e10032:'',//毕业时间结束时间
						e10041:'',//现职时间开始时间
						e10042:'',//现职时间结束时间
						e1007:'',//	在职学历信息
						e1005:'',//	全日制学历信息
					},
				},
				data311AFB4B: [], //档案状态
				data44B625FE: [], //人员类别
				dataCDE75543: [], // 职务职级
				data37B05E7C: [], //政治面貌
				data7C5723D2:[],//民族
				dataAD79F7FC:[],//婚姻状态
				rules:{
					title: [
			            { required: true, message: '请输入活动名称', trigger: 'blur' },
			            { max: 80, message: '长度在 80字符以内', trigger: 'blur' }
			        ],
				},
				birthDate:[],//出生日期
				jobDate:[],//参加工作日期
				organizeDate:[],//参加组织日期
				graduationDate:[],//毕业时间
				presentJobDate:[],// 现职时间
				a01RosterCondList:[],//静态添加传值list集合
				operation:{
					equal:'等于',
					greater:'大于',
					less:'小于',
					contain:'包含',
				}
			};
		},
		created() {
			
			this.getData('311AFB4B', 'data311AFB4B'); //档案状态
			this.getData('44B625FE', 'data44B625FE'); //人员类别
			this.getData('CDE75543', 'dataCDE75543'); //职务职级
			this.getData('37B05E7C', 'data37B05E7C'); //政治面貌
			this.getData('7C5723D2', 'data7C5723D2'); //民族
			this.getData('AD79F7FC', 'dataAD79F7FC'); //婚姻状态
			if(this.fromAddOrEdit=='edit'){
				let data=this.selectOptionObj.content;
				//出生日期
				if(data.a01072 || data.a01073){
					this.birthDate[0]=data.a01072;
					this.birthDate[1]=data.a01073;
				}
				//参加工作日期
				if(data.a01348 || data.a01349){
					this.jobDate[0]=data.a01348;
					this.jobDate[1]=data.a01349;
				}
				//参加组织日期
				if(data.a01441 || data.a01442){
					this.organizeDate[0]=data.a01441;
					this.organizeDate[1]=data.a01442;
				}
				//毕业时间
				if(data.e10031 || data.e10032){
					this.graduationDate[0]=data.e10031;
					this.graduationDate[1]=data.e10032;
				}
				//现职时间
				if(data.e10041 || data.e10042){
					this.presentJobDate[0]=data.e10041;
					this.presentJobDate[1]=data.e10042;
				}
				this.form=this.selectOptionObj;
			}
		},
		mounted() {
			
		},
		methods: {
			onSubmit() {
				if(!!!this.form.title){
					this.$message({
								type: 'error',
								message: '请填写必填字段！'
							});
					return;
				}
				//出生日期
				if(this.birthDate.length>0){
					this.form.content.a01072=this.birthDate[0];
					this.form.content.a01073=this.birthDate[1];	
				}
				//参加工作日期
				if(this.jobDate.length>0){
					this.form.content.a01348=this.jobDate[0];
					this.form.content.a01349=this.jobDate[1];	
				}
				//参加组织日期
				if(this.organizeDate.length>0){
					this.form.content.a01441=this.organizeDate[0];
					this.form.content.a01442=this.organizeDate[1];	
				}
				//毕业时间
				if(this.graduationDate.length>0){
					this.form.content.e10031=this.graduationDate[0];
					this.form.content.e10032=this.graduationDate[1];	
				}
				//现职时间
				if(this.presentJobDate.length>0){
					this.form.content.e10041=this.presentJobDate[0];
					this.form.content.e10042=this.presentJobDate[1];	
				}

				//动态名册
				if(this.addType=='1'){
					this.form.content=JSON.stringify(this.form.content);//参数content转string
					//添加
					if(this.fromAddOrEdit=='add'){
						this.$axios({
							loading: {
								isShow: false,
							},
							method: 'post',
							url: this.API.dynamicRoster,
							data: this.form,
						}).then((res) => {
							var resData = res.data;
							if(resData.code == "1") {
								this.$emit("addBackCall", true);
							} else {
								this.$message({
									type: 'error',
									message: '获取失败，请刷新！'
								});
							}
						}).catch((err)=> {
							this.$message({
								type: 'error',
								message: '请求异常，请检查网络！'
							});
						})
						
					//编辑
					}else if(this.fromAddOrEdit=='edit'){
						
						this.$axios({
							loading: {
								isShow: false,
							},
							method: 'post',
							url: this.API.updateRoster,
							data:{
								title:this.form.title,
								comments:this.form.comments,
								content:this.form.content,
								id:this.form.id,
							},
						}).then((res) => {
							var resData = res.data;
							if(resData.code == "1") {
								this.$emit("addBackCall", true);
							} else {
								this.$message({
									type: 'error',
									message: '获取失败，请刷新！'
								});
							}
						}).catch((err)=> {
							this.$message({
								type: 'error',
								message: '请求异常，请检查网络！'
							});
						})
					}
				}
				
				//静态名称
				if(this.addType=='0'){
//					console.log(this.form.content);
					//参数content
					let content=this.form.content;
					
				//参数a01RosterCondList====数据重组
				//日期
					this.dateBoxChangeType('a01072','a01073','出生日期',this.birthDate);//出生日期
					this.dateBoxChangeType('a01348','a01349','参加工作日期',this.jobDate);//参加工作日期
					this.dateBoxChangeType('a01441','a01442','参加组织日期',this.organizeDate);//参加组织日期
					this.dateBoxChangeType('e10031','e10032','毕业时间',this.graduationDate);//毕业时间
					this.dateBoxChangeType('e10041','e10042','现职时间',this.presentJobDate);//毕业时间
					
				//input框
					this.inputBoxChangeType('a0111a',content.a0111a,'籍贯');//籍贯
					this.inputBoxChangeType('a0114a',content.a0114a,'出生地');//出生地
					this.inputBoxChangeType('e10040',content.e10040,'工作单位及职务');//工作单位及职务
					this.inputBoxChangeType('e1007',content.e1007,'在职学历信息');//在职学历信息
					this.inputBoxChangeType('e1005',content.e1005,'全日制学历信息');//全日制学历信息
				
				//复选框
					//性别
					if(content.a0104b.length>0){
						for(let i=0;i<content.a0104b.length;i++){
							let data={};
							data.fieldid='a0104b';
							data.fieldname='性别';
							data.operation=this.operation.equal;
							if(content.a0104b[i]=='1'){
								//1男
								data.value='1';
								data.texts='男';
							}
							if(content.a0104b[i]=='2'){
								//2女
								data.value='2';
								data.texts='女';
							}
							this.a01RosterCondList.push(data);
						}
					}
					this.checkBoxChangeType('a0117b',content.a0117b,'民族',this.data7C5723D2);//民族
					this.checkBoxChangeType('a0131b',content.a0131b,'婚姻状态',this.dataAD79F7FC);//婚姻状态
					this.checkBoxChangeType('e10statusb',content.e10statusb,'档案状态',this.data311AFB4B);//档案状态
					this.checkBoxChangeType('a0141b',content.a0141b,'政治面貌',this.data37B05E7C);//政治面貌
					this.checkBoxChangeType('a01statusb',content.a01statusb,'人员类别',this.data44B625FE);//政治面貌
					this.checkBoxChangeType('a0501b',content.a0501b,'职务职级',this.dataCDE75543);//职务职级
					
				//参数content转string
					this.form.content=JSON.stringify(this.form.content);
					console.log(this.a01RosterCondList);
					this.$axios({
							loading: {
								isShow: false,
							},
							method: 'post',
							url: this.API.addStaticRoster,
							data: {
								type:this.addType,
								title:this.form.title,
								comments:this.form.comments,
								content:this.form.content,
								a01RosterCondList:JSON.stringify(this.a01RosterCondList),
							}
						}).then((res) => {
							var resData = res.data;
							if(resData.code == "1") {
								this.$emit("addBackCall", true);
							} else {
								this.$message({
									type: 'error',
									message: '获取失败，请刷新！'
								});
							}
						}).catch((err)=> {
							this.$message({
								type: 'error',
								message: '请求异常，请检查网络！'
							});
						})
				}
				
			},
			//a01RosterCondList--复选框数据重组
			checkBoxChangeType(code,contentCode,codeName,codeList){
				if(contentCode.length>0){
					for(let i=0;i<contentCode.length;i++){
						let data={};
						data.fieldid=code;
						data.fieldname=codeName;
						data.operation=this.operation.equal;//等于
						let tempArr=codeList;
						for(let k=0;k<tempArr.length;k++){
							if(contentCode[i]==tempArr[k].code){
								data.value=tempArr[k].code;
								data.texts=tempArr[k].name;
							}
						}
						this.a01RosterCondList.push(data);
					}
				}
			},
			//a01RosterCondList--复input框数据重组
			inputBoxChangeType(code,contentCode,codeName){
				if(contentCode){
						let data={};
						data.fieldid=code;
						data.fieldname=codeName;
						data.operation=this.operation.contain;//包含
						data.value=contentCode;
						data.texts=contentCode;
						this.a01RosterCondList.push(data);
					}
			},
			//a01RosterCondList--时间选择框数据重组
			dateBoxChangeType(codeStart,codeEnd,codeName,dataList){
				if(dataList.length>0){
					for(let i=0;i<dataList.length;i++){
						let data={};
						data.fieldname=codeName;
						data.value=dataList[i];
						data.texts=dataList[i];
						if(i==0){
							data.fieldid=codeStart;
							data.operation=this.operation.greater;//大于
						}
						if(i==1){
							data.fieldid=codeEnd;
							data.operation=this.operation.less;//小于
						}
						this.a01RosterCondList.push(data);
					}
				}
			},
			getData(code, dataName) { //获取添加展示信息数据
				this.$axios({
					loading: {
						isShow: false,
					},
					method: 'get',
					url: this.API.getSysCadreCodeDetailList,
					params: {
						code: code
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						if(dataName == 'data311AFB4B') {
							this.data311AFB4B = resData.data;
						} else if(dataName == 'data44B625FE') {
							this.data44B625FE = resData.data;
						} else if(dataName == 'dataCDE75543') {
							this.dataCDE75543 = resData.data;
						} else if(dataName == 'data37B05E7C') {
							this.data37B05E7C = resData.data;
						}else if(dataName == 'data7C5723D2') {
							this.data7C5723D2 = resData.data;
						}else if(dataName == 'dataAD79F7FC') {
							this.dataAD79F7FC = resData.data;
						}
					} else {
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}
				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			}
		}

	};
</script>
<style lang="scss" scoped type="text/css">
	.dynamicRosterAdd {
		.form-title {
			color: #0290f5;
			font-weight: bold;
			font-size: 20px;
			text-shadow: -1px 2px 1px #cccccc;
			line-height: 26px;
		}
		.inp{
			width:95% !important
		}
		.form-main{
			height:320px;
			overflow: auto;
		}
		.el-checkbox:nth-child(1) {
			margin-left: 30px;
		}
		.el-radio-group {
			margin-left: 30px;
		}
		.el-input--small {
			margin-left: 30px;
			width: 50%
		}
		.el-input__inner {
			margin-left: 30px;
		}
		.button {
			display: flex;
			justify-content: center;
			margin-left: -80px;
			box-sizing: border-box;
		}
	}
</style>