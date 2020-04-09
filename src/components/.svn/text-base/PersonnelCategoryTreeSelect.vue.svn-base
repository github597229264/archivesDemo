<template>
	<div class="PersonnelCategoryTreeSelect">
		<el-select v-model="chioceId" clearable :placeholder="title?title:'干部在职情况'"  @change="changeChioceId">
			<el-option v-for="item in dataList" :key="item.code" :label="item.name" :value="item.code">
			</el-option>
		</el-select>
	</div>
</template>
<script>
	import bus from '../common/bus';
	export default {
		name: 'PersonnelCategoryTreeSelect', //查借阅类型下拉框
		props: ['chioceOptionId','title'], //选中的查借阅类型id
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
			this.chioceId=this.chioceOptionId;
		},
		watch:{
			chioceOptionId:{
				handler:function(newVal){
					this.chioceId=newVal
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
				this.$emit('PersonnelCategoryTreeSelectCall', newV);
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
	                	code:this.API.constObj.CadreCodeDetailList[1].id//人员类型
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.dataList = resData.data;
                    	if(this.chioceOptionId && this.chioceOptionId.length > 0){
                    		this.chioceId = this.chioceOptionId;
                    		this.$emit('PersonnelCategoryTreeSelectCall', this.chioceId);
                    	}
                    }else{
			          	this.$message({
				            type: 'error',
				            message: '获取人员类型下拉框数据失败，请刷新重试！'
			          	});     
                    }
                }).catch((err)=>{
                	console.log("获取人员类型下拉框数据="+err);
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
	.PersonnelCategoryTreeSelect{
		.el-select{
			width:100%;
		}
	}
</style>