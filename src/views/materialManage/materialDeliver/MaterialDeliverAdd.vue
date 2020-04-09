<!--材料转递添加-->
<template>
	<div class="material-deliver-add1">
		<!--转递材料详细信息内容-->
		<el-form ref="deliverForm" :rules="rules" :model="deliverForm" label-width="110px">
			<el-row :gutter="24">
				<el-col :span="11">
					<el-form-item label="转往单位：" prop="e01z4103a">
						<el-input v-model="deliverForm.e01z4103a"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="转递方式：" prop="transferouttype"><!--第一版只有线下-->
						<el-input v-model="deliverForm.transferouttype" disabled></el-input>
						<!--<el-select v-model="deliverForm.transferouttype" placeholder="请选择材料类号" style="width:100%">
							<el-option v-for="item in transferouttypes" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>-->
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="转出日期：" prop="e01z4104">
						<el-date-picker v-model="deliverForm.e01z4104" type="date" placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="经办人员：" prop="e01z4113">
						<el-input v-model="deliverForm.e01z4113"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="转递类型：" prop="mode">
						<el-select v-model="deliverForm.mode" style="width:100%">
							<el-option v-for="item in modeValues" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="机要号：" prop="confidentialno">
						<el-input v-model="deliverForm.confidentialno"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="备注：" prop="e01z4114">
						<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="deliverForm.e01z4114"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!--操作-->
		<div class="opration">
			<el-button type="primary" @click="innerVisible1 = true">散材料信息库</el-button>
			<el-dialog width="80%" :close-on-click-modal="false" height="80%" title="材料添加" :visible.sync="innerVisible1" append-to-body v-if='innerVisible1'>
				<pagerList @GetChiocePagers="getChioceFromPager"></pagerList>
			</el-dialog>
			<el-button type="primary" @click="innerVisible2 = true">档案库</el-button>
			<el-dialog width="90%" :close-on-click-modal="false" height="80%" title="档案库" :visible.sync="innerVisible2" append-to-body v-if='innerVisible2'>
				<persionFileDetail @GetChioceFiles="getChioceFiles"></persionFileDetail>
			</el-dialog>
			<el-button type="danger" @click="deleteItem">删除</el-button>
		</div>
		<!--表格-->
		<el-table class="material_table" highlight-current-row  :row-class-name="tableRowClassName" empty-text="您还没有添加数据！" :data="selectedPagerlList" border style="width: 100%;" @row-click="clickRow">
			<el-table-column label="序号" align="center" width="60">
				<template slot-scope="scope"> {{scope.$index+1}} </template>
			</el-table-column>
			<el-table-column prop="a0101" label="档案人员" style="width: 15%;" align="center">
			</el-table-column>
			<el-table-column prop="e01z211a" label="材料名称" show-overflow-tooltip align="center" width="134">
			</el-table-column>
			<el-table-column prop="e01z211b" label="材料名称代码" style="width: 15%;" align="center">
			</el-table-column>
			<el-table-column prop="codeno" label="材料类别" align="center" width="154">
			</el-table-column>
			<el-table-column prop="e01z124" label="份数" align="center" style="width: 15%;">
			</el-table-column>
			<el-table-column prop="e01z224" label="页数" show-overflow-tooltip style="width: 15%;" align="center">
			</el-table-column>
			<el-table-column prop="e01z227" label="形成时间" show-overflow-tooltip style="width: 15%;" align="center">
			</el-table-column>
			<el-table-column prop="sourcetypeValue" label="材料来源" show-overflow-tooltip style="width: 15%;" align="center">
			</el-table-column>
		</el-table>
		<!--操作2-->
		<div class="oprations">
			<el-button type="primary" @click="addDeliver('deliverForm')">确认</el-button>
			<el-button type="danger" @click="cancle">取消</el-button>
		</div>
	</div>
</template>

<script>
	import pagerList from './PagerList.vue';
	import persionFileDetail from './PersionFileDetail.vue';

	export default {
		name: "MaterialDeliverAdd", //材料转递添加
		data() {
			return {
				selectItem: "", //选中要删除的数据
				innerVisible1: false, //散材料信息库的展示
				innerVisible2: false, //档案库的展示
				deliverForm: {
					e01z4103a: '', //转往单位
					transferouttype: '线下', //转递方式
					e01z4104: "", //转出日期
					e01z4113: "", //经办人员
					mode: "", //转递类型
					confidentialno: "", //来件人员
					e01z4114: "", //备注
					archNames: "", //该参数为下面的档案人员名字用,号隔开字符串
					archivesIds: "", //档案库id，拼接字符串
					infoIds: "" //信息库id，拼接字符串
				},
				selectedPagerlList: [], //选中返回的数据
				selectedList1: [], //从散材料信息科库选中返回的数据
				selectedList2: [], //从档案库选中返回的数据
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				transferouttypes: [/*{ //转递方式  0--线上(通过催收单) 1--线上 2--线下
					value: 1,
					label: '线上'
				}, */{
					value: 2,
					label: '线下'
				}],
				modeValues: [{ //转递类型0机要转递 1专人取送
					value: 0,
					label: '机要转递'
				}, {
					value: 1,
					label: '专人取送'
				}],
				rules: {
					e01z4103a: [{
						required: true,
						message: '请输入转往单位',
						trigger: 'blur'
					},
					{
						min: 0,
						max: 40,
						message: '长度必须在0到 80位字符之间',
						trigger: 'blur'
					}],
					e01z4104: [{
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}],
					e01z4113: [{
						required: true,
						message: '请输入经办人',
						trigger: 'change'
					},
					{
						min: 0,
						max: 10,
						message: '长度必须在0到 20位字符之间',
						trigger: 'blur'
					}],
					mode: [{
						required: true,
						message: '请选择转递类型',
						trigger: 'change'
					}],
					confidentialno: [{
						required: true,
						message: '请输入机要号',
						trigger: 'change'
					}],
					e01z4114: [//备注 500字符
					{
						min: 0,
						max: 250,
						message: '长度必须在0到 500位字符之间',
						trigger: 'blur'
					}],
				}
			}
		},
		created(){
			this.deliverForm.e01z4104 = new Date();
			console.log("====")
		},
		methods: {
			getChioceFiles(data) { //从档案库回来的数据
				this.innerVisible2 = false;
				if(data == "") return;
				let newList = [];
				data.forEach(item => { //selecttype :2信息库，0档案库
					let obj = {};
					obj.sourcetypeValue = "档案库";
					obj.a0101 = item.a0101;
					obj.e01z211a = item.name;
					obj.e01z211b = item.e01z111b;
					obj.codeno = item.codeno;
					obj.e01z124 = item.parentcode;
					obj.e01z224 = item.e01z114;
					obj.e01z227 = item.e01z117;
					obj.e01z227 = item.e01z117;
					obj.e01z000 = item.e01z000;
					obj.a0100 = item.a0100;
					obj.e01z100 = item.id; //干部档案库id
					obj.e01z000 = "";
					obj.id = item.id;
					obj.selecttype = 0;
					obj.isPager = false;
					newList.push(obj);
				})
				this.selectedList2 = this.commonFun.concatArray(this.selectedList2, newList, "id");
				this.handleData(data); //重组数据
			},
			getChioceFromPager(data) { //从散材料信息库选择返回回来的,
				this.innerVisible1 = false;
				if(data == "") return;
				data.data.forEach(item => {
					item.sourcetypeValue = "散材料信息库";
					item.codeno = item.e01z211;
					item.e01z227 = item.e01z227;
					item.selecttype = 2;
					item.e01z000 = item.id; //散材料信息库
					item.e01z100 = "";
					item.id = item.id;
					item.a0100 = "";
				})
				this.selectedList1 = this.commonFun.concatArray(this.selectedList1, data.data, "id");
				this.handleData(data); //重组数据
			},
			handleData(data) {
				if(this.selectedList1.length != 0) this.selectedPagerlList = this.commonFun.concatArray(this.selectedPagerlList, this.selectedList1, "id");
				if(this.selectedList2.length != 0) this.selectedPagerlList = this.commonFun.concatArray(this.selectedPagerlList, this.selectedList2, "id");
				this.deliverForm.archNames  = this.commonFun.joinTgetherId(this.selectedPagerlList,this.deliverForm.archNames,'a0101');
			},
			addDeliver(formName) { //添加功能
				this.$refs[formName].validate((valid) => {
					if(!valid) {
						console.log('error submit!!');
						return false;
					}
					//验证是否加入散材料信息库
					if(this.selectedPagerlList == "") {
						this.$confirm('请填写要添加的材料信息！', '提示', {
							confirmButtonText: '确定',
							showCancelButton: false,
							type: 'warning',
							center: true
						});
						return;
					}
					//添加功能
					console.log("===this.deliverForm" + this.deliverForm);
					let newList = [];
					this.selectedPagerlList.forEach(item => { //按照服务器要求拼接字符
						let obj = {};
						obj.e01z211a = item.e01z211a; //材料名称
						obj.e01z211b = item.e01z211b; //材料名称代码
						obj.a0101 = item.a0101; //干部姓名
						obj.e01z211 = item.codeno; //材料类号
						obj.e01z124 = item.e01z124; //份数
						obj.e01z224 = item.e01z224; //页数
						obj.e01z227 = item.e01z227; //材料制成日期
						obj.selecttype = item.selecttype; //材料来源 0  档案库   2.散材料信息库
						obj.e01z100 = item.e01z100; //干部档案库id
						obj.e01z000 = item.e01z000; //散材料信息库id
						obj.a0100 = item.a0100;//id
						newList.push(obj);
					})
					var str = {
						'e01z4103a': this.deliverForm.e01z4103a,
						'transferouttype': 2,
						'e01z4104': this.commonFun.dateFormat(this.deliverForm.e01z4104,"yyyyMMdd"),
						'e01z4113': this.deliverForm.e01z4113,
						'mode': this.deliverForm.mode,
						'confidentialno': this.deliverForm.confidentialno,
						'e01z4114': this.deliverForm.e01z4114,
						'archNames': this.deliverForm.archNames,
						'lists': newList
					};
					let strJson = JSON.stringify(str);
					this.$axios({
						method: 'post',
						url: this.API.addtransfer,
						data: {
							'str': strJson
						}
					}).then((res) => {
						console.log("返回的数据=" + res);
						var resData = res.data;
						if(resData.code == "1") {
							this.$refs.deliverForm.resetFields()
							this.selectedPagerlList = [];
							this.selectedList1 = [];
							this.selectedList2 = [];
							this.archNames = "";
							this.archivesIds = "";
							this.infoIds = "";
							this.$message({
								message: '添加数据成功！',
								type: 'success'
							});
							this.$emit('back', "");
						} else {
							this.$message({
								type: 'error',
								message: '添加数据失败，请刷新重试！'
							});
						}
					}).catch(function(err) {
						console.log("连接错误" + err);
					})
				});
			},
			cancle() {
				this.$emit('back', "");
			},
			clickRow(row) { //选中某条数据后，进行保存，方便后删除
				this.selectItem = row;
			},
			tableRowClassName ({row, rowIndex}) { // 把每一行的索引放进row
			    row.index = rowIndex;
			},
			deleteItem() { //删除功能
				if(this.selectItem == "") {
					this.$confirm('请选择一条数据！', '提示', {
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
					this.selectedPagerlList.splice(this.selectItem.index, 1);
					if(this.selectItem.sourcetypeValue == "散材料信息库"){
						this.selectedList1.forEach((item,index)=>{
							if(item.id === this.selectItem.id)this.selectedList1.splice(index,1);
						})
					} 
					if(this.selectItem.sourcetypeValue == "档案库"){
						this.selectedList2.forEach((item,index)=>{
							if(item.id === this.selectItem.id)this.selectedList2.splice(index,1);
						})
					}
					this.deliverForm.archNames  = this.commonFun.joinTgetherId(this.selectedPagerlList,this.deliverForm.archNames,'a0101');
					this.selectItem = "";
				});
			}
		},
		components: {
			pagerList,
			persionFileDetail
		}
	}
</script>

<style lang="scss">
	.material-deliver-add1 {
		position: relative;
		.el-table {
			margin: 15px 0;
		}
		.el-table__body tr.current-row>td {
		        background: #DCEBFA !important;
		        color:#606266;
		}
		.oprations {
			text-align: center;
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