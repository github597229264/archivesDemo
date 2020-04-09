<template>
	<div class="PostTreeSelect">
		<el-select v-model="chioceOptionId" clearable placeholder="请选择职务" style="width:100%" @change="changeChioceId">
			<el-option v-for="item in dataList" :key="item.code" :label="item.name" :value="item.code">
			</el-option>
		</el-select>
	</div>
</template>
<script>
	import bus from '../common/bus';
	export default {
		name: 'PostTreeSelect', //职务下拉框
		props: ['chioceOptionId'], //选中的职务id
		data() {
			return {
				dataList: [], //下拉框数据
				chioceId: this.chioceOptionId //选中的id
			};
		},
		computed: {

		},
//		watch:{
//			chioceOptionId:{
//				handler:function(newVal){
//					console.log(newVal)
//				}
//			}
//		},
		created() {
			this.getData();
		},
		methods: {
			/*
			 * 监听下拉框change事件
			 * @param {String} id 选中项的id
			 */
			changeChioceId(newV) {
				console.log(this.findObjById(newV))
		        this.$emit('PostTreeSelectCall',this.findObjById(newV));
			},
			findObjById(id){
				let findObject = {};
				for(let i =0;i<this.dataList.length;i++){
					if(id == this.dataList[i].code){
						findObject = this.dataList[i];
						break;
					}
				}
				return findObject;
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
						code: this.API.constObj.CadreCodeDetailList[21].id //职务
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.dataList = resData.data;
//						console.log(resData.data);
						if(this.chioceOptionId && this.chioceOptionId.length > 0){
//                  		this.chioceId = this.chioceOptionId;
//                  		this.$emit('PostTreeSelectCall', this.chioceId);
                    		let returnObj = this.findObjById(this.chioceOptionId);
		        			this.$emit('PostTreeSelectCall',returnObj);
                    	}
					} else {
						this.$message({
							type: 'error',
							message: '获取职务下拉框数据失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("获取职务下拉框数据=" + err);
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
	.IntoTransferReasonTreeSelect {
		.el-select {
			width: 100%;
		}
	}
</style>