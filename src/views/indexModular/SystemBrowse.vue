<template>
<!-- 系统通知-浏览 -->
    <div class="browse-container">
       <div>
            <el-row :gutter="24">
                <h4>{{browseItem.title}}</h4>
            </el-row>
            <el-row>
                <div class="title">{{browseItem.comments}}</div>
                <div id="content" v-html="browseItem.content"></div>
            </el-row>
        </div>
    </div>
</template>

<script>

export default {
    name:"browseContainer",
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props:["selectItem","selectObj","isCheck"],

    data() {
        return {
            browseItem:{}, //浏览数据
        };
    },

    //监听属性 类似于data概念
    computed: {},

    //监控data中的数据变化
    watch: {},

    //方法集合
    methods: {

    },

    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        // false浏览、true详细
        if(this.isCheck){
            this.browseItem = this.selectObj;
        }else{
            this.browseItem = this.selectItem;
        }
    },

    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },

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
    #content /deep/ img {
        display: block;
        width:80%;
    }
    .browse-container{
        width:100%;
        height: 100%;
        min-height: 380px;
        h4{
            text-align: center;
            font-size: 18px;
            color: #333;
            margin: 10px 0px;
        }
        .title{ margin:15px;}
        #content{
            color: #666;
            width: 100%;
            text-indent: 20px;
            margin-bottom: 30px;
            
        }
    }
    
</style>