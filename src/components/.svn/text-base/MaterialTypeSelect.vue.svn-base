<template>
	<div class="materialTypeSelect">
		<el-select v-model="chioceId" clearable :placeholder="holder" @change="changeChioceId">
			<div>
				<el-option v-if="isShow" v-for="(item,index) in dataList" :key="index" :label="item.codeno" :value="item.id" >
				</el-option>
			</div>
			<div>
				<el-option v-if="!isShow" v-for="(item,index) in dataList" :key="index" :label="item.codeno+'、'+item.name" :value="item.id" >
				</el-option>
			</div>
		</el-select>
	</div>
</template>
<script>
	import bus from '../common/bus';
	export default {
		name: 'MaterialTypeSelect', //材料类型的下拉框
		props: ['isType','chioceOptionId','isAll'], //true材料类型，false材料类号 isAll:true//true:返回全部； false:返回子目录
		data() {
			return {
				dataList: [],//下拉框数据
				chioceId:  this.chioceOptionId, //选中的id
				holder:"请选择材料类型",//提示语
				isShow:true,
				name:"",//名字
				isFull:true,//是否显示全部，false只显示子目录
			};
		},
		created() {
			if(this.isType) this.isShow = true;
			else this.isShow = false;
			this.isFull = this.isAll;//只设置false值，不传的都是true，显示全部
			this.getData();
			
		},
		methods: {
			/*
			 * 监听下拉框change事件
			 * @param {String} id 选中项的id
			 */
			changeChioceId(newV){
				this.chioceId = newV;
				let obj = {};
				this.dataList.forEach(item=>{
					if(item.id == this.chioceId){
						obj = item;
					} 
				})
//				this.$emit('applyTypeCall', obj);
				this.$emit('applyTypeCall', newV);
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
                	url:this.API.quertMaterialType, 
                	params:{
                  		isAll:this.isFull//true:返回全部； false:返回子目录
//	                	id:this.API.constObj.applyStatusId//状态
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.dataList = resData.data;
                    	if(this.chioceOptionId && this.chioceOptionId.length > 0){
                    		this.chioceId = this.chioceOptionId;
                    		this.$emit('applyTypeCall', chioceId);
                    	}
                    }else{
			          	this.$message({
				            type: 'error',
				            message: '获取状态下拉框数据失败，请刷新重试！'
			          	});     
                    }
                }).catch(function(err){
                	console.log("获取状态下拉框数据="+err);
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
	.materialTypeSelect{
		.el-select{
			width:100%;
		}
	}
</style>