<!--批量材料处理-添加-->
<template>
	<div class="material-batch-add">
		<el-form ref="materialForm" :rules="rules" :model="materialForm" label-width="110px">
			<el-row :gutter="24">
				<el-col :span="15">
					<el-form-item label="材料名称：" prop="e01z211a">
						<el-input v-model="materialForm.e01z211a"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="9">
					<el-form-item label="材料类号：" prop="e01z211">
						<materialTypeSelect :chioceOptionId='materialForm.e01z211' :isAll="false" :isType="true" @applyTypeCall="applyTypeCall"></materialTypeSelect>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="制成日期：" prop="e01z227">
						<el-date-picker v-model="materialForm.e01z227" type="date" placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item label="份数：" prop="e01z124" id="e01z124">
						<el-input-number v-model="materialForm.e01z124" controls-position="right" @change="handleChangeScore" :min="1" :max="100000000"></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :span="9">
					<el-form-item label="页数：" prop="e01z224">
						<el-input-number v-model="materialForm.e01z224" controls-position="right" @change="handleChange" :min="1" :max="100000000"></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="备注：" prop="e01z231">
						<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="materialForm.e01z231"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-row>
			<el-button type="primary" @click="innerVisible = true">添加人员</el-button>
		</el-row>
		<el-dialog width="60%" :close-on-click-modal="false" height="500px" title="添加人员" :visible.sync="innerVisible" append-to-body>
			<fileSelection :type="type" :source="source" :checkedlist="personlist" @GetChioceFiles="getChioceFiles"></fileSelection>
		</el-dialog>
		<el-table :data="showPersonList" highlight-current-row empty-text="您还没有添加数据，请先选择添加人员！" height="180px" border style="width: 100%">
			<el-table-column label="操作" align="center" width="140px">
				<template slot-scope="scope">
					<el-button type="text" @click="deletesFn2(scope.row,scope.$index)">删除</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="a0101" label="姓名" width="150px;" align="center" ></el-table-column>
			<el-table-column prop="a0111a" label="籍贯" width="200px;" align="center" ></el-table-column>
			<el-table-column prop="e10040" label="现值单位和职位" show-overflow-tooltip align="center" ></el-table-column>
		</el-table>
		<!--分页-->
		<div class="material_page">
			<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
		</div>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="save('materialForm')">保存</el-button>
			<!--<el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>-->
		</div>
	</div>
</template>

<script>
	import pagination from '../../../components/Pagination.vue';
	import fileSelection from '../../../components/FileSelection.vue';
	import materialTypeSelect from '../../../components/MaterialTypeSelect.vue';
	export default {
		name: "MaterialBatchAdd", //材料批量接收 添加，编辑
		data() {
			return {
				source: "0", //从散材料进入中进入
				innerVisible: false,
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				materialForm: {
					e01z211a: '', //材料名称
					e01z227: '', //制成时间
					e01z124: "", //分数
					e01z224: 1, //页数
					e01z231: "", //备注
					e01z211: "", //材料类号
					a0100: "", //id
					a0100s: "", //添加人员的id 人员id用，隔开 例：1，2，3，
					id: ''
				},
				personlist: [], //返回的选中的人员信息
				showPersonList: [], //显示的人员列表
				a0101: "",
				a0111a: "",
				e10040: "",
				rules: {
					e01z211a: [ //材料名称
						{
							required: true,
							message: '请输入材料名称',
							trigger: 'change'
						},
						{
							min: 0,
							max: 40,
							message: '长度必须在0到 80位字符之间',
							trigger: 'blur'
						}  
					],
					e01z227: [{ //制成时间
						required: true,
						message: '请选择制成日期',
						trigger: 'change'
					}],
					e01z211: [{ //材料类号
						required: true,
						message: '请选择材料类号',
						trigger: 'change'
					}, ],
					e01z124: [{ //分数
						required: true,
						message: '请选择分数',
						trigger: 'change'
					}, ],
					e01z224: [{ //页数
						required: true,
						message: '请选中页数',
						trigger: 'change'
					}, ],
					e01z231: [{ //备注 500字符
						min: 0,
						max: 250,
						message: '长度必须在0到 500位字符之间',
						trigger: 'blur'
					}, ],
				},
				materialTypes: [{ //材料类号
					value: '选项1',
					label: '一'
				}, {
					value: '选项2',
					label: '二'
				}, {
					value: '选项3',
					label: '三'
				}, {
					value: '选项4',
					label: '4-1'
				}, {
					value: '选项5',
					label: '4-2'
				}],
				type:0,//type，添加人员列表，0：表示从散材料批量接收的添加进入的
			}
		},
		created() {
			console.log("====")
			this.materialForm.e01z227 = new Date();
			if(this.selectMaterial != "") {
				this.id = this.selectMaterial.id;
				this.materialForm = this.selectMaterial;
				this.materialForm.e01z211 = this.selectMaterial.sys_id;
				this.findA01sById();
			}
		},
		props: ['selectMaterial'],
		methods: {
			applyTypeCall(id) { //材料类号下拉框组件回调方法--子组件回调数据的方法
				this.materialForm.e01z211 = id;
			},
			findA01sById() {
				this.$axios({
					method: 'get',
					url: this.API.findA01sById,
					params: {
						'id': this.materialForm.id
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.pageObj.total = resData.data.total;
						this.personlist = resData.data.list;
						this.showPersonList = this.commonFun.localPaging(this.personlist,this.pageObj.pageIndex,this.pageObj.pageSize);
					} else {
						this.$message({
							type: 'error',
							message: '获取数据失败，请刷新重试！'
						});
					}
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
			},
			getChioceFiles(data) { //获取选中数组
				//合并数组并去重
				console.log("this.personlist" + this.personlist);
				console.log("data" + data);
				this.personlist = this.commonFun.concatArray(this.personlist, data, "a0100");
				this.pageObj.total = this.personlist.length;
				this.showPersonList = this.commonFun.localPaging(this.personlist,this.pageObj.pageIndex,this.pageObj.pageSize);
				this.innerVisible = false;
			},
			handleChangeScore(value) { //分数的处理
				console.log(value);
			},
			handleChange(value) { //页数的处理
				console.log(value);
			},
			save(formName) { //保存数据
				if(this.materialForm.e01z124 > 10000000){
					this.$message("输入份数过大，请重新输入！");
					return;
				}
				if(this.materialForm.e01z224 > 10000000){
					this.$message("输入页数过大，请重新输入！");
					return;
				}
				if(this.personlist.length <= 0) {
					this.$confirm('请选择干部人员！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				this.materialForm.a0100s  = this.commonFun.joinTgetherId(this.personlist,this.materialForm.a0100s,'a0100');
				this.$refs[formName].validate((valid) => {
					if(!valid) {
						console.log('error submit!!');
						return false;
					}
					console.log("this.materialForm.a0100s" + this.materialForm.a0100s);
					if(this.materialForm.a0100s == "" || this.materialForm.a0100s == undefined) {
						this.$confirm('请选择干部人员！', '提示', {
							confirmButtonText: '确定',
							showCancelButton: false,
							type: 'warning',
							center: true
						});
						return;
					}
					let url = "";
					if(this.selectMaterial == "") {
						url = this.API.addMaterial;
					} else {
						url = this.API.updateMaterial;
					}
					this.$axios({
						method: 'post',
						url: url,
						data: {
							'e01z211a': this.materialForm.e01z211a,
							'e01z212': this.materialForm.e01z211,
							'e01z227':this.commonFun.dateFormat(this.materialForm.e01z227,"yyyyMMdd"),	
							'e01z124': this.materialForm.e01z124,
							'e01z224': this.materialForm.e01z224,
							'e01z231': this.materialForm.e01z231,
							'id': this.materialForm.id,
							'a0100s': this.materialForm.a0100s
						}
					}).then((res) => {
						console.log("返回的数据=" + res);
						var resData = res.data;
						if(resData.code == "1") {
							if(this.materialForm.id == "") {
								this.$message({
									message: '添加数据成功！',
									type: 'success'
								});
							} else {
								this.$message({
									message: '编辑数据成功！',
									type: 'success'
								});
							}
							this.$emit('back', this.materialForm);
						} else {
							this.$message({
								type: 'error',
								message: '操作失败，请刷新重试！'
							});
						}
					}).catch(function(err) {
						console.log("连接错误" + err);
					})
				});
			},
			deletesFn2(row, index) { //删除
				console.log(row, index)
				this.$confirm('您确认删除这条数据吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					console.log("删除")
					this.personlist.splice(index, 1);
//					this.showPersonList.splice(row, 1);
//					this.showPersonList = [...this.showPersonList];
					this.pageObj.total = this.personlist.length;
					this.showPersonList = this.commonFun.localPaging(this.personlist,this.pageObj.pageIndex,this.pageObj.pageSize);
				})
			},
			handleCurrentChange(val) { // 分页导航
				this.pageObj.pageIndex = val;
				this.showPersonList = this.commonFun.localPaging(this.personlist,this.pageObj.pageIndex,this.pageObj.pageSize);
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.showPersonList = this.commonFun.localPaging(this.personlist,this.pageObj.pageIndex,this.pageObj.pageSize);
			},
		},
		components: {
			pagination,
			fileSelection,
			materialTypeSelect
		}

	}
</script>

<style lang="scss">
	.material-batch-add {
		padding: 10px;
		h3 {
			font-size: 16px;
			color: #fff;
			background-color: #369FDD;
			line-height: 38px;
			text-indent: 1em;
		}
		.add {
			margin: 10px 0 10px 10px;
		}
		.el-table {
			margin-top: 10px;
		}
		.el-table__body tr.current-row>td {
			        background: #DCEBFA !important;
			        color:#606266;
			}
		.dialog-footer {
			padding-top: 15px;
			text-align: center;
		}
		.material_page {
			/*margin-top: 10px;*/
			text-align: right;
		}
	}
</style>