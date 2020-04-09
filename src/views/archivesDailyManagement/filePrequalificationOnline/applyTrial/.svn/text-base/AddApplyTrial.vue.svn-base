<template>
	<div class="add-applytrial-container">
		<el-form ref="replayATForm" :model="replayATForm" label-width="110px">
			<el-row :gutter='24'>
				<el-col :span="24">
					<el-form-item label="转往单位" prop="e01z704b">
						<areaTreeSelect v-if='!isDetail' style="width: 100%;" :defaultOptions="defaultOptions" @areaTreeSelectCall="getSelect" :title="title"></areaTreeSelect>
						<el-input v-else v-model="replayATForm.e01z704b" readonly></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="24">
				<el-col :span="12">
					<el-form-item label="经办人员" prop="name">
						<el-input v-model="replayATForm.name" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span='12' prop="e01z701">
					<el-form-item label="转递日期" prop="e01z701">
						<el-date-picker :readonly='isDetail?true:false' v-model="replayATForm.e01z701" type="date" placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="24">
				<el-col :span="24">
					<el-form-item label="备注：" porp="e01z731">
						<el-input :readonly='isDetail?true:false' type="textarea" :autosize="{ minRows: 2, maxRows: 5}" v-model="replayATForm.e01z731"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>	
		<!--操作栏-->
		<div class="oppration" v-if='!isDetail'>
			<el-button type="primary" @click="innerVisible=true">档案选择</el-button>
			<el-button class="dbtn" type="danger" @click="delApplyTrial">删除</el-button>
		</div>
		<!--表格-->
		<el-table :data="tableData" highlight-current-row empty-text="您还没有添加数据！" height="180px" border style="width: 100%" :row-class-name="tableRowClassName" @row-click="handleRowClick">
			<el-table-column label="序号" align="center" width="80px">
				<template slot-scope="scope"> {{scope.$index + 1}} </template>
			</el-table-column>
			<el-table-column prop="a0101" label="档案人员"  align="center"></el-table-column>
			<el-table-column prop="a0111a" label="籍贯" align="center"></el-table-column>
			<el-table-column prop="e10040" label="现值单位和职位" show-overflow-tooltip align="center" ></el-table-column>
			<el-table-column prop="a0117" label="名族" align="center"></el-table-column>
			<el-table-column prop="a0107" label="出生年月" align="center"></el-table-column>
			<el-table-column v-if='!isDetail' label="是否有数字档案" align="center" width="140px">
				<template slot-scope="scope">
					<el-select v-model="scope.row.iselectronic" placeholder="请选择" clearable>
							<el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
					</el-select>
				</template>
			</el-table-column>
		</el-table>
		<div v-if='isDetail' class="pagination">
			<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
		</div>
		<div class="oppration2" v-if="!isDetail">
			<el-button type="primary" @click="saveApplyTrial">保存</el-button>
			<el-button type="danger" @click="cancle">取消</el-button>
		</div>
		<!--档案选择-->
		<el-dialog width="60%" :close-on-click-modal="false" height="80%" title="添加人员" :visible.sync="innerVisible" append-to-body v-if="innerVisible">
			<fileSelection :source="source" @GetChioceFiles="getChioceFiles"></fileSelection>
		</el-dialog>
	</div>
</template>

<script>
	import areaTreeSelect from '../../../../components/AreaTreeSelect.vue';
	import fileSelection from '../../../../components/FileSelection.vue';
	import pagination from '../../../../components/Pagination.vue';
	
	export default{
		name:"AddApplyTrial",//添加申请预审
		components:{
			areaTreeSelect,
			fileSelection,
			pagination
		},
		props:['isDetail','applyTrialObj'],
		data(){
			return{
				source:"0", //从档案日常管理中进入
				options1: [ //是否有数字档案：1：有 0:无
					{
						value: 1,
						label: '有'
					},{
						value: 0,
						label: '无'
					}
				],
				checkedApplyTrial:"",//选中的档案人员信息
				innerVisible:false,//档案选择的控制按钮
				defaultOptions:"",//发送单位的默认值
				title:"请选择转往单位",
				replayATForm:{
					e01z704a:"",//转往单位名称
					e01z704b:"",//转往单位区域码
					e01z701:"",//转递日期
					e01z731:"",//备注
					name:JSON.parse(localStorage.getItem(this.API.constObj.loginInfo)).cn,//经办人,当前用户
				},
				pageObj: {//默认分页
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				tableData: [],//显示的数据
				sendData:[],//发送服务的数据集合
				checkedReplayCollectionNotice:'',//选中的对象
			}
		},
		created(){
			console.log(this.isDetail);
			this.replayATForm.e01z701 = new Date();
			if(this.isDetail === undefined) this.isDetail = false;
			if(this.isDetail){
				this.defaultOptions = this.applyTrialObj.e01z704b;
				this.replayATForm.e01z704b = this.applyTrialObj.e01z704a;
				this.replayATForm.e01z701 = this.applyTrialObj.e01z701;
				this.replayATForm.e01z731 = this.applyTrialObj.e01z731;
				this.getData();
			} 
		},
		methods:{
			/*
			 * 分页组件回调方法--子组件回传数据的方法
			 * @page_obj {Object} 分页信息
			 * page_obj.page_index 当前页下标
			 * page_obj.page_size 页大小
			 */
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getData();
			},
			getData(){//详情获取列表的数据queryE01Z9ById
				this.$axios({
					method: 'get',
					url: this.API.findE01Z9ById,
					params: {
						isPage:true,
						e01z900id: this.applyTrialObj.id,
						pageIndex: this.pageObj.pageIndex,
						pageSize: this.pageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.tableData = resData.data.list;
						this.pageObj.total = resData.data.total;
					} else {
						this.$message({
							type: 'error',
							message: '查询数据失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("查询数据管理" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			getSelect(returnObj){//区域机构树形下拉框组件回调方法--子组件回传数据的方法     returnObj 选中的数据对象
		        if(returnObj){
		        	this.replayATForm.e01z704b = returnObj.code;
		        	this.replayATForm.e01z704a = returnObj.name;
		        }
		        console.log("e01z704a"+this.replayATForm.e01z704a);
        	 },
        	 getChioceFiles(data) { //从档案选择回来
				console.log('data=='+data);
				this.innerVisible = false;
				this.tableData = this.commonFun.concatArray(this.tableData, data, "a0100");
				this.tableData.forEach(item=>{
					let newObj = {};
					newObj.a0100 = item.a0100;
					newObj.a0101 = item.a0101;
					newObj.a0104 = item.a0104;
					newObj.e10040 = item.e10040;
					newObj.a0107 = item.a0107;
					newObj.a0117 = item.a0117;
					newObj.iselectronic = item.iselectronic;
					this.sendData.push(newObj);
				})
			},
			handleRowClick(row, event, column) {//点击行事件，亦可绑定其他事件
				console.log("click row", row, event, column);
				this.checkedApplyTrial = row;
			},
			saveApplyTrial(){//保存数据到服务器
				let uAreacode = JSON.parse(localStorage.getItem(this.API.constObj.loginInfo)).uAreacode;
					if(this.replayATForm.e01z704b === uAreacode){
						this.$confirm('不能对本单位进行申请,请选择正确单位！', '提示', {
							confirmButtonText: '确定',
							showCancelButton: false,
							type: 'warning',
							center: true
						});
					return;
				}
				var str = {
					"e01z704a":this.replayATForm.e01z704a,//转往单位名称
					"e01z704b":this.replayATForm.e01z704b,//转往单位区域码
					"e01z701":this.commonFun.dateFormat(this.replayATForm.e01z701,"yyyyMMdd"),//转递日期
					"e01z731":this.replayATForm.e01z731,//备注
					'lists': this.sendData
					};
					let strJson = JSON.stringify(str);
					this.$axios({
						method: 'post',
						url: this.API.addApplyyushen,
						data: {
							'str': strJson
						}
					}).then((res) => {
						console.log("返回的数据=" + res);
						var resData = res.data;
						if(resData.code == "1") {
							this.$confirm('已提交申请', '提示', {
								confirmButtonText: '确定',
								showCancelButton: false,
								type: 'warning',
								center: true
							}).then(() => {
								this.$emit('backAddAT', "success");
							});
						} else this.$message.error('添加数据失败，请刷新重试！');
					}).catch(function(err) {
						console.log("连接错误" + err);
					})
			},
			cancle(){//取消操作
				this.$emit('backAddAT');
			},
			tableRowClassName ({row, rowIndex}) {// 把每一行的索引放进row
			      row.index = rowIndex;
			},
			delApplyTrial(){//删除档案人员
				if(this.checkedApplyTrial === ""){
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
					this.tableData.splice(this.checkedApplyTrial.index, 1);
					this.sendData.splice(this.checkedApplyTrial.index, 1);
					this.checkedApplyTrial = "";
				});
			},
		}
	}
</script>

<style lang="scss">
	.add-applytrial-container{
		.el-cascader{
			width:100% !important;
		}
		.pagination{
			margin-top: 10px;
			text-align: right;
		}
		.oppration{
			margin:10px 0;
			.dbtn{
				margin-left:10px;
			}
		}
		.oppration2{
			display: flex;
			justify-content: center;
			margin:10px 0;
		}
	}
</style>