<template>
	<div class="managementArchTreeSelect">
        <el-cascader
            v-model="selectedOptions"
            :options="treeList"
            placeholder="请选择上级菜单"
            :change-on-select="true"
            :clearable="true"
            :show-all-levels="false"
            :props=treeProps
            expand-trigger="hover"
            @change="handleChange">
        </el-cascader>
	</div>
</template>
<script>
	import bus from '../common/bus';
	export default {
		name: 'ManagementArchTreeSelect', //管档单位下拉框
		props: [
		    'defaultOptions'//选中的管档单位
        ],
		data() {
			return {
                selectedOptions:[],//选中值--必须是完整路径eg:['节点code'] 或 ['父节点code','子节点code']
                treeProps:{
                    value:'id',
                    label:'title',
                    children:'children'
                },
                oldTreeList:[],//原始数据
                treeList:[]//必须是树形结构的对象数组
			};
		},
		computed: {

		},
		created() {
			this.getData();
		},
		methods: {
            /**
             * 监听change事件
             * 回调父组件中OrgTreeSelectCall事件，传回选中的value值
             * @param {Array} valArray 选中的值
             */
            handleChange(valArray) {
                let findId ='';
                if(valArray  && valArray.length > 0){
                    findId = valArray[valArray.length-1];
                }
                let returnObj = this.findObjById(findId);
                this.$emit('TreeSelectCall',returnObj);
            },
            /**
             * 按照id查找数据
             * @param {Number} id 选中项的id
             * @return {Object} 返回查找到的数据
             */
            findObjById(id){
                let findObject = {};
                for(let i =0;i<this.oldTreeList.length;i++){
                    if(id === this.oldTreeList[i].id){
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
				this.$axios({
					loading:{
            			isShow:false
            		},
					method: 'get',
					url: this.API.findAllOrganization
				}).then((res) => {
                    var resData = res.data;
                    if(resData.code === "1"){
                        this.oldTreeList = resData.data;
                        //递归转换为tree格式数据
                        this.treeList = this.commonFun.toTreeDataNormal(resData.data,{childKey:'id',fatherKey:'parentid'});
                        let returnObj = {};
                        if(this.defaultOptions){
                            let mappingObj ={
                                childKey:'id',
                                fatherKey:'parentid'
                            };
                            let newArray = this.commonFun.findTreeNodeById(this.oldTreeList,this.defaultOptions,mappingObj);
                            this.selectedOptions = this.commonFun.createArrIdAndReverse(newArray,"id");
                            returnObj =this.findObjById(this.defaultOptions);
                        }else if(this.defaultOptions === ""){
                            returnObj = {};
                        }else{
                            this.selectedOptions.push(this.treeList[0].id);
                            returnObj = this.treeList[0];
                        }
                        this.$emit('TreeSelectCall',returnObj);
                    }else{
                        this.$message({
                            type: 'error',
                            message: '获取字典项下拉框数据失败，请刷新重试！'
                        });
                    }
				}).catch((err) => {
					console.log("获取字典项下拉框数据=" + err);
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
<style lang="scss" scoped>
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
