<template>
	<el-table ref="multipleTable" :data="formatData" :row-style="showRow" v-bind="$attrs" height="300px">
		<!--<el-table-column :render-header="renderHeader" width="100" align="center">-->
		
		<el-table-column label="选择" width="100" align="center">
			<template slot-scope="scope">
				<el-checkbox  v-model="chioceCheckbox" name="citysCheckbox2" :label="scope.row.code"   :key="scope.row.code" @change="handleCheckedFileChange(arguments,scope.row)">{{scope.row.type}}</el-checkbox>
			</template>
		</el-table-column>
		
		<el-table-column v-if="columns.length===0" width="150">
			<template slot-scope="scope">
				<span v-for="space in scope.row._level" :key="space" class="ms-tree-space" />
				<span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i class="iconfont gd-dangan"/>
        </span> {{ scope.$index }}
			</template>
		</el-table-column>
		<el-table-column v-else v-for="(column, index) in columns" :key="column.value" :label="column.text" :width="column.width">
			<template slot-scope="scope">
				<!-- Todo -->
				<span v-if="index === 0" v-for="space in scope.row._level" class="ms-tree-space" :key="space" />
				<span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index)">
          		<i v-if="scope.row.type =='标题'" class="iconfont gd-dangan"/>
          		<i v-if="scope.row.type =='目录'" class="iconfont gd-mingce"/>
        		</span> {{ scope.row[column.value] }}
			</template>
		</el-table-column>
		
		<el-table-column prop="type" label="打印授权" align="center">
			<template slot-scope="scope">
				<el-checkbox v-if="scope.row.type =='文件'" name="citysCheckbox" v-model="printCheckbox" :label="scope.row.code"  :key="scope.row.code" @change="handleCheckedPrintChange(arguments,scope.row)">打印</el-checkbox>
			</template>
		</el-table-column>
		<slot></slot>
	</el-table>
</template>

<script>
	import treeToArray from "../../common/eval";
	export default {
		name: "TreeTable",
		data() {
			return {
				chooseson: true, //全选
				key: true, //单个点击直到全部选中
				printCheckbox:[],//默认选中的打印项
				chioceCheckbox:[],//默认选中的数据
				checkFileData: [] //选中的数据
			};
		},
		props: {
			chioceData: { //默认选中的表格数据
				type: [Array, Object],
				required: true
			},
			data: {
				type: [Array, Object],
				required: true
			},
			columns: {
				type: Array,
				default: () => []
			},
			evalFunc: Function,
			evalArgs: Array,
			expandAll: {
				type: Boolean,
				default: false
			}
		},
		watch:{
			chioceData(newVal,oldVal){
				this.changeData();//默认选中的打印项
			}
		},
		computed: {
			// 格式化数据源
			formatData: function() {
				let tmp
				if(!Array.isArray(this.data)) {
					tmp = [this.data]
				} else {
					tmp = this.data
				}
				const func = this.evalFunc || treeToArray
				const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
				return func.apply(null, args)
			}
		},
		methods: {
			/**
			 * 监听选择文件 checkbox的change事件
			 * @param {Boolean} 选中的值 :true/false
			 * @param {Object} 选中的数据对象
			 */
			handleCheckedFileChange(args,rowData){
				var isExist = false;
				var self =this;
				if(args[0] == true){
					this.checkFileData.push({
						e01zb100:rowData.code,
						isprint:false,
						e01z100:rowData.parentcode
					});
				}else{
					this.checkFileData.forEach(function(row, index) {
						if(row.e01zb100 == rowData.e01zb100){
							delete self.checkFileData[index];
						}
					});
					this.printCheckbox.splice(this.printCheckbox.indexOf(rowData.code),1);
				}
				
				console.log(this.printCheckbox);
				console.log(this.checkFileData);
				
			},
			/**
			 * 监听 打印 checkbox的change事件
			 * @param {Boolean} 选中的值 :true/false
			 * @param {Object} 选中的数据对象
			 */
			handleCheckedPrintChange(args,rowData){
				var isExist = false;
				for(let i=0;i<this.checkFileData.length;i++){
					if(this.checkFileData[i].e01zb100 == rowData.code){
						isExist = true;
						this.checkFileData[i].isprint = args[0];
						break;
					}
				}
				if(isExist == false && args[0] == true){
					this.chioceCheckbox.push(rowData.code);
					if(this.chioceCheckbox.indexOf(rowData.parentcode)==-1){
						this.chioceCheckbox.push(rowData.parentcode);
					}
					this.checkFileData.push({
						e01zb100:rowData.code,
						isprint:args[0],
						e01z100:rowData.parentcode
					});
				}
								
				console.log(this.chioceCheckbox);
				console.log(this.checkFileData);
			},
			// 默认选中的打印项
			changeData() {
				let newArray = [],newArray2 = [];
				var self = this;
				this.chioceData.forEach(function(row, index) {
					self.checkFileData.push({
						e01zb100:row.e01zb100,//文件id 
						isprint:row.isprint,//是否打印
						e01z100:row.e01z100//目录id
					});
					newArray2.push(row.e01zb100);
					//不放置重复值
					if(newArray2.indexOf(row.e01z100)==-1){
						newArray2.push(row.e01z100);	
					}
					if(row.isprint == true) {
						newArray.push(row.e01zb100);
					}
				});
				this.printCheckbox = newArray;
				this.chioceCheckbox = newArray2;
			},
			// 默认选中的打印项
			addCheckFileData() {
				let newArray2 = [];
				var self = this;
				this.checkFileData.forEach(function(row, index) {
					newArray2.push(row.e01zb100);
					//不放置重复值
					if(newArray2.indexOf(row.e01z100)==-1){
						newArray2.push(row.e01z100);	
					}
				});
				
				//this.chioceCheckbox = newArray2;
				this.chioceCheckbox = '["009E3CBD-92A5-4D95-A77F-9BB46C23F40E","614AF77F-1BA5-46B9-94FA-7BBFB9853FA2","227004DE-909F-4F44-A145-9C733059E3C2","1296CEB8-7366-4EF6-9E86-873D2B2BCF42","A6B15F53-2F0A-4A7D-98CA-7A8CC0545471"]';
			},
			
			renderCheckBox(row) {
				let isCheckd = false;
				this.chioceData.forEach(function(rows, index) {
					if(row.code == rows.e01zb100) {
						isCheckd = true;
						return isCheckd;
					}
				});
				return isCheckd;
			},
			showRow: function(row) {
				const show = row.row.parent ?
					row.row.parent._expanded && row.row.parent._show :
					true;
				row.row._show = show;
				return show ?
					"animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;" :
					"display:none;";
			},
			// 切换下级是否展开
			toggleExpanded: function(trIndex) {
				const record = this.formatData[trIndex];
				record._expanded = !record._expanded;
			},
			// 图标显示
			iconShow(index, record) {
				return index === 0 && record.children && record.children.length > 0;
			},

			//设置表头全选
//			renderHeader(h, data) {
//				return h("span", [
//					h("input", {
//						attrs: {
//							id: "chooseall",
//							type: "checkbox",
//							style: "border: 1px solid #dcdfe6;border-radius: 2px;box-sizing: border-box;width: 14px;height: 14px;background-color: #fff;"
//						}
//					})
//				]);
//			},
			//功能函数:选中部分子集
//			setchildtobeselect(arr, key) {
//				arr.forEach((v, i) => {
//					v.checks = key;
//					// v._expanded = key;//选中后展开子项
//					if(v.children) {
//						this.setchildtobeselect(v.children, v.checks);
//					}
//				});
//			},
			//是否所有的都被选中
//			isallchecked(arr) {
//				arr.forEach((v, i) => {
//					if(!v.checks) {
//						this.key = false;
//					}
//					if(v.children) {
//						this.isallchecked(v.children);
//					}
//				});
//			},
			//设置父级为 未选中状态（父级的父级没改变-有bug）
//			setparentfalse(arr, id, level) {
//				arr.forEach((v, i) => {
//					if(v._level == level - 1 && v.children) {
//						v.children.forEach((val, ind) => {
//							if(val.code == id) {
//								v.checks = false;
//								return false; //终止此次循环，减少循环次数
//							}
//						});
//					}
//					if(v.children) {
//						this.setparentfalse(v.children, id, level);
//					}
//				});
//			},
			//设置父级为 选中状态
//			setparenttrue(arr, id, level) {
//				arr.forEach((v, i) => {
//					if(v._level == level - 1 && v.children) {
//						let key = true;
//						let sameidkey = false;
//						v.children.forEach((val, ind) => {
//							if(val.code == id) {
//								//确保当前点击的在该父级内
//								sameidkey = true;
//							}
//							if(!val.checks) {
//								key = false;
//							}
//						});
//						if(key && sameidkey) {
//							v.checks = true;
//						}
//					}
//					if(v.children) {
//						this.setparentfalse(v.children, id, level);
//					}
//				});
//			},
			//某个复选框被点击时
//			toselect(row) {
//				console.log(row);
//				// row._expanded = row.checks;//选中后是否展开
//				//1、若有子集先让子选中
//				if(row.children) {
//					this.setchildtobeselect(row.children, row.checks);
//				}
//				//2、然后判断是否全选中
//				this.key = true; //重置为true，防止上次已经是false的状态
//				this.isallchecked(this.formatData);
//				//3、设置多选框的状态
//				if(!row.checks) {
//					this.setparentfalse(this.formatData, row.code, row._level); //设置父级选中的状态为false
//					document.getElementById("chooseall").checked = false; //设置全选框的状态
//				} else {
//					this.setparenttrue(this.formatData, row.code, row._level); //设置父级选中的状态为true
//				}
//				if(this.key) {
//					document.getElementById("chooseall").checked = true; //设置全选框的状态
//				}
//			}
		},
		mounted() {
//			this.$nextTick(() => {
//				var that = this;
//				const all = document.getElementById("chooseall");
//				all.onchange = function(e) {
//					console.log(all.checked);
//					if(all.checked == true) {
//						that.setchildtobeselect(that.formatData, true);
//					} else {
//						that.setchildtobeselect(that.formatData, false);
//					}
//				};
//			});
		}
	};
</script>
<style rel="stylesheet/css">
	@keyframes treeTableShow {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	
	@-webkit-keyframes treeTableShow {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>

<style scoped>
	.ms-tree-space {
		position: relative;
		top: 1px;
		display: inline-block;
		font-style: normal;
		font-weight: 400;
		line-height: 1;
		width: 18px;
		height: 14px;
	}
	
	.ms-tree-space::before {
		content: "";
	}
	
	.processContainer {
		width: 100%;
		height: 100%;
	}
	
	table td {
		line-height: 26px;
	}
	
	.tree-ctrl {
		position: relative;
		cursor: pointer;
		color: #2196f3;
		margin-left: -18px;
	}
</style>