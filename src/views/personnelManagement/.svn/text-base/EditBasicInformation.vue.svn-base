<template>
	<div class="basic-con" ref='basicCon'  :style="{height:tableHeight}">
		<div class="title">干部数字档案基本信息表</div>
		<form>
			<table class="basicInformatiion" border>
				<tbody>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								<span class="must-fill">*</span> 姓名
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div">
								<input type="text" class="mini-textbox-input" name="a0101" v-model="basicInformationFrom.a0101" maxlength="10">
							</div>

						</td>
						<td class="name-td">
							<div class="name-td-div">
								性别
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div" style="display: flex;justify-content: center;">
								<label>
								<input type="radio"  id="" name="sex-select" v-model="basicInformationFrom.a0104" value="1">男
							</label>
								<label for="">
								<input type="radio"  id="" name="sex-select" v-model="basicInformationFrom.a0104" value="2">女
							</label>
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								出生日期
							</div>
						</td>
						<td class="name-td-fill" style="width:130px">
							<div class="name-td-fill-div nopadding">
								<div class="block">
									<el-date-picker 
										v-model="basicInformationFrom.a0107" 
										value-format="yyyyMMdd" 
										type="date" 
										class="datePicker" 
										placeholder="选择日期">
									</el-date-picker>
								</div>
							</div>
						</td>
						<td class="photo-img" rowspan="4">
							<div v-if="basicInformationFrom.pic">
								<img style="width:165px;height:178px" :src="basicInformationFrom.pic" class="avatar"/>
							</div>
							<div v-else>
								<div v-if="basicInformationFrom.a0104=='2'">
									<img style="width:165px;height:178px" src="../../assets/img/DefaultHeadFemale.jpg" />
								</div>
								<div v-else-if="basicInformationFrom.a0104=='1'">
									<img style="width:165px;height:178px" src="../../assets/img/DefaultHeadMale.jpg" />
								</div>
							</div>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								民族
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div nopadding">
								<NationalTreeSelect :chioceOptionId="basicInformationFrom.a0117" @NationalTreeSelectCall="NationalTreeSelectCall"></NationalTreeSelect>
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								籍贯
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div">
								<el-row style="display: flex;">
									<input type="text" class="mini-textbox-input" @click="BirthPlaceinnerVisible = true" v-model="basicInformationFrom.a0111a">
								</el-row>
								<el-dialog width="50%" height="500px" title="籍贯选择" :visible.sync="BirthPlaceinnerVisible" append-to-body :closeOnClickModal="noShow">
									<BirthPlaceFileSelection @GetChioceFiles="getChioceFiles"></BirthPlaceFileSelection>
								</el-dialog>
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								出生地
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div">
								<el-row style="display: flex;">
									<input type="text" class="mini-textbox-input" @click="NativePlaceinnerVisible = true" v-model="basicInformationFrom.a0114a">
								</el-row>
								<el-dialog width="50%" height="500px" title="出生地选择" :visible.sync="NativePlaceinnerVisible" append-to-body :closeOnClickModal="noShow">
									<NativePlaceFileSelection @GetNativePlace="GetNativePlace"></NativePlaceFileSelection>
								</el-dialog>
							</div>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								政治面貌
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div nopadding">
								<PoliticalOutlookTreeSelect :chioceOptionId="basicInformationFrom.a0141" @PoliticalOutlookTreeSelectCall="PoliticalOutlookTreeSelectCall"></PoliticalOutlookTreeSelect>
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								婚姻状况
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div nopadding">
								<MarriageTreeSelect :chioceOptionId="basicInformationFrom.a0131" @MarriageTreeSelectCall="MarriageTreeSelectCall"></MarriageTreeSelect>

							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								参加组织<br/>时间
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div nopadding">
								<div class="block">
									<el-date-picker v-model="basicInformationFrom.a0144" value-format="yyyyMMdd" name="a0144" type="date" class="datePicker" placeholder="选择日期">
									</el-date-picker>
								</div>
							</div>
						</td>

					</tr>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								现任单位及职务
							</div>
						</td>
						<td class="name-td-fill" colspan="5">
							<div class="name-td-fill-div position-div">
								<input type="text" class="position-input" name="e10040" v-model="basicInformationFrom.e10040" maxlength="100">
							</div>

						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								证件类型
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div nopadding">
								<CertificatesTreeSelect :chioceOptionId="basicInformationFrom.a0183" @CertificatesTreeSelectCall="CertificatesTreeSelectCall"></CertificatesTreeSelect>

							</div>

						</td>
						<td class="name-td">
							<div class="name-td-div">
								证件号码
							</div>
						</td>
						<td class="name-td-fill" colspan="3">
							<div class="name-td-fill-div position-div">
								<input type="text" class="position-input" name="a0184" v-model="basicInformationFrom.a0184" maxlength="18">
							</div>
						</td>
						<td class="name-td photo-td" >
							<el-upload
								style="width:50%"
							   	name="uploadFile"
							  	:headers = "headers"
							  	class="avatar-uploader"
							  	:action="completeUrl"
							  	:show-file-list='false'
							  	:on-success="handleAvatarSuccess"
							  	:before-upload="beforeAvatarUpload"
         						accept="image/png,image/jpg,image/jpeg"
  							  >
								<el-button 
	    							size="small" 
	    							type="primary">
	    							添加
								</el-button>
							</el-upload>
							<div class="add-photo-div noBorder" @click="clearPhoto">
								清空
							</div>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								文化程度
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div">
								<input type="text" class="mini-textbox-input" v-model="basicInformationFrom.e1001" maxlength="25">
							</div>

						</td>
						<td class="name-td">
							<div class="name-td-div">
								个人身份
							</div>
						</td>
						<td class="name-td-fill" colspan="2">
							<div class="name-td-fill-div position-div nopadding">
								<IdentityTreeSelect :chioceOptionId="basicInformationFrom.a0151" @IdentityTreeSelectCall="IdentityTreeSelectCall"></IdentityTreeSelect>
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								毕业时间
							</div>
						</td>
						<td class="name-td-fill" colspan="3">
							<div class="name-td-fill-div nopadding">
								<div class="block">
									<el-date-picker v-model="basicInformationFrom.e1003" value-format="yyyyMMdd" type="date" class="datePicker" placeholder="选择日期">
									</el-date-picker>
								</div>
							</div>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								人员类别
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div nopadding">
								<PersonnelCategoryTreeSelect :chioceOptionId="basicInformationFrom.a01statusa" :title='placeholderTitle' @PersonnelCategoryTreeSelectCall="PersonnelCategoryTreeSelectCall"></PersonnelCategoryTreeSelect>
							</div>

						</td>
						<td class="name-td">
							<div class="name-td-div">
								现职时间
							</div>
						</td>
						<td class="name-td-fill" colspan="2">
							<div class="name-td-fill-div nopadding">
								<div class="block">
									<el-date-picker v-model="basicInformationFrom.e1004" value-format="yyyyMMdd" type="date" class="datePicker" placeholder="选择日期">
									</el-date-picker>
								</div>
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								参加工作时间
							</div>
						</td>
						<td class="name-td-fill" colspan="3">
							<div class="name-td-fill-div nopadding">
								<div class="block">
									<el-date-picker v-model="basicInformationFrom.a0134" value-format="yyyyMMdd" type="date" class="datePicker" placeholder="选择日期">
									</el-date-picker>
								</div>
							</div>
						</td>
					</tr>
					<tr class="name-tr education-box">
						<td class="name-td">
							<div class="name-td-div">
								学历学位
							</div>
						</td>

						<td class="name-td">
							<div class="name-td-div education-type">
								全日制教育
							</div>
							<div class="name-td-div education-type noBorder">
								在职教育
							</div>
						</td>
						<td class="name-td-fill" colspan="2">
							<div class="name-td-fill-div education-type nopadding">
								<div style="border:1px dashed #ccc;height:50px;box-sizing: border-box;display: flex;padding:0 5px">
									<input type="text" class="mini-textbox-input" name="e1005" placeholder="输入全日制学位" v-model="basicInformationFrom.e1005" maxlength="250">
								</div>
								<div style="border:1px dashed #ccc;height:50px;box-sizing: border-box;display: flex;padding:0 5px">
									<input type="text" class="mini-textbox-input" placeholder="输入全日制学历" name="e10050" v-model="basicInformationFrom.e10050" maxlength="250">
								</div>
							</div>
							<div class="name-td-fill-div education-type nopadding">
								<div style="border:1px dashed #ccc;height:50px;box-sizing: border-box;display: flex;padding:0 5px">
									<input type="text" class="mini-textbox-input" placeholder="输入在职学位" name="e1007" v-model="basicInformationFrom.e1007" maxlength="250">
								</div>
								<div style="border:1px dashed #ccc;height:50px;box-sizing: border-box;display: flex;padding:0 5px">
									<input type="text" class="mini-textbox-input" placeholder="输入在职学历" name="e10070" v-model="basicInformationFrom.e10070" maxlength="250">
								</div>
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div education-type">
								毕业院校系及专业
							</div>
							<div class="name-td-div education-type noBorder">
								毕业院校系及专业
							</div>
						</td>
						<td class="name-td-fill" colspan="2">
							<div class="name-td-fill-div education-type nopadding">
								<div style="border:1px dashed #ccc;height:50px;box-sizing: border-box;display: flex;padding:0 5px">
									<input type="text" class="mini-textbox-input" placeholder="输入全日制院校" name="e10051" v-model="basicInformationFrom.e10051" maxlength="250">
								</div>
								<div style="border:1px dashed #ccc;height:50px;box-sizing: border-box;display: flex;padding:0 5px">
									<input type="text" class="mini-textbox-input" placeholder="输入全日制专业" name="e1006" v-model="basicInformationFrom.e1006" maxlength="250">
								</div>
							</div>
							<div class="name-td-fill-div education-type nopadding">
								<div style="border:1px dashed #ccc;height:50px;box-sizing: border-box;display: flex;padding:0 5px">
									<input type="text" class="mini-textbox-input" placeholder="输入在职院校" name="e10071" v-model="basicInformationFrom.e10071" maxlength="250">
								</div>
								<div style="border:1px dashed #ccc;height:50px;box-sizing: border-box;display: flex;padding:0 5px">
									<input type="text" class="mini-textbox-input" placeholder="输入在职专业" name="e1008" v-model="basicInformationFrom.e1008" maxlength="250">
								</div>
							</div>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td" colspan="2">
							<div class="name-td-div status-explain">
								干部档案遗留问题或<br/>需要说明的情况
							</div>
						</td>
						<td class="name-td-fill" colspan="5">
							<div class="name-td-fill-div">
								<textarea class="mini-textbox-input" autocomplete="off" v-model="basicInformationFrom.e10.e1009" maxlength="500" style="height: 198px;"></textarea>
							</div>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td" colspan="2">
							<div class="name-td-div status-explain">
								其他需要说明的事项内容
							</div>
						</td>
						<td class="name-td-fill" colspan="5">
							<div class="name-td-fill-div">
								<textarea class="mini-textbox-input" autocomplete="off" v-model="basicInformationFrom.e10.e1019" maxlength="1073741823" style="height: 198px;"></textarea>
							</div>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								档案整理人
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div">
								<input type="text" class="mini-textbox-input" v-model="basicInformationFrom.e10.e1010" maxlength="25">
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								档案审核人
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div">
								<input type="text" class="mini-textbox-input" v-model="basicInformationFrom.e10.e1011" maxlength="25">
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								正本卷数
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div">
								<input type="text" class="mini-textbox-input" v-model="basicInformationFrom.e10.e1014" maxlength="10">
							</div>
						</td>
						<td class="name-td">
							<div class="copy-num">
								副本卷数
							</div>
							<div class="copy-num noBorder">
								<input type="text" style="font-size: 18px;font-family: '宋体';" v-model="basicInformationFrom.e10.e1014b" maxlength="10">
							</div>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								
								数字档案<br/>采集人
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div">
								<input type="text" class="mini-textbox-input" v-model="basicInformationFrom.e10.e1012" maxlength="25">

							</div>

						</td>
						<td class="name-td">
							<div class="name-td-div">
								数字档案<br/>审核人
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div">
								<input type="text" class="mini-textbox-input" v-model="basicInformationFrom.e10.e1013" maxlength="25">
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								档案报送<br/>单位
							</div>
						</td>
						<td class="name-td-fill" colspan="4">
							<div class="name-td-fill-div">
								<input type="text" class="mini-textbox-input" v-model="basicInformationFrom.e10.e1015" maxlength="90">
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="footer">
				<button type="button" @click="onSubmit">保存</button>
			</div>
		</form>
	</div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import TransferListAdd from './TransferListAdd.vue';
	import vPinyin from '../../common/vue-py.js';
	import NationalTreeSelect from '../../components/NationalTreeSelect.vue';
	import PoliticalOutlookTreeSelect from '../../components/PoliticalOutlookTreeSelect.vue';
	import MarriageTreeSelect from '../../components/MarriageTreeSelect.vue';
	import CertificatesTreeSelect from '../../components/CertificatesTreeSelect.vue';
	import IdentityTreeSelect from '../../components/IdentityTreeSelect.vue';
	import PersonnelCategoryTreeSelect from '../../components/PersonnelCategoryTreeSelect.vue';
	import DepartureCategoryTreeSelect from '../../components/DepartureCategoryTreeSelect.vue';
	import PreRetirementLevelTreeSelect from '../../components/PreRetirementLevelTreeSelect.vue';
	import PreRetirementDetailsTreeSelect from '../../components/PreRetirementDetailsTreeSelect.vue';
	import ManagementClassTreeSelect from '../../components/ManagementClassTreeSelect.vue';
	import BirthPlaceFileSelection from '../../components/BirthPlaceFileSelection.vue';
	import NativePlaceFileSelection from '../../components/NativePlaceFileSelection.vue';

	export default {
		name:'EditBasicInformation',
		props: ['selectObj'],
		components: {
			Pagination, //分页组件
			TransferListAdd, //新增人员
			NationalTreeSelect, //民族下拉
			PoliticalOutlookTreeSelect, //政治面貌
			MarriageTreeSelect, //政治面貌
			CertificatesTreeSelect, //有效证件类型
			IdentityTreeSelect, //个人身份
			PersonnelCategoryTreeSelect, //人员类别
			DepartureCategoryTreeSelect, //离退类别
			PreRetirementLevelTreeSelect, //离退前级别
			PreRetirementDetailsTreeSelect, //提前退休原因
			ManagementClassTreeSelect, //离退后管理类别
			BirthPlaceFileSelection, //籍贯
			NativePlaceFileSelection, //出生地
		},

		data() {
			return {
				basicInformationFrom: { //编辑-基本信息表
					a0100: '',
					a0101: '',
					a0102: '',
					a0104: '',
					a0107: '',
					a0111a: '',
					a0111b: '',
					a0114a: '',
					a0114b: '',
					a0117: '',
					a0127: '',
					a0131: '',
					a0134: '',
					a0141: '',
					a0144: '',
					a0151: '',
					a0183: '',
					a0184: '',
					a0191a: '', //照片id
					e1001: '',
					e1002: '',
					e1003: '',
					e1004: '',
					e10040: '',
					e1005: '',
					e10050: '',
					e10051: '',
					e1006: '',
					e1007: '',
					e10070: '',
					e10071: '',
					e1008: '',
					a01statusa: '',
					pic: '', //照片base64
					e10: {
						e1009: '',
						e1010: '',
						e1011: '',
						e1012: '',
						e1013: '',
						e1014: '',
						e1014b: '',
						e1015: '',
						e1016: '',
						e1019: ''
					},
				},
				pageObj: { //分页
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				BirthPlaceinnerVisible: false,
				NativePlaceinnerVisible: false,
				completeUrl:'',
				imgUrl:'',//图片base64
				noShow:false,
				tableHeight: "",
				placeholderTitle:'请选择'
			}
		},
		mounted() {
			this.completeUrl=this.API.baseURL+this.API.uploadFileImge;
			this.getEditData();
			this.tableHeight = window.innerHeight - this.$refs.basicCon.offsetTop - 70 +'px';
		},
		created() {

		},
		computed:{
			headers(){
				let stateObj = window.vm.$store.state;
				if(stateObj.user && stateObj.user.token) {
					//token 转码
					let submitToken = encodeURIComponent(stateObj.user.token);
					let selectmenuid=this.$axios.defaults.headers.selectmenuid;
					let token = encodeURIComponent(submitToken);
					if(stateObj.menuObj && stateObj.menuObj.id) {//传递菜单id
						selectmenuid = stateObj.menuObj.id;
					}
					return {
				        token: token,
				        selectmenuid:selectmenuid
				   };
			    }else{
			      	//清除登录信息并跳转到登录页面
			        window.vm.commonFun.againLogin(true);
			        return {}
			    }
			}
		},
		methods: {
			onSubmit() { //保存
				this.basicInformationFrom.e1009=this.basicInformationFrom.e10.e1009;
				this.basicInformationFrom.e1010=this.basicInformationFrom.e10.e1010;
				this.basicInformationFrom.e1011=this.basicInformationFrom.e10.e1011;
				this.basicInformationFrom.e1012=this.basicInformationFrom.e10.e1012;
				this.basicInformationFrom.e1013=this.basicInformationFrom.e10.e1013;
				this.basicInformationFrom.e1014=this.basicInformationFrom.e10.e1014;
				this.basicInformationFrom.e1014b=this.basicInformationFrom.e10.e1014b;
				this.basicInformationFrom.e1015=this.basicInformationFrom.e10.e1015;
				this.basicInformationFrom.e1016=this.basicInformationFrom.e10.e1016;
				this.basicInformationFrom.e1019=this.basicInformationFrom.e10.e1019;
				if(!!!this.basicInformationFrom.a0101) {
					this.$confirm('请填写姓名！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				this.$axios({
					loading:{
            			isShow:true,
            			target:'.basic-con'
            		},
					method: 'post',
					url: this.API.saveA01,
					data: this.basicInformationFrom
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.$message({
							type: "success",
							message: '保存成功'
						});
						
						this.getEditData();
					}else{
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
			getEditData() { //基本信息
				this.$axios({
					method: 'get',
					url: this.API.editA01,
					params: {
						'a0100': this.selectObj.a0100,
					}
				}).then((res) => {
					
					if(res.data.code == "1") {
						var num = res.data.data.a01statusa;
						res.data.data.a01statusa = ''+num;
						this.basicInformationFrom = res.data.data;
						
					}else{
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
			handleAvatarSuccess(res, file) {//照片上传
				if(res.code=='1'){
					this.basicInformationFrom.a0191a=res.data.id;
					this.basicInformationFrom.pic=res.data.imgBase64;
				}else if(res.code=='3'){
					this.$message({
			            type: 'error',
			            message: '登录信息过期，请重新登录!'
		          	});  
		           //清除token信息并跳转到登录页面
		           this.commonFun.againLogin(true);
				}else{
					this.$message({
			            type: 'error',
			            message: '上传图片失败，请重新上传！'
		          	}); 
				}

		    },
		    beforeAvatarUpload(file) {
		        //const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < (50 /1024);
		
		        
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 50kb!');
		        }
		        
		        return isLt2M;
		    },
			NationalTreeSelectCall(id) { //民族
				this.basicInformationFrom.a0117 = id
			},
			clearPhoto() { //清空照片
				this.basicInformationFrom.a0191a = '';
				this.basicInformationFrom.pic = '';
			},
			getChioceFiles(data) { //籍贯选择的返回值
				this.BirthPlaceinnerVisible = false;
				this.basicInformationFrom.a0111a = data.name;
				this.basicInformationFrom.a0111b = data.code;
			},
			GetNativePlace(data) { //出生地选择的返回值
				this.NativePlaceinnerVisible = false;
				this.basicInformationFrom.a0114a = data.name;
				this.basicInformationFrom.a0114b = data.code;
			},
			PoliticalOutlookTreeSelectCall(id) { //政治面貌回调
				this.basicInformationFrom.a0141 = id
			},
			MarriageTreeSelectCall(id) { //婚姻状况
				this.basicInformationFrom.a0131 = id
			},
			CertificatesTreeSelectCall(id) { //证件类型
				this.basicInformationFrom.a0183 = id
			},
			IdentityTreeSelectCall(id) { //个人身份
				this.basicInformationFrom.a0151 = id
			},
			PersonnelCategoryTreeSelectCall(id) { //人员类别
				this.basicInformationFrom.a01statusa = ''+id;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.basic-con {
		border: none;
		width: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: auto;
		.listSelect {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.el-menu-vertical-demo:not(.el-menu--collapse) {
			width: 200px;
			min-height: 400px;
		}
		.content {
			.el-dialog {
				height: 100%;
			}
			background-color: #fff;
			.title {
				display: flex;
				justify-content: space-between;
				margin-bottom: 10px;
				.left {
					display: flex;
				}
				.right {
					display: flex;
					.el-button {
						margin-left: 10px;
					}
				}
			}
			.material_page {
				margin-top: 10px;
				text-align: right;
			}
			.el-dialog {
				position: absolute;
				top: 50%;
				left: 50%;
				margin: 0 !important;
				transform: translate(-50%, -50%);
				max-height: calc(100% - 30px);
				max-width: calc(100% - 30px);
				display: flex;
				flex-direction: column;
				background-color: #fff;
				.el-dialog__body {
					overflow: auto;
				}
			}
		}
		.titleInfoBox {
			display: flex;
			justify-content: space-around;
			position: absolute;
			top: 50px;
			left: 0;
			right: 0;
			font-size: 18px;
			background: #eee;
			height: 50px;
			align-items: center;
		}
		.title {
			margin: 0;
			display: flex;
			justify-content: center;
			letter-spacing: 16px;
			font-size: 36px;
			font-family: '宋体';
			height: 30px;
			line-height: 30px;
			margin-top: 20px;
			color: black;
			font-weight: bold;
		}
		.basicInformatiion {
			width: 824px;
			box-sizing: border-box;
			margin-top: 20px;
			border: 2px solid black;
		}
		.name-tr {
			height: 49px;
			.photo-img {
				.avatar-uploader {
					width: 168px;
					.el-upload {
						border: 1px dashed #d9d9d9;
						border-radius: 6px;
						cursor: pointer;
						position: relative;
						overflow: hidden;
						width: 178px !important;
						.avatar-uploader-icon {
							font-size: 28px;
							color: #8c939d;
							width: 178px;
							height: 178px;
							line-height: 178px;
							text-align: center;
						}
						.avatar {
							width: 178px;
							height: 178px;
							display: block;
						}
					}
					.el-upload:hover {
						border-color: #409EFF;
					}
					.el-upload--text {
						width: 178px !important;
					}
				}
			}
			td {
				border: 1px solid black;
				box-sizing: border-box;
			}
			.name-td {
				width: 99px;
				.name-td-div {
					width: 100%;
					font-size: 18px;
					text-align: center;
					font-family: '宋体';
					.must-fill {
						color: red;
						font-weight: bold;
					}
				}
				.status-explain {
					height: 200px;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.education-type {
					height: 100px;
					border-bottom: 1px solid black;
				}
				.add-photo-div {
					width: 48%;
					height: 100%;
					display: inline-block;
					text-align: center;
					border-right: 1px solid black;
					line-height: 50px;
					font-size: 18px;
					color: blue;
					box-sizing: border-box;
				}
				.copy-num {
					width: 48%;
					height: 100%;
					text-align: center;
					border-right: 1px solid black;
					line-height: 50px;
					font-size: 18px;
					font-family: '宋体';
					box-sizing: border-box;
					display: inline-block;
					input[type=text] {
						width: 100%;
						background: none;
						outline: none;
						border: 0px;
					}
				}
				.noBorder {
					border: none !important
				}
			}
			.photo-td{
				display: flex;
				flex-direction: row;
				width:100%;
				border:none;
				border-right:1px solid #000;
				.el-button{
					background: #fff;
					border:none;
					color:#000000;
					width: 100%;
    				height: 100%;
    				font-size: 18px;
    				border-right: 1px dashed #ccc;
				}
			}
			.name-td-fill {
				width: 116px;
				.name-td-fill-div {
					width: 100%;
					padding: 0 5px;
					box-sizing: border-box;
					font-family: '宋体';
					input[type=text] {
						width: 100%;
						background: none;
						outline: none;
						border: 0px;
						font-family: '宋体';
					}
					.block {
						width: 100%;
					}
					.datePicker {
						width: 100%
					}
					.mini-textbox-input {
						width: 590px;
						outline: none;
						resize: none;
						border: none;
						font-size: 18px;
					}
					label {
						width: 50px;
						display: inline-block;
					}
					.position-input {
						width: 100% !important;
						outline: none;
						resize: none;
						border: none;
						font-size: 18px;
						background: red;
					}
				}
				.position-div {
					width: 100%
				}
				.nopadding {
					padding: 0
				}
				.education-type {
					width: 100%;
					height: 100px;
					border-bottom: 1px dashed #3f3f3f;
				}
				.noBorder {
					border: none !important
				}
			}
			.photo-img {
				width: 164px
			}
		}
		.education-box {
			height: 200px
		}
	}
	
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 58px;
		background: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		button {
			display: block;
			width: 106px;
			height: 44px;
			background: #69a5d4;
			border-radius: 6px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 18px;
			font-family: "微软雅黑";
			color: #fff;
			text-decoration: none;
		}
	}
</style>