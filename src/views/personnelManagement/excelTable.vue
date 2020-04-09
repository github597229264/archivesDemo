<template>
	<div class="examine-con">
		<!--标题-->
		<div class="title">
			<div class="left" >
				<el-button type="primary" @click='excelFunc'>导出</el-button>
			</div>
		</div>
		<!--表格-->
		<el-table ref="table" border :data="ExamineList" height='80%' style="width: 100%;overflow: auto;">
			<el-table-column label="序号"  width="80" align="center">
				<template slot-scope="scope">{{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
			</el-table-column>
			<el-table-column prop="pname" label="姓名" show-overflow-tooltip width="80" align="center">
			</el-table-column>
			<el-table-column prop="psex" show-overflow-tooltip label="性别 " width="80" align="center">
			</el-table-column>
			<el-table-column prop="birthDate" show-overflow-tooltip label="出生年月" width="100" align="center">
			</el-table-column>
	<el-table-column prop="positionandworkincharge" show-overflow-tooltip label="从事或分管工作" width="120" align="center">
			</el-table-column>
			<el-table-column prop="zzmm" show-overflow-tooltip label="政治面貌" width="100" align="center">
			</el-table-column>
			<el-table-column prop="e1004" show-overflow-tooltip label="现职时间" width="100" align="center">
			</el-table-column>
			<el-table-column prop="e10040" show-overflow-tooltip label="现职单位及职务" width="120" align="center">
			</el-table-column>
			<el-table-column prop="personalsummary" show-overflow-tooltip label="个人总结" width="150" align="center">
			</el-table-column>
			<el-table-column prop="advice" show-overflow-tooltip label="主管领导评语和考核等次建议" width="180" align="center">
			</el-table-column>
			<el-table-column prop="advicedate" show-overflow-tooltip label="主管领导评语日期
" width="100" align="center">
			</el-table-column>
<el-table-column prop="leadersopinion" show-overflow-tooltip label="机关负责人或考核委员会意见
" width="150" align="center">
			</el-table-column>
			<el-table-column prop="leadersopiniondate" show-overflow-tooltip label="机关负责人日期
" width="150" align="center">
			</el-table-column>
			<el-table-column prop="myopinion" show-overflow-tooltip label="本人意见
" width="100" align="center">
			</el-table-column>
			<el-table-column prop="myopiniondate" show-overflow-tooltip label="本人意见日期
" width="100" align="center">
			</el-table-column>
			<el-table-column prop="testcase" show-overflow-tooltip label="未确定等次或不参加考核情况说明
" width="180" align="center">
			</el-table-column>
			<el-table-column prop="testcasedate" show-overflow-tooltip label="未确定等次日期
" width="100" align="center">
			</el-table-column>
			<el-table-column prop="remark" show-overflow-tooltip label="备注
" width="100" align="center">
			</el-table-column>
		</el-table>
		<!--分页-->
		<div class="material_page">
			<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
	</div>
	</div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import ExamineAdd from './ExamineAdd.vue';
	import excelTable from './excelTable.vue';

	export default {
		name: 'ExtendExamine',
		props: ['selectDeceive','selectExcelId','selectPageSize'],
		components: {
			Pagination, //分页组件
			ExamineAdd, //其他-年度考核表-添加
			excelTable,//导出Excel
		},
		data() {
			return {
				ExamineList: [], //其他类-年度考核
				pageObj: { //分页
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.selectPageSize, //页大小
				},
			}
		},
		mounted() {
			
		},
		created() {
			this.ExamineList=this.selectDeceive;
			console.log(this.selectDeceive)
			this.pageObj.total=this.selectDeceive.length;
			this.pageObj.pageSize=this.selectPageSize;
		},
		methods: {
			//分页组件回调方法
			PageTurning(page_obj) {
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
			},
			getAddBack(reFresh) {//回调
				if(reFresh) {
					this.isShow = false;

				}
			},
			excelFunc(){//导出
				this.$axios({
					method: 'post',
					url: this.API.annualAppraisalExportToExcel,
					responseType: "arraybuffer",
					data: {
						id:this.selectExcelId
					}
				}).then(
					function(response) {
						let filename = "业务+年度考核登记.xlsx";
						this.fileDownload(response.data, filename);
					}.bind(this)
				)
				.catch(
					function(error) {
						alert("网络请求出错");
					}.bind(this)
				);
			},
			fileDownload:function(data, fileName) {//文件导出
				let blob = new Blob([data], {
					type: "application/octet-stream"
				});
				let filename = fileName || "filename.xls";
				if(typeof window.navigator.msSaveBlob !== "undefined") {
					window.navigator.msSaveBlob(blob, filename);
				} else {
					var blobURL = window.URL.createObjectURL(blob);
					var tempLink = document.createElement("a");
					tempLink.style.display = "none";
					tempLink.href = blobURL;
					tempLink.setAttribute("download", filename);
					if(typeof tempLink.download === "undefined") {
						tempLink.setAttribute("target", "_blank");
					}
					document.body.appendChild(tempLink);
					tempLink.click();
					document.body.removeChild(tempLink);
					window.URL.revokeObjectURL(blobURL);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.examine-con {
		width: 100%;
		height: 60vh;
		.title {
			margin-bottom: 10px;
		}
		.el-table {}
		.material_page {
			text-align: right;
			margin-top: 10px
		}
	}
</style>