<template>
	<div class="knowledgeTreeSelect">
		<el-cascader  
			placeholder="请选择"
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
		name: 'knowledgeTreeSelect', //全部菜单树形下拉框--返回object
		props:[
			'defaultOptions'//默认选中项id
		],
		data() {
			return {
				selectedOptions:[],//选中值--必须是完整路径eg:['节点id'] 或 ['父节点id','子节点id']
				treeProps:{
					value:'id',
					label:'title',
					children:'children'
				},
				oldTreeList:[],//原始数据
				treeList:[]//必须是树形结构的对象数组
			}
		},
		created(){
			this.getData();
		},
		mounted() {
			
		},
		methods: {
			/**
			 * 监听change事件
			 * 回调父组件中OrgTreeSelectCall事件，传回选中的value值
			 * @param {Array} valArray 选中的值
			 */
			handleChange(valArray) {
				console.log(valArray);
		        let findId ='';
		        if(valArray  && valArray.length > 0){
		        	findId = valArray[valArray.length-1];	
		        }
                let returnObj = this.findObjById(findId);
		        this.$emit('knowledgeTreeSelectCall',returnObj);	
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
            		method:'post',
					url:this.API.queryBusinessType,
					data:{
						typename: "Sys_ArchivesKnowledge"
					}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	let mappingObj ={
                    		childKey:'id',
                    		fatherKey:'pid'
	                    };
                    	self.oldTreeList = resData.data;
                    	//递归转换为tree格式数据
                    	self.treeList = self.commonFun.toTreeDataNormal(resData.data,mappingObj);
                    	if(self.defaultOptions){
                			let newArray = self.commonFun.findTreeNodeById(self.oldTreeList,self.defaultOptions,mappingObj);
                			self.selectedOptions = self.commonFun.createArrIdAndReverse(newArray,"id");
                    	}else if(self.defaultOptions==""){
                    		self.selectedOptions = [];
                    	}else{
                    		self.selectedOptions.push(self.treeList[0].id);
                    	}
                    	let findId = self.selectedOptions[self.selectedOptions.length-1];
                    	let returnObj = this.findObjById(findId);
                    	this.$emit('knowledgeTreeSelectCall',returnObj);
                    }else{
			          	self.$message({
				            type: 'error',
				            message: '获取上级分类下拉框数据失败，请刷新重试！'
			          	});     
                    }
                }).catch((err) => {
                	console.log("获取上级分类下拉框数据="+err);
                	self.$message({
			            type: 'error',
			            message: '请求异常，请检查网络！'
			        });  
                })
            }
		},
	};
</script>
<style lang="scss" scoped type="text/css">
	.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
		height: auto;
		padding: 0;
	}
	
	.el-select-dropdown__item.selected {
		font-weight: normal;
	}
	
	ul li>>>.el-tree .el-tree-node__content {
		height: auto;
	}
	
	.el-tree-node__label {
		font-weight: normal;
	}
	
	.el-tree>>>.is-current .el-tree-node__label {
		color: #409EFF;
		font-weight: 700;
	}
	
	.el-tree>>>.is-current .el-tree-node__children .el-tree-node__label {
		color: #606266;
		font-weight: normal;
	}
</style>