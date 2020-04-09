<template>
	<div class="applyTypeSelect">
		<el-select v-model="chioceId" clearable placeholder="请选择查借阅类型"  @change="changeChioceId">
			<el-option v-for="item in dataList" :key="item.id" :label="item.name" :value="item.id">
			</el-option>
		</el-select>
	</div>
</template>
<script>
	import bus from '../common/bus';
	export default {
		name: 'ApplyTypeSelect', //查借阅类型下拉框
		props: ['chioceOptionId'], //选中的查借阅类型id
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
			changeChioceId(id){
				this.chioceId = id;
				this.$emit('ApplyTypeCall', id);
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
	                	id:this.API.constObj.applyTypeId//查借阅类型
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.dataList = resData.data;
                    }else{
			          	this.$message({
				            type: 'error',
				            message: '获取查借阅类型下拉框数据失败，请刷新重试！'
			          	});     
                    }
                }).catch((err) => {
                	console.log("获取查借阅类型下拉框数据="+err);
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
	.applyTypeSelect{
		.el-select{
			width:100%;
		}
	}
</style>