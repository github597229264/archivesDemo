<template>
	<div class="organizationTreeSelect">
		<el-cascader  
			placeholder="请选择机构"
			expand-trigger="hover" 
			:options="treeList"  
			:change-on-select="true"
			v-model="selectedOptions"
			:props=treeProps 
			:clearable="true" 
			:show-all-levels="false"
    		@change="handleChange">
		</el-cascader>
	</div>
</template>
<script>
	import bus from '../common/bus';
	export default {
		name: 'OrganizationTreeSelect',//职能机构树形下拉框
		props:[
			'defaultOptions',//选中项 id: defaultOptions.length>0 选中传输的id项; defaultOptions=“” 不选;defaultOptions 不传该字段  默认选中数据的第一项
		],
		data() {
			return {
				selectedOptions:[],//选中值--必须是完整路径eg:['父节点id'] 或 ['父节点id','子节点id']
				treeProps:{
					value:'id',
					label:'name',
					children:'children'
				},
				oldTreeList:[],
				treeList: []
			};
		},
		created(){
			this.getData();
		},
		computed: {
			
		},
		methods: {
			/**
			 * 监听change事件
			 * 回调父组件中OrgTreeSelectCall事件，传回选中的value值
			 * @param {Array} valArray 选中的值
			 */
			handleChange(valArray) {
				let returnId ='';
		        let findId ='';
		        if(valArray  && valArray.length > 0){
		        	findId = valArray[valArray.length-1];	
		        }
                let returnObj = this.findObjById(findId);
		        this.$emit('OrgTreeSelectCall',returnObj);	
		   },
			/**
			 * 按照id查找数据
			 * @param {Number} id 选中项的id
			 * @return {Object} 返回查找到的数据
			 */
			findObjById(id){
				let findObject = {};
				for(let i =0;i<this.oldTreeList.length;i++){
					if(id == this.oldTreeList[i].id){
						findObject = this.oldTreeList[i];
						break;
					}
				}
				return findObject;
			},
            /**
             * 获取列表数据
             */
            getData() {
            	var self = this;
                this.$axios({
					loading:{
            			isShow:false
            		},
            		method:'get',
                	url:this.API.organizationTree,
                	params:{}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	//递归转换为tree格式数据
                    	self.oldTreeList = resData.data;
                    	self.treeList =self.commonFun.toTreeData(resData.data);
                    	let returnObj = {};
                    	if(self.defaultOptions){
                			let mappingObj ={
	                    		childKey:'id',
	                    		fatherKey:'pId'
	                    	};
                			let newArray = self.commonFun.findTreeNodeById(self.oldTreeList,self.defaultOptions,mappingObj);
                			self.selectedOptions = self.commonFun.createArrIdAndReverse(newArray,"id");
                			returnObj =this.findObjById(self.defaultOptions);
                    	}else if(self.defaultOptions==""){
                    		returnObj = {};
                    	}else{
                    		self.selectedOptions.push(self.treeList[0].id);
                    		returnObj = self.treeList[0];
                    	}
                    	this.$emit('OrgTreeSelectCall',returnObj);
                    }else{
			          	self.$message({
				            type: 'error',
				            message: '获取区域树形下拉框数据失败，请刷新重试！'
			          	});     
                    }
                }).catch((err) => {
                	console.log("获取区域树形下拉框数据="+err);
                	self.$message({
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

</style>