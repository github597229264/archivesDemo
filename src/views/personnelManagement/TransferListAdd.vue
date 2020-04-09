<template>
	<div class="container">
		<form>
			<table class="basicInformatiion">
				<tbody>
					<tr class="name-tr">
						<td class="name-td" colspan="6">
							<div class="name-td-div">
								调出单位
							</div>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								单位名称
							</div>
						</td>
						<td class="name-td-fill" colspan="3">
							<div class="name-td-fill-div nopadding">
								<el-input placeholder="选择机构" @blur='blurTree' @focus='focusTree' :clearable='clearable' v-model="selectedOptions">
								</el-input>
								<el-tree class="filter-tree" v-show="TreeIsShow"  @node-click='selectTree' :data="treeList" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree">
								</el-tree>
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								调出日期
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div nopadding">
								<div class="block">
									<el-date-picker v-model="TransferData.a3004" value-format="yyyyMMdd" type="date" class="datePicker" placeholder="选择日期">
									</el-date-picker>
								</div>
							</div>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								调出原因
							</div>
						</td>
						<td class="name-td-fill" style="width:227px">
							<div class="name-td-fill-div">
								<TransferReasonTreeSelect :chioceOptionId="TransferData.a3031" @TransferReasonTreeSelectCall="TransferReasonTreeSelectCall">
								</TransferReasonTreeSelect>
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								单位代码
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div nopadding">
								<input type="text" class="mini-textbox-input" v-model="TransferData.a3007b" maxlength="20">
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								单位级别
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div position-div nopadding">
								<UnitLevelTreeSelect :chioceOptionId="TransferData.a3014" @UnitLevelTreeSelectCall="outUnitLevelTreeSelectCall"></UnitLevelTreeSelect>
							</div>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								所属行业
							</div>
						</td>
						<td class="name-td-fill" style="width:227px">
							<div class="name-td-fill-div">
								<IndustryTreeSelect :chioceOptionId="TransferData.a3024" @IndustryTreeSelectCall="outIndustryTreeSelectCall"></IndustryTreeSelect>
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								单位性质
							</div>
						</td>
						<td class="name-td-fill" style="width:227px">
							<div class="name-td-fill-div nopadding">
								<NatureUnitTreeSelect :chioceNatureOptionId="TransferData.a3021" @natureSelectCall="outNatureUnitTreeSelectCall"></NatureUnitTreeSelect>
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								隶属关系
							</div>
						</td>
						<td class="name-td-fill" style="width:227px">
							<div class="name-td-fill-div position-div nopadding">
								<unitAffiliationTreeSelect :chioceUnitOptionId="TransferData.a3011" @affiliationSelectCall="outTreeSelectCallFun"></unitAffiliationTreeSelect>
							</div>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td" colspan="6">
							<div class="name-td-div">
								调入单位
							</div>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								单位名称
							</div>
						</td>
						<td class="name-td-fill" colspan="3">
							<div class="name-td-fill-div nopadding">
								<div class="block">
									<el-input placeholder="选择机构" @blur='blurTree2' @focus='focusTree2' :clearable='clearable2' v-model="selectedOptions2">
									</el-input>
	
									<el-tree class="filter-tree" v-show="TreeIsShow2"  @node-click='selectTree2' :data="treeList" :props="defaultProps" default-expand-all :filter-node-method="filterNode2" ref="tree2">
									</el-tree>
								</div>
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								调入日期
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div nopadding">
								<div class="block">
									<el-date-picker v-model="TransferData.a2907" value-format="yyyyMMdd" type="date" class="datePicker" placeholder="选择日期">
									</el-date-picker>

								</div>
							</div>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								调入原因
							</div>
						</td>
						<td class="name-td-fill" style="width:227px">
							<div class="name-td-fill-div">
								<IntoTransferReasonTreeSelect :chioceOptionId="TransferData.a2917" @IntoTransferReasonTreeSelectCall="IntoTransferReasonTreeSelectCall"></IntoTransferReasonTreeSelect>
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								单位代码
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div nopadding">
								<input type="text" class="mini-textbox-input" v-model="TransferData.a2921b" maxlength="20">
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								单位级别
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div position-div nopadding">
								<UnitLevelTreeSelect :chioceOptionId="TransferData.a2914" @UnitLevelTreeSelectCall="intoUnitLevelTreeSelectCall"></UnitLevelTreeSelect>
							</div>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								所属行业
							</div>
						</td>
						<td class="name-td-fill" style="width:227px">
							<div class="name-td-fill-div">
								<IndustryTreeSelect :chioceOptionId="TransferData.a2937" @IndustryTreeSelectCall="intoIndustryTreeSelectCall"></IndustryTreeSelect>
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								单位性质
							</div>
						</td>
						<td class="name-td-fill" style="width:227px">
							<div class="name-td-fill-div nopadding">
								<NatureUnitTreeSelect :chioceNatureOptionId="TransferData.a2934" @natureSelectCall="intoNatureUnitTreeSelectCall"></NatureUnitTreeSelect>
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								隶属关系
							</div>
						</td>
						<td class="name-td-fill" style="width:227px">
							<div class="name-td-fill-div position-div nopadding">
								<unitAffiliationTreeSelect :chioceUnitOptionId="TransferData.a2912" @affiliationSelectCall="intoTreeSelectCallFun"></unitAffiliationTreeSelect>
							</div>
						</td>
					</tr>

				</tbody>
			</table>
			<div class="footer">
				<button type="button" @click="onSubmit">保存</button>
			</div>
		</form>
	</div>
</template>

<script>
	import TransferReasonTreeSelect from '../../components/TransferReasonTreeSelect.vue';
	import UnitLevelTreeSelect from '../../components/UnitLevelTreeSelect.vue';
	import IndustryTreeSelect from '../../components/IndustryTreeSelect.vue';
	import IntoTransferReasonTreeSelect from '../../components/IntoTransferReasonTreeSelect.vue';
	import OrganizationTreeSelect from '../../components/OrganizationTreeSelect.vue';
	import NatureUnitTreeSelect from '../../components/NatureUnitTreeSelect.vue';
	import unitAffiliationTreeSelect from '../../components/unitAffiliationTreeSelect.vue';

	export default {
		name: 'TransferListAdd',
		props: ['selectDeceive', 'addOrEdit'],
		components: {
			TransferReasonTreeSelect, //调动原因
			UnitLevelTreeSelect, //单位级别
			IndustryTreeSelect, //所属行业
			IntoTransferReasonTreeSelect, //调入原因
			OrganizationTreeSelect, //单位名称
			NatureUnitTreeSelect, //单位性质
			unitAffiliationTreeSelect, //隶属关系
		},

		data() {
			return {
				step:1,//单位名称--判断执行的步骤
				step2:1,//单位名称--判断执行的步骤
				clearable:true,//清空选项
				clearable2:true,//清空选项
				TreeIsShow:false,//下拉树是否显示--单位名称
				TreeIsShow2:false,//下拉树是否显示--单位名称
				TransferData: { //调动信息
					a293000: '',
					a0100: this.selectDeceive.a0100,
					a3007a: '', //	调往单位名称
					a3004: '', //		调出本单位日期
					a3031: '', //	           调出原因
					a3007b: '', //	调往单位代码
					a3014: '', //	           调往单位级别
					a3024: '', //	           调往单位所属行业
					a3021: '', //	           调往单位性质类别
					a3011: '', //	           调往单位隶属关系
					a2921a: '', //    进入本单位工作单位名称
					a2907: '', //	           进入本单位日期
					a2917: '', //		进入本单位原因
					a2921b: '', //	进入本单位工作单位代码
					a2914: '', //	           进入本单位级别
					a2937: '', //     进入本单位工作单位所属行业
					a2934: '', //     进入本单位前工作单位性质
					a2912: '', //	           进入本单位隶属关系
				},
				selectedOptions: '',//单位名称选中数据
				selectedOptions2: '',//单位名称选中数据
				treeList: [],//单位名称转换Tree
				defaultProps: {//单位名称--映射
					children: 'children',
					label: 'name'
				},
				oldTreeList:[],//单位名称未转换tree
			}
		},
		created() {
			this.TransferData.a3004 = this.commonFun.dateFormat(new Date(), "yyyyMMdd");
			this.TransferData.a2907 = this.commonFun.dateFormat(new Date(), "yyyyMMdd");
			if(this.addOrEdit == 'edit') {
				this.getEditData();
			};
			this.getUnitName();//单位名称--数据获取
		},
		mounted() {

		},
		watch: {
			selectedOptions(val) {
				this.$refs.tree.filter(val);
			},
			selectedOptions2(val) {
				this.$refs.tree2.filter(val);
			}
		},
		
		methods: {
			blurTree(){
				setTimeout(()=>{
//					console.log("step1="+this.step);
					if(this.step ==1){
						this.TreeIsShow=false;	
					}
				},300);
				
			},
			focusTree(){
				this.TreeIsShow=true;
				this.step =1;
//				console.log("step2="+this.step);
			},
			selectTree(data, nodes) {//单位名称下拉框--选择
				this.step =2;
				this.selectedOptions = data.name;
				this.TreeIsShow=false;
//				console.log("step3="+this.step);
			},
			filterNode(value, data) {//单位名称--节点过滤
				if(!value) return true;
				return data.name.indexOf(value) !== -1;
			},
			blurTree2(){
				setTimeout(()=>{
//					console.log("step1="+this.step);
					if(this.step2 ==1){
						this.TreeIsShow2=false;	
					}
				},300);
				
			},
			focusTree2(){
				this.TreeIsShow2=true;
				this.step2 =1;
//				console.log("step2="+this.step);
			},
			selectTree2(data, nodes) {//单位名称下拉框--选择
				this.step2 =2;
				this.selectedOptions2 = data.name;
				this.TreeIsShow2=false;
//				console.log("step3="+this.step);
			},
			filterNode2(value, data) {//单位名称--节点过滤
				if(!value) return true;
				return data.name.indexOf(value) !== -1;
			},
			getUnitName(){//单位名称--数据获取
				var self = this;
                this.$axios({
					loading:{
            			isShow:false
            		},
            		method:'get',
                	url:this.API.organizationTree,
                	params:{}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	//递归转换为tree格式数据
                    	self.oldTreeList = resData.data;
                    	self.treeList =self.commonFun.toTreeData(resData.data);
                    }
                }).catch((err) => {
                	self.$message({
			            type: 'error',
			            message: '请求异常，请检查网络！'
			        });  
                })
			},
			onSubmit() { //保存
				this.TransferData.a0100 = this.selectDeceive.a0100;
				this.TransferData.a3007a=this.selectedOptions;
				this.TransferData.a2921a=this.selectedOptions2;
				//判断表单是否填入数据，不能为空保存
				let hasData=false;
				let data=this.TransferData;
				for(let k in data){
					if(data[k] != this.selectDeceive.a0100){
						if(data[k]){
							hasData=true;
						}
					}
				}
//				$.each(this.TransferData,(k,value)=>{
//					if(value != this.selectDeceive.a0100){
//						if(value){
//							hasData=true;
//						}
//					}
//	            });
				if(hasData){
					//hasData=true,保单不为空
					this.$axios({
					method: 'post',
					url: this.API.saveOrUpdateA2930,
					data: this.TransferData
				}).then((res) => {
					if(res.data.code == "1") {
						this.$emit('backCall', true);
					}else{
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}
				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
				}else{
					//表单为空
					this.$message({
						type: 'error',
						message: '请填写调动信息后保存！'
					});
				}
				
			},
			getEditData() { //编辑
				this.$axios({
					method: 'get',
					url: this.API.editA2930,
					params: {
						a293000: this.selectDeceive.a293000
					}
				}).then((res) => {
					if(res.data.code == "1") {
						this.TransferData = res.data.data;
						this.selectedOptions=res.data.data.a3007a;
						this.selectedOptions2=res.data.data.a2921a;
					}else{
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}
				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			outIndustryTreeSelectCall(id) { //所属行业回调--调出
				this.TransferData.a3024 = id;
			},
			intoIndustryTreeSelectCall(id) { //所属行业回调--进入
				this.TransferData.a2937 = id;
			},
			outOrganizationTreeSelectCall(id) { //单位名称回调--调出
				this.TransferData.a3007a = id;
			},
			outUnitLevelTreeSelectCall(id) { //单位级别回调--调出
				this.TransferData.a3014 = id;
			},
			intoUnitLevelTreeSelectCall(id) { //单位级别回调--调入
				this.TransferData.a2914 = id;
			},
			IntoTransferReasonTreeSelectCall(id) { //调入原因回调
				this.TransferData.a2917 = id;

			},
			TransferReasonTreeSelectCall(id) { //调出原因回调
				this.TransferData.a3031 = id;
			},
			outTreeSelectCallFun(id) { //隶属关系回调--调出
				this.TransferData.a3011 = id;
			},
			intoTreeSelectCallFun(id) { //隶属关系回调--调入
				this.TransferData.a2912 = id;
			},
			outNatureUnitTreeSelectCall(id) { //单位性质回调--调出
				this.TransferData.a3021 = id
			},
			intoNatureUnitTreeSelectCall(id) { //单位性质回调--调入
				this.TransferData.a2934 = id
			},
			intoOrganizationTreeSelectCall(id) { //单位名称回调--调入
				this.TransferData.a2921a = id
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		border: none;
		width: 824px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		.title {
			margin: 0;
			display: flex;
			justify-content: center;
			letter-spacing: 16px;
			font-size: 36px;
			font-family: '宋体';
			height: 30px;
			line-height: 30px;
			margin-top: 20px;
			color: black;
			font-weight: bold;
		}
		.basicInformatiion {
			width: 824px;
			box-sizing: border-box;
			margin-top: 20px;
			border: 2px solid black;
		}
		.name-tr {
			height: 49px;
			td {
				border: 1px solid black;
				box-sizing: border-box;
			}
			.name-td {
				width: 99px;
				.name-td-div {
					width: 100%;
					font-size: 18px;
					text-align: center;
					.must-fill {
						color: red;
						font-weight: bold;
					}
				}
				.status-explain {
					height: 200px;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.education-type {
					height: 100px;
					border-bottom: 1px solid black;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.add-photo-div {
					width: 48%;
					height: 100%;
					display: inline-block;
					text-align: center;
					border-right: 1px solid black;
					line-height: 50px;
					font-size: 18px;
					color: blue;
					box-sizing: border-box;
				}
				.copy-num {
					width: 48%;
					height: 100%;
					text-align: center;
					border-right: 1px solid black;
					line-height: 50px;
					font-size: 18px;
					box-sizing: border-box;
					display: inline-block;
					input[type=text] {
						width: 100%;
						background: none;
						outline: none;
						border: 0px;
					}
				}
				.noBorder {
					border: none !important
				}
			}
			.name-td-fill {
				width: 116px;
				.name-td-fill-div {
					width: 100%;
					padding: 0 5px;
					box-sizing: border-box;
					position: relative;
					.filter-tree {
						position: absolute;
						z-index: 999;
						width: 100%;
						height: 200px;
    					overflow: auto;
					}
					.my-autocomplete {
						li {
							line-height: normal;
							padding: 7px;
							.name {
								text-overflow: ellipsis;
								overflow: hidden;
							}
							.addr {
								font-size: 12px;
								color: #b4b4b4;
							}
							.highlighted {
								.addr {
									color: #ddd;
								}
							}
						}
					}
					input[type=text] {
						width: 100%;
						background: none;
						outline: none;
						border: 0px;
					}
					.block {
						width: 100%;
					}
					.datePicker {
						width: 100%
					}
					.mini-textbox-input {
						width: 590px;
						outline: none;
						resize: none;
						border: none;
						font-size: 18px;
					}
					label {
						width: 50px;
						display: inline-block;
					}
					.position-input {
						width: 100% !important;
						outline: none;
						resize: none;
						border: none;
						font-size: 18px;
						background: red;
					}
				}
				.position-div {
					width: 100%
				}
				.nopadding {
					padding: 0
				}
				.education-type {
					width: 100%;
					height: 100px;
					border-bottom: 1px dashed #3f3f3f;
				}
				.noBorder {
					border: none !important
				}
			}
			.photo-img {
				width: 164px
			}
		}
		.education-box {
			height: 200px
		}
	}
	
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 58px;
		background: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		button {
			display: block;
			width: 106px;
			height: 44px;
			background: #69a5d4;
			border-radius: 6px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 18px;
			font-family: "微软雅黑";
			color: #fff;
			text-decoration: none;
		}
		;
	}
</style>