<template>
    <div class="selectPersonnelFiles">
		<el-row :gutter="20">
		  <el-col :span="16">
			<el-form :inline="true" :model="searchForm" class="demo-form-inline">
			  <el-form-item>
			    <AreaTreeSelect v-if="isSearchByArea" v-show="isShowAreaSelect" :defaultOptions="searchForm.areaCodeAllID"  @areaTreeSelectCall="areaTreeSelectCall"></AreaTreeSelect>
			    <OrganizationTreeSelect v-else :defaultOptions="searchForm.departmentID"  @OrgTreeSelectCall="orgTreeSelectCall"></OrganizationTreeSelect>
			  </el-form-item>
			  <el-form-item>
			    <el-input v-model="searchForm.nameAndPinyin" placeholder="输入姓名或拼音"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" icon="search" @click="search" >查询</el-button>
			    <el-button  @click="goBack" >返回</el-button>
			  </el-form-item>
			</el-form>
		  </el-col>
		  <el-col :span="8" align="right">
		  	<el-badge :value="multipleSelection.length" class="item" type="primary">
			  <el-button size="small"  type="primary" :disabled="multipleSelection.length > 0?false:true" @click="confirmChioce" >下一步
			  	<i class="el-icon-arrow-right el-icon-right"></i>
			  </el-button>
			</el-badge>
		  </el-col>
		</el-row>
        <el-table :data="tableData" :row-key="getRowKey" border class="table" ref="multipleTable" @selection-change="handleSelectionChange"  :height="tableHeight" empty-text="没有找到数据，请重新搜索">
            <el-table-column type="index" label="序号" align="center" width="50">
				<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
			</el-table-column>
            <el-table-column prop="a0101" label="姓名" width="200"  align="center"></el-table-column>
            <el-table-column prop="a0111A" label="籍贯" width="250"  align="center"  show-overflow-tooltip></el-table-column>
            <el-table-column prop="e10040" label="现职单位及职务"  align="center" show-overflow-tooltip></el-table-column>
            <el-table-column type="selection" width="50" align="center" reserve-selection></el-table-column>
        </el-table>
        <Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
        
    </div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import OrganizationTreeSelect from '../../components/OrganizationTreeSelect.vue';
	import AreaTreeSelect from '../../components/AreaTreeSelect.vue';
    export default {
        name: 'SelectPersonnelFiles',//选择档案(多选)--查借阅申请
	    props:[
	    	'isAreaQuery',//是否区域查询
	    	'mainHeight'//main标签高度
	    ],
	    components:{
	        Pagination,//分页组件
	        OrganizationTreeSelect,//职能机构树形下拉框
	        AreaTreeSelect//区域机构树形下拉框
	    },
        data() {
            return {
                tableData: [],//表格数据
                pageObj:{
	                pageIndex: this.API.constObj.pageIndex,//当前页码
	                total:0,//数据总数
	                pageSize:this.API.constObj.pageSize,//页大小
                },
                tableHeight: "", //高度
                isSearchByArea:this.isAreaQuery || false,
                multipleSelection: [],//选中的数据
                searchForm:{
                	areaCodeID:undefined,//区域机构ID
                	departmentID:'',//机构ID
                	nameAndPinyin:''//拼音
                },
                isShowAreaSelect:false//是否显示区域选择组件
            }
        },
        created() {
        },
        mounted(){
        	this.getData();
        },
		watch:{
        	/**
        	 * 监听 tableData 参数值
        	 */
        	tableData(newVal,oldVal){
        		this.tableHeight = this.mainHeight-this.$refs.multipleTable.$el.offsetTop*1 - 52-32;
        	}
		},
        methods: {
        	/**
        	 * 设置选中项
        	 * @param {Array} rows 选中项（为空则全部取消）
        	 */
        	toggleSelection(rows) {
		        if (rows) {
		          rows.forEach(row => {
		            this.$refs.multipleTable.toggleRowSelection(row);
		          });
		        } else {
		          this.$refs.multipleTable.clearSelection();
		        }
		    },
        	/*
        	 * 保存选中的数据a0100 
        	 * 与reserve-selection=true配合使用，保存分页时选中的项
        	 */
		    getRowKey (row) {
		      return row.a0100;
		    },
            // 分页导航
            handleCurrentChange(val) {
                this.pageObj.pageIndex = val;
                this.getData();
            },
	        /*
	         * 分页组件回调方法--子组件回传数据的方法
	         * @param page_obj {Object} 分页信息
	         * page_obj.page_index 当前页下标
	         * page_obj.page_size 页大小
	         */
	        PageTurning(page_obj){
	            this.pageObj.pageIndex = page_obj.page_index;
	            this.pageObj.pageSize = page_obj.page_size;
				this.getData();
	        },
	        /*
	         * 职能机构树形下拉框组件回调方法--子组件回传数据的方法
	         * @param {Object} returnObj 选中数据的对象
	         */
	        orgTreeSelectCall(returnObj){
	        	if(returnObj){
	        		this.searchForm.departmentID = returnObj.id;
	        	}else{
	        		this.searchForm.departmentID = "";
	        	}
	        },
	        /*
	         * 区域机构树形下拉框组件回调方法--子组件回传数据的方法
	         * @param {Object} returnObj 选中的数据对象
	         */
	        areaTreeSelectCall(returnObj){
	        	if(returnObj){
	        		this.searchForm.areaCodeID = returnObj.code;
	        	}else{
	        		this.searchForm.areaCodeID = "";
	        	}
	        },
	        /**
	         * 返回
	         */
	        goBack(){
	        	this.$router.push('/applyMain');
	        },
            /*
             * 获取表格档案信息的数据 
             */
            getData() {
                this.$axios({
					loading:{
            			isShow:true,
            			target:'.selectPersonnelFiles'
            		},
            		method:'post',
                	url:this.API.getA01, 
                	data:{
                		'uAreaCode':this.searchForm.areaCodeID,
	                	'b0000':this.searchForm.departmentID,
						'a0101':this.searchForm.nameAndPinyin,
	                    'pageIndex': this.pageObj.pageIndex,
	                    'pageSize': this.pageObj.pageSize
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.tableData = resData.data.list;
                    	this.pageObj.total= resData.data.total;
                    	//this.toggleSelection(this.multipleSelection);//设置选中项
                    }else{
			          	this.$message({
				            type: 'error',
				            message: '查询档案失败，请刷新重试！'
			          	});     
                    }
                }).catch((err) => {
                	console.log("档案选择列表="+err);
                	this.$message({
			            type: 'error',
			            message: '请求异常，请检查网络！'
			        });  
                })
            },
            /*
             * 查询
             */
            search() {
            	this.pageObj.pageIndex = this.API.constObj.pageIndex;
                this.getData();
            },
            /*
             * 确定选择的数据 
             */
            confirmChioce(){
            	if(this.multipleSelection.length < 1){
            		this.$message({
			          message: '请至少选中一条数据!',
			          type: 'warning'
			        });
			        return;
            	}
            	let returnData = this.dataSort(this.multipleSelection);
            	//值传回给父组件
            	this.$emit('changeStep',2,returnData);
            },
            /*
             * 表格选中切换赋值 
             */
	      	handleSelectionChange(valArray) {
	        	
	        	if(valArray.length > this.API.constObj.applyTotalNumber){
	        		this.$message({
			          message: '单次最多只能查借阅'+this.API.constObj.applyTotalNumber+'人!',
			          type: 'warning'
			        });
			        return;
	        	}
	        	this.multipleSelection = valArray;
	        	var step = 0;
	        	let returnData = this.dataSort(this.multipleSelection);
	        	if(this.multipleSelection.length > 0){
	        		step = 1;
	        	}
	        	//值传回给父组件
            	this.$emit('changeStep',1,returnData);
	      	},
	      	/**
	      	 * 数据处理相同类型排在一起
	      	 */
	      	dataSort(data){
	      		let newData1 = [];//本处室
	      		let newData2 = [];//外处室
	      		let newData3 = [];//无机构
	      		let newData4 = [];//外单位
	      		let finalData = [];//处理完后的最终数据
	      		if(data.length ==0){
	      			finalData = [];
	      		}else{
	      			data.forEach(function(row,index){
	      				let newRow= row;
	      				if(row.areaCode  == 1){//本单位
	      					switch (row.b0000Type){
	      						case "本处室":
	      							newRow.type = "本处室";
	      							newData1.push(newRow);
	      							break;
	      						case "外处室":
	      							newRow.type = "外处室";
	      							newData2.push(newRow);
	      							break;
	      						case "无机构"://无机构
	      							newRow.type = "无机构";
	      							newData3.push(newRow);
	      							break;
	      					}
	      				}else if(row.areaCode  == 2){//外单位
	      					newRow.type = "外单位";
	      					newData4.push(newRow);
	      				}
	      			});
	      			let newData5 =  newData1.concat(newData2);
	      			let newData6 =  newData3.concat(newData4);
	      			finalData = newData5.concat(newData6);
	      		}
	      		return finalData;
	      	},
        }
    }

</script>
<style  lang="scss" scoped type="text/css">
    .selectPersonnelFiles{
        width: 100%;
    }

</style>
