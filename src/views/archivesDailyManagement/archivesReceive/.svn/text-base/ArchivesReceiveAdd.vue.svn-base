<template>
	<div class="archives-add-container">
		<!--表单信息-->
		<el-form :rules="rules" ref="archivesForm" :model="archivesForm" label-width="110px">
			<el-row :gutter="24">
				<el-col :span="12">
					<el-form-item label="来件单位：" prop="e01z507a">
						<el-input v-model="archivesForm.e01z507a"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="案卷质量：" prop="e01z527">
						<el-select v-model="archivesForm.e01z527" placeholder="请选择材料类号" style="width:100%">
							<el-option v-for="item in archivestype" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="24">
				<el-col :span="12">
					<el-form-item label="接收类型：" prop="type">
						<el-select v-model="archivesForm.type" placeholder="请选择材料类号" style="width:100%">
							<el-option v-for="item in archivestypes" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="机要号：" prop="confidentialno">
						<el-input v-model="archivesForm.confidentialno"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="24">
				<el-col :span="12">
					<el-form-item label="来件人员：" prop="e01z314">
						<el-input v-model="archivesForm.e01z314"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="收件日期：" prop="e01z501">
						<el-date-picker v-model="archivesForm.e01z501" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="24">
				<el-col :span="24">
					<el-form-item label="备注：" prop="e01z544">
						<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="archivesForm.e01z544"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!--操作-->
		<div class="opration">
			<el-button type="primary" @click="addArchives">添加</el-button>
			<el-button type="danger" @click="delArchives">删除</el-button>
		</div>
		<!-- 表格 -->
		<el-table :data="tableData" border style="width: 100%" align="center" class="table_s" @row-click="clickRow">
			<el-table-column type="index" label="序号" align="center" fixed="left" width="45"></el-table-column>
			<el-table-column label="操作" width="45" align="center" fixed="left">
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
			<el-table-column prop="a0101" label="档案人员" show-overflow-tooltip align="center">
				<template slot-scope="scope">
					<el-input v-if="scope.row.isSet" v-model="scope.row.a0101"></el-input>
					<span v-else>{{scope.row.a0101}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="a0104" label="性别" width="115" align="center">
				<template slot-scope="scope">
					<el-select v-if="scope.row.isSet" v-model="scope.row.a0104" @change="changeSexChioceId(scope.row,scope.$index)">
						<el-option v-for="item in archivestypes1" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<span v-else>{{tableData && tableData[scope.$index] && tableData[scope.$index].a0104value}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="e10040" label="现职单位及职务" show-overflow-tooltip align="center" width="120">
				<template slot-scope="scope">
					<el-input v-if="scope.row.isSet" v-model="scope.row.e10040"></el-input>
					<span v-else>{{scope.row.e10040}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="a0117" label="民族" align="center"  width="115">
				<template slot-scope="scope">
					<el-select v-if="scope.row.isSet" v-model="scope.row.a0117" clearable placeholder="请选择" @change="changeChioceId1(scope.row,scope.$index,scope.row.a0117)">
						<el-option v-for="item in dataList" :key="item.code" :label="item.name" :value="item.code">
						</el-option>
					</el-select>
					<!--<el-input v-if="scope.row.isSet" v-model="scope.row.a0117"></el-input>-->
					<span v-else>{{tableData && tableData[scope.$index] && tableData[scope.$index].a0117Value}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="a0107" label="出生日期" align="center" width="240">
				<template slot-scope="scope">
					<el-date-picker v-if="scope.row.isSet" size='small' v-model="scope.row.a0107" type="date" placeholder="选择日期" format="yyyyMMdd" value-format="yyyyMMdd">
					</el-date-picker>
					<!--<el-input v-if="scope.row.isSet" v-model="scope.row.a0107"></el-input>-->
					<span v-else>{{scope.row.a0107}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="e01z511" label="正本卷数" align="center" width="145">
				<template slot-scope="scope" width="80">
					<el-input-number width="80" v-if="scope.row.isSet" v-model="scope.row.e01z511" controls-position="right" @change="handleChange" :min="1"></el-input-number>
					<span v-else>{{scope.row.e01z511}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="e01z514" label="副本卷数" align="center" width="145">
				<template slot-scope="scope">
					<el-input-number v-if="scope.row.isSet" v-model="scope.row.e01z514" controls-position="right" @change="handleChange" :min="1"></el-input-number>
					<span v-else>{{scope.row.e01z514}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="iselectronic" label="是否有数字档案" align="center" width="115">
				<template slot-scope="scope">
					<el-select v-if="scope.row.isSet" v-model="scope.row.iselectronic" @change="changeChioceId(scope.row,scope.$index)">
						<el-option v-for="item in archivestypes2" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<span v-else>{{tableData && tableData[scope.$index] && tableData[scope.$index].iselectronicvalue}}</span>
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
	export default {
		name: "ArchivesReceiveAdd", //档案新增
		data() {
			return {
				archivesForm: {
					e01z507a: "", //来件单位名称
					e01z527: "", //案卷质量
					type: "", //接收类型 0机要 1 派人
					confidentialno: "", //是	机要号
					e01z314: "", //是	来件人员
					e01z501: "", //	是	收件日期
					e01z544: "", //是	备注
				},
				archivestype: [{ //案卷质量
					value: 0,
					label: '高'
				}, {
					value: 1,
					label: '中'
				}, {
					value: 2,
					label: '低'
				}],
				archivestypes: [{ //接收类型
					value: 0,
					label: '机要'
				}, {
					value: 1,
					label: '派人'
				}],
				archivestypes1: [{ //性别
					value: 1,
					label: '男'
				}, {
					value: 2,
					label: '女'
				}],
				archivestypes2: [{ //是否有数字档案
					value: true,
					label: '有'
				}, {
					value: false,
					label: '无'
				}],
				archiverPerson: {
					a0101: "", //档案人员姓名
					a0104: "", //性别
					a0104value: "", //性别
					e10040: "", //现职单位及职务
					a0117: "", //民族code
					a0117Value:"",//民族名称
					a0107: "", //出生年月
					e01z511: "", //正本卷数
					e01z514: "", //副本卷数
					iselectronicvalue: "", //是否有数字档案
					iselectronic: "",
					isSet: false, //true处于修改状态，false处于显示状态
				},
				tableData: [], //人员集合
				selectItem: "", //选中的数据
				rules: {
					e01z507a: [{ //来件单位
						required: true,
						message: '请输入来件单位',
						trigger: 'change'
					},
					{
						min: 0,
						max: 40,
						message: '长度必须在0到 80位字符之间',
						trigger: 'blur'
					}],
					e01z527: [{ //案卷质量
						required: true,
						message: '请选择案卷质量',
						trigger: 'change'
					}],
					type: [{ //接收类型
						required: true,
						message: '请选择接收类型',
						trigger: 'change'
					}, ],
					confidentialno: [{ //机要号
						required: true,
						message: '请输入机要号',
						trigger: 'change'
					},
					{
						min: 0,
						max: 50,
						message: '长度必须在0到 5	0位字符之间',
						trigger: 'blur'
					}],
					e01z314: [{ //来件人员
						required: true,
						message: '请输入来件人员',
						trigger: 'change'
					},
					{
						min: 0,
						max: 20,
						message: '长度必须在0到 4	0位字符之间',
						trigger: 'blur'
					}],
					e01z501: [{ //收件日期
						required: true,
						message: '请选择收件日期',
						trigger: 'change'
					}, ],
					e01z544: [//备注 100 字符
					{
						min: 0,
						max: 50,
						message: '长度必须在0到 100位字符之间',
						trigger: 'blur'
					}],
				},
				flag: false, //添加的档案人员是否保存true处于修改状态，false处于显示状态
				curIndex: "", //当前下标
				num: 0, //行号
				dataList: "", //民族的数据
			}
		},
		created() {
			this.archivesForm.e01z501 = new Date();
			this.getData();
		},
		methods: {
			getData() { //获取名族的数据
				this.$axios({
					loading: {
						isShow: false
					},
					method: 'get',
					url: this.API.getSysCadreCodeDetailList,
					params: {
						code: this.API.constObj.CadreCodeDetailList[2].id //民族类型
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.dataList = resData.data;
						if(this.chioceOptionId && this.chioceOptionId.length > 0) {
							this.chioceId = this.chioceOptionId;
							this.$emit('NationalTreeSelectCall', this.chioceId);
						}
					} else {
						this.$message({
							type: 'error',
							message: '获取民族类型下拉框数据失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("获取民族类型下拉框数据=" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			changeSexChioceId(row, index) {
				if(row.a0104 == 1) {
					this.tableData[index].a0104value = '男'
				} else {
					this.tableData[index].a0104value = '女'
				}
				this.tableData = [...this.tableData];
			},
			changeChioceId(row, index) {
				if(row.iselectronic) {
					this.tableData[index].iselectronicvalue = '有'
				} else {
					this.tableData[index].iselectronicvalue = '无'
				}
				this.tableData = [...this.tableData];
			},
			changeChioceId1(row, index,id) {
				this.dataList.forEach(item=>{
					if(item.code === id) this.tableData[index].a0117Value = item.name;
				})
			},
			addArchives() { //新增一个档案人员
				let obj = {
					num: this.num++,
					a0101: "", //档案人员姓名
					a0104: "", //性别
					a0104value: "", //性别
					e10040: "", //现职单位及职务
					a0117: "", //民族
					a0107: "", //出生年月
					e01z511: "", //正本卷数
					e01z514: "", //副本卷数
					iselectronicvalue: "", //是否有数字档案
					isSet: false, //true处于修改状态，false处于显示状态
				}
				this.flag = true;
				obj = JSON.stringify(obj);
				let newObj = JSON.parse(obj);
				this.tableData.push(newObj);
			},
			delArchives() { //删除一个档案人员
				if(!this.checkClickRow()) return;
				this.tableData.forEach((item, index) => {
					if(item.num == this.curIndex) this.tableData.splice(index, 1);
				})
				this.selectItem = "";
			},
			clickRow(row) { //选中某条数据后，进行保存，方便后删除
				this.selectItem = row;
				this.curIndex = row.num;
			},
			handleChange(value) { //正本卷数
				console.log(value);
				this.archiverPerson.e01z511 = value;
			},
			handleChange1(value) { //副本卷数
				console.log(value);
				this.archiverPerson.e01z514 = value;
			},
			checkClickRow() { //检查是否选中一行
				if(this.selectItem == "") {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确认',
						showCancelButton: false,
						type: 'warning',
						center: true
					})
					return false;
				}
				return true;
			},
			pwdChange(row, index, cg) { //修改和保存函数
				console.log(row, index, cg)
				this.tableData[index].isSet = cg;
				this.tableData = [...this.tableData];
				if(cg) this.flag = false; //修改按钮
				else this.flag = true; //保存按钮
			},
			save(formName) { //保存数据
				this.$refs[formName].validate((valid) => {
					if(!valid) {
						console.log('error submit!!');
						return false;
					}
					console.log("this.tableData" + this.tableData);
					if(this.tableData.length < 1) {
						this.$message({
							message: '请添加档案人员！',
							type: 'success'
						});
						return;
					}
					//点击修改 判断是否已经保存所有操作,判断完保证是可保持状态
					if(!this.flag) {
						this.$message("请先保存档案人员必填信息！");
						return;
					}
					this.addArchivesToNet();
				})

			},
			isSave(attStr) { //判断是否可以保存
				if(attStr === "" || attStr === undefined) {
					this.flag = false; //判断数据是否完整，不完整直接提示
					return false;
				} else {
					this.flag = true;
					return true;
				}
			},
			addArchivesToNet() { //添加数据到服务器
				let list = [];
				this.tableData.forEach(item => {
					let newObj = {};
					if(this.isSave(item.a0101)) newObj.a0101 = item.a0101;
					else {
						this.$message("请先编辑完善档案人员必填信息！");
						return;
					}
					if(this.isSave(item.a0104)) newObj.a0104 = item.a0104;
					else {
						this.$message("请先编辑完善档案人员必填信息！");
						return;
					}
					if(this.isSave(item.e10040)) newObj.e10040 = item.e10040;
					else {
						this.$message("请先编辑完善档案人员必填信息！");
						return;
					}
					if(this.isSave(item.a0117)) newObj.a0117 = item.a0117;
					else {
						this.$message("请先编辑完善档案人员必填信息！");
						return;
					}
					if(this.isSave(item.a0107)) newObj.a0107 = item.a0107;
					else {
						this.$message("请先编辑完善档案人员必填信息！");
						return;
					}
					if(this.isSave(item.e01z511)) newObj.e01z511 = item.e01z511;
					else {
						this.$message("请先编辑完善档案人员必填信息！");
						return;
					}
					if(this.isSave(item.e01z514)) newObj.e01z514 = item.e01z514;
					else {
						this.$message("请先编辑完善档案人员必填信息！");
						return;
					}
					if(this.isSave(item.iselectronic)) newObj.iselectronic = item.iselectronic;
					else {
						this.$message("请先编辑完善档案人员必填信息！");
						return;
					}
					list.push(newObj);
				})
				if(!this.flag) return; //信息不完整不执行下面的
				let str = {
					'e01z507a': this.archivesForm.e01z507a,
					'e01z527': this.archivesForm.e01z527,
					'type': this.archivesForm.type,
					'confidentialno': this.archivesForm.confidentialno,
					'e01z314': this.archivesForm.e01z314,
					'e01z501': this.commonFun.dateFormat(this.archivesForm.e01z501, "yyyyMMdd"),
					'e01z544': this.archivesForm.e01z544,
					'lists': list
				}
				let strJson = JSON.stringify(str);
				this.$axios({
					method: 'post',
					url: this.API.addFileReceive,
					data: {
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
						this.$emit("addback", "success");
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
			cancle() { //取消
				this.$emit("addback", "");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.archives-add-container {
		.opration {
			margin-bottom: 10px;
		}
		.opration2 {
			margin-top: 10px;
			text-align: center;
		}
	}
</style>