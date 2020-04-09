<template>
	<el-container class="organization-management-container">
		<el-header class="my-header" style="height: 45px;">组织机构管理</el-header>
		<el-main>
			<div class="organization-management-left">
				<div class="organization-management-title">
					<el-button type="primary" size="mini" @click="addOrganization">添加</el-button>
					<el-button type="primary" size="mini" @click="eidtOrganization">编辑</el-button>
					<el-button type="danger" size="mini" @click="delOrganization">删除</el-button>
					<el-button type="primary" size="mini"  @click="sortOrgManagement">排序</el-button>
				</div>
				<div class="organization-management-tree">
					<organizationTree ref='treeChild' :filterText="filterText" @getSelect="getSelectData"></organizationTree>
				</div>
			</div>
			<!--组织机构排序-->
			<el-dialog width="60%" title="排序" :visible.sync="innerSortVisible" :close-on-click-modal="false" append-to-body>
				<sortOrganizationManagement :sortList="sortList" :id="id" @getSortOM="getsortOrganizationManagement"></sortOrganizationManagement>
			</el-dialog>
			<!--区域选择-->
			<el-dialog width="60%" title="所在行政区域" :visible.sync="innerVisible" :close-on-click-modal="false" append-to-body>
				<nativePlaceFileSelection @GetNativePlace="getNativePlace"></nativePlaceFileSelection>
			</el-dialog>
			<!--添加的对话框-->
			<el-dialog width="60%" :title="title" :visible.sync="addOrganizationVisible" :close-on-click-modal="false" append-to-body v-if="addOrganizationVisible">
				<addOrganizationManagement :type="intType" :organizationSelected="organizationSelected" @addback="addBack"></addOrganizationManagement>
			</el-dialog>
			<div class="organization-management-right">
				<div v-if="isFirst" class="tip">选择维护左边干部人员组织机构，点击具体组织机构维护对应信息。</div>
				<!--表单信息-->
				<div v-else>
					<!--formName-->
					<el-button type="primary" size="mini" @click="savaData('form1')">保存</el-button>
					<!--虚拟机构form-->
					<!--virtualOrganizationForm-->
					<el-form v-if="formFlag=='0'" :rules="rules1" ref="form1" :model="virtualOrganizationForm" label-width="140px">
						<el-row :gutter="24">
							<el-col :span="12">
								<el-form-item label="虚拟机构名称：" prop="b0001">
									<el-input v-model="virtualOrganizationForm.b0001"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="虚拟机构编码：" prop="b0002">
									<el-input v-model="virtualOrganizationForm.b0002"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
					<!--单位form-->
					<!--unitForm-->
					<el-form v-else-if="formFlag=='1'" border :rules="rules2" ref="form1" :model="unitForm" label-width="140px">
						<el-row :gutter="24">
							<el-col :span="12">
								<el-form-item label="单位名称：" prop="b0101">
									<el-input v-model="unitForm.b0101" validate-event></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="组织机构代码：" prop="b0114">
									<el-input v-model="unitForm.b0114" validate-event></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="单位代码：" prop="b0111" validate-event>
									<el-input v-model="unitForm.b0111"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="单位所在政区：" prop="b0117value">
									<el-input type="text" readonly placeholder="请选择所在政区" @click.native="innerVisible=true" v-model="unitForm.b0117value"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="隶属关系：" prop="b0124">
									<unitAffiliationTreeSelect :chioceUnitOptionId='unitOptionId' @affiliationSelectCall="treeSelectUnitCall"></unitAffiliationTreeSelect>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="单位级别：" prop="b0127">
									<unitlevelTreeSelect :chioceOptionId='leveOptionId' @UnitLevelTreeSelectCall="UnitLevelTreeSelectCall"></unitlevelTreeSelect>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item label="单位性质类别：" prop="b0131">
									<natureUnitTreeSelect :chioceNatureOptionId='natureOptionId' @natureSelectCall="treenatureSelectCall"></natureUnitTreeSelect>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item label="详细描述：" prop="describe">
									<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="unitForm.describe"></el-input>
								</el-form-item>

							</el-col>

						</el-row>
					</el-form>
					<!--部门form-->
					<!--departmentForm-->
					<el-form v-else-if="departmentForm && formFlag=='2'" id="departForm" :model="departmentForm" border :rules="rules3" ref="form1" label-width="120px">
						<el-row :gutter="24">
							<el-col :span="12">
								<el-form-item label="部门名称：" prop="dep">
									<el-input v-model="departmentForm.dep"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="部门全称：" prop="departfull">
									<el-input v-model="departmentForm.departfull"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="部门代码：" prop="departcode">
									<el-input v-model="departmentForm.departcode"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="状态：" prop="status">
									<organizationStatusSelect :chioceOptionId="chioceId" @applyStatusCall="applyStatusCallCheck"></organizationStatusSelect>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="编制人数：" prop="staffsize">
									<el-input v-model="departmentForm.staffsize" validate-event></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="实编人数：" prop="realitysize">
									<el-input v-model="departmentForm.realitysize" validate-event></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item label="详细描述：" prop="describe">
									<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="departmentForm.describe"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</div>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	import organizationTree from '../OrganizationTree.vue';
	import sortOrganizationManagement  from './SortOrganizationManagement.vue';
	import organizationStatusSelect from '../../../components/OrganizationStatusSelect.vue';
	import unitlevelTreeSelect from '../../../components/UnitlevelTreeSelect.vue';
	import natureUnitTreeSelect from '../../../components/NatureUnitTreeSelect.vue';
	import unitAffiliationTreeSelect from '../../../components/UnitAffiliationTreeSelect.vue';
	import addOrganizationManagement from './AddOrganizationManagement.vue';
	import nativePlaceFileSelection from '../../../components/NativePlaceFileSelection.vue';

	export default {
		name: "OrganizationManagement", //组织机构管理
		components: {
			organizationTree,
			organizationStatusSelect,
			unitlevelTreeSelect,
			natureUnitTreeSelect,
			unitAffiliationTreeSelect,
			addOrganizationManagement,
			nativePlaceFileSelection,
			sortOrganizationManagement
		},
		data() {
			return { //是否系统内置uIssystem   type 0 是虚拟机构、1是单位、2是部门
				chioceId: "", //选中的状态
				filterText: "",
				unitOptionId: "", //隶属关系默认选中的数据
				leveOptionId: "", //单位级别默认选中的数据
				natureOptionId: "", //单位性质类别默认选中的数据
				title: "", //添加或者编辑
				isFirst: true, //右边初始化的提示语
				virtualOrganizationForm: { //虚拟机构对象
					b0001: "", //虚拟机构名称
					b0002: "" //虚拟机构编码
				},
				formFlag: '0', //
				departmentForm: { //部门对象
					dep: "", //部门名称
					departfull: "", //部门全称
					departcode: "", //部门代码
					status: "", //状态
					staffsize: "", //编制人数
					realitysize: "", //实编人数
					describe: "" //详细描述
				},
				unitForm: { //单位对象
					b0101: "", //单位名称
					b0114: "", //组织机构代码
					b0111: "", //单位代码
					b0117: "", //单位所在政区
					b0117value: "", //单位所在政区，显示
					b0124: "", //隶属关系
					b0127: "", //单位级别
					b0131: "", //单位性质类别
					describe: "", //描述
					code: "" //单位所在政区code
				},
				b0000: "", //机构id
				intType: 0, //机构类型（0：虚拟机构；1：单位；2：部门）
				innerVisible: false, //区域选择
				addOrganizationVisible: false, //添加是否显示的对话框
				innerSortVisible:false,//排序是否显示
				organizationSelected: '', //选中的数据
				rules1: {
					b0001: [{ //虚拟机构名称
						required: true,
						message: '请输入虚拟机构名称',
						trigger: 'blur'
					},
					{
						min: 0,
						max: 25,
						message: '长度必须在0到50位字符之间',
						trigger: 'blur'
					}],
					b0002: [{ //虚拟机构编码
						required: true,
						message: '请输入虚拟机构编码',
						trigger: 'change'
					},
					{
						min: 0,
						max: 25,
						message: '长度必须在0到25位字符之间',
						trigger: 'blur'
					}],
				},
				rules2: {
					b0101: [{ //单位名称
						required: true,
						message: '请输入单位名称',
						trigger: 'blur'
					},
					{
						min: 0,
						max: 25,
						message: '长度必须在0到50位字符之间',
						trigger: 'blur'
					}],
					b0111:[//单位代码（字符25）
						{
							min: 0,
							max: 25,
							message: '长度必须在0到25位字符之间',
							trigger: 'blur'
						}
					],
					b0114:[//	组织机构代码（字符10）
						{
							min: 0,
							max: 10,
							message: '长度必须在0到10位字符之间',
							trigger: 'blur'
						}
					],
					describe:[//详细描述（字符900）
						{
							min: 0,
							max: 450,
							message: '长度必须在0到900位字符之间',
							trigger: 'blur'
						}
					],
				},
				rules3: { //部门对象
					dep: [{ //部门名称
						required: true,
						message: '请输入部门名称',
						trigger: 'blur'
					},
					{
							min: 0,
							max: 35,
							message: '长度必须在0到70位字符之间',
							trigger: 'blur'
						}
					],
					departfull: [{ //部门全称
						required: true,
						message: '请输入部门全称',
						trigger: 'change'
					},
					{
							min: 0,
							max: 90,
							message: '长度必须在0到180位字符之间',
							trigger: 'blur'
						}
					],
					departcode: [{ //部门代码
						required: true,
						message: '请输入部门代码',
						trigger: 'change'
					},
					{
							min: 0,
							max: 20,
							message: '长度必须在0到20位字符之间',
							trigger: 'blur'
						}
					],
					staffsize: [{ //编制人数
						required: true,
						message: '请输入编制人数',
						trigger: 'change'
					},
					{
							min: 0,
							max: 8,
							message: '长度必须在0到8位字符之间',
							trigger: 'blur'
						}
					],
					realitysize: [{ //实编人数
						required: true,
						message: '请输入实编人数',
						trigger: 'change'
					},
					{
							min: 0,
							max: 8,
							message: '长度必须在0到8位字符之间',
							trigger: 'blur'
						}
					],
					describe: [{ //详细描述（字符450）
							min: 0,
							max: 225,
							message: '长度必须在0到450位字符之间',
							trigger: 'blur'
						}
					],
				},
				formName: "",
				treeList:"",//传递过来的树的集合，用户删除判断是否有子元素
				isParent:false,//是否是父元素
				id:'',//左边选中的id
				sortList:"",//要排序的集合
				isBack:false,//是否是排序回来的，true是  false：否
			}
		},
		methods: {
			getSelectData(data, isFirst,list) { //机构组件返回的数据
				console.log("====")
				this.organizationSelected = data;
				this.treeList = list;
				this.b0000 = data.id;
				if(!isFirst) this.isFirst = false;
				if(!this.isFirst) this.id = data.id;
				if(this.isBack) {
					this.id = "";//排序成功后将id置为空，就可以都全部进行排序了，只有再次选中某一条，才是对某一条进行排序
					this.isBack = false;
				}
				console.log("isFirst:" + this.isFirst);
				this.intType = parseInt(data.type);
				switch(this.intType) {
					case 0:
						this.formFlag = '0';
						break;
					case 1:
						this.formFlag = '1';
						break;
						break;
					case 2:
						this.formFlag = '2';
						break;
				}
				this.findB00ById();
				
				this.$refs.form1.clearValidate();
			},
			findB00ById() { //根据id获取机构详情
				this.$axios({
					method: 'get',
					url: this.API.findB00ById,
					params: {
						'b0000': this.b0000
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						if(this.intType == 0) {
							this.virtualOrganizationForm = resData.data.b;
						} else if(this.intType == 1) {
							this.unitForm = resData.data.b;
							this.unitOptionId = this.unitForm.b0124;
							this.leveOptionId = this.unitForm.b0127;
							this.natureOptionId = this.unitForm.b0131;
							this.unitForm.b0117value = this.unitForm.name;
						} else if(this.intType == 2) {
							console.log(resData.data.b);
							this.departmentForm = resData.data.b;
							this.chioceId = this.departmentForm.status;
						} else {
							this.$message({
								type: 'error',
								message: '获取数据失败，请刷新重试！'
							});
						}
					} else {
						this.$message({
							type: 'error',
							message: '查询组织机构管理失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("查询组织机构管理" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			savaData(nameVal) { //保存数据 机构类型（0：虚拟机构；1：单位；2：部门）
				let formName = this.$refs[nameVal];
				switch(this.intType) {
					case 0: //updateB00
						formName.validate((valid) => {
							if(!valid) {
								console.log('error submit!!');
								return false;
							}
							this.updateB00();
						});
						break;
					case 1: //
						formName.validate((valid) => {
							if(!valid) {
								console.log('error submit!!');
								return false;
							}
							this.updateB01();
						});
						break;
					case 2: //
						formName.validate((valid) => {
							if(!valid) {
								console.log('error submit!!');
								return false;
							}
							this.updateB0101();
						});
						break;
				}
			},
			updateB00() { //修改虚拟机构
				this.$axios({
					method: 'post',
					url: this.API.updateB00,
					data: {
						'b0000': this.virtualOrganizationForm.b0000,
						'b0001': this.virtualOrganizationForm.b0001,
						'b0002': this.virtualOrganizationForm.b0002
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.$message({
							message: '更新虚拟机构信息成功！',
							type: 'success'
						});
						//更新机构树，调用子组件的方法tree2
						this.$refs.treeChild.getTreeData(false);
					} else {
						this.$message({
							type: 'error',
							message: '更新失败，请刷新重试！'
						});
					}
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
			},
			updateB01() { //修改单位
				this.$axios({
					method: 'post',
					url: this.API.updateB01,
					data: {
						'b0100': this.unitForm.b0100,
						'b0101': this.unitForm.b0101,
						'b0111': this.unitForm.b0111,
						'b0114': this.unitForm.b0114,
						'b0117': this.unitForm.code,
						'b0124': this.unitForm.b0124,
						'b0127': this.unitForm.b0127,
						'b0131': this.unitForm.b0131,
						'describe': this.unitForm.describe
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.$message({
							message: '更新单位信息成功！',
							type: 'success'
						});
						//更新机构树，调用子组件的方法tree2
						this.$refs.treeChild.getTreeData(false);
					}else {
						this.$message({
							type: 'error',
							message: '更新单位信息失败，请刷新重试！'
						});
					}	
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
			},
			updateB0101() { //修改部门
				/*var input = document.querySelector("#departForm");
				input.focus();*/
				this.$axios({
					method: 'post',
					url: this.API.updateB0101,
					data: {
						'b010100': this.departmentForm.b010100,
						'dep': this.departmentForm.dep,
						'departfull': this.departmentForm.departfull,
						'departcode': this.departmentForm.departcode,
						'staffsize': this.departmentForm.staffsize,
						'realitysize': this.departmentForm.realitysize,
						'status': this.departmentForm.status,
						'describe': this.departmentForm.describe
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.$message({
							message: '更新虚拟机构信息成功！',
							type: 'success'
						});
						//更新机构树，调用子组件的方法tree2
						this.$refs.treeChild.getTreeData(false);
					}else {
						this.$message({
							type: 'error',
							message: '更新虚拟机构信息失败，请刷新重试！'
						});
					}	
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
			},
			applyStatusCallCheck(id) { //下拉选返回的数据
				this.departmentForm.status = id;
			},
			UnitLevelTreeSelectCall(id) { //单位类别回调
				this.unitForm.b0127 = id;
			},
			treenatureSelectCall(id) { //单位性质类型回调
				this.unitForm.b0131 = id;
			},
			treeSelectUnitCall(id) { //隶属关系回调
				this.unitForm.b0124 = id;
			},
			addBack(data, flag) {
				console.log('===')
				this.addOrganizationVisible = false;
				if(flag) return; //flag为true.就是直接取消返回的
				//更新机构树，调用子组件的方法tree2
				this.$refs.treeChild.getTreeData();
				this.organizationSelected = "";
			},
			getNativePlace(data) { //区域选择的返回值
				this.innerVisible = false;
				this.unitForm.b0117value = data.name;
				this.unitForm.code = data.code;
			},
			addOrganization() { //添加、
				this.title = "添加";
				this.organizationSelected = "";
				this.addOrganizationVisible = true;
			},
			eidtOrganization() { //编辑
				if(this.organizationSelected == "") {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				this.title = "编辑";
				this.addOrganizationVisible = true;
			},
			isParentElement(){//判断是否是父元素
				if(this.organizationSelected.pId == "")return;
				this.treeList.forEach(item=>{
					if(this.organizationSelected.id === item.pId){
						this.isParent = true;
						return;
					}
				})
			},
			delOrganization() { //删除
				if(this.organizationSelected == "") {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				if(this.organizationSelected.uIssystem) {
					this.$confirm('系统内置不能删除！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				this.isParentElement();
				if(this.organizationSelected.pId == "" || this.isParent){//有子元素不允许删除
					this.$confirm('机构下有子机构不允许删除！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				this.$confirm('您确认删除这条数据吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.delFromNet();
				}).catch(() => {
					this.selectDeceive = "";
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			delFromNet() { //从服务器删除数据
				this.$axios({
					method: 'get',
					url: this.API.deleteB00,
					params: {
						'b0000': this.b0000
					}
				}).then((res) => {
					var resData = res.data;
					this.isParent = false;
					if(resData.code == "1") {
						this.organizationSelected = "";
						this.$confirm('删除成功！', '提示', {
							confirmButtonText: '确定',
							showCancelButton: false,
							type: 'warning',
							center: true
						}).then(() => {
							this.$refs.treeChild.getTreeData();
						});
					}else if(resData.code == "7"){
						this.$confirm('机构下有人员不允许删除！', '提示', {
							confirmButtonText: '确定',
							showCancelButton: false,
							type: 'warning',
							center: true
						})
					} else {
						this.$message({
							type: 'error',
							message: '删除组织机构失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("删除组织机构" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			sortOrgManagement(){//进入排序界面
				this.findsortB00List();
			},
			findsortB00List() {//获取排序列表
				this.$axios({
					method: 'get',
					url: this.API.findsortB00List,
					params: {
						'id': this.id
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.sortList = resData.data;
						if(this.sortList.length == 0) {
							this.$message("没有要排序的数据！");
							return;
						}
						if(this.sortList.length == 1) {
							this.$message("只有一条数据,不需要进行排序！");
							return;
						}
						this.innerSortVisible = true;
					} else {
						this.$message({
							type: 'error',
							message: '获取排序列表失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("获取排序列表" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			getsortOrganizationManagement(data){//排序返回
				this.innerSortVisible = false;
				if(data === 'getSortOM') this.isBack = true;
				this.$refs.treeChild.getTreeData();
				//this.id = "";//排序成功后将id置为空，就可以都全部进行排序了，只有再次选中某一条，才是对某一条进行排序
			},
		}
	}
</script>

<style lang="scss">
	.organization-management-container {
		height: 100%;
		.my-header {
			padding-top: 15px;
		}
		.el-main {
			background-color: #fff;
			height: 100%;
			display: flex;
			padding-top: 10px;
			.organization-management-left {
				width: 25%;
				.organization-management-title {
					display: flex;
				}
				.organization-management-tree {
					overflow-y: auto;
					height: 450px;
					margin-top: 10px;
				}
			}
			.organization-management-right {
				box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
				margin:0 5px 5px 5px;
				padding: 2px 10px 10px 10px;
				width: 74%;
				.tip {
					margin-top: 100px;
					text-align: center;
					font-size: 13px;
				}
				.el-form {
					margin-top: 10px;
					padding: 10px 10px 0 0;
					border: 1px solid #DCDFE6;
				}
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
	}
</style>