<template>
<!-- 知识库-浏览 -->
    <div class="knowBrowse-container">
            <el-row :gutter="24">
                <h4>车间里进来撒</h4>
            </el-row>
            <el-row>
                <div class="title">SaaS</div>
                <div id="content" name="content"></div>
            </el-row>
            <el-row :gutter="24" v-if="isEnclosure">
                <div class="enclosure"></div>
            </el-row>
    </div>
</template>

<script>

export default {
    name:"knowBrowseContainer",
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props:[""],

    data() {
        return {
            isEnclosure: false,//是否有附件
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
.knowBrowse-container{
    width: 100%;
    height: 100%;
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
    .enclosure{ width:100%; padding:15px; border-top: 1px solid #ccc;}
}
    
</style>