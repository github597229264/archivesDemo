<template>
	<div class="receive-detail-container">
		<!--头部-->
		<el-form ref="receiveForm" :model="selectMaterial" label-width="110px">
			<el-row :gutter="24">
				<el-col :span="12">
					<el-form-item label="来件单位名称：" prop="e01z204a">
						<el-input v-model="selectMaterial.e01z204a" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="接收人：" prop="e01z207">
						<el-input v-model="selectMaterial.e01z207" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="接收类型：" prop="forwardTypeValue">
						<el-input v-model="selectMaterial.forwardTypeValue" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="机要号：" prop="confidentialno">
						<el-input v-model="selectMaterial.confidentialno" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="份数：" prop="e01z234">
						<el-input v-model="selectMaterial.e01z234" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="收件日期：" prop="e01z201">
						<el-input v-model="selectMaterial.e01z201" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="备注：" prop="e01z231">
						<el-input type="textarea" readonly :autosize="{ minRows: 2, maxRows: 4}" v-model="selectMaterial.e01z231"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<receiveTable :id="selectMaterial.id" :time="time"></receiveTable>
	</div>
</template>

<script>
	import receiveTable from './ReceiveTable.vue';
	export default {
		components:{
			receiveTable
		},
		props: ['selectMaterial'],
		data() {
			return {
				time:{
					startTime:"",//开始时间
					endTime:""//结束时间
				},
				pageObj:{
	                pageIndex: this.API.constObj.pageIndex,//当前页码
	                total:0,//数据总数
	                pageSize:this.API.constObj.pageSize,//页大小
                },
				receiveDetailList: [] //材料详情列表
			}
		}
	}
</script>

<style lang="scss" scoped>
	.receive-detail-container {
		.receive_page {
			display: flex;
			justify-content: flex-end;
			margin: 10px 0;
		}
	}
</style>