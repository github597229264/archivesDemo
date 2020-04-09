<template>
	<div class="hxTable">
		<!-- 表格 -->
		<el-table v-loading="options.loading" highlight-current-row :height="options.maxHeight" :data="dataSource" :stripe="options.stripe" :border="options.border" @row-click="handleRowClick" @selection-change="handleSelectionChange" header-row-class-name="table-header-row" :row-class-name="tableRowClassName">
			
			<!--selection选择框-->
			<el-table-column v-if="options.mutiSelect" type="selection" style="width:50px" align="center"></el-table-column>

			<!--序号-->
			<el-table-column v-if="options.index" label="序号" type="index" width="50" align="center"></el-table-column>

			<!--数据列-->
			<template v-for="(column, index) in columns">
				<el-table-column :key="index" :prop="column.prop" :label="column.label" :align="column.align||'center'" :width="column.width" :fixed="column.fixed" :show-overflow-tooltip="column.showOverflowTooltip">
					<template slot-scope="scope">
						<template v-if="!column.render">{{scope.row[column.prop]}}</template>

						<!-- render -->
						<template v-else>
							<RenderDom :row="scope.row" :index="index" :render="column.render" />
						</template>

						<!-- render button -->
						<template v-if="column.button">
							<template v-if="column.tableAction" slot-scope="scope">
								<slot name="tableAction" :data="scope.row[column.prop]"></slot>
							</template>
							<template v-for="(btn, i) in column.group">
								<el-button :key="i" :type="btn.type" width="80" :size="btn.size || 'mini'" :icon="btn.icon" :disabled="scope.row.disabled&&btn.disabled" :plain="btn.plain" @click.stop="btn.onClick(scope.row, scope.$index)" v-if="!scope.row.oprationValue">{{btn.name}}</el-button>
								<el-button :key="i" :type="btn.type" width="80" :size="btn.size || 'mini'" :icon="btn.icon" :disabled="btn.disabled" :plain="btn.plain" @click.stop="btn.onClick(scope.row, scope.$index)" v-else>查看</el-button>
							</template>
						</template>
						
					</template>
				</el-table-column>
			</template>
		</el-table>

		<!-- 分页 -->
		<!--<el-pagination v-if="pagination" :total="pagination.total" :page-sizes="[20, 50, 100, 500, 5000]" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleIndexChange" style="margin-top: 20px;text-align: right"></el-pagination>-->
		<pagination v-if="pageObj||''" :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning" style="margin-top: 20px;text-align: right;margin-bottom: 0px;"></pagination>
	</div>
</template>

<script>
	import pagination from './Pagination.vue';
	
	export default {
		components: {
			pagination,
			RenderDom: {
				functional: true, // 函数式组件 - 无 data 和 this 上下文 => better render
				props: {
					row: Object,
					index: Number,
					render: Function
				},
				/**
				 * @param {Function} createElement - 原生创建dom元素的方法， 弃用，推荐使用 jsx
				 * @param {Object} ctx - 渲染的节点的this对象
				 * @argument 传递参数 row index
				 */
				render(createElement, ctx) {
					const {
						row,
						index
					} = ctx.props;
					return ctx.props.render(row, index);
				}
			}
		},
		props: {
			dataSource: Array, //数据源
			columns: Array, //表头
			options: Object, // 表格参数控制 maxHeight、stripe 等等...
			fetch: Function, // 获取数据的函数
			pageObj: Object, // 分页，不传则不显示
		},
		created() {
			// 传入的options覆盖默认设置
			this.$parent.options = Object.assign({
					maxHeight: 500,
					stripe: false, // 是否为斑马纹
					border: true
				},
				this.options
			);
			this.options.initTable && this.fetch();
		},
		methods: {
			tableRowClassName ({row, rowIndex}) { // 把每一行的索引放进row
			    row.index = rowIndex;
			},
			handleCurrentChange(val) { // 分页导航
				this.pageObj.pageIndex = val;
				this.fetch();
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.fetch();
			},
			handleSelectionChange(selection) {
				//表格多选
				this.$emit("selection-change", selection);
			},
			handleRowClick(row, event, column) {
				//点击当前行事件
				this.$emit("row-click", row, event, column);
			},
		}
	};
</script>

<style lang="scss">
	.el-pagination{
		margin-bottom: 0px !important;
	}
	.el-table__body tr.current-row>td {
	        background: #DCEBFA !important;
	        color:#606266;
	}
</style>