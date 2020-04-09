<template>
	<div class="IndustryTreeSelect">
		<el-select v-model="chioceId" clearable placeholder="请选择所属行业" @change="changeChioceId">
			<el-option v-for="item in dataList" :key="item.code" :label="item.name" :value="item.code">
			</el-option>
		</el-select>
	</div>
</template>
<script>
	import bus from '../common/bus';
	export default {
		name: 'IndustryTreeSelect', //所属行业下拉框
		props: ['chioceOptionId'], //选中的所属行业id
		data() {
			return {
				dataList: [], //下拉框数据
				chioceId: '', //选中的id
			};
		},
		computed: {

		},
		watch:{
			chioceOptionId:{
				handler:function(newVal){
					this.chioceId=newVal
				}
			}
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
				this.$emit('IndustryTreeSelectCall', newV);
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
						code: this.API.constObj.CadreCodeDetailList[16].id //所属行业
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.dataList = resData.data;
//						console.log(resData.data);
						if(this.chioceOptionId && this.chioceOptionId.length > 0){
                    		this.chioceId = this.chioceOptionId;
                    		this.chioceId2 = this.chioceOptionId;
                    		this.$emit('IndustryTreeSelectCall', this.chioceId,this.chioceId2);
                    	}
					} else {
						this.$message({
							type: 'error',
							message: '获取所属行业下拉框数据失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("获取所属行业下拉框数据=" + err);
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
	.IndustryTreeSelect {
		.el-select {
			width: 100%;
		}
	}
</style>