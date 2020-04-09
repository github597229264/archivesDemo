<template>
	<div class="fileTypeSelect">
		<el-select v-model="chioceId" clearable placeholder="请选择档案类型" @change="changeChioceId">
			<el-option v-for="item in dataList" :key="item.id" :label="item.name" :value="item.id">
			</el-option>
		</el-select>
	</div>
</template>
<script>
	import bus from '../common/bus';
	export default {
		name: 'FileTypeSelect', //查借阅理由或目的下拉框
		props: ['chioceOptionId'], //选中的查借阅理由或目的id
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
				this.$emit('FileTypeCall', id);
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
	                	id:this.API.constObj.fileType//档案类型
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.dataList = resData.data;
                    	if(this.chioceOptionId && this.chioceOptionId.length > 0){
                    		this.chioceId = this.chioceOptionId;
                    		this.$emit('FileTypeCall', this.chioceId);
                    	}
                    }else{
			          	this.$message({
				            type: 'error',
				            message: '获取档案类型下拉框数据失败，请刷新重试！'
			          	});     
                    }
                }).catch((err) => {
                	console.log("获取档案类型下拉框数据="+err);
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
	.fileTypeSelect{
		.el-select{
			width:100%;
		}
	}
</style>