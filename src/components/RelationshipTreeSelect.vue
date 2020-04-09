<template>
	<div class="RelationshipTreeSelect">
		<el-select v-model="chioceOptionId" clearable placeholder="请选择与该人关系" @change="changeChioceId">
			<el-option v-for="item in dataList" :key="item.code" :label="item.name" :value="item.code">
			</el-option>
		</el-select>
	</div>
</template>
<script>
	import bus from '../common/bus';
	export default {
		name: 'RelationshipTreeSelect', //与该人关系下拉框
		props: ['chioceOptionId'], //选中的与该人关系id
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
				this.$emit('RelationshipTreeSelectCall',this.findObjById(id));
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
						code: this.API.constObj.CadreCodeDetailList[39].id //与该人关系
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.dataList = resData.data;
//						console.log(resData.data);
						if(this.chioceOptionId && this.chioceOptionId.length > 0){
                    		let returnObj = this.findObjById(this.chioceOptionId);
		        			this.$emit('RelationshipTreeSelectCall',returnObj);
                    	}
					} else {
						this.$message({
							type: 'error',
							message: '获取与该人关系下拉框数据失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("获取与该人关系下拉框数据=" + err);
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
	.RelationshipTreeSelect {
		.el-select {
			width: 100%;
		}
	}
</style>