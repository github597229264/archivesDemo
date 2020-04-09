<template>
	<div class="reply-collection-handle-container">
		<!--form-->
		<el-form ref="replyCollectionForm" :model="replyCollectionForm" label-width="110px">
			<el-row :gutter="24">
				<el-col :span="8">
					<el-form-item label="发送单位：" prop="e01z209a">
						<el-input v-model="replyCollectionForm.e01z209a" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="发送人：" prop="e01z208">
						<el-input v-model="replyCollectionForm.e01z208" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="标题：" prop="title">
						<el-input v-model="replyCollectionForm.title" readonly></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="24">
				<el-col :span="24">
					<el-form-item label="催收内容：" porp="content">
						<el-input type="textarea" readonly :autosize="{ minRows: 2, maxRows: 4}" v-model="replyCollectionForm.content"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="24">
				<el-col :span="12">
					 	<el-form-item label="转往单位名称：" prop="e01z209a">
					 		<el-input v-model="replyCollectionForm.e01z209a" readonly></el-input>
					 	</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="转出日期：" prop="e01z4104">
				 		<el-date-picker readonly v-model="replyCollectionForm.e01z4104" type="date" placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyyMMdd">
						</el-date-picker>
				 	</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="24" v-if='isDetail'>
				<el-col :span="12">
				 	<el-form-item label="经办人员：" prop="e01z208">
				 		<el-input v-model="replyCollectionForm.e01z208" readonly></el-input>
				 	</el-form-item>
				</el-col>
				<el-col :span="12">
				 	<el-form-item label="份数：" prop="e01z234">
				 		<el-input readonly v-model="replyCollectionForm.e01z234"></el-input>
				 	</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="24">
				<el-col :span="24">
					<el-form-item label="备注：" porp="e01z4114">
						<el-input type="textarea" :readonly="isDetail"  :autosize="{ minRows: 2, maxRows: 4}" v-model="replyCollectionForm.e01z4114"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!--操作栏-->
		<div class="opration" v-if='!isDetail'>
			<el-button type="primary" @click="innerVisible1 = true">信息库添加</el-button>
			<el-button type="primary" @click="innerVisible2 = true">档案材料选择</el-button>
			<el-button type="danger" @click="delReplyCollection">删除</el-button>
		</div>
		<el-dialog width="80%" :close-on-click-modal="false" height="80%" title="材料添加" :visible.sync="innerVisible1" append-to-body v-if='innerVisible1'>
				<pagerList @GetChiocePagers="getChioceFromPager"></pagerList>
		</el-dialog>
		<el-dialog width="90%" :close-on-click-modal="false" height="80%" title="档案库" :visible.sync="innerVisible2" append-to-body v-if='innerVisible2'>
			<persionFileDetail @GetChioceFiles="getChioceFiles"></persionFileDetail>
		</el-dialog>
		<!--表格-->
		<hxTables ref="table" :pageObj="isDetail?pageObj:pageObj1" :fetch="fetchTableData" :columns="columns" :dataSource="tableData" :options="options" @row-click="handleRowClick">
		</hxTables>
		<div class="addReplyBtn" v-if='!isDetail'>
			<el-button type="primary" @click="addReplyCollection('replyCollectionForm')">保存</el-button>
		</div>
	</div>
</template>

<script>
	import hxTables from "../../../components/hxTable.vue";
	import pagerList from '../materialDeliver/PagerList.vue';
	import persionFileDetail from '../materialDeliver/PersionFileDetail.vue';
	
	export default{
		name:"ReplyCollectionHandle",//催收处理的回复
		props:['replyCollectionHandleObj','isDetail'],
		components:{
			hxTables,
			pagerList,
			persionFileDetail
		},
		data(){
			return{
				innerVisible1: false, //散材料信息库的展示
				innerVisible2: false, //档案库的展示
				replyCollectionForm:{
					e01z209a:"",//发送单位
					e01z208:"",//发送人
					title:"",//标题
					content:"",//催收内容
					e01z209a:"",//转往单位名称
					e01z4104:"",//转出日期
					e01z208:"",//经办人员
					e01z234:"",//份数
					e01z4114:"",//备注
				},
				rules:{
					e01z4104: [ //转出时间
						{
							required: true,
							message: '请选中转出时间',
							trigger: 'change'
						} 
					],
				},
				columns: [ //表头
					{
						prop: "a0101",
						label: "档案人员",
						showOverflowTooltip:true
					},
					{
						prop: "e01z211a",
						label: "材料名称",
						showOverflowTooltip:true
					},
					{
						prop: "e01z211b",
						label: "材料名称代码",
						showOverflowTooltip:true
					},
					{
						prop: "e01z211",
						label: "材料类别",
						showOverflowTooltip:true
					},
					{
						prop: "e01z124",
						label: "份数",
					},
					{
						prop: "e01z224",
						label: "页数"
					},
					{
						prop: "e01z227",
						label: "形成时间",
						showOverflowTooltip:true
					},
					{
						prop: "selecttypeValue",
						label: "材料来源类别",
						showOverflowTooltip:true
					}
				],
				tableData: [],
				selectedList1: [], //从散材料信息科库选中返回的数据
				selectedList2: [], //从档案库选中返回的数据
				options: {
					mutiSelect: false,
					index: true, //显示序号， 多选则 mutiSelect
					loading: false, //表格加载动画
					initTable: true, //是否一挂载就加载数据
					border: true,
					maxHeight:220
				},
				checkedReplyCollection:'',//选中的对象
				pageObj: {//默认分页
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				pageObj1:"",//不分页
			}
		},
		created(){
			if(this.replyCollectionHandleObj){
				this.replyCollectionForm = this.replyCollectionHandleObj;
				this.replyCollectionForm.e01z4104 = this.replyCollectionHandleObj.transferTime;
			}
			if(this.isDetail === undefined )this.isDetail = false;
			console.log("isDetail"+this.isDetail);
		},
		methods:{
			fetchTableData(){
				if(this.isDetail) this.getData();
			},
			getData(){//获取预览下所有的人信息
				this.$axios({
					method: 'get',
					url: this.API.QueryByE01z4100id,
					params: {
						'e01z4100id': this.replyCollectionForm.e01z41_00,
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
			getChioceFiles(data) { //从档案库回来的数据
				console.log(data);
				this.innerVisible2 = false;
				if(data == "") return;
				let newList = [];
				data.forEach(item => { //selecttype :2信息库，0档案库
					let obj = {};
					obj.a0100 = item.a0100;
					obj.a0101 = item.a0101;
					obj.e01z211a = item.name;
					obj.e01z211b = item.e01z111b;
					obj.e01z211 = item.codeno;
					obj.e01z124 = item.parentcode;
					obj.e01z224 = item.e01z114;
					obj.e01z227 = item.e01z117;
					obj.selecttypeValue = "档案库";
					obj.selecttype = 0;//材料来源类型 0 档案库 2 散材料信息库
					obj.e01z000 = item.id; //散材料信息库id
					obj.e01z100 = "";
					obj.id = item.id;
					newList.push(obj);
				})
				this.selectedList2 = this.commonFun.concatArray(this.selectedList2, newList, "id");
				this.handleData(); //重组数据
			},
			getChioceFromPager(data) { //从散材料信息库选择返回回来的,
				this.innerVisible1 = false;
				if(data == "") return;
				let newList = [];
				data.data.forEach(item => {
					let obj = {};
					obj.a0100 = "";
					obj.a0101 = item.a0101;
					obj.e01z211a = item.e01z211a;
					obj.e01z211b = item.e01z211b;
					obj.e01z211 = item.e01z211;
					obj.e01z124 = item.e01z124;
					obj.e01z224 = item.e01z224;
					obj.e01z227 = item.e01z227;
					obj.selecttypeValue = "散材料信息库";
					obj.selecttype = 2;//材料来源类型 0 档案库 2 散材料信息库
					obj.e01z000 = item.id; //散材料信息库id
					obj.e01z100 = "";
					obj.id = item.id;
					newList.push(obj);
				})
				this.selectedList1 = this.commonFun.concatArray(this.selectedList1, newList, "id");
				this.handleData(); //重组数据
			},
			handleData() {
				if(this.selectedList1.length != 0) this.tableData = this.commonFun.concatArray(this.tableData, this.selectedList1, "id");
				if(this.selectedList2.length != 0) this.tableData = this.commonFun.concatArray(this.tableData, this.selectedList2, "id");
			},
			delReplyCollection(){//删除
				console.log(this.tableData);
				if(this.checkedReplyCollection == "") {
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
					this.tableData.splice(this.checkedReplyCollection.index, 1);
					if(this.checkedReplyCollection.selecttypeValue == "散材料信息库"){
						this.selectedList1.forEach((item,index)=>{
							if(item.id === this.checkedReplyCollection.id)this.selectedList1.splice(index,1);
						})
					} 
					if(this.checkedReplyCollection.selecttypeValue == "档案库"){
						this.selectedList2.forEach((item,index)=>{
							if(item.id === this.checkedReplyCollection.id)this.selectedList2.splice(index,1);
						})
					}
					this.checkedReplyCollection = "";
				});
			},
			handleRowClick(row, event, column) {
				//点击行事件，亦可绑定其他事件
				console.log("click row", row, event, column);
				this.checkedReplyCollection = row;
			},
			addReplyCollection(formName){
				this.$refs[formName].validate((valid) => {
					if(!valid) {
						console.log('error submit!!');
						return false;
					}
					if(this.tableData === ""|| this.tableData.length <= 0){
					this.$confirm('请添加档案人员！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
					this.saveForNet();
				});
			},
			saveForNet(){
				var str = {
					'id':this.replyCollectionForm.id,
					'e01z209b':this.replyCollectionForm.e01z209b,
					'e01z209a': this.replyCollectionForm.e01z209a,
					'e01z208': this.replyCollectionForm.e01z208,
					'title': this.replyCollectionForm.title,
					'content': this.replyCollectionForm.content,
					'e01z4104': this.replyCollectionForm.e01z4104,
					'e01z4114': this.replyCollectionForm.e01z4114,
					'lists': this.tableData
					};
					let strJson = JSON.stringify(str);
					this.$axios({
						method: 'post',
						url: this.API.addProcessing,
						data: {
							'str': strJson
						}
					}).then((res) => {
						console.log("返回的数据=" + res);
						var resData = res.data;
						if(resData.code == "1") {
							this.$refs.replyCollectionForm.resetFields()
							this.tableData = [];
							this.selectedList1 = [];
							this.selectedList2 = [];
							this.$confirm('已转出', '提示', {
								confirmButtonText: '确定',
								showCancelButton: false,
								type: 'warning',
								center: true
							});
							this.$emit('backAdd', "");
						} else this.$message.error('添加数据失败，请刷新重试！');
					}).catch(function(err) {
						console.log("连接错误" + err);
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.reply-collection-handle-container{
		.opration{
			display: flex;
			margin-bottom: 10px;
		}
		.addReplyBtn{
			text-align: center;
			margin-top: 10px;
		}
	}
</style>