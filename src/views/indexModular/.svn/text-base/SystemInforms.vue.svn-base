<template>
    <div class="systemInforms ledgerModual">
        <!-- 首页-系统通知 -->
        <div >
			<div class="head">
				<h4>系统通知</h4>
				<span @click="moreFuc">更多>></span>
			</div>
			<div class="main" v-if='InformsList.length>0'>
				<div class="item-container"  v-for="item,index in InformsList">
					<span class="num-span">{{index + 1}}</span>
					<span class="name-span">{{item.title}}</span>
					<span class="write-span" @click="browseInforms(item)">详情</span>
				</div>
			</div>
			<div class="no-data" v-else>
				暂无数据
			</div>
		</div>
        <!-- 更多弹窗 -->
        <el-dialog title="系统通知" width="60%" :visible.sync="informs_show" v-if='informs_show' :close-on-click-modal="false" append-to-body>
            <informs :isCheck="isCheck"></informs>
		</el-dialog>
        <!-- 详情弹窗 -->
        <el-dialog title="系统通知" width="60%" :visible.sync="detailed_show" v-if='detailed_show' :close-on-click-modal="false" append-to-body>
            <browse :isCheck="isCheck" :selectObj="selectObj"></browse>
        </el-dialog>
    </div>
</template>

<script>
import informs from './Informs';//系统通知弹窗
import browse from './SystemBrowse';//详情弹窗

export default {
    name:"systemInforms",
    components: {
        informs,
        browse
    },
    props:[""],

    data() {
        return {
            InformsList: [], //系统通知列表
            informs_show: false, //系统设置弹窗
            detailed_show: false,//详细弹窗
            selectObj: "", //选中的列表项
            isCheck: false, //false为浏览，true为详情
        };
    },

    //监听属性 类似于data概念
    computed: {},

    //监控data中的数据变化
    watch: { },

    //方法集合
    methods: {
        //分页组件回调方法
        PageTurning(page_obj) {
            this.pageObj.pageIndex = page_obj.page_index;
            this.pageObj.pageSize = page_obj.page_size;
            this.getData(); 
        },
        // 更多
        moreFuc(){ 
            this.isCheck = false;
            this.informs_show = true
        }, 
        // 详情
        browseInforms(item){
            this.isCheck = true;
            this.selectObj = item;
            this.detailed_show = true;
        },
        getData(){
            this.$axios({
                method: 'get',
                url: this.API.querySysSysMessage,
                params:{
                    pageIndex: 0,
                    pageSize: 5,
                    title:'',
                    ispublic: 1
                },
            }).then( (res) => {
                let resData = res.data;
                // console.log(resData.data);
                if(resData.code == '1'){
                    this.InformsList = resData.data.list;
                    this.pageObj.total = resData.data.list.total;
                }else{
                    this.$message({
                        type:'error',
                        message:'获取失败，请刷新重试！'
                    })
                }
            }).catch( (err) => {
                this.$message({
                    type:'error',
					message: '请求异常，请检查网络！'
                })
            })
        }
    },

    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getData();
    },

    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},

    beforeCreate() {}, //生命周期 - 创建之前

    beforeMount() {}, //生命周期 - 挂载之前

    beforeUpdate() {}, //生命周期 - 更新之前

    updated() {}, //生命周期 - 更新之后

    beforeDestroy() {}, //生命周期 - 销毁之前

    destroyed() {}, //生命周期 - 销毁完成

    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发

}

</script>

<style lang="scss" scoped>
.ledgerModual {
	margin-top: 10px;
    width: 49.5%;
    height: 350px;
    background: #fff;
    @media screen and (max-width:1366px){
   		width:100%;
	}
    .head {
        height: 40px;
        line-height: 40px;
        background-color: #f5f5f5;
        border-bottom: 1px solid #ccc;
        h4 {
            padding-left: 15px;
            font-size: 16px;
        }
    }
    .main {
        height: 300px;
        padding: 0 10px;
        .el-tabs {
            height: 300px;
            span {
                margin-left: 20px;
            }
        }
        .el-tabs__nav-scroll {
            float: right !important;
        }
        .span-text {
            font-size: 14px;
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            .yellowText {
                color: #ffab41;
                margin: 0;
                padding: 0;
                font-weight: bold;
            }
        }
    }
    .no-data{
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
.systemInforms {
    margin-top: 10px;
    width: 49.5%;
    height: 350px;
    background: #fff;
    @media screen and (max-width:1366px){
	   		width:100%;
		}
    .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
            display: block;
            width: 60px;
            cursor: pointer;
        }
    }
    .item-container {
        border-bottom: 1px solid #EFEFEF;
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
            font-size: 14px;
        }
        .num-span {
            display: block;
            background: #51B6E4;
            width: 24px;
            height: 24px;
            color: white;
            text-align: center;
            line-height: 24px;
            margin: 0 10px;
        }
        .name-span {
            width: 83%;
        }
        .write-span {
            color: #3094C4;
            display: block;
            width: 50px;
            text-align: left;
        }
        .write-span:hover {
            color: #ffab41;
            cursor: pointer;
        }
        .yellow-bac {
            background: #F19A2D;
        }
    }
    .item-container:nth-child(4) {
        .num-span {
            background: #F19A2D;
        }
    }
    .item-container:nth-child(5) {
        border: none;
        .num-span {
            background: #F19A2D;
        }
    }
}
</style>