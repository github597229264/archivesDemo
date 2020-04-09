<template>
	<div class="ProfessionalQualificationsTreeSelect">
		<el-select v-model="chioceId" clearable placeholder="请选择专业技术任职资格" @change="changeChioceId">
			<el-option v-for="item in dataList" :key="item.code" :label="item.name" :value="item.code">
			</el-option>
		</el-select>
	</div>
</template>
<script>
	import bus from '../common/bus';
	export default {
		name: 'ProfessionalQualificationsTreeSelect', //专业技术任职资格下拉框
		props: ['chioceOptionId'], //选中的专业技术任职资格id
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
				
				this.$emit('ProfessionalQualificationsTreeSelectCall',id);
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
						code: this.API.constObj.CadreCodeDetailList[36].id //专业技术任职资格
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.dataList = resData.data;
//						console.log(resData.data);
						if(this.chioceOptionId && this.chioceOptionId.length > 0){
                    		this.chioceId = this.chioceOptionId;
                    		this.$emit('ProfessionalQualificationsTreeSelectCall', this.chioceId);
                    	}
					} else {
						this.$message({
							type: 'error',
							message: '获取专业技术任职资格下拉框数据失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("获取专业技术任职资格下拉框数据=" + err);
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
	.ProfessionalQualificationsTreeSelect {
		.el-select {
			width: 100%;
		}
	}
</style>