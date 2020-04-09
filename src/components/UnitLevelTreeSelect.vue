<template>
	<div class="UnitLevelTreeSelect">
		<el-select v-model="chioceId" clearable placeholder="请选择单位级别" @change="changeChioceId">
			<el-option v-for="item in dataList" :key="item.code" :label="item.name" :value="item.code">
			</el-option>
		</el-select>
	</div>
</template>
<script>
	import bus from '../common/bus';
	export default {
		name: 'UnitLevelTreeSelect', //单位级别下拉框
		props: ['chioceOptionId'], //选中的单位级别id
		data() {
			return {
				dataList: [], //下拉框数据
				chioceId: '' //选中的id
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
			this.chioceId=this.chioceOptionId
		},
		methods: {
			/*
			 * 监听下拉框change事件
			 * @param {String} id 选中项的id
			 */
			changeChioceId(newV) {
				this.chioceId = newV;
				this.$emit('UnitLevelTreeSelectCall', newV);
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
						code: this.API.constObj.CadreCodeDetailList[15].id //单位级别
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.dataList = resData.data;
//						console.log(resData.data);
						if(this.chioceOptionId && this.chioceOptionId.length > 0){
                    		this.chioceId = this.chioceOptionId;
                    		this.$emit('UnitLevelTreeSelectCall', this.chioceId);
                    	}
					} else {
						this.$message({
							type: 'error',
							message: '获取单位级别下拉框数据失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("获取单位级别下拉框数据=" + err);
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
	.UnitLevelTreeSelect {
		.el-select {
			width: 100%;
		}
	}
</style>