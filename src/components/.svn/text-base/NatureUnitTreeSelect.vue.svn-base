<template>
	<div class="unitlevel-tree-select-container">
		<el-select v-model="chioceId" clearable placeholder="请选择单位性质"  @change="changeChioceId">
			<el-option v-for="item in dataList" :key="item.code" :label="item.name" :value="item.code">
			</el-option>
		</el-select>
	</div>
</template>
<script>
	import bus from '../common/bus';
	export default {
		name: 'NatureUnitTreeSelect', //单位性质类别
		props: ['chioceNatureOptionId'], //
		data() {
			return {
				dataList: [],//下拉框数据
				chioceId: '' //选中的id
			};
		},
		computed: {

		},
		watch:{
			chioceNatureOptionId:{
				handler:function(newVal){
					this.chioceId=newVal
				}
			}
		},
		created() {
			this.getData();
			this.chioceId=this.chioceNatureOptionId
		},
		methods: {
			/*
			 * 监听下拉框change事件
			 * @param {String} id 选中项的id
			 */
			changeChioceId(newV){
				this.chioceId = newV;
				this.$emit('natureSelectCall', newV);
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
                	url:this.API.getSysCadreCodeDetailList, 
                	params:{
	                	code:this.API.constObj.CadreCodeDetailList[19].id//有效证件类型
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.dataList = resData.data;
                    	if(this.chioceNatureOptionId && this.chioceNatureOptionId.length > 0){
                    		this.chioceId = this.chioceNatureOptionId;
                    		this.$emit('natureSelectCall', this.chioceId);
                    	}
                    }else{
			          	this.$message({
				            type: 'error',
				            message: '获取单位级别数据失败，请刷新重试！'
			          	});     
                    }
                }).catch((err)=>{
                	console.log("获取有效证件类型下拉框数据="+err);
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
	.unitlevel-tree-select-container{
		.el-select{
			width:100%;
		}
	}
</style>