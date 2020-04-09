<template>
	<div class="AcademicDegreeTreeSelect">
		<el-select v-model="chioceId" clearable placeholder="请选择学位" @change="changeChioceId">
			<el-option v-for="item in dataList" :key="item.code" :label="item.name" :value="item.code">
			</el-option>
		</el-select>
	</div>
</template>
<script>
	import bus from '../common/bus';
	export default {
		name: 'AcademicDegreeTreeSelect', //学位下拉框
		props: ['chioceOptionId'], //选中的学位id
		data() {
			return {
				dataList: [], //下拉框数据
				chioceId: '' //选中的id
			};
		},
		computed: {

		},
		created() {
			this.chioceId=this.chioceOptionId;
			this.getData();
		},
		watch:{
			chioceOptionId:{
				handler:function(newVal){
					this.chioceId=newVal;
				}
			}
		},
		methods: {
			/*
			 * 监听下拉框change事件
			 * @param {String} id 选中项的id
			 */
			changeChioceId(id) {
		        this.$emit('AcademicDegreeTreeSelectCall',this.findObjById(id));
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
						code: this.API.constObj.CadreCodeDetailList[29].id //学位
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.dataList = resData.data;
						if(this.chioceOptionId && this.chioceOptionId.length > 0){
                    		let returnObj = this.findObjById(this.chioceOptionId);
		        			this.$emit('AcademicDegreeTreeSelectCall',returnObj);
                    	}
					} else {
						this.$message({
							type: 'error',
							message: '获取学位下拉框数据失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("获取学位下拉框数据=" + err);
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
	.AcademicDegreeTreeSelect {
		.el-select {
			width: 100%;
		}
	}
</style>