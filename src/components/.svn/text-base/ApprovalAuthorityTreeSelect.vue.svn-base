<template>
	<div class="ApprovalAuthorityTreeSelect">
		<el-select v-model="chioceOptionId" clearable placeholder="请选择批准机关" @change="changeChioceId">
			<el-option v-for="item in dataList" :key="item.code" :label="item.name" :value="item.code">
			</el-option>
		</el-select>
	</div>
</template>
<script>
	import bus from '../common/bus';
	export default {
		name: 'ApprovalAuthorityTreeSelect', //批准机关下拉框
		props: ['chioceOptionId'], //选中的批准机关id
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
				this.$emit('ApprovalAuthorityTreeSelectCall',this.findObjById(id));
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
						code: this.API.constObj.CadreCodeDetailList[40].id //批准机关
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.dataList = resData.data;
						if(this.chioceOptionId && this.chioceOptionId.length > 0){
                    		let returnObj = this.findObjById(this.chioceOptionId);
		        			this.$emit('ApprovalAuthorityTreeSelectCall',returnObj);
                    	}
					} else {
						this.$message({
							type: 'error',
							message: '获取批准机关下拉框数据失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("获取批准机关下拉框数据=" + err);
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
	.ApprovalAuthorityTreeSelect {
		.el-select {
			width: 100%;
		}
	}
</style>