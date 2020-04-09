<template>
	<div class="archivesAuthorize">
		<el-form :inline="true" class="demo-form-inline">
			<el-form-item>
				<el-button type="primary" icon="search" @click="changeSelectAll(true)">全选</el-button>
				<el-button type="primary" icon="search" @click="changeSelectAll(false)">取消全选</el-button>
			</el-form-item>
		</el-form>
		<zk-table ref="multipleTable"  :data="data"  sum-text="sum" index-text="#" :columns="columns" :stripe="props.stripe" :border="props.border" :show-header="props.showHeader" :show-summary="props.showSummary" :show-row-hover="props.showRowHover" :show-index="props.showIndex" :tree-type="props.treeType" :is-fold="props.isFold" :expand-type="props.expandType" :selection-type="props.selectionType"  empty-text="该人员没有档案信息">
			<template slot="type" slot-scope="scope">
				<el-checkbox  v-if="scope.row.type =='文件'" name="citysCheckbox" v-model="printCheckbox" :label="scope.row.code" :key="scope.row.code" @change="handleCheckedPrintChange(arguments,scope.row)">打印</el-checkbox>
			</template>
			<template slot="operation" slot-scope="scope">
				<el-breadcrumb v-if="scope.row.type =='文件'">
				  <el-breadcrumb-item>
				  	<el-button type="text" class="lookFile"  @click="handleRead(scope.row)">查看</el-button>
				  </el-breadcrumb-item>
				</el-breadcrumb>
			</template>
		</zk-table>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="authorize()">授权</el-button>
			<el-button type="primary" @click="reject()">拒绝</el-button>
		</div>
		<el-dialog fullscreen title="档案阅览" :visible.sync="fileDReaderVisible"  append-to-body v-if="fileDReaderVisible">
			<FileDReader :fileObj="fileObj" @FileDReaderCallback="FileDReaderCallback"></FileDReader>
		</el-dialog>
	</div>
</template>

<script>
	import FileDReader from './FileDReader.vue';
	export default {
		name: 'ArchivesAuthorize', //个人档案授权
		props: ['chioceFile'],
		components: {
			FileDReader//档案阅读器--档案文件
		},
		data() {
			return {
				props: {
					stripe: true,//是否隔行变色
					border: true,
					showHeader: true,
					showSummary: false,
					showRowHover: false,
					showIndex: false,
					treeType: true,//是否tree结构
					isFold: true,//是否折叠
					expandType: false,//是否展开类型
					selectionType: true//是否选择类型
				},
				fileObj:{},//文件档案信息
				fileDReaderVisible:false,//阅读器弹窗是否显示
				printCheckbox:[],//打印复选框 选中的数据
				oldData:[],//原始的data
				columns: [{
						label: '名称',
						prop: 'name',
						width: '300px',
					},
					{
						label: '类型',
						prop: 'type',
						minWidth: '50px',
					},
					{
						label: '是否打印',
						prop: 'type',
						minWidth: '50px',
						type: 'template',
						template: 'type',
					},
					{
						label: '操作',
						prop: 'type',
						minWidth: '50px',
						type: 'template',
						template: 'operation',
					}
				],
				data: [] //表格数据
			}
		},
		created() {
			this.getData();
		},
		mounted() {

		},
		computed: {
			propList() {
				return Object.keys(this.props).map(item => ({
					name: item,
				}));
			}
		},
		methods: {
			/**
			 * 鼠标单击checkbox
			 */
			selectionChange(row,rowIndex){
				console.log(row, rowIndex);
			},
			/*
			 * 阅读器--文件组件回调方法--子组件回传数据的方法
			 */
			FileDReaderCallback(list) {
				this.fileDReaderVisible = false;
				if(list && list.length > 0){
					this.fileObj.fileAreaGather = JSON.stringify(list[0]);
					for(let i=0;i<this.oldData.length;i++){
						if(this.oldData[i].id === this.fileObj.id){
							this.oldData[i]._isChecked = true;
							this.oldData[i].fileAreaGather = this.fileObj.fileAreaGather;
							break;
						}
					}
					this.data = this.commonFun.toTreeData2(this.oldData);
				}
			},
			/**
			 * 监听 打印 checkbox的change事件
			 * @param {Boolean} 选中的值 :true/false
			 * @param {Object} 选中的数据对象
			 */
			handleCheckedPrintChange(args,rowData){
				if(args[0] == true){
					//获取当前选中项的list
					let checkedData = this.$refs.multipleTable.getCheckedProp("code");
					checkedData.push(rowData.code);
					this.oldData = this.checkingData(checkedData,false);
					this.data = this.commonFun.toTreeData2(this.oldData);
				}
				this.props.isFold = false;
			},
			/**
			 * 全选
			 * @param {Boolean} 全选/取消全选 true/false
			 */
			changeSelectAll(isAll) {
				let self = this;
				let newPrintData=[];
				if(isAll){//全选
					this.oldData.forEach(function(row,index){
						row._isChecked = true;
						if(row.type == "文件"){
							newPrintData.push(row.code);
						}
					});
				}else{//取消全选
				    this.oldData.forEach(function(row,index){
						row._isChecked = false;
					});
				}
				this.printCheckbox = newPrintData;
				this.data = this.commonFun.toTreeData2(this.oldData);
			},
			/*
			 * 授权
			 */
			authorize() {
				var chioceCode = this.$refs.multipleTable.getCheckedProp("code");
				if(chioceCode.length < 1) {
					this.$message({
						message: '请至少选中一条数据!',
						type: 'warning'
					});
					return;
				}
				let submitList = this.createSubmitData(chioceCode);//生成提交的数据
				if(submitList.length === 0){
					this.$message({
						message: '选中的目录下没有文件，请重新选择!',
						type: 'warning'
					});
					return;
				}
				this.authorizedOperation(submitList);
			},
			/*
			 * 拒绝
			 */
			reject() {
				this.authorizedOperation([]);
			},
			/**
			 * 查看
			 * @param {Object} rowObj
			 */
			handleRead(rowObj){
				this.fileObj = rowObj;
				this.fileDReaderVisible = true;
			},
			/**
			 * 授权操作
			 */
			authorizedOperation(data) {
				let self = this;
				this.$axios({
                	loading:{
            			isShow:true,
            			target:'.archivesAuthorize'
            		},
					method: 'post',
					url: this.API.archivesAccredit,
					data: {
						id: this.chioceFile.id,//选中的人员档案id
						data: JSON.stringify(data)
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						self.$message({
							type: 'success',
							message: '操作成功'
						});
						//回调父组件方法
						self.$emit("AuthorizeCallBack");
					} else {
						self.$message({
							type: 'error',
							message: '查询档案失败，请刷新重试！'
						});
					}
				}).catch((err) =>{
					self.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
				
			},
			/*
			 * 获取表格档案信息的数据 
			 */
			getData() {
				let self = this;
				this.$axios({
            		loading:{
            			isShow:true,
            			text:"档案信息数据量大查询耗时可能较长,请耐心等候...",
            			target:'.zk-table'
            		},
					method: 'get',
					url: this.API.getArchivesTree,
					params: {
						'id': this.chioceFile.id,
						'a0100': this.chioceFile.a0100,
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						self.oldData = resData.data.list;
						self.printCheckbox=self.initPrintData(resData.data.list2);//初始化 打印复选框数据
						self.oldData= self.checkingData(resData.data.list2,true);//选中数据处理
						self.data = self.commonFun.toTreeDataNormal(self.oldData,{
							childKey:"code",
							fatherKey:"parentcode"
						});
					} else {
						self.$message({
							type: 'error',
							message: '查询档案失败，请刷新重试！'
						});
					}
				}).catch((err) =>{
					self.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
				
			},
			/**
			 * 生成提交数据
			 * @param {Array} selectData数据源
			 * @return {Array} submitData 提交的数据
			 */
			createSubmitData(selectData){
				var self =this;
				let submitData = [];//提交的数据
				selectData.forEach((row,index)=>{
					self.oldData.forEach((row2,index2)=>{
						if(row == row2.code && row2.type ==="文件"){
							let submitObj = {
								e01zb100:row2.code,//文件id 
								isprint:false,//是否打印
								e01z100:row2.parentcode,//目录id
								fileAreaGather:row2.fileAreaGather
							};
							submitData.push(submitObj);
							return false;
						}
					})
				})
				self.printCheckbox.forEach(function(row,index){
					submitData.forEach(function(row2,index2){
						if(row == row2.e01zb100){
							row2.isprint = true;
							return false;
						}
					});
				})
				return submitData;
			},
			/**
			 * 选中数据处理
			 * @param {Array} checkData数据源
			 * @return {Array} tenTypeData 返回平级的数据源--默认选中项数据已更新
			 */
			checkingData(checkData,isInit){
				let tenTypeData = this.oldData;
				for(let i=0;i<tenTypeData.length;i++){
					tenTypeData[i]._isChecked = false;
					for(let j=0;j<checkData.length;j++){
						if(isInit && tenTypeData[i].id == checkData[j].e01zb100){
							tenTypeData[i]._isChecked = true;
							tenTypeData[i].fileAreaGather = checkData[j].fileareagather;
							break;
						}else if(!isInit && tenTypeData[i].id == checkData[j]){
							tenTypeData[i]._isChecked = true;
							break;
						}
					}	
				}
				return tenTypeData;
			},
			/**
			 * 初始化 打印复选框数据
			 * @param {Array} data数据源
			 * @return {Array} newArray 返回打印复选框选中的数据
			 */
			initPrintData(data){
				let newArray = [];
				if(data.length >0){
					data.forEach(function(row,index){
						if(row.isprint){
							newArray.push(row.e01zb100);	
						}
					});
				}
				return newArray;
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.archivesAuthorize {
		width: 100%;
		.zk-table{
			height:380px;
			overflow-y:auto;
			.zk-table a{
				font:16px Medium bold;
				color:#409EFF;
				text-decoration:none;
				cursor: pointer;
				
			}
		}
		.zk-table a:hover{
			color:#66b1ff;
			cursor: pointer;
		}
		a:hover{
			color:#66b1ff;
		}
		.dialog-footer{
			margin-top: 20px;
		}
	}
</style>