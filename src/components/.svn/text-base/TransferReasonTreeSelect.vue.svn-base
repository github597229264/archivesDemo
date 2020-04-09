<template>
	<div class="TransferReasonTreeSelect">
		<el-select v-model="chioceId" clearable placeholder="请选择原因" @change="changeChioceId">
			<el-option v-for="item in dataList" :key="item.code" :label="item.name" :value="item.code">
			</el-option>
		</el-select>
	</div>
</template>
<script>
	import bus from '../common/bus';
	export default {
		name: 'TransferReasonTreeSelect', //调动原因下拉框
		props: ['chioceOptionId'], //选中的调动原因id
		data() {
			return {
				dataList: [], //下拉框数据
				chioceId: '' //选中的id
			};
		},
		computed: {
			
		},
		created() {
			this.getData();
			this.chioceId=this.chioceOptionId
		},
		methods: {
			/*
			 * 监听下拉框change事件
			 * @param {String} id 选中项的id
			 */
			changeChioceId(newV) {
				console.log(newV)
				this.chioceId = newV;
				this.$emit('TransferReasonTreeSelectCall', newV);
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
						code: this.API.constObj.CadreCodeDetailList[14].id //调动原因
					}
				}).then((res) => {
					console.log(this.API.getSysCadreCodeDetailList);
					console.log(res.data);
					var resData = res.data;
					if(resData.code == "1") {
						this.dataList = resData.data;
						console.log(this.dataList)
//						console.log(resData.data);
						if(this.chioceOptionId && this.chioceOptionId.length > 0){
                    		this.chioceId = this.chioceOptionId;
                    		this.$emit('TransferReasonTreeSelectCall', this.chioceId);
                    	}
					} else {
						this.$message({
							type: 'error',
							message: '获取调动原因下拉框数据失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("获取调动原因下拉框数据=" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			}
		},
		mounted() {

		},
		watch:{
			chioceOptionId:{
				handler:function(newVal,oldVal){
					this.chioceId = newVal
				}
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.TransferReasonTreeSelect {
		.el-select {
			width: 100%;
		}
	}
</style>