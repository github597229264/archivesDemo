<template>
	<div class="applyStatusSelect">
		<el-select v-model="chioceId" clearable placeholder="请选择" @change="changeChioceId">
			<el-option v-for="item in dataList" :key="item.id" :label="item.name" :value="item.id">
			</el-option>
		</el-select>
	</div>
</template>
<script>
	import bus from '../common/bus';
	export default {
		name: 'OrganizationStatusSelect', //组织机构状态下拉框
		props: ['chioceOptionId'], //选中的状态id
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
			changeChioceId(id) {
				this.chioceId = id;
				this.$emit('applyStatusCall', id);
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
					url: this.API.getDataList,
					params: {
						id: this.API.constObj.stateId //状态
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.dataList = resData.data;
						if(this.chioceOptionId && this.chioceOptionId.length > 0) {
							this.chioceId = this.chioceOptionId;
							this.$emit('applyStatusCall', this.chioceId);
						}
					} else {
						this.$message({
							type: 'error',
							message: '获取状态下拉框数据失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("获取状态下拉框数据=" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.applyStatusSelect {
		.el-select {
			width: 100%;
		}
	}
</style>