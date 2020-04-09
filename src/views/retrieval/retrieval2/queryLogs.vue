<template>
	<div class='customSearch'>
		<el-form ref="form" :model="form" :rules="rules" label-width="80px">
			<div class="form-main">
				<el-form-item label="性别" label-width='120px'>
					<el-checkbox-group v-model="form.a0104b">
						<el-checkbox key='1' label="1">男</el-checkbox>
						<el-checkbox key="2" label="2">女</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="民族" prop='data7C5723D2' label-width='120px'>
					<el-checkbox-group v-model="form.a0117b">
						<el-checkbox v-for='(item,index) in data7C5723D2' :label="item.code" :key='index'>{{item.name}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="籍贯" label-width='120px'>
					<el-input v-model="form.a0111a" maxlength='50'></el-input>
				</el-form-item>
				<el-form-item label="出生年月" label-width='120px'>
					<div class="block">
						<el-date-picker v-model="birthDate" value-format="yyyyMMdd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</div>
				</el-form-item>
				<el-form-item label="出生地" label-width='120px'>
					<el-input v-model="form.a0114a" maxlength='50'></el-input>
				</el-form-item>
				<el-form-item label="婚姻状态" prop='dataAD79F7FC' label-width='120px'>
					<el-checkbox-group v-model="form.a0131b">
						<el-checkbox v-for='(item,index) in dataAD79F7FC' :label="item.code" :key='index'>{{item.name}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="参加工作日期" label-width='120px'>
					<div class="block">
						<el-date-picker v-model="jobDate" value-format="yyyyMMdd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</div>
				</el-form-item>
				<el-form-item label="参加组织日期" label-width='120px'>
					<div class="block">
						<el-date-picker v-model="organizeDate" value-format="yyyyMMdd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</div>
				</el-form-item>
				<el-form-item label="档案状态" prop='data311AFB4B' label-width='120px'>
					<el-checkbox-group v-model="form.e10statusb">
						<el-checkbox v-for='(item,index) in data311AFB4B' :label="item.code" :key='index'>
							{{item.name}}
						</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="人员类别" prop='data44B625FE' label-width='120px'>
					<el-checkbox-group v-model="form.a01statusb">
						<el-checkbox v-for='(item,index) in data44B625FE' :label="item.code" :key='index'>
							{{item.name}}
						</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="毕业时间" label-width='120px'>
					<div class="block">
						<el-date-picker v-model="graduationDate" value-format="yyyyMMdd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</div>
				</el-form-item>
				<el-form-item label="现职时间" label-width='120px'>
					<div class="block">
						<el-date-picker v-model="presentJobDate" value-format="yyyyMMdd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</div>
				</el-form-item>
				<el-form-item label=" 工作单位及职务" label-width='120px'>
					<el-input v-model="form.e10040" maxlength='200'></el-input>
				</el-form-item>
				<el-form-item label="职务职级" prop='dataCDE75543' label-width='120px'>
					<el-checkbox-group v-model="form.a0501b">
						<el-checkbox v-for='(item,index) in dataCDE75543' :label="item.code" :key='index'>
							{{item.name}}
						</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label=" 在职学历信息" label-width='120px'>
					<el-input v-model="form.e1007" maxlength='200'></el-input>
				</el-form-item>
				<el-form-item label=" 全日制学历信息" label-width='120px'>
					<el-input v-model="form.e1005" maxlength='200'></el-input>
				</el-form-item>
				<el-form-item label="政治面貌" prop='data37B05E7C' label-width='120px'>
					<el-checkbox-group v-model="form.a0141b">
						<el-checkbox v-for='(item,index) in data37B05E7C' :label="item.code" :key='index'>
							{{item.name}}
						</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</div>
			<el-form-item class="button">
				<el-button type="primary" @click="onSubmit">查询</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import Pagination from '../../../components/Pagination.vue';

	export default {
		name: 'customSearch',
		components: {

		},
		data() {
			return {
				form: {
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
					pageIndex: this.API.constObj.pageIndex, //当前页码
					pageSize: this.API.constObj.pageSize, //页大小
				},
				data311AFB4B: [], //档案状态
				data44B625FE: [], //人员类别
				dataCDE75543: [], // 职务职级
				data37B05E7C: [], //政治面貌
				data7C5723D2:[],//民族
				dataAD79F7FC:[],//婚姻状态
				birthDate:[],//出生日期
				jobDate:[],//参加工作日期
				organizeDate:[],//参加组织日期
				graduationDate:[],//毕业时间
				presentJobDate:[],// 现职时间
			};
		},
		created() {
			this.getData('311AFB4B', 'data311AFB4B'); //档案状态
			this.getData('44B625FE', 'data44B625FE'); //人员类别
			this.getData('CDE75543', 'dataCDE75543'); //职务职级
			this.getData('37B05E7C', 'data37B05E7C'); //政治面貌
			this.getData('7C5723D2', 'data7C5723D2'); //民族
			this.getData('AD79F7FC', 'dataAD79F7FC'); //婚姻状态
		},
		mounted() {

		},
		methods: {
			onSubmit() {
				//出生日期
				if(this.birthDate.length>0){
					this.form.a01072=this.birthDate[0];
					this.form.a01073=this.birthDate[1];	
				}
				//参加工作日期
				if(this.jobDate.length>0){
					this.form.a01348=this.jobDate[0];
					this.form.a01349=this.jobDate[1];	
				}
				//参加组织日期
				if(this.organizeDate.length>0){
					this.form.a01441=this.organizeDate[0];
					this.form.a01442=this.organizeDate[1];	
				}
				//毕业时间
				if(this.graduationDate.length>0){
					this.form.e10031=this.graduationDate[0];
					this.form.e10032=this.graduationDate[1];	
				}
				//现职时间
				if(this.presentJobDate.length>0){
					this.form.e10041=this.presentJobDate[0];
					this.form.e10042=this.presentJobDate[1];	
				}
				this.form=JSON.stringify(this.form);
				this.$axios({
					loading: {
						isShow: false,
					},
					method: 'post',
					url: this.API.a01Search,
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
	.customSearch {
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
			height:450px;
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