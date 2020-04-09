<template>
	<div class="moduleType">
		<el-select v-model="chioceId" clearable placeholder="请选择" @change="changeChioceId">
			<el-option v-for="item in dataList" :key="item.id" :label="item.name" :value="item.id" >
			</el-option>
		</el-select>
	</div>
</template>
<script>
	import bus from '../common/bus';
	export default {
		name: 'ModuleType', //模块分类下拉框--返回object
		props: ['chioceOptionId'], //选中的模块分类id
		data() {
			return {
				dataList: [],//下拉框数据
				chioceId: '' //选中的id
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
				let returnObj = this.findObjById(id);
				this.$emit('ModuleTypeCall', returnObj);
			},
			/**
			 * 按照id查找数据
			 * @param {Number} id 选中项的id
			 * @return {Object} 返回查找到的数据
			 */
			findObjById(id){
				let findObject = {};
				for(let i =0;i<this.dataList.length;i++){
					if(id == this.dataList[i].id){
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
            		method:'get',
                	url:this.API.getDataList, 
                	params:{
	                	id:this.API.constObj.moduleTypeId//模块分类id
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.dataList = resData.data;
                    	if(this.chioceOptionId){
                    		this.chioceId = this.chioceOptionId;
                    	} else{
                    		this.chioceId = this.dataList[0].id;
                    	}
                    	let returnObj = this.findObjById(this.chioceId);
						this.$emit('ModuleTypeCall', returnObj);
                    }else{
			          	this.$message({
				            type: 'error',
				            message: '获取模块分类下拉框数据失败，请刷新重试！'
			          	});     
                    }
                }).catch((err) =>{
                	console.log("获取模块分类下拉框数据="+err);
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
	.moduleType{
		.el-select{
			width:100%;
		}
	}
</style>