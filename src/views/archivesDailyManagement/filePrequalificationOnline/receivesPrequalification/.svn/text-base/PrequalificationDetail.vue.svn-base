<template>
	<div clsss="prequalification-detail-container">
		<!--form-->
		<el-form ref="prequalificatioForm" :model="prequalificatioForm" label-width="110px">
			<el-row :gutter="24">
				<el-col :span='12'>
					<el-form-item label="申请单位：" prop="e01z704a">
						<el-input v-model="prequalificatioForm.e01z704a" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="申请日期：" prop="e01z701">
						<el-input v-model="prequalificatioForm.e01z701" readonly></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter='24'>
				<el-col :span='24'>
					<el-form-item label="备注：" prop="e01z731">
						<el-input type="textarea" v-model="prequalificatioForm.e01z731" readonly :autosize="{ minRows: 2, maxRows: 5}" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!--table加分页-->
		<hxTables ref="table" :pageObj="pageObj" :fetch="fetchTableData" :columns="columns" :dataSource="tableData" :options="options"></hxTables>
		<!--浏览弹出层-->
		<el-dialog title="人员信息" width="100%" fullscreen :visible.sync="browse_personal" v-if='browse_personal' :close-on-click-modal="false" append-to-body>
			<browsePersonal :fourthShow='fourthShow' :selectDeceive="selectCadres"></browsePersonal>
		</el-dialog>
	</div>
</template>

<script>
	import hxTables from "../../../../components/hxTable.vue";
	import browsePersonal from '../../../personnelManagement/BrowsePersonal.vue';
	
	export default{
		name:'PrequalificationDetail',//接收预审---详细
		props:['prequaliObj'],
		components:{
			hxTables,
			browsePersonal
		},
		data(){
			return{
				browse_personal: false, //浏览显示控件标志
				fourthShow:'hidden',//档案利用情况不显示
				prequalificatioForm:{
					e01z704a:"",//申请单位
					e01z701:"",//申请日期
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
			          button: true,
			          label: "操作",
			          width: '80',
			          fixed:'right',
			          group: [
			            {
			              name: "浏览",
			              type: "text",
			              icon: "",
			              plain: false,
			              onClick: (row, index) => {
			                console.log(row, index);
			                this.browse_personal = true;
							this.chioceObj = row.id;
			              },
			            }]
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
					maxHeight:0
				},
				pageObj: {//默认分页
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
			}
		},
		created(){
			this.prequalificatioForm = this.prequaliObj;
		},
		watch:{
			tableData:{
				handler:function(newVal){
					this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 70 - 52 - 41;
					console.log("this.tableHeight"+this.tableHeight);
					this.options.maxHeight = this.tableHeight;
				}
			}
		},
		methods:{
			fetchTableData(){
				this.$axios({
					method: 'get',
					url: this.API.findE01Z9ById,
					params: {
						isPage:true,
						'e01z900id': this.prequaliObj.id,
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
		}
	}
</script>

<style lang='scss' scoped>
	.prequalification-detail-container{
		
	}
</style>