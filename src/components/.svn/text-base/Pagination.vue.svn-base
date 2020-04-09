<template>
  <div>
       <div class="block">
       		  <el-pagination v-if="isSmall"
            	small
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total,prev, pager, next"
            :page-sizes="1000"
             :total="pageObj.total"></el-pagination>
            <el-pagination v-else
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10, 20, 50, 100]"
            :current-page="pageObj.pageIndex"
            :page-size="pageObj.pageSize"
             :total="pageObj.total">
            </el-pagination>
        </div>
  </div>
</template>
<script>
  export default {
  	name:'pagination',//分页组件
  	props:['pageIndex','pageSize','total','isTotal','enableSmall'],
    data() {
      return {
  			isSmall:this.enableSmall || false,//是否启用small模式
      	pageObj:{
	        pageIndex:this.pageIndex*1+1,//当前页下标
	        pageSize:this.pageSize*1,//页大小
	        total:this.total*1//数据总条数
	      },
	    }
    },
    methods: {
    	/*
    	 * pageSize 改变时会触发
    	 */
      handleSizeChange(page_size) {
        this.pageObj.pageSize = page_size;
        this.pageObj.pageIndex = 1;
        //值传回给父组件
        this.$emit('PageTurning',{
        	page_index:this.pageObj.pageIndex*1-1,//当前页下标
        	page_size:this.pageObj.pageSize//页大小
        });
      },
      /*
       * currentPage 改变时会触发
       */
      handleCurrentChange(curr_page) {
        this.pageObj.pageIndex = curr_page;
         //值传回给父组件
        this.$emit('PageTurning',{
        	page_index:this.pageObj.pageIndex*1-1,
        	page_size:this.pageObj.pageSize
        });
      }
    },
    watch:{
        /**
         * 监听页大小
         */
        pageSize:{
        		deep:true,
            handler:function(currVal,prevVal){
                this.pageObj.pageSize = currVal;
            }
        },
        /**
         * 监听总页数
         */
        total:{ 
            deep:true,
            handler:function(currVal,prevVal){
                this.pageObj.total = currVal;
            }
        },
        /**
         * 监听当前页在下标
         */
        pageIndex:{
        	  deep:true,
            handler:function(currVal,prevVal){
                this.pageObj.pageIndex = currVal*1+1;
            }
        }
    }
  }
</script>