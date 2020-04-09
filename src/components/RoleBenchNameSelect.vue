<template>
    <div class="roleBench-name-Select">
        <el-select v-model="chioceId" clearable @change="changeChioceId">
			<el-option v-for="item in dataList" :key="item.id" :label="item.name" :value="item.id" >
			</el-option>
		</el-select>
    </div>
</template>

<script>
import bus from '../common/bus';

export default {
    name:"roleBenchNameSelect",  //角色工作台下拉框
    components: {},
    props:["chioceOptionId"], //选中状态的id

    data() {
        return {
            dataList:[], //下拉框数据
            chioceId:'' //选中的id
        };
    },

    //监听属性 类似于data概念
    computed: {},

    //监控data中的数据变化
    watch: { },

    //方法集合
    methods: {
        /*
        * 监听下拉框change事件
        * @param {String} id 选中项的id
        */
        changeChioceId(newV){
            this.chioceId = newV;
            this.$emit('roleBenEditCall', newV);
        },
        /**
         * 获取列表数据
         */
        getData(){ 
            this.$axios({
                loading: {
                    isShow: false
                },
                method: 'get',
                url: this.API.getPowerWorkbenchList,
                params: {}
                }).then((res) => {
                var resData = res.data;
                if (resData.code == "1") {
                    this.dataList = resData.data;
                    if(this.chioceOptionId){
                        this.chioceId = this.chioceOptionId;
                        this.$emit('roleBenEditCall', this.chioceId);
                    }else{
                        this.chioceId = resData.data[0].id;
                        this.$emit('roleBenEditCall', this.chioceId);
                    }
                } else {
                    this.$message({
                        type: 'error',
                        message: '获取工作台下拉框数据失败，请刷新重试！'
                    });
                }
            }).catch((err) => {
                console.log("获取工作台下拉框数据=" + err);
                this.$message({
                    type: 'error',
                    message: '请求异常，请检查网络！'
                });
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
    .roleBench-name-Select{
        .el-select{ width: 100%;}
    }
</style>