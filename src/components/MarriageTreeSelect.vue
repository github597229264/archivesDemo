<template>
	<div class="MarriageTreeSelect">
		<el-select v-model="chioceId" clearable placeholder="请选择"  @change="changeChioceId">
			<el-option v-for="item in dataList" :key="item.code" :label="item.name" :value="item.code">
			</el-option>
		</el-select>
	</div>
</template>
<script>
	import bus from '../common/bus';
	export default {
		name: 'MarriageTreeSelect', //婚姻状况下拉框
		props: ['chioceOptionId'], //选中的婚姻状况id
		data() {
			return {
				dataList: [],//下拉框数据
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
			changeChioceId(newV){
				this.chioceId = newV;
				this.$emit('MarriageTreeSelectCall', newV);
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
	                	code:this.API.constObj.CadreCodeDetailList[4].id//婚姻状况
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.dataList = resData.data;
                    	if(this.chioceOptionId && this.chioceOptionId.length > 0){
                    		this.chioceId = this.chioceOptionId;
                    		this.$emit('MarriageTreeSelectCall', this.chioceId);
                    	}
                    }else{
			          	this.$message({
				            type: 'error',
				            message: '获取婚姻状况下拉框数据失败，请刷新重试！'
			          	});     
                    }
                }).catch((err)=>{
                	console.log("获取婚姻状况下拉框数据="+err);
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
	.MarriageTreeSelect{
		.el-select{
			width:100%;
		}
	}
</style>