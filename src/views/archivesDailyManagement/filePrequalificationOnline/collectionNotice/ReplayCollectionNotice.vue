<template>
	<div class="replay-collection-notice-container">
		<el-form ref="replayCNForm" :model="replayCNForm" label-width="110px">
			<el-row :gutter="24">
				<el-col :span="12">
					<el-form-item label="发送单位：" prop="receiveor">
						<el-input v-model="replayCNForm.receiveor" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="发送人：" porp="e01z208">
						<el-input v-model="replayCNForm.e01z208" readonly></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="24">
				<el-col :span="12">
					<el-form-item label="标题：" prop="title">
						<el-input v-model="replayCNForm.title" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="转递日期：" porp="transferTime">
						<el-date-picker v-model="replayCNForm.transferTime" readonly type="date" placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="24">
				<el-col :span="24">
					<el-form-item label="催收内容：" porp="content">
						<el-input v-model="replayCNForm.content" readonly></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="24">
				<el-col :span="24">
					<el-form-item label="备注：" :readonly="isDetail" porp="e01z731">
						<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" v-model="replayCNForm.e01z731"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!--操作栏-->
		<div class="oppration" v-if='!isDetail'>
			<el-button type="primary" @click='innerVisible=true'>档案选择</el-button>
			<el-button type="danger" @click="delReplayCNotice">删除</el-button>
		</div>
		<!--表格-->
		<!--<hxTables ref="table" :pageObj="isDetail?pageObj:pageObj1" :fetch="fetchTableData" :columns="columns" :dataSource="tableData" :options="options" @row-click="handleRowClick">
		</hxTables>-->
		<!--表格-->
		<el-table :data="tableData" highlight-current-row empty-text="您还没有添加数据！" height="180px" border style="width: 100%" :row-class-name="tableRowClassName" @row-click="handleRowClick">
			<el-table-column label="序号" align="center" width="80px">
				<template slot-scope="scope"> {{scope.$index + 1}} </template>
			</el-table-column>
			<el-table-column prop="a0101" label="档案人员"  align="center"></el-table-column>
			<el-table-column prop="remark" label="籍贯" align="center"></el-table-column>
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
		<!--操作-->
		<div class="replyBtn">
			<el-button v-if='!isDetail' type="primary" @click="saveReplayCollectionNotice">保存</el-button>
			<el-button v-if='!isDetail' type="danger" @click="cancle">取消</el-button>
			<el-button v-if='isDetail' type="primary" @click="cancle">返回</el-button>
		</div>
		<!--档案选择-->
		<el-dialog width="60%" :close-on-click-modal="false" height="80%" title="添加人员" :visible.sync="innerVisible" append-to-body v-if="innerVisible">
			<fileSelection :source="source" @GetChioceFiles="getChioceFiles"></fileSelection>
		</el-dialog>
	</div>
</template>

<script>
	import fileSelection from '../../../../components/FileSelection.vue';
	import hxTables from "../../../../components/hxTable.vue";
	import pagination from '../../../../components/Pagination.vue';
	
	export default{
		name:"ReplayCollectionNotice",//档案在线预审--催收通知 回复
		props:['checkedCollectionNotice','isDetail'],
		components:{
			fileSelection,
			hxTables,
			pagination
		},
		data(){
			return{
				source: "0", //从档案日常管理中进入
				options1: [ //是否有数字档案：1：有 0:无
					{
						value: 1,
						label: '有'
					},{
						value: 0,
						label: '无'
					}
				],
				innerVisible:false,//档案选择的控制按钮
				replayCNForm:{
					receiveor:"",//发送单位
					e01z208:"",//发送人
					title:"",//标题
					transferTime:"",//转递日期
					content:"",//催收内容
					e01z731:"",//备注
				},
				columns: [ //表头
					{
						prop: "a0101",
						label: "档案人员",
						showOverflowTooltip:true
					},
					{
						prop: "a0104",
						label: "性别",
						width:'80'
					},
					{
						prop: "e10040",
						label: "现职单位及职务",
						showOverflowTooltip:true
					},
					{
						prop: "a0117",
						label: "民族",
						width:'120',
						showOverflowTooltip:true
					},
					{
						prop: "a0107",
						label: "出生年月",
					},
					{
						prop: "iselectronicValue",
						label: "是否有数字档案"
					}
				],
				tableData: [],//显示的数据
				sendData:[],//发送服务的数据集合
				options: {
					mutiSelect: false,
					index: true, //显示序号， 多选则 mutiSelect
					loading: false, //表格加载动画
					initTable: true, //是否一挂载就加载数据
					border: true,
					maxHeight:200
				},
				checkedReplayCollectionNotice:'',//选中的对象
				pageObj: {//默认分页
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				pageObj1:"",//不分页
			}
		},
		created(){
			console.log(this.checkedCollectionNotice);
			this.replayCNForm = this.checkedCollectionNotice;
			if(this.isDetail === undefined) this.isDetail = false;
			if(this.isDetail) this.getData();
		},
		methods:{
			getData(){//获取预览下所有的人信息
				this.$axios({
					method: 'get',
					url: this.API.findE01Z9ById,
					params: {
						'isPage':true,
						'e01z900id': this.replayCNForm.e01z9_00,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.tableData = resData.data.list;
						this.pageObj.total = resData.data.total;
						console.log(this.pageObj.total);
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
			saveReplayCollectionNotice(){//保存
				if(this.tableData === ""|| this.tableData.length <= 0){
					this.$confirm('请添加档案人员！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				this.saveFromNet();
			},
			saveFromNet(){
				var str = {
					'id':this.checkedCollectionNotice.id,
					'e01z209b':this.replayCNForm.e01z209b,
					'receiveor': this.replayCNForm.receiveor,
					'e01z208': this.replayCNForm.e01z208,
					'title': this.replayCNForm.title,
					'transferTime': this.replayCNForm.transferTime,
					'content': this.replayCNForm.content,
					'e01z731': this.replayCNForm.e01z731,
					'lists': this.sendData
					};
					let strJson = JSON.stringify(str);
					this.$axios({
						method: 'post',
						url: this.API.revertFunction,
						data: {
							'str': strJson
						}
					}).then((res) => {
						console.log("返回的数据=" + res);
						var resData = res.data;
						if(resData.code == "1") {
							this.$refs.replayCNForm.resetFields()
							this.tableData = [];
							this.selectedList1 = [];
							this.selectedList2 = [];
							this.$confirm('已提交预审单', '提示', {
								confirmButtonText: '确定',
								showCancelButton: false,
								type: 'warning',
								center: true
							});
							if(!this.isDetail)this.$emit('backAddCN', "");
							else this.$emit('backAddCND', "");
						} else this.$message.error('添加数据失败，请刷新重试！');
					}).catch(function(err) {
						console.log("连接错误" + err);
					})
			},
			cancle(){//取消
				if(!this.isDetail)this.$emit('backAddCN', "");
				else this.$emit('backAddCND', "");
			},
			delReplayCNotice(){//删除
				if(this.checkedReplayCollectionNotice === ""){
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
					this.tableData.splice(this.checkedReplayCollectionNotice.index, 1);
					this.sendData.splice(this.checkedReplayCollectionNotice.index, 1);
					this.checkedReplayCollectionNotice = "";
				});
			},
			getChioceFiles(data) { //从档案选择回来
				console.log('data=='+data);
				this.innerVisible = false;
				this.tableData = this.commonFun.concatArray(this.tableData, data, "a0100");
				this.tableData.forEach(item=>{
					item.remark = item.a0111a;
					let newObj = {};
					newObj.a0100 = item.a0100;
					newObj.a0101 = item.a0101;
					newObj.a0104 = item.a0104;
					newObj.e10040 = item.e10040;
					newObj.a0107 = item.a0107;
					newObj.a0117 = item.a0117;
					newObj.remark = item.a0111a;
					newObj.iselectronic = item.iselectronic;
					newObj.iselectronicValue = item.iselectronicValue;
					this.sendData.push(newObj);
				})
			},
			handleRowClick(row, event, column) {
				//点击行事件，亦可绑定其他事件
				console.log("click row", row, event, column);
				this.checkedReplayCollectionNotice = row;
			},
			tableRowClassName ({row, rowIndex}) {// 把每一行的索引放进row
			      row.index = rowIndex;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.replay-collection-notice-container{
		.oppration{
			display:flex;
			margin-bottom: 10px;
		}
		.replyBtn{
			display:flex;
			justify-content: center;
			margin-top: 10px;
		}
	}
</style>