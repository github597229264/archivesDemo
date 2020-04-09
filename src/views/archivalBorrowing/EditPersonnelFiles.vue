<template>
    <div class="editPersonnelFiles">
    	<el-row>
    		<el-col :span="12" align="left">
    			<el-button size="small"  type="primary"  icon="el-icon-arrow-left" @click="prevStep">上一步</el-button>
    		</el-col>
	    	<el-col :span="12" align="right">
				<el-button size="small"  type="primary" :disabled="tableDatas.length > 0?false:true"  @click="nextStep" >下一步
					<i class="el-icon-arrow-right el-icon--right"></i>
				</el-button>
			</el-col>
		</el-row>
        <el-table  ref="multipleTable" :data="tableDatas" :span-method="objectSpanMethod" border  :height="tableHeight" empty-text="没有数据了，请返回上一步重新选择!">
			<el-table-column prop="type" label="类型" width="200">
				<template slot-scope="scope">外来人员查询</template>
			</el-table-column>
			<el-table-column prop="a0101" label="姓名" ></el-table-column>
            <el-table-column prop="a0111A" label="籍贯" width="250"  align="center"  show-overflow-tooltip></el-table-column>
            <el-table-column prop="e10040" label="现职单位及职务"  align="center" show-overflow-tooltip></el-table-column>
        	<el-table-column  label="操作" width="120" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)" circle></el-button>
                </template>
           </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: 'EditPersonnelFiles',//选择档案(多选)--查借阅申请
	    props:[
	    	'defaultTables',//选中的数据
	    	'mainHeight'//main标签高度
	    ],
	    components:{},
        data() {
            return {
                tableDatas: [],//表格数据
                position: 0,
                spanArr: [],
                tableHeight:''
            }
        },
        created() {
			
        },
        mounted(){
			
        },
        computed: {

        },
        watch:{
        	/**
        	 * 监听 defaultTables 参数值
        	 */
        	defaultTables(newVal,oldVal){
      			this.tableDatas = [...newVal];//改变数组在内存中的引用指向
      			this.rowspan();
        	},        	
        	/**
        	 * 监听 defaultTables 参数值
        	 */
        	tableDatas(newVal,oldVal){
        		this.tableHeight = this.mainHeight- 102;
        	}
        },
        methods: {
        	/*
        	 * 行数据处理
        	 */
			rowspan() {
				let self = this;
				this.position = 0;
				this.spanArr = [];
				this.tableDatas.forEach((item, index) => {
					if(index === 0) {
						self.spanArr.push(1);
						self.position = 0;
					} else {
						if(self.tableDatas[index].type === self.tableDatas[index - 1].type) {
							self.spanArr[self.position] += 1;
							self.spanArr.push(0);
						} else {
							self.spanArr.push(1);
							self.position = index;
						}
					}
				})
			},
			//表格合并行
			objectSpanMethod({row,column,rowIndex,columnIndex}) { 
				if(columnIndex === 0) {
					const _row = this.spanArr[rowIndex];
					const _col = _row > 0 ? 1 : 0;
					return {
						rowspan: _row,
						colspan: _col
					}
				}
				else{
					const _row = this.spanArr[rowIndex];
					const _col = _row > 0 ? 1 : 0;
					return {
						rowspan: 1,
						colspan: 1
					}
				}
			},
        	/**
        	 * 删除选中项
        	 * @param {Number} index 选中项序号
        	 * @param {Object} rows 选中项数据
        	 */
        	handleDelete(index,rows) {
		    	this.tableDatas.splice(index,1);
		    	this.rowspan();
		    },
		    /**
		     * 上一步
		     */
		    prevStep(){
		    	//值传回给父组件
            	this.$emit('changeStep',1);
		    },
		    /**
		     * 下一步
		     */
		    nextStep(){
		    	//值传回给父组件
            	this.$emit('changeStep',3,this.tableDatas);
		    }
        }
    }

</script>
<style  lang="scss" scoped type="text/css">
    .editPersonnelFiles{
        width: 100%;
        .el-table{
        	margin-top: 30px;
        }
    }

</style>
