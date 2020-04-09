<template>
	<div class="archives-digital-audit-container">
		<!--表格-->
		<el-table class="digital-audit_table" v-if="digitalAuditList.length > 0" :data="digitalAuditList" height="400px" border style="width: 100%;">
			<el-table-column label="序号" align="center" width="60">
				<template slot-scope="scope"> {{scope.$index+1}} </template>
			</el-table-column>
			<el-table-column prop="scoringitemsandstandards" label="评分项目及标准">
			</el-table-column>
			<el-table-column prop="scoringmethod" label="评分方法" align="center" width="150">
			</el-table-column>
			<el-table-column prop="existingproblems" label="存在问题" width="200" align="center">
				<template slot-scope="scope">
					<el-input v-model="scope.row.existingproblems"></el-input>
				</template>
			</el-table-column>
			<el-table-column prop="totalscore" label="分值" align="center" width="80">
			</el-table-column>
			<el-table-column prop="points" label="扣分" align="center" width="150">
				<template slot-scope="scope">
					<el-input-number width="80" class="points" :max="scope.row.totalscore" ref="numbox" v-model="scope.row.points" controls-position="right" @input="handleChange(scope.row)" :value='0' :min="0"></el-input-number>
				</template>
			</el-table-column>
			<el-table-column prop="score" id="tb-score" align="center" label="得分" width="150">
				<template slot-scope="scope">
					<el-input-number width="80" class="score" :max="scope.row.totalscore" ref="numscore" v-model="scope.row.score" controls-position="right" @input="handleChange1(scope.row)" :min="0"></el-input-number>
				</template>
			</el-table-column>
		</el-table>
		<!--操作按钮-->
		<div class="opration">
			<el-button type="primary" @click="save">保存</el-button>
			<el-button type="danger" @click="cancle">取消</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "ArchivesDigitalAudit", //数字审核
		props: ['id', 'type'],
		data() {
			return {
				digitalAuditList: [], //数字审核集合
				existingproblems: "", //存在问题
				points: "0", //扣分
				score: "0", //得分
				selectDigital: "", //操作的某一行数据
				numMax: "", //最大值
				firstFlag: true,
			}
		},
		created() {
			console.log(this.id);
			this.getData();
		},
		
		mounted(){
			console.log(this.digitalAuditList);
		},
		methods: {
			getData() { //获取数字档案信息
				let idStr = String(this.id);
				this.$axios({
					method: 'get',
					url: this.API.entityorelectronicfilesbutton,
					params: {
						'id': idStr,
						'ty': this.type
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.digitalAuditList = resData.data;
						this.points = 0;
						this.score = 0;
						this.digitalAuditList.forEach(item => {
							if(item.score == "") item.score = "0";
						})
					} else {
						this.$message({
							type: 'error',
							message: '获取数据失败，请刷新重试！'
						});
					}
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
			},
			save() { //保存
				let obj = {};
				obj.id = this.id;
				obj.ty = this.type;
				let newList = [];
				this.digitalAuditList.forEach(item => {
					let newObj = {};
					//					newObj.archtype = item.archtype;
					//					newObj.scoringitemsandstandards = item.scoringitemsandstandards;
					//					newObj.scoringmethod = item.scoringmethod;
					newObj.existingproblems = item.existingproblems;
					newObj.standardscore = item.totalscore;
					newObj.points = item.points;
					newObj.score = item.score;
					newObj.gradingstandardid = item.gradingstandardid;
					newObj.id = item.id;
					newList.push(newObj);
				})
				obj.lists = newList;

				let str = JSON.stringify(obj);
				this.$axios({
					method: 'post',
					url: this.API.filereviewsave,
					data: {
						/*						'id': this.id,
												' existingproblems':this. existingproblems,
												'points ':this.points ,
												'score':this.score*/
						//						'list': this.digitalAuditList
						//TODO:
						'str': str
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.$message({
							message: '保存成功！',
							type: 'success'
						});
						this.$emit("digitalBack", "");
					} else {
						this.$message({
							type: 'error',
							message: '保存失败，请刷新重试！'
						});
					}
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
			},
			cancle() { //取消
				this.$emit("digitalBack", "");
			},
			handleChange(row) { //扣分
				row.score = row.totalscore - row.points;
			},
			handleChange1(row) { //得分
				row.points = row.totalscore - row.score;
			},

		}
	}
</script>

<style lang="scss" scoped>
	.archives-digital-audit-container {
		.opration {
			text-align: center;
			margin-top: 10px;
		}
	}
</style>