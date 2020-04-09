<template>
	<div class="receive-add-edit-container">
		<!--表单信息-->
		<el-form :rules="rules" ref="selectReceive" :model="selectReceive" label-width="110px">
			<el-row :gutter="24">
				<el-col :span="24">
					<el-form-item label="来件单位：" prop="e01z204a">
						<el-input v-model="selectReceive.e01z204a"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="收件日期：" prop="e01z201">
						<el-date-picker v-model="selectReceive.e01z201" type="date" placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="接收人：" prop="e01z207">
						<el-input v-model="selectReceive.e01z207"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="接收类型：" prop="type">
						<el-select v-model="selectReceive.type" placeholder="请选择接收类型" style="width:100%">
							<el-option v-for="item in transferouttypes" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="机要号：" prop="confidentialno">
						<el-input v-model="selectReceive.confidentialno"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="备注：" prop="e01z231">
						<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="selectReceive.e01z231"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!--操作按钮-->
		<div class="opration">
			<el-button type="primary" @click="addReceive">添加</el-button>
			<el-button type="primary" @click="copyReceive">复制</el-button>
			<el-button type="danger" @click="delReceive">删除</el-button>
		</div>
		<!--表格-->
		<el-table :data="materialList" border style="width: 100%;" :row-class-name="tableRowClassName" @row-click="clickRow" height="180px">
			<!--<el-table-column label="序号" align="center" width="60" prop="num">
				<template slot-scope="scope"> {{scope.$index+1}} </template>
			</el-table-column>-->
			<el-table-column type="index" label="序号" align="center" width="45"></el-table-column>
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
			<el-table-column prop="a0101" label="档案人员" show-overflow-tooltip align="center">
				<template slot-scope="scope">
					<el-input v-if="scope.row.isSet" v-model="scope.row.a0101"></el-input>
					<span v-else>{{scope.row.a0101}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="e01z211a" label="材料名称" show-overflow-tooltip align="center">
				<template slot-scope="scope">
					<el-input v-if="scope.row.isSet" v-model="scope.row.e01z211a"></el-input>
					<span v-else>{{scope.row.e01z211a}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="e01z211b" label="材料名称代码" show-overflow-tooltip align="center">
				<template slot-scope="scope">
					<el-input v-if="scope.row.isSet" v-model="scope.row.e01z211b"></el-input>
					<span v-else>{{scope.row.e01z211b}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="e01z211" label="材料类别" show-overflow-tooltip align="center">
				<template slot-scope="scope">
					<el-select v-if="scope.row.isSet" v-model="scope.row.e01z211" clearable placeholder="请选择" @change="changeChioceId">
						<el-option v-for="(item,index) in dataList" :key="index" :label="item.codeno" :value="item.codeno" name="item.codeno">
						</el-option>
					</el-select>
					<span v-else>{{scope.row.e01z211}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="e01z124" label="份数" align="center" width="142">
				<template slot-scope="scope" width="80">
					<el-input-number width="80" v-if="scope.row.isSet" v-model="scope.row.e01z124" controls-position="right" :min="1"></el-input-number>
					<span v-else>{{scope.row.e01z124}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="e01z224" label="页数" align="center" width="142">
				<template slot-scope="scope" width="80">
					<el-input-number width="80" v-if="scope.row.isSet" v-model="scope.row.e01z224" controls-position="right" :min="1"></el-input-number>
					<span v-else>{{scope.row.e01z224}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="e01z227" label="形成时间" align="center" width="110">
				<template slot-scope="scope">
					<el-date-picker v-if="scope.row.isSet" v-model="scope.row.e01z227" type="date" placeholder="选择日期" format="yyyyMMdd" value-format="yyyyMMdd">
					</el-date-picker>
					<span v-else>{{scope.row.e01z227}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="e01z231" label="备注" show-overflow-tooltip align="center">
				<template slot-scope="scope">
					<el-input v-if="scope.row.isSet" v-model="scope.row.e01z231"></el-input>
					<span v-else>{{scope.row.e01z231}}</span>
				</template>
			</el-table-column>
		</el-table>
		<!--底部操作-->
		<div class="footer">
			<el-button type="primary" @click="save('selectReceive')">保存</el-button>
			<el-button type="danger" @click="cancle">取消</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "MaterialReceiveAddEidt", //材料接收新增与编辑
		props: ["selectMaterial"],
		data() {
			return {
				dataList: [], //下拉框数据
				materialList: [], //人员集合
				selectReceive: { //表单对象
					e01z204a: "", //来件单位名称
					confidentialno: "", //机要号
					e01z207: "", //接收人
					e01z201: "", //收件日期
					type: "", //接收类型 0--机要转递 1--专人取送
					e01z231: "", //备注
				},
				e01z2: { //散材料人员 对象 lists数组集合
					num: "", //序号
					a0101: "", //档案人员
					e01z211a: "", //材料名称
					e01z211b: "", //材料名称代码
					e01z211: "", //材料类别id
					name: "", //材料类别name
					e01z124: "", //份数
					e01z224: "", //页数
					e01z227: "", //材料制成日期
					e01z231: "", //备注
					isSet: false, //true处于修改状态，false处于显示状态
				},
				materialReceive: '', //整个页面对象
				rules: {
					e01z204a: [{
						required: true,
						message: '请输入来往单位',
						trigger: 'blur'
					},
					{
						min: 0,
						max: 40,
						message: '长度必须在0到80位字符之间',
						trigger: 'blur'
					}],
					e01z201: [{
						required: true,
						message: '请选择收件日期',
						trigger: 'change'
					}],
					e01z207: [{
						required: true,
						message: '请输入收件人',
						trigger: 'change'
					},
					{
						min: 0,
						max: 20,
						message: '长度必须在0到40位字符之间',
						trigger: 'blur'
					}],
					type: [{
						required: true,
						message: '请选择接收类型',
						trigger: 'change'
					}],
					confidentialno: [{
						required: true,
						message: '请输入机要号',
						trigger: 'change'
					},
					{
						min: 0,
						max: 50 ,
						message: '长度必须在0到50位字符之间',
						trigger: 'blur'
					}],
					e01z231: [//备注 500字符
					{
						min: 0,
						max: 250,
						message: '长度必须在0到500位字符之间',
						trigger: 'blur'
					}],
				},
				transferouttypes: [{ //转递方式
					value: 0,
					label: '机要转递'
				}, {
					value: 1,
					label: '专人取送'
				}],
				selectItem: '', //选中的条目
				index: '', //选中的条目index
				flag: false, //是否是编辑状态，true是编辑状态
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				id: "", //传过来要编辑数据的id
				curIndex:0,//当前下标
				num:0,//行号
			}
		},
		handleChange(value) { //分数的处理
			console.log(value);
			this.e01z2.e01z124 = value;
		},
		handleChange1(value) { //页数的处理
			console.log(value);
			this.e01z2.e01z224 = value;
		},
		created() {
			this.selectReceive.e01z201 = new Date();
			if(this.selectMaterial != "") {
				this.selectReceive = this.selectMaterial;
				//				this.e01z2.e01z211 = this.selectReceive.sys_id;
				this.getPagerE01Z2Json();
				this.flag = true;
				this.id = this.selectMaterial.id;
			}
			this.getData();
		},
		methods: {
			getPagerE01Z2Json() { //编辑时，下方列表 材料详情列表
				this.$axios({
					method: 'get',
					url: this.API.findByIde01z200,
//					url: this.API.getAllReceive,findByIde01z200
					params: {
						'startTime': "",
						'endTime': "",
						'id': this.selectMaterial.id,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.materialList = resData.data.list;
						this.materialList.forEach((item, index) => {
							item.isSet = false;
							item.num = index;
						});
						this.pageObj.total = resData.data.total;
					} else {
						this.$message({
							type: 'error',
							message: '获取列表失败，请刷新重试！'
						});
					}
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
			},
			changeChioceId(newV) {
				this.chioceId = newV;
				let obj = {};
				this.dataList.forEach(item => {
					if(item.id == this.chioceId) {
						obj = item;
					}
				})
				this.e01z2.e01z211 = obj.codeno;
			},
			getData() { //获取列表数据
				this.$axios({
					isLoading: false,
					method: 'get',
					url: this.API.quertMaterialType,
					params: {
						isAll:false
						//	                	id:this.API.constObj.applyStatusId//状态
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.dataList = resData.data;
					} else {
						this.$message({
							type: 'error',
							message: '获取状态下拉框数据失败，请刷新重试！'
						});
					}
				}).catch(function(err) {
					console.log("获取状态下拉框数据=" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			applyTypeCall(data) { //材料类号下拉框组件回调方法--子组件回调数据的方法
				this.e01z2.e01z211 = data.codeno;
				this.$refs['selectRef'].value = data.codeno;
				console.log(this.$refs['selectRef'].value);
				this.e01z2.name = data.codeno;
			},
			isSave(attStr) { //判断是否可以保存
				if(attStr == "" || attStr == undefined) {
					this.flag = false; //判断数据是否完整，不完整直接提示
					return false;
				} else {
					this.flag = true;
					return true;
				}
			},
			save(formName) { //保存数据到服务器
				this.$refs[formName].validate((valid) => {
					if(!valid) {
						console.log('error submit!!');
						return false;
					}
					if(this.materialList.length < 1) {
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
					let newList = [];
					this.materialList.forEach(item => {
						let newObj = {};
						if(this.isSave(item.a0101)) newObj.a0101 = item.a0101;
						else {
							this.$message("请先编辑完善档案人员必填信息！");
							return;
						}
						if(this.isSave(item.e01z211a)) newObj.e01z211a = item.e01z211a;
						else {
							this.$message("请先编辑完善档案人员必填信息！");
							return;
						}
						if(this.isSave(item.e01z211b)) newObj.e01z211b = item.e01z211b;
						else {
							this.$message("请先编辑完善档案人员必填信息！");
							return;
						}
						if(this.isSave(item.e01z211)) newObj.e01z211 = item.e01z211;
						else {
							this.$message("请先编辑完善档案人员必填信息！");
							return;
						}
						if(this.isSave(item.e01z124)) newObj.e01z124 = item.e01z124;
						else {
							this.$message("请先编辑完善档案人员必填信息！");
							return;
						}
						if(this.isSave(item.e01z224)) newObj.e01z224 = item.e01z224;
						else {
							this.$message("请先编辑完善档案人员必填信息！");
							return;
						}
						if(this.isSave(item.e01z227)) newObj.e01z227 = item.e01z227;
						else {
							this.$message("请先编辑完善档案人员必填信息！");
							return;
						}
						newObj.e01z231 = item.e01z231;
						newList.push(newObj);
					})
					if(!this.flag) return; //信息不完整不执行下面的
					let url = "";
					if(this.selectMaterial != "") {
						url = this.API.updataMaterialReceiving;
					} else {
						url = this.API.addMaterialReceiving;
					}
					var str = {
						'id': this.id,
						'e01z204a': this.selectReceive.e01z204a,
						'confidentialno': this.selectReceive.confidentialno,
						'e01z207': this.selectReceive.e01z207,
						'e01z201': this.commonFun.dateFormat(this.selectReceive.e01z201,"yyyyMMdd"),
						'type': this.selectReceive.type,
						'e01z231': this.selectReceive.e01z231,
						'lists': newList
					};
					let strJson = JSON.stringify(str);
					this.$axios({
						method: 'post',
						url: url,
						data: {
							"str": strJson
						}
					}).then((res) => {
						console.log("返回的数据=" + res);
						var resData = res.data;
						if(resData.code == "1") {
							if(this.selectMaterial == "") {
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
							this.$emit("backAdd", "");
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
			cancle() {
				this.$emit("backAdd", "cancle");
			},
			addReceive() { //新增一行
				this.materialList.push({
					num: this.num++,
					a0101: '',
					e01z211a: '',
					e01z211b: '',
					e01z211: '',
					e01z124: '',
					e01z224: '',
					e01z227: '',
					e01z231: '',
					isSet: false, //true处于修改状态，false处于显示状态
				})
				this.flag = true;
			},
			copyReceive() { //复制一行
				if(!this.checkClickRow()) return;
				this.selectItem.isSet = false;
				this.flag = false;
				let obj = JSON.stringify(this.selectItem);
				let newObj = JSON.parse(obj);
				newObj.num = this.num++;
				this.materialList.push(newObj);
				this.selectItem = "";
			},
			tableRowClassName ({row, rowIndex}) {// 把每一行的索引放进row
			      row.index = rowIndex;
			},
			delReceive() { //移除一行
				if(!this.checkClickRow()) return;
				this.materialList.splice(this.selectItem.index,1);
				/*this.materialList.forEach((item,index)=>{
					if(item.num == this.curIndex)this.materialList.splice(index, 1);
				})*/
				this.selectItem = "";
				this.flag = true;
			},
			clickRow(row) { //选中某条数据后，进行保存，方便后删除
				this.selectItem = row;
				this.curIndex = row.num;
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
				this.materialList[index].isSet = cg;
				this.materialList = [...this.materialList];
				console.log(row, index, cg)
				if(cg) this.flag = false; //修改按钮
				else this.flag = true; //保存按钮
			}
		},

	}
</script>

<style lang="scss" scoped>
	.receive-add-edit-container {
		.opration {
			display: flex;
			margin: 5px 10px;
		}
		.footer {
			text-align: center;
			margin-top: 5px;
		}
	}
</style>