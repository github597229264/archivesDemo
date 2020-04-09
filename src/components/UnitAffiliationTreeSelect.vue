<template>
	<div class="unitlevel-tree-select-container">
		<el-select v-model="chioceId" clearable placeholder="请选择单位级别"  @change="changeChioceId">
			<el-option v-for="item in dataList" :key="item.code" :label="item.name" :value="item.code">
			</el-option>
		</el-select>
	</div>
</template>
<script>
	import bus from '../common/bus';
	export default {
		name: 'UnitAffiliationTreeSelect', //单位隶属关系
		props: ['chioceUnitOptionId'], //
		data() {
			return {
				dataList: [],//下拉框数据
				chioceId: this.chioceUnitOptionId //选中的id
			};
		},
		computed: {

		},
		watch:{
			chioceUnitOptionId:{
				handler:function(newVal){
					this.chioceId=newVal
				}
			}
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
				this.$emit('affiliationSelectCall', newV);
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
	                	code:this.API.constObj.CadreCodeDetailList[20].id//有效证件类型
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.dataList = resData.data;
                    	if(this.chioceUnitOptionId && this.chioceUnitOptionId.length>0){
                    		this.chioceId = this.chioceUnitOptionId;
                    		this.$emit('affiliationSelectCall',this.chioceUnitOptionId);
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