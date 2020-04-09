<template>
	<div class="applyScopeSelect">
		<el-select v-model="chioceId" clearable placeholder="请选择查借阅范围"  @change="changeChioceId">
			<el-option v-for="item in dataList" :key="item.id" :label="item.name" :value="item.id">
			</el-option>
		</el-select>
	</div>
</template>
<script>
	import bus from '../common/bus';
	export default {
		name: 'ApplyScopeSelect', //查借阅范围下拉框
		props: ['chioceOptionId'], //选中的查借阅范围id
		data() {
			return {
				dataList: [],//下拉框数据
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
			changeChioceId(newV){
				this.chioceId = newV;
				this.$emit('ApplyScopeSelectCall', newV);
			},
            /**
             * 获取列表数据
             */
            getData() {
                this.$axios({
					loading:{
            			isShow:false
            		},
            		method:'get',
                	url:this.API.getDataList, 
                	params:{
	                	id:this.API.constObj.applyScopeId//查借阅范围
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.dataList = resData.data;
                   		if(self.defaultOptions && self.defaultOptions.length>0){
                    		self.selectedOptions = self.defaultOptions;
                    		this.$emit('ApplyScopeSelectCall',self.selectedOptions);
                    	}
                    }else{
			          	this.$message({
				            type: 'error',
				            message: '获取查借阅范围下拉框数据失败，请刷新重试！'
			          	});     
                    }
                }).catch((err)=>{
                	console.log("获取查借阅范围下拉框数据="+err);
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
	.applyScopeSelect{
		.el-select{
			width:100%;
		}
	}
</style>