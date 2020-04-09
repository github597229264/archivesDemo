<!--档案转出-->
<template>
	<div class="add-archives-container">
		<!--表单信息-->
		<el-form :rules="rules" :model="archivesForm" ref="archivesForm" label-width="110px">
			<el-row :gutter="24">
				<el-col :span="12">
					<el-form-item label="转往单位：" prop="e01z704a">
						<el-input v-model="archivesForm.e01z704a"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="转递原因：" prop="e01z721">
						<el-input v-model="archivesForm.e01z721"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="经办人员：" prop="e01z717">
						<el-input v-model="archivesForm.e01z717"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="转递日期：" prop="e01z701">
						<el-date-picker v-model="archivesForm.e01z701" type="date" placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="回执人：" prop="e01z724">
						<el-input v-model="archivesForm.e01z724"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="回执日期：" prop="e01z727">
						<el-date-picker v-model="archivesForm.e01z727" type="date" placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="备注：" prop="e01z731">
						<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="archivesForm.e01z731"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!--操作按钮-->
		<div class="opration">
			<el-button type="primary" @click="innerVisible=true">档案选择</el-button>
			<el-button type="danger" @click="delArchives">删除</el-button>
		</div>
		<el-dialog width="60%" :close-on-click-modal="false" height="500px" title="添加人员" :visible.sync="innerVisible" append-to-body v-if="innerVisible">
			<fileSelection :source="source" @GetChioceFiles="getChioceFiles"></fileSelection>
		</el-dialog>
		<!--表格-->
		<el-table class="add-archives-table" empty-text="您还没有添加数据！" highlight-current-row :data="selectedPagerlList" border style="width: 100%;" @row-click="clickRow">
			<el-table-column label="操作" width="45" align="center">
				<template slot-scope="scope">
					<div v-if="scope.row.isSet">
						<el-button type="text" @click="pwdChange(scope.row,scope.$index,false)">
							保存
						</el-button>
					</div>
					<div v-else>
						<el-button type="text" @click="pwdChange(scope.row,scope.$index,true)">
							修改
						</el-button>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="序号" align="center" width="60">
				<template slot-scope="scope"> {{scope.$index+1}} </template>
			</el-table-column>
			<el-table-column prop="a0101" label="档案人员" align="center" style="width: 15%;">
			</el-table-column>
			<el-table-column prop="a0104" label="性别" align="center" width="80">
			</el-table-column>
			<el-table-column prop="e10040" label="现职单位及职务" show-overflow-tooltip style="width: 15%;" align="center">
			</el-table-column>
			<el-table-column prop="a0117" label="民族" align="center" width="80">
			</el-table-column>
			<el-table-column prop="a0107" label="出生年月" align="center" style="width: 15%;">
			</el-table-column>
			<el-table-column prop="e01z511" label="转出正本数" align="center" style="width: 15%;">
				<template slot-scope="scope" width="80">
					<el-input-number width="80" v-if="scope.row.isSet" v-model="scope.row.e01z511" controls-position="right" :min="1"></el-input-number>
					<span v-else>{{scope.row.e01z511}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="e01z514" label="转出副本数" align="center" style="width: 15%;">
				<template slot-scope="scope" width="80">
					<el-input-number width="80" v-if="scope.row.isSet" v-model="scope.row.e01z514" controls-position="right" :min="1"></el-input-number>
					<span v-else>{{scope.row.e01z514}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="iselectronicValue" label="是否有数字档案" align="center" width="120">
				<template slot-scope="scope">
					<el-select v-if="scope.row.isSet" v-model="scope.row.iselectronicValue">
						<el-option v-for="item in archivestypes2" :key="item.value" :label="item.label" :value="item.label">
						</el-option>
					</el-select>
					<span v-else>{{scope.row.iselectronicValue}}</span>
				</template>
			</el-table-column>
		</el-table>
		<!--操作按钮2-->
		<div class="opration2">
			<el-button type="primary" @click="save('archivesForm')">保存</el-button>
			<el-button type="danger" @click="cancle">取消</el-button>
		</div>
	</div>
</template>

<script>
	import fileSelection from '../../../components/FileSelection.vue';
	export default {
		name:"AddArchivesTransfer",//档案转递
		data() {
			return {
				source: "0", //从档案日常管理中进入
				innerVisible: false, //档案选择弹出框
				archivesForm: {
					e01z704a: "", //是	转往单位
					e01z721: "", //转递原因
					e01z717: "", //经办人员
					e01z701: "", //转递日期
					e01z727: "", //回执日期
					e01z724: "", //回执人
					e01z731: "", //备注
					list: [], //人员信息表
					ids: "" //拼接干部id字符串
				},
				iselectronicValue: "有", //有无数字档案
				rules: {
					e01z704a: [{ //转往单位
						required: true,
						message: '请输入经办人员',
						trigger: 'change'
					},
					{
						min: 0,
						max: 40,
						message: '长度必须在0到 80位字符之间',
						trigger: 'blur'
					}],
					e01z701: [{ //转递日期
						required: true,
						message: '请选中转递日期',
						trigger: 'change'
					}],
					e01z724: [{ //回执人
						required: true,
						message: '请输入回执人',
						trigger: 'change'
					},
					{
						min: 0,
						max: 10,
						message: '长度必须在0到 20位字符之间',
						trigger: 'blur'
					}],
					e01z727: [{ //回执日期
						required: true,
						message: '请选择回执日期',
						trigger: 'change'
					}, ],
					e01z717: [{ //经办人员
						required: true,
						message: '请输入经办人员',
						trigger: 'change'
					},
					{
						min: 0,
						max: 10,
						message: '长度必须在0到 20位字符之间',
						trigger: 'blur'
					}],
					e01z721: [{ //转递原因
						required: true,
						message: '请输入转递原因',
						trigger: 'change'
					},
					{
						min: 0,
						max: 30,
						message: '长度必须在0到 60位字符之间',
						trigger: 'blur'
					}],
				},
				selectItem: "", //选中的某行
				selectedPagerlList: [], //档案选择选中的数据
				archivestypes2: [{ //是否有数字档案
					value: 1,
					label: '有'
				}, {
					value: 0,
					label: '无'
				}],
				isSet: false, //true处于修改状态，false处于显示状态
				flag: false //添加的档案人员是否保存true处于修改状态，false处于显示状态
			}
		},
		created(){
			this.archivesForm.e01z701 = new Date();
			this.archivesForm.e01z727 = new Date();
		},
		methods: {
			save(formName) { //保存数据
				this.$refs[formName].validate((valid) => {
					if(!valid) {
						console.log('error submit!!');
						return false;
					}
					//点击修改 判断是否已经保存所有操作
					/*if(!this.flag) {
						this.$message("请先保存当前编辑项");
						return;
					}*/
					console.log("this.selectedPagerlList" + this.selectedPagerlList);
					if(this.selectedPagerlList.length < 1) {
						this.$message({
							message: '请添加档案人员！',
							type: 'success'
						});
						return;
					}
					this.addFileTransfer();
				})
			},
			addFileTransfer() {
				let newList = [];
				this.selectedPagerlList.forEach(item => {
					let obj = {};
					obj.a0100 = item.a0100;
					obj.a0101 = item.a0101;
					obj.a0104 = item.a0104;
					obj.e10040 = item.e10040;
					obj.a0117 = item.a0117;
					obj.a0107 = item.a0107;
					obj.e01z511 = item.e01z511;
					obj.e01z514 = item.e01z514;
					obj.iselectronicValue = item.iselectronicValue;
					newList.push(obj);
				})
				let str = {
					'e01z704a': this.archivesForm.e01z704a,
					'e01z721': this.archivesForm.e01z721,
					'e01z717': this.archivesForm.e01z717,
					'e01z701': this.commonFun.dateFormat(this.archivesForm.e01z701,"yyyyMMdd"),
					'e01z727': this.commonFun.dateFormat(this.archivesForm.e01z727,"yyyyMMdd"),
					'e01z724': this.archivesForm.e01z724,
					'e01z731': this.archivesForm.e01z731,
					'lists': newList
				}
				let strJson = JSON.stringify(str);
				this.$axios({
					method: 'post',
					url: this.API.fileTransferService,
					data: {
						/*'e01z704a': this.archivesForm.e01z704a,
						'e01z721': this.archivesForm.e01z721,
						'e01z717': this.archivesForm.e01z717,
						'e01z701': this.archivesForm.e01z701,
						'e01z727': this.archivesForm.e01z727,
						'e01z724': this.archivesForm.e01z724,
						'e01z731': this.archivesForm.e01z731,
						'ids': this.archivesForm.ids*/
						"str": strJson
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.$message({
							message: '添加数据成功！',
							type: 'success'
						});
						this.$emit("back", "success");
					} else {
						this.$message({
							type: 'error',
							message: '添加数据失败，请刷新重试！'
						});
					}
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
			},
			getChioceFiles(data) { //从档案选择回来
				this.innerVisible = false;
				this.selectedPagerlList = this.commonFun.concatArray(this.selectedPagerlList, data, "a0100");
				this.selectedPagerlList.forEach(item => {
					item.isSet = false
					item.e01z511 = 1;
					item.e01z514 = 1;
				});
			},
			clickRow(row) { //选中某条数据后，进行保存，方便后删除
				this.selectItem = row;
			},
			delArchives() {
				if(this.selectItem == "") {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确认',
						showCancelButton: false,
						type: 'warning',
						center: true
					})
					return false;
				}
				this.selectedPagerlList.splice(this.selectItem, 1);
				this.selectItem = "";
			},
			cancle() {
				this.$emit("back", "");
			},
			pwdChange(row, index, cg) { //修改和保存函数
				this.selectedPagerlList[index].isSet = cg;
				this.selectedPagerlList = [...this.selectedPagerlList];
				console.log(row, index, cg)
				if(cg) {
					//修改按钮
					this.flag = false;
				} else {
					//保存按钮
					this.flag = true;
				}
			},
		},
		components: {
			fileSelection
		}
	}
</script>

<style lang="scss" scoped>
	.add-archives-container {
		.add-archives-table {
			.el-table__body tr.current-row>td {
				background: #DCEBFA !important;
				color: #606266;
			}
		}
		.opration {
			margin: 0 0 10px 5px;
		}
		.opration2 {
			margin: 10px 0;
			text-align: center;
		}
	}
</style>