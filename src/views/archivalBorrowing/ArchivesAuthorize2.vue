<template>
	<div class="archivesAuthorize">
		<el-form :inline="true" class="demo-form-inline">
			<el-form-item>
				<el-button type="primary"  @click="changeSelectAll">{{allCheck}}</el-button>
				<el-button type="primary"  @click="changeExpended">{{expanded}}</el-button>
			</el-form-item>
		</el-form>
		<TreeTable 
			ref="multipleTable" 
			@checkbox-click="selectionChange" 
			:data="data"  
			sum-text="sum" 
			index-text="#" 
			:columns="columns" 
			:stripe="props.stripe" 
			:border="props.border" 
			:show-header="props.showHeader" 
			:show-summary="props.showSummary" 
			:show-row-hover="props.showRowHover" 
			:show-index="props.showIndex" 
			:tree-type="props.treeType" 
			select-type="checkbox" 
			:is-fold="props.isFold" 
			expand-key="name" 
			:expand-type="props.expandType" 
			:selection-type="props.selectionType"  
			empty-text="该人员没有档案信息">
			<template slot="type" slot-scope="scope">
				<el-checkbox  v-if="scope.row.type =='文件'" name="citysCheckbox" v-model="printCheckbox" :label="scope.row.code" :key="scope.row.code" @change="handleCheckedPrintChange(arguments,scope.row,scope)">打印</el-checkbox>
			</template>
			<template slot="operation" slot-scope="scope">
				<el-breadcrumb v-if="scope.row.type =='文件'">
				  <el-breadcrumb-item>
				  	<el-button type="text" class="lookFile"  @click="handleRead(scope.row)">查看</el-button>
				  </el-breadcrumb-item>
				</el-breadcrumb>
			</template>
		</TreeTable>
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
				tArr:[],
				deep:0,
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
				expanded:"展开",
				allCheck:"全部选中",
				isAllCheck:false,//是否全选
				leftcheckbox:[],//左侧checkbox
				fileObj:{},//文件档案信息
				fileDReaderVisible:false,//阅读器弹窗是否显示
				printCheckbox:[],//打印复选框 选中的数据
				oldData:[],//原始的data
				noFileData:[],//无type类型为文件的数据
				columns: [{
						title: '名称',
						key: 'name',
						width: '300px'
					},
					{
						title: '类型',
						key: 'type',
						minWidth: '50px'
					},
					{
						title: '是否打印',
						key: 'type',
						minWidth: '50px',
						type: 'template',
						template: 'type'
					},
					{
						title: '操作',
						key: 'type',
						minWidth: '50px',
						type: 'template',
						template: 'operation'
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
					code: item,
				}));
			}
		},
		methods: {
			changeExpended(){
				if(this.expanded == "展开"){
					this.props.isFold = false;
					this.expanded ="折叠";
				}else{
					this.props.isFold = true;
					this.expanded ="展开";
				}
			},
			/**
			 * 鼠标单击checkbox
			 */
			selectionChange(row, rowIndex, $event){
				if(row._isChecked === false){
					let isExist = false;
					for(let i=0;i<this.printCheckbox.length;i++){
						if(this.printCheckbox[i] === row.code){
							isExist = true;
							this.printCheckbox.splice(i,1);
							break;
						}
					}
					if(isExist){
						this.newCheckboxChecked(row,true,false);	
					}
				}else{
					this.newCheckboxChecked(row,false,false);	
				}
			},
			/*
			 * 阅读器--文件组件回调方法--子组件回传数据的方法
			 */
			FileDReaderCallback(list) {
				console.log(list);
				this.fileDReaderVisible = false;
				if(list && list.length > 0){
					this.fileObj.fileAreaGather = JSON.stringify(list[0]);
					this.updateTreeDataByObj(this.fileObj,true);
					console.log(this.data);
					this.areaCheckboxChecked(this.fileObj);
				}
			},
			/**
			 * 监听 打印 checkbox的change事件
			 * @param {Boolean} 选中的值 :true/false
			 * @param {Object} 选中的数据对象
			 */
			handleCheckedPrintChange(args,rowData){
				if(args[0] == true){
					this.newCheckboxChecked(rowData,false,true);
				}
			},
			/**
			 * 区域授权和多选框处理
			 * @param {Object} rowData
			 */
			areaCheckboxChecked(rowData){
				let arrayIndexs = [];
				for(let c=0;c<rowData._level-1;c++){
					if(c===0){
						arrayIndexs[c]=this.updateTreeDataByCode(rowData.parentcode);
					}else{
						arrayIndexs[c]=this.updateTreeDataByCode(arrayIndexs[c-1].parentCode);	
					}
				}
				let newObj = {};
				if(rowData._level === 3){
					newObj = this.data[arrayIndexs[1].index].children[arrayIndexs[0].index].children[rowData._normalIndex-1];
					newObj.isPrint = rowData.isPrint;
					newObj._isChecked = true;
					newObj.fileAreaGather = rowData.fileAreaGather;
					this.data[arrayIndexs[1].index].children[arrayIndexs[0].index].children[rowData._normalIndex-1]= newObj;
				}else{
					newObj = this.data[arrayIndexs[2].index].children[arrayIndexs[1].index].children[arrayIndexs[0].index].children[rowData._normalIndex-1];
					newObj.isPrint = rowData.isPrint;
					newObj._isChecked = true;
					newObj.fileAreaGather = rowData.fileAreaGather;
					this.data[arrayIndexs[2].index].children[arrayIndexs[1].index].children[arrayIndexs[0].index].children[rowData._normalIndex-1] = newObj;
				}
				this.props.isFold = false;
			},
			/**
			 * 操作多选框选中的数据处理
			 * @param {Object} rowData
			 * @param {Object} isCancelPrint
			 * @param {Object} isCheckPrint
			 */
			newCheckboxChecked(rowData,isCancelPrint,isCheckPrint){
				let arrayIndexs = [];
				for(let c=0;c<rowData._level-1;c++){
					if(c===0){
						arrayIndexs[c]=this.updateTreeDataByCode(rowData.parentcode);
					}else{
						arrayIndexs[c]=this.updateTreeDataByCode(arrayIndexs[c-1].parentCode);	
					}
				}
				let newObj = {};
				if(rowData._level === 3){
					newObj = this.data[arrayIndexs[1].index].children[arrayIndexs[0].index].children[rowData._normalIndex-1];
					if(isCancelPrint){
						newObj.isPrint = false;
						newObj._isChecked = false;	
					}else if(isCheckPrint){
						newObj.isPrint = true;
						newObj._isChecked = true;	
					}else{
						newObj._isChecked = true;	
						newObj.isPrint = false;
					}
					this.data[arrayIndexs[1].index].children[arrayIndexs[0].index].children[rowData._normalIndex-1]= newObj;
				}else{
					newObj = this.data[arrayIndexs[2].index].children[arrayIndexs[1].index].children[arrayIndexs[0].index].children[rowData._normalIndex-1];
					if(isCancelPrint){
						newObj.isPrint = false;
						newObj._isChecked = false;	
					}else if(isCheckPrint){
						newObj.isPrint = true;
						newObj._isChecked = true;	
					}else{
						newObj._isChecked = true;	
						newObj.isPrint = false;
					}
					this.data[arrayIndexs[2].index].children[arrayIndexs[1].index].children[arrayIndexs[0].index].children[rowData._normalIndex-1] = newObj;
				}
				this.props.isFold = false;
			},
			/**
			 * 全选/取消全选
			 * @param {Boolean} 全选/取消全选 true/false
			 */
			changeSelectAll() {
				if(this.isAllCheck){
					this.isAllCheck = false;
					this.allCheck = "全部选中";
				}else{
					this.isAllCheck = true;
					this.allCheck = "取消全选";
				}
				let self = this;
				this.printCheckbox = [];
				function forTreeData(data,isCheck){
					for(let i=0;i<data.length;i++){
						if(data[i].type ==="文件"){
							if(isCheck){
								self.printCheckbox.push(data[i].id);
								data[i].isPrint = true;
							}else{
								data[i].fileAreaGather = "";
								data[i].isPrint = false;
							}
							data[i]._isChecked = isCheck;
						}else if(data[i].children && data[i].children.length > 0){
							forTreeData(data[i].children,isCheck);
						}
					}
					return data;
				}
				this.data = this.data.slice();
				forTreeData(this.data,this.isAllCheck);
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
				let submitList = this.createSubmitData();//生成提交的数据
				console.log(submitList);
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
			/**
			 * 按照code递归查找数据所在数组下标
			 */
			updateTreeDataByCode(code){
				let codeObj={
					index:-1,
					code:"",
					parentCode:""
				};
				function forTreeData(data,code){
					for(let i=0;i<data.length;i++){
						if(data[i].code === code){
							codeObj={	
								index:i,
								code:data[i].code,
								parentCode:data[i].parentcode
							};
							break;
						}else if(data[i].children && data[i].children.length > 0){
							forTreeData(data[i].children,code);
						}
					}
					
				}
				this.noFileData = this.noFileData.slice();
				forTreeData(this.noFileData,code);
				return codeObj;
			},
			/**
			 * 按照chioceObj递归修改树形数据
			 */
			updateTreeDataByObj(obj,isCheck){
				function forTreeData(data,obj,isCheck){
					for(let i=0;i<data.length;i++){
						if(data[i].type ==="文件" && data[i].code === obj.code){
							data[i]._isChecked = isCheck;
							data[i].fileAreaGather = obj.fileAreaGather;
							break;
						}else if(data[i].children && data[i].children.length > 0){
							forTreeData(data[i].children,obj,isCheck);
						}
					}
					return data;
				}
				this.data = this.data.slice();
				forTreeData(this.data,obj,isCheck);
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
 						self.oldData = self.checkingData(resData.data.list2,true);//选中数据处理
 						this.data = self.commonFun.toTreeDataNormal(JSON.parse(JSON.stringify(this.oldData)),{
							childKey:"code",
							fatherKey:"parentcode"
						});
						this.noFileData = this.commonFun.toTreeDataNormal(JSON.parse(JSON.stringify(this.oldData)),{
							childKey:"code",
							fatherKey:"parentcode"
						},true);
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
			 * @return {Array} submitData 提交的数据
			 */
			createSubmitData(){
				let submitData = [];//提交的数据
				function forTreeData(data){
					for(let i=0;i<data.length;i++){
						if(data[i].type ==="文件" && data[i]._isChecked){
							submitData.push({
								e01zb100:data[i].code,//文件id 
								isprint:data[i].isPrint,//是否打印
								e01z100:data[i].parentcode,//目录id
								fileAreaGather:data[i].fileAreaGather //授权区域 字符串数组
							});
							continue;
						}else if(data[i].children && data[i].children.length > 0){
							forTreeData(data[i].children);
						}
					}
					return submitData;
				}
				this.data = this.data.slice();
				
				return forTreeData(this.data);
			},
			/**
			 * 选中数据处理
			 * 处理打印数据和选中数据
			 * @param {Array} checkData数据源
			 * @return {Array} tenTypeData 返回平级的数据源--默认选中项数据已更新
			 */
			checkingData(checkData,isInit){
				let tenTypeData = this.oldData;
				for(let i=0;i<tenTypeData.length;i++){
					tenTypeData[i]._isChecked = false;
					tenTypeData[i].isPrint = false;
					for(let j=0;j<checkData.length;j++){
						if(isInit && tenTypeData[i].id == checkData[j].e01zb100){
							if(checkData[j].isprint){
								this.printCheckbox.push(checkData[j].e01zb100);//打印数据
							}
							tenTypeData[i]._isChecked = true;
							tenTypeData[i].isPrint = checkData[j].isprint;
							tenTypeData[i].fileAreaGather = checkData[j].fileareagather;
							break;
						}else if(!isInit && tenTypeData[i].id == checkData[j]){
							tenTypeData[i]._isChecked = true;
							break;
						}
					}	
				}
				return tenTypeData;
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.archivesAuthorize {
		width: 100%;
		.zk-table{
			height:380px;
			overflow-y:scroll;
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