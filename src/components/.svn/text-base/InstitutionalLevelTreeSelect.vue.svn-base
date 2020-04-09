<template>
	<div class="InstitutionalLevelTreeSelect">
		<el-select v-model="chioceId" clearable placeholder="请选择任职机构级别" @change="changeChioceId">
			<el-option v-for="item in dataList" :key="item.code" :label="item.name" :value="item.code">
			</el-option>
		</el-select>
	</div>
</template>
<script>
	import bus from '../common/bus';
	export default {
		name: 'InstitutionalLevelTreeSelect', //任职机构级别下拉框
		props: ['chioceOptionId'], //选中的任职机构级别id
		data() {
			return {
				dataList: [], //下拉框数据
				chioceId: this.chioceOptionId //选中的id
			};
		},
		computed: {

		},
		created() {
			this.getData();
		},
		methods: {
			/*
			 * 监听下拉框change事件
			 * @param {String} id 选中项的id
			 */
			changeChioceId(newV) {
				this.chioceId = newV;
				this.$emit('InstitutionalLevelTreeSelectCall',newV);
			},
			/**
			 * 获取列表数据
			 */
			getData() {
				this.$axios({
					loading:{
            			isShow:false
            		},
					method: 'get',
					url: this.API.getSysCadreCodeDetailList,
					params: {
						code: this.API.constObj.CadreCodeDetailList[25].id //任职机构级别
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.dataList = resData.data;
//						console.log(resData.data);
						if(this.chioceOptionId && this.chioceOptionId.length > 0){
                    		this.chioceId = this.chioceOptionId;
                    		this.$emit('InstitutionalLevelTreeSelectCall', this.chioceId);
                    	}
					} else {
						this.$message({
							type: 'error',
							message: '获取任职机构级别下拉框数据失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("获取任职机构级别下拉框数据=" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			}
		},
		mounted() {

		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.InstitutionalLevelTreeSelect {
		.el-select {
			width: 100%;
		}
	}
</style>