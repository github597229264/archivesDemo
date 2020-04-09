<!--材料转递-添加-档案库-->
<template>
	<div class="deliver-person-conainer">
		<div class="left">
			<!--查询条件-->
			<organizationTreeSelect :defaultOptions="departmentAllID" @OrgTreeSelectCall="orgTreeSelectCall"></organizationTreeSelect>
			<div class="search-name">
				<el-input v-model="a0101" placeholder="姓名或拼音" clearable></el-input>
				<el-button type="primary" @click="search">查询</el-button>
			</div>
			<!--<el-scrollbar>-->
			<div class="person_list" ref="table" height="300px">
				<div v-if="personList&&personList.length==0" style="text-align: center;">该人员没有信息!</div>
				<div class="person-item" v-for="(item, index) in personList" :key="item.a0100" @click="getList(item, index)" :class="{'selectedBg':index === currClick }">
					<p class="name-na">
						<span class="name">{{item.a0101}}</span> 籍贯：
						<span class="nativep">{{item.a0111a}}</span>
					</p>
					<p class="unit">
						单位及职位：{{item.e10040}}
					</p>
				</div>
			</div>
			<!--</el-scrollbar>-->
			<!--分页-->
			<div class="material_page">
				<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
			</div>
		</div>
		<div class="right">
			<div class="btn">
				<el-button type="primary" @click="confirm">确认</el-button>
			</div>
			<div class="tree">
				<zk-table ref="multipleTable" :data="data" sum-text="sum" index-text="#" :columns="columns" :stripe="props.stripe" :border="props.border" :show-header="props.showHeader" :show-summary="props.showSummary" :show-row-hover="props.showRowHover" :show-index="props.showIndex" :tree-type="props.treeType" :is-fold="props.isFold" :expand-type="props.expandType" :selection-type="props.selectionType" empty-text="该人员没有档案信息" max-height="420px">
				</zk-table>
			</div>
		</div>
	</div>

</template>

<script>
	import treeTable from './TreeTable.vue'
	import pagination from '../../../components/Pagination.vue';
	import organizationTreeSelect from '../../../components/OrganizationTreeSelect.vue';
	export default {
		data() {
			return {
				data: [], //材料信息列表，右侧的
				oldData: [], //原始的data
				props: {
					stripe: true, //是否隔行变色
					border: true,
					showHeader: true,
					showSummary: false,
					showRowHover: false,
					showIndex: false,
					treeType: true, //是否tree结构
					isFold: true, //是否折叠
					expandType: false, //是否展开类型
					selectionType: true //是否选择类型
				},
				columns: [{
						label: '材料名称',
						prop: 'name',
						minWidth: '240px'
					},
					{
						label: '页数',
						prop: 'e01z114',
						minWidth: '80px'
					},
					{
						label: '形成日期',
						prop: 'e01z117',
						minWidth: '100px'
					}
				],
				departmentAllID: "", //机构id//机构默认选中项--必须是完整路径eg:['节点id'] 或 ['父节点id','子节点id']
				departmentID: '', //机构ID
				a0101: "", //姓名
				personList: [], //人员信息列表
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				hideRow: true,
				chioceList: [], //选中的材料集合
				a0100: "", //人员id
				item: "", //是否选中，选中修改样式
				currClick: 0, //当前选中的行号
			}
		},
		created() {
			this.getData();

		},
		props: ['DefaultTables', 'isAreaQuery'], //默认选中项
		methods: {
			getPersonList() { //干部人事档案目录列表
				this.$axios({
					method: 'get',
					url: this.API.findSysArchClassify,
					params: {
						'a0100': this.a0100,
					}
				}).then((res) => {
					console.log(res);
					var resData = res.data;
					if(resData.code == "1") {
						this.oldData = resData.data;
						let fatherAndChildObj = {
							childKey: "code",
							fatherKey: "parentcode"
						};
						this.data = this.commonFun.toTreeDataNormal(this.oldData, fatherAndChildObj);
					} else {
						this.$message({
							type: 'error',
							message: '获取列表失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})

			},
			handleSelectionChange(data) {
				this.chioceList = data;
				console.log("选中返回的值+" + data);
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getData();
			},
			getData() { //获取人员信息列表
				this.$axios({
					method: 'post',
					url: this.API.queryAllPersonFile,
					data: {
						'b0000': this.departmentID,
						'a0101': this.a0101,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.personList = resData.data.list;
						this.pageObj.total = resData.data.total;
						if(this.personList.length > 0) {
							this.a0100 = this.personList[0].a0100;
							this.getPersonList();
						} else this.data = [];
					} else {
						this.$message({
							type: 'error',
							message: '查询失败，请刷新重试！'
						});
					}
				}).catch(function(err) {
					console.log("列表=" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			arraySpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if(rowIndex % 2 === 0) {
					if(columnIndex === 0) {
						return [1, 2];
					} else if(columnIndex === 1) {
						return [0, 0];
					}
				}
			},
			/*
			 * 职能机构树形下拉框组件回调方法--子组件回传数据的方法
			 * @param {String} val 选中项的值
			 */
			orgTreeSelectCall(val) {
				if(val) {
					this.departmentAllID = val.id;
					this.departmentID = val.id;
				} else {
					this.departmentAllID = "";
					this.departmentID = "";
				}
			},
			search() { //根据条件查询
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				//				if(this.departmentID == "" && this.a0101 == "") return this.$message('请填写条件进行搜索');;
				this.getData();
			},
			confirm() { //确认选中的数据
				var chioceCode = this.$refs.multipleTable.getCheckedProp("code");
				if(chioceCode.length < 1) {
					this.$message({
						message: '请至少选中一条数据!',
						type: 'warning'
					});
					return;
				}
				let submitList = this.createSubmitData(chioceCode); //生成提交的数据
				//值传回给父组件
				this.$emit('GetChioceFiles', submitList);
			},
			/**
			 * 生成提交数据
			 * @param {Array} selectData数据源
			 * @return {Array} submitData 提交的数据
			 */
			createSubmitData(selectData) {
				var self = this;
				let submitData = []; //提交的数据
				selectData.forEach(function(row, index) {
					if(row.length != 36) return;
					self.oldData.forEach(function(row2, index2) {
						if(row == row2.code) {
							row2.a0101 = row2.a0101;
							row2.e01z211a = row2.name;
							row2.e01z211b = row2.e01z111b;
							row2.codeno = row2.codeno;
							row2.e01z124 = row2.parentcode;
							row2.e01z224 = row2.e01z114;
							row2.e01z227 = row2.e01z117;
							row2.e01z100  = row2.id;
							row2.a0100 = self.a0100;
							submitData.push(row2);
							return;
						}
					})
				})
				return submitData;
			},
			getList(item, indexVal) {
				this.item = item;
				this.a0100 = item.a0100;
				this.getPersonList();
				this.currClick = indexVal;
			}
		},
		components: {
			pagination,
			treeTable,
			organizationTreeSelect
		}
	}
</script>

<style lang="scss">
	.deliver-person-conainer {
		padding: 10px;
		display: flex;
		.left {
			width: 50%;
			.search-name {
				display: flex;
				margin: 10px 0;
				.el-button {
					margin-left: 10px;
				}
			}
			/*.el-scrollbar {
				height: 100%;
			}
			.el-scrollbar__wrap {
				overflow-x: hidden;
			}*/
			.person_list {
				overflow-y: auto;
				height: 300px;
				margin-top: 10px;
				.person-item {
					background-color: #EFEFEF;
					margin-bottom: 5px;
					padding: 5px;
					.name-na {
						display: flex;
						.name {
							color: red;
							margin-right: 20px;
						}
					}
				}
			}
			.material_page {
				margin: 10px 0;
				text-align: right;
				width: 94%;
				overflow: hidden;
			}
			.changeItembg {
				background-color: #88B1CA;
			}
		}
		.right {
			width: 49%;
			.tree {
				overflow-y: auto;
				height: 380px;
			}
			.btn {
				text-align: right;
				.el-button {
					margin-bottom: 10px;
				}
			}
		}
		.selectedBg {
			background-color: #88B1CA !important;
		}
		.el-dialog__body {
		    height: 420px !important;
		    }
	}
</style>