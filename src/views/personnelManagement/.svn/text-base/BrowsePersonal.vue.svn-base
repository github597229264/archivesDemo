<template>
	<el-tabs v-model="activeName" @tab-click="handleClick">
		<el-tab-pane label="干部任免审批" name="first" v-if="firstShow">
			<div v-if="hasApproval" style="height:82vh;overflow: auto;">
				<div class="container">
					<div class="title">干部任免审批表</div>
					<table class="basicInformatiion" border="1">
						<tbody>
							<tr>
								<td width="100">
									姓名
								</td>
								<td width="110">
									{{removalApprovalData.pname}}
								</td>
								<td width="100">
									性别
								</td>
								<td width="110" v-if="removalApprovalData.psex=='1'">
									男
								</td>
								<td width="110" v-else-if="removalApprovalData.psex=='2'">
									女
								</td>
								<td width="110" v-else>
									
								</td>
								<td width="120">
									出生日期
								</td>
								<td width="120">
									{{removalApprovalData.birthDate}}
								</td>
								<td rowspan="4">
									<div v-if="removalApprovalData.photo">
										<img width="130" height="170" :src="removalApprovalData.photo" />
									</div>
									<div v-else>
										<div v-if="removalApprovalData.psex=='2'">
											<img width="130" height="170" src="../../assets/img/DefaultHeadFemale.jpg" />
										</div>
										<div v-else-if="removalApprovalData.psex=='1'">
											<img width="130" height="170" src="../../assets/img/DefaultHeadMale.jpg" />
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									民族
								</td>
								<td>
									{{removalApprovalData.nation}}
								</td>
								<td>
									籍贯
								</td>
								<td>
									{{removalApprovalData.nationplace}}
								</td>
								<td>
									出生地
								</td>
								<td>
									{{removalApprovalData.homeplace}}
								</td>

							</tr>
							<tr>
								<td>
									入党时间
								</td>
								<td>
									{{removalApprovalData.partydate}}
								</td>
								<td>
									参加工作<br/>时间
								</td>
								<td>
									{{removalApprovalData.jobdate}}
								</td>
								<td>
									健康状况
								</td>
								<td>
									{{removalApprovalData.jkzk}}
								</td>
							</tr>
							<tr>
								<td>
									专业技术<br/>职务
								</td>
								<td colspan="2">
									{{removalApprovalData.skillTech}}
								</td>
								<td>
									熟悉专业<br/>有何专长
								</td>
								<td colspan="2">
									{{removalApprovalData.skill}}
								</td>
							</tr>
							<tr>
								<td rowspan="2">
									学历学位
								</td>
								<td>
									全日制教育
								</td>
								<td colspan="2">
									{{removalApprovalData.fullbachelor}}
								</td>
								<td>
									毕业院校系<br/>及专业
								</td>
								<td colspan="3">
									{{removalApprovalData.fullschool}}
								</td>
							</tr>
							<tr>
								<td>
									在职教育
								</td>
								<td colspan="2">
									{{removalApprovalData.onjobbachelor}}
								</td>
								<td>
									毕业院校系<br/>及专业
								</td>
								<td colspan="3">
									{{removalApprovalData.onjobschool}}
								</td>
							</tr>
							<tr>
								<td colspan="2">
									现任职务
								</td>
								<td colspan="5">
									{{removalApprovalData.presentoccupation}}
								</td>
							</tr>
							<tr>
								<td colspan="2">
									拟任职务
								</td>
								<td colspan="5">
									{{removalApprovalData.designatedposition}}
								</td>
							</tr>
							<tr>
								<td colspan="2">
									拟 免 职 务
								</td>
								<td colspan="5">
									{{removalApprovalData.tofreepost}}
								</td>
							</tr>
							<tr >
								<td rowspan="3">
									简<br/>历
								</td>
								<td colspan="6" style="height:716px;overflow: auto;">
									<table class="second-table">
										<tbody>
											<tr v-for="item in removalApprovalData.resumeinformation">
												<td width="175">{{item.A1703}}--{{item.A1704}}</td>
												<td>{{item.A1701}}</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<hr />
				<div class="container">
					<table class="basicInformatiion" border="1">
						<tbody>
							<tr style="height:100px">
								<td width="58">奖<br/>惩<br/>情<br/>况</td>
								<td colspan="7">{{removalApprovalData.rewardsandpunishment}}</td>
							</tr>
							<tr style="height:100px">
								<td width="58">年核<br/>度结<br/>考果<br/></td>
								<td colspan="7">{{removalApprovalData.annualappraisalresults}}</td>
							</tr>
							<tr style="height:100px">
								<td width="58">任<br/>免<br/>理<br/>由</td>
								<td colspan="7">{{removalApprovalData.reason}}</td>
							</tr>
							<tr>
								<td :rowspan="currRowSpan" colspan="1">家<br/>庭<br/>主<br/>要<br/>成<br/>员<br/>及<br/>重<br/>要<br/>社<br/>会<br/>关<br/>系</td>
								<td>称谓</td>
								<td>姓名</td>
								<td>年龄</td>
								<td width="100">政治面貌</td>
								<td colspan="3">工作单位及职务</td>
							</tr>
							<tr v-for="item in socialArr">
								<td>{{item.A3604A}}</td>
								<td>{{item.A3601}}</td>
								<td>{{item.age}}</td>
								<td>{{item.ZZMM}}</td>
								<td colspan="3">{{item.A3611}}</td>
							</tr>

							<tr style="height:138px">
								<td width="58">呈<br/>报<br/>单<br/>位</td>
								<td colspan="7">{{removalApprovalData.reportunit}}</td>
							</tr>
							<tr style="height:297px">
								<td width="58">审意<br/>批<br/>机<br/>关见</td>
								<td colspan="3">
									<table width="100%">
										<tbody>
											<tr style="height:239px">
												<td>{{removalApprovalData.approvalopinion}}</td>
											</tr>
											<tr>
												<td style="text-align:right;">日期</td>
												<td width='150'>{{removalApprovalData.approvaldate}}</td>
											</tr>
										</tbody>
									</table>
								</td>
								<td width="58">行任<br/>政免<br/>机意<br/>关见</td>
								<td colspan="3">
									<table width="100%">
										<tbody>
											<tr style="height:239px">
												<td>{{removalApprovalData.administrativeorganopinion}}</td>
											</tr>
											<tr>
												<td style="text-align:right;">日期</td>
												<td width='150'>{{removalApprovalData.administrativeorgandate}}</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div v-else style="height:80vh;position: relative;">
				<div class="div-none">没有最新的干部任免信息</div>
			</div>
		</el-tab-pane>
		<el-tab-pane label="干部人事档案目录" name="second">
			<div class="container-second">
				<zk-table ref="multipleTable" :data="data" sum-text="sum" index-text="#" :columns="columns" :stripe="props.stripe" :border="props.border" :show-header="props.showHeader" :show-summary="props.showSummary" :show-row-hover="props.showRowHover" :show-index="props.showIndex" :tree-type="props.treeType" :is-fold="props.isFold" :expand-type="props.expandType" :selection-type="props.selectionType" empty-text="该人员没有档案信息" max-height="490px">

				</zk-table>
			</div>
		</el-tab-pane>
		<el-tab-pane label="干部信息采集" name="third">
			<div class="collection-container">
				<div class="left-tab">
					<el-row class="tac">
						<el-col :span="24">
							<el-menu default-active="1" class="el-menu-vertical-demo" >
								<!--@open="handleOpen" @close="handleClose"-->
								<a href="#basic-Personnel-Information" style="text-decoration: none;">
									<el-menu-item index="1">
										<span slot="title">人员基本信息</span>
									</el-menu-item>
								</a>
								<a href="#job-information" style="text-decoration: none;">
									<el-menu-item index="2">
										<span slot="title">职务信息</span>
									</el-menu-item>
								</a>
								<a href="#resume" style="text-decoration: none;">
									<el-menu-item index="3">
										<span slot="title">简历</span>
									</el-menu-item>
								</a>
								<a href="#Family-and-social" style="text-decoration: none;">
									<el-menu-item index="4">
										<span slot="title">家庭成员及社会关系</span>
									</el-menu-item>
								</a>
								<a href="#education" style="text-decoration: none;">
									<el-menu-item index="5">
										<span slot="title">学历</span>
									</el-menu-item>
								</a>
								<a href="#job-change" style="text-decoration: none;">
									<el-menu-item index="6">
										<span slot="title">职务变动</span>
									</el-menu-item>
								</a>
								<a href="#annual-assessment" style="text-decoration: none;">
									<el-menu-item index="7">
										<span slot="title">年度考核</span>
									</el-menu-item>
								</a>
							</el-menu>
						</el-col>
					</el-row>
				</div>
				<div class="right-main">
					<div id="basic-Personnel-Information" class="container">
						<div class="title">人员基本信息</div>
						<table class="basicInformatiion" border='1'>
							<tbody>
								<tr class="name-tr">
									<td class="name-td">
										<span class="must-fill">*</span> 姓名
									</td>
									<td class="name-td-fill" style="width:150px">
										{{basicInformationFrom.a0101}}
									</td>
									<td class="name-td">
										性别
									</td>
									<td class="name-td-fill">
										<div v-if="basicInformationFrom.a0104 == '1'">男</div>
										<div v-else-if="basicInformationFrom.a0104 == '2'">女</div>
									</td>
									<td class="name-td">
										出生日期
									</td>
									<td class="name-td-fill">
										{{basicInformationFrom.a0107}}
									</td>
									<td class="photo-img" rowspan="4" colspan="2">
										<!--<img src="" alt="" />-->
										<div v-if="basicInformationFrom.a0191a">
											<img width="120" height="160" :src="basicInformationFrom.pic" />
										</div>
										<div v-else>
											<div v-if="basicInformationFrom.a0104=='2'">
												<img width="120" height="160" src="../../assets/img/DefaultHeadFemale.jpg" />
											</div>
											<div v-else-if="basicInformationFrom.a0104=='1'">
												<img width="120" height="160" src="../../assets/img/DefaultHeadMale.jpg" />
											</div>
										</div>
									</td>
								</tr>
								<tr class="name-tr">
									<td class="name-td">
										民族
									</td>
									<td class="name-td-fill">
										{{basicInformationFrom.mz}}
									</td>
									<td class="name-td">
										籍贯
									</td>
									<td class="name-td-fill">
										{{basicInformationFrom.a0111a}}
									</td>
									<td class="name-td">
										出生地
									</td>
									<td class="name-td-fill">
										{{basicInformationFrom.a0114a}}
									</td>
								</tr>
								<tr class="name-tr">
									<td class="name-td">
										政治面貌
									</td>
									<td class="name-td-fill">
										{{basicInformationFrom.zzmm}}
									</td>
									<td class="name-td">
										婚姻状况
									</td>
									<td class="name-td-fill">
										{{basicInformationFrom.hy}}
									</td>
									<td class="name-td">
										参加组织<br/>时间
									</td>
									<td class="name-td-fill">
										{{basicInformationFrom.a0144}}
									</td>
								</tr>
								<tr class="name-tr">
									<td class="name-td">
										现任单位<br/>及职务
									</td>
									<td class="name-td-fill" colspan="5">
										{{basicInformationFrom.e10040}}
									</td>
								</tr>
								<tr class="name-tr">
									<td class="name-td">
										证件类型
									</td>
									<td class="name-td-fill">
										{{basicInformationFrom.zjlb}}
									</td>
									<td class="name-td">
										证件号码
									</td>
									<td class="name-td-fill" colspan="5">
										{{basicInformationFrom.a0184}}
									</td>
								</tr>
								<tr class="name-tr">
									<td class="name-td">
										文化程度
									</td>
									<td class="name-td-fill">
										{{basicInformationFrom.e1001}}
									</td>
									<td class="name-td">
										个人身份
									</td>
									<td class="name-td-fill" colspan="2">
										{{basicInformationFrom.grsf}}
									</td>
									<td class="name-td">
										毕业时间
									</td>
									<td class="name-td-fill" colspan="2">
										{{basicInformationFrom.e1003}}
									</td>
								</tr>
								<tr class="name-tr">
									<td class="name-td">
										人员类别
									</td>
									<td class="name-td-fill">
										{{basicInformationFrom.rylb}}
									</td>
									<td class="name-td">
										现职时间
									</td>
									<td class="name-td-fill" colspan="2">
										{{basicInformationFrom.e1004}}
									</td>
									<td class="name-td">
										参加工作时间
									</td>
									<td class="name-td-fill" colspan="2">
										{{basicInformationFrom.a0134}}
									</td>
								</tr>
								<tr class="name-tr education-box">
									<td class="name-td">
										学历学位
									</td>
									<td class="name-td">
										<div class="name-td-div education-type">
											全日制教育
										</div>
										<div class="name-td-div education-type noBorder">
											在职教育
										</div>
									</td>
									<td class="name-td-fill" colspan="2">
										<div class="name-td-fill-div education-type nopadding">
											<div style="border:1px dashed #ccc;height:50px;box-sizing: border-box;display: flex;padding:0 5px">
												{{basicInformationFrom.e1005}}
											</div>
											<div style="border:1px dashed #ccc;height:50px;box-sizing: border-box;display: flex;padding:0 5px">
												{{basicInformationFrom.e10050}}
											</div>
										</div>
										<div class="name-td-fill-div education-type nopadding">
											<div style="border:1px dashed #ccc;height:50px;box-sizing: border-box;display: flex;padding:0 5px">
												{{basicInformationFrom.e1007}}
											</div>
											<div style="border:1px dashed #ccc;height:50px;box-sizing: border-box;display: flex;padding:0 5px">
												{{basicInformationFrom.e10070}}
											</div>
										</div>
									</td>
									<td class="name-td">
										<div class="name-td-div education-type">
											毕业院校系及专业
										</div>
										<div class="name-td-div education-type noBorder">
											毕业院校系及专业
										</div>
									</td>
									<td class="name-td-fill" colspan="3">
										<div class="name-td-fill-div education-type nopadding">
											<div style="border:1px dashed #ccc;height:50px;box-sizing: border-box;display: flex;padding:0 5px">
												{{basicInformationFrom.e10051}}
											</div>
											<div style="border:1px dashed #ccc;height:50px;box-sizing: border-box;display: flex;padding:0 5px">
												{{basicInformationFrom.e1006}}
											</div>
										</div>
										<div class="name-td-fill-div education-type nopadding">
											<div style="border:1px dashed #ccc;height:50px;box-sizing: border-box;display: flex;padding:0 5px">
												{{basicInformationFrom.e10071}}
											</div>
											<div style="border:1px dashed #ccc;height:50px;box-sizing: border-box;display: flex;padding:0 5px">
												{{basicInformationFrom.e1008}}
											</div>
										</div>
									</td>
								</tr>
								<tr class="name-tr">
									<td class="name-td" colspan="2">
										干部档案遗留问题或<br/>需要说明的情况
									</td>
									<td class="name-td-fill" colspan="6">
										{{basicInformationFrom.e10.e1009}}
									</td>
								</tr>
								<tr class="name-tr">
									<td class="name-td" colspan="2">
										其他需要说明的事项内容
									</td>
									<td class="name-td-fill" colspan="6">
										{{basicInformationFrom.e10.e1019}}
									</td>
								</tr>
								<tr class="name-tr">
									<td class="name-td">
										档案整理人
									</td>
									<td class="name-td-fill">
										{{basicInformationFrom.e10.e1010}}
									</td>
									<td class="name-td">
										档案审核人
									</td>
									<td class="name-td-fill">
										{{basicInformationFrom.e10.e1011}}
									</td>
									<td class="name-td">
										正本卷数
									</td>
									<td class="name-td-fill">
										{{basicInformationFrom.e10.e1014}}
									</td>
									<td class="name-td">
										副本卷数
										<td class="name-td-fill">
											{{basicInformationFrom.e10.e1014b}}
										</td>
									</td>
								</tr>
								<tr class="name-tr">
									<td class="name-td">
										数字档案<br/>采集人
									</td>
									<td class="name-td-fill">
										{{basicInformationFrom.e10.e1012}}

									</td>
									<td class="name-td">
										数字档案<br/>审核人
									</td>
									<td class="name-td-fill" colspan="2">
										{{basicInformationFrom.e10.e1013}}

									</td>
									<td class="name-td">
										档案报送<br/>单位
									</td>
									<td class="name-td-fill" colspan="3">
										{{basicInformationFrom.e10.e1015}}
									</td>
								</tr>
							</tbody>
						</table>

					</div>
					<div id="job-information" class="container">
						<div class="title">职务信息</div>
						<table class="basicInformatiion " border="1" width="824px">
							<tbody>
								<tr>
									<td>任职机构名称</td>
									<td>任职机构代码</td>
									<td>职务名称</td>
									<td>任职日期</td>
								</tr>
								<tr v-if="jobInformationList.length==0">
									<td colspan="4">暂无数据</td>
								</tr>
								<tr v-for="item in jobInformationList" v-else>
									<td>{{item.a0201a}}</td>
									<td>{{item.a0201b}}</td>
									<td>{{item.a0215a}}</td>
									<td>{{item.a0243}}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div id="resume" class="container">
						<div class="title">简历</div>
						<table class="basicInformatiion " border="1" width="824px">
							<tbody>
								<tr>
									<td>起始时间</td>
									<td>截止时间</td>
									<td width="480">内容</td>
								</tr>
								<tr v-if="resumeList.length==0">
									<td colspan="3">暂无数据</td>
								</tr>
								<tr v-for="item in resumeList" v-else>
									<td>{{item.a1703}}</td>
									<td>{{item.a1704}}</td>
									<td>{{item.a1701}}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div id="Family-and-social" class="container">
						<div class="title">家庭成员及社会关系</div>
						<table class="basicInformatiion " border="1" width="824px">
							<tbody>
								<tr>
									<td>称谓</td>
									<td>姓名</td>
									<td>出生年月</td>
									<td>政治面貌</td>
									<td>工作单位及职务</td>
								</tr>
								<tr v-if="FamilyAndSocialList.length==0">
									<td colspan="5">暂无数据</td>
								</tr>
								<tr v-for="item in FamilyAndSocialList" v-else>
									<td>{{item.a3604a}}</td>
									<td>{{item.a3601}}</td>
									<td>{{item.a3607}}</td>
									<td>{{item.zzmm}}</td>
									<td>{{item.a3611}}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div id="education" class="container">
						<div class="title">学历</div>
						<table class="basicInformatiion " border="1" width="824px">
							<tbody>
								<tr>
									<td>学历名称</td>
									<td>入学时间</td>
									<td>毕业日期</td>
									<td>学制</td>
									<td>学校（单位）名称</td>
								</tr>
								<tr v-if="educationList.length==0">
									<td colspan="5">暂无数据</td>
								</tr>
								<tr v-for="item in educationList" v-else>
									<td>{{item.a0801a}}</td>
									<td>{{item.a0804}}</td>
									<td>{{item.a0807}}</td>
									<td>{{item.xzmc}}</td>
									<td>{{item.a0814}}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div id="job-change" class="container">
						<div class="title">职务变动</div>
						<table class="basicInformatiion " border="1" width="824px">
							<tbody>
								<tr>
									<td width="100">原单位</td>
									<td width="100">新单位</td>
									<td width="100">原职务</td>
									<td width="100">新职务</td>
									<td width="100">原职务级别</td>
									<td width="100">新职务级别</td>
									<td width="100">变动日期</td>
									<td>变动类别</td>
								</tr>
								<tr v-if="jobChangeList.length==0">
									<td colspan="8">暂无数据</td>
								</tr>
								<tr v-for="item in jobChangeList" v-else>
									<td>{{item.a5201a}}</td>
									<td>{{item.a5204a}}</td>
									<td>{{item.a5207a}}</td>
									<td>{{item.a5211a}}</td>
									<td>{{item.yzwlb}}</td>
									<td>{{item.xzwlb}}</td>
									<td>{{item.a5227}}</td>
									<td>{{item.bdlb}}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div id="annual-assessment" class="container">
						<div class="title">年度考核</div>
						<table class="basicInformatiion " border="1" width="824px">
							<tbody>
								<tr>
									<td width="150">从事或分管工作</td>
									<td width="150">现职单位及职务</td>
									<td width="380">个人总结</td>
									<td>备注</td>

								</tr>
								<tr v-if="annualAssessmentList.length==0">
									<td colspan="5">暂无数据</td>
								</tr>
								<tr v-for="item in annualAssessmentList" v-else>
									<td>{{item.positionandworkincharge}}</td>
									<td>{{item.e10040}}</td>
									<td>{{item.personalsummary}}</td>
									<td>{{item.remark}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</el-tab-pane>
		<el-tab-pane label="档案利用情况" name="fourth" v-if="fourthShow2">
			<!--v-if="fourthShow=='hidden'?false:true"-->
			<div class="block">
				<el-timeline>
					<el-timeline-item timestamp="档案" placement="top">
						<el-card style="min-height: 100px;">
							<h4>{{removalApprovalData.pname}}</h4>
							<p v-if="LogQueryList.qty" style="margin-left:80px">创建：{{LogQueryList.qty}}次</p>
							<p style="margin-left:80px">最近：{{LogQueryList.mostrecent}}</p>
							<p style="margin-left:80px">{{LogQueryList.username}}</p>
							<p style="margin-left:80px">{{LogQueryList.organname}}</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item timestamp="在库" placement="top">
						<el-card>
							<h4>在库记录</h4>
							<p style="margin-left:80px">入库：{{WarehousingList.mostRecent}} {{WarehousingList.userName}} {{WarehousingList.organName}}</p>
							<p style="margin-left:80px">查阅（电子）：<span v-if="ElectronicAccessList.Qty">{{ElectronicAccessList.Qty}}次，</span> {{ElectronicAccessList.MostRecent}} {{ElectronicAccessList.UserName}} {{ElectronicAccessList.OrganName}}</p>
							<p style="margin-left:80px">查阅（实物）：<span v-if="PhysicalInspectionList.Qty">{{PhysicalInspectionList.Qty}}次，</span> {{PhysicalInspectionList.MostRecent}} {{PhysicalInspectionList.UserName}} {{PhysicalInspectionList.OrganName}}</p>
							<p style="margin-left:80px">借阅：<span v-if="BorrowingList.Qty">{{BorrowingList.Qty}}次，</span> {{BorrowingList.MostRecent}} {{BorrowingList.UserName}} {{BorrowingList.OrganName}}</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item timestamp="借阅" placement="top">
						<el-card>
							<h4>当前档案查借阅状态</h4>
							<p style="margin-left:80px">数字档案--->>：
								<a href="javascript:;" @click="ArchivesDetail(1)" style="text-decoration: none;color:blue">详情</a>
							</p>
							<p style="margin-left:80px">纸质档案--->>：
								<a href="javascript:;" @click="ArchivesDetail(2)" style="text-decoration: none;color:blue">详情</a>
							</p>
						</el-card>
					</el-timeline-item>
				</el-timeline>
			</div>
			<!--档案详情-->
			<el-dialog width="60%" height="350px" :visible.sync="archives_detail" v-if='archives_detail' :close-on-click-modal="false" append-to-body>
				<ArchivesDetail :selectDeceive="chioceObj" :selectArchtypeId="archtypeId" :selectFlagId="flagId"></ArchivesDetail>
			</el-dialog>
		</el-tab-pane>
	</el-tabs>
</template>

<script>
	import ArchivesDetail from './ArchivesDetail.vue';

	export default {
		name:'BrowsePersonal',
		props: ['selectDeceive','fourthShow','dataType'],
		components: {
			ArchivesDetail, //档案利用情况-当前档案查借阅状态-档案详情
		},

		data() {
			return {
				firstShow:false,//干部任免审批不显示TODO
				fourthShow2:false,//档案利用情况不显示TODO
				hasApproval: false, //判断是否有干部任免审批信息
				archives_detail: false,
				activeName: 'second',
				removalApprovalData: [], //干部任免审批-浏览
				basicInformationFrom: {
					e10: {
						e1009: '',
						e1019: '',
						e1010: '',
						e1011: '',
						e1014: '',
						e1014b: '',
						e1012: '',
						e1013: '',
						e1015: '',
					}
				}, //干部信息采集-人员基本信息
				jobInformationList: [], //干部信息采集-职务信息
				resumeList: [], //干部信息采集-简历
				FamilyAndSocialList: [], //干部信息采集-家庭成员及社会关系
				educationList: [], //干部信息采集-学历信息
				jobChangeList: [], //干部信息采集-职务变动
				annualAssessmentList: [], //干部信息采集-年度总结
				LogQueryList: {}, //档案利用情况-人员档案操作日志查询
				WarehousingList: {}, //档案利用情况-在库记录-入库
				ElectronicAccessList: {}, //档案利用情况-在库记录-查阅(电子)
				PhysicalInspectionList: {}, //档案利用情况-在库记录-查阅(实物)
				BorrowingList: {}, //档案利用情况-在库记录-借阅
				props: {
					stripe: true, //是否隔行变色
					border: true,
					showHeader: true,
					showSummary: false,
					showRowHover: false,
					showIndex: false,
					treeType: true, //是否tree结构
					isFold: true, //是否折叠
					expandType: false, //是否展开类型
					selectionType: false //是否选择类型
				},
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				oldData: [], //原始的data
				columns: [{
						label: '材料名称',
						prop: 'name',
						minWidth: '600px'
					},
					{
						label: '材料形成日期',
						prop: 'e01z117',
						minWidth: '150px'
					},
					{
						label: '页数',
						prop: 'e01z114',
						minWidth: '100px'
					},
					{
						label: '备注',
						prop: 'e01z121',
						minWidth: '200px'
					}
				],
				data: [], //表格数据
				uAreacode: '', //区域
				socialArr: [], //家庭成员数组：显示数组 
				currRowSpan: 8,
				typeJudge:'',//状态判断
			}
		},
		created() {
			this.handleClick();
			if(this.dataType && this.dataType=='0'){
				this.typeJudge=this.dataType;
			}
		},
		mounted() {

		},
		computed: {
			
		},
		methods: {
			handleClick() {
				if(this.activeName == 'first') {
					this.getRemovalApprovalData(); //干部任免审批-浏览
				} else if(this.activeName == 'second') {
					this.getData(); //干部人事档案目录列表
				} else if(this.activeName == 'third') {
					this.getEditData(); //干部信息采集-人员基本信息
					this.getExtendCompanyList(); //干部信息采集-职务信息
					this.getResumeList(); //干部信息采集-简历
					this.getFamilyAndSocietyList(); //干部信息采集-家庭成员及社会关系
					this.getEducationList(); //干部信息采集-学历信息
					this.getJobChangeList(); //干部信息采集-职务变动
					this.getExamineList(); //干部信息采集-年度考核
				} else if(this.activeName == 'fourth') {
					this.getUtilizationOfArchives(); //档案利用情况-人员档案操作日志查询
					this.getWarehousing(); //浏览-档案利用情况-在库记录-入库
					this.getElectronicAccess(); //浏览-档案利用情况-在库记录-查阅(电子)
					this.getPhysicalInspection(); //浏览-档案利用情况-在库记录-查阅(实物)
					this.getBorrowing(); //浏览-档案利用情况-在库记录-借阅
				}
			},
			getRemovalApprovalData() { //干部任免审批
				this.$axios({
					method: 'get',
					url: this.API.editBada,
					params: {
						'id': '',
						'a0100': this.selectDeceive.a0100,
						'uAreacode': this.uAreacode
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						if(resData.data) {
							this.hasApproval = true;
							this.removalApprovalData = resData.data;
							let resumeVar = resData.data.resumeinformation; //简历
							if(resumeVar.length>0){
								this.removalApprovalData.resumeinformation = JSON.parse(resumeVar);
							}
							let familyStr = this.removalApprovalData.familymembers; //家庭成员
							this.socialArr = JSON.parse(familyStr);
							let len = this.socialArr.length;

							if(this.socialArr.length <= 7) {
								for(let i = len; i < 7; i++) {
									this.socialArr.push({
										A3604A: '',
										A3601: '',
										age: '',
										ZZMM: '',
										A3611: ''
									})
								}
							} else {
								this.currRowSpan = len + 1;

							};
							
							this.removalApprovalData.approvaldate=this.removalApprovalData.approvaldate.replace("0:00:00","");
							this.removalApprovalData.administrativeorgandate=this.removalApprovalData.administrativeorgandate.replace("0:00:00","");

						} else {
							this.hasApproval = false;
						}
					}else{
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}
				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			getData() { //干部人事档案目录列表
				let self = this;
				this.$axios({
					method: 'get',
					url: this.API.findSysArchClassify,
					params: {
						'a0100': this.selectDeceive.a0100,
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						self.oldData = resData.data;
						let fatherAndChildObj = {
							childKey: "code",
							fatherKey: "parentcode"
						};
						self.data = self.commonFun.toTreeDataNormal(resData.data, fatherAndChildObj);
					} else {
						self.$message({
							type: 'error',
							message: '获取失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					self.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})

			},
			getEditData() { //干部信息采集-人员基本信息
				this.$axios({
					method: 'get',
					url: this.API.editA01,
					params: {
						'a0100': this.selectDeceive.a0100,
						'uIsValid':''+this.typeJudge,
					}
				}).then((res) => {
					if(res.data.code == '1') {
						this.basicInformationFrom = res.data.data;
					}else{
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}
				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			getExtendCompanyList() { //干部信息采集-职务信息
				this.$axios({
					method: 'get',
					url: this.API.findA02InformationPage,
					params: {
						a0100: this.selectDeceive.a0100,
						uIsValid:''+this.typeJudge,
						pageIndex: this.pageObj.pageIndex,
						pageSize: 1000,
					}
				}).then((res) => {
					if(res.data.code == "1") {
						let resData = res.data;
						this.jobInformationList = resData.data.list;
					}else{
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}

				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			getResumeList() { //干部信息采集-简历
				this.$axios({
					method: 'get',
					url: this.API.findA17InformationPage,
					params: {
						a0100: this.selectDeceive.a0100,
						pageIndex: this.pageObj.pageIndex,
						pageSize: 1000,
						uIsValid:''+this.typeJudge,
					}
				}).then((res) => {
					if(res.data.code == "1") {
						let resData = res.data;
						this.resumeList = resData.data.list;
					}else{
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}

				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			getFamilyAndSocietyList() { //干部信息采集-家庭成员及社会关系
				this.$axios({
					method: 'get',
					url: this.API.findA36InformationPage,
					params: {
						a0100: this.selectDeceive.a0100,
						pageIndex: this.pageObj.pageIndex,
						pageSize: 1000,
						uIsValid:''+this.typeJudge,
					}
				}).then((res) => {
					if(res.data.code == "1") {
						let resData = res.data;
						this.FamilyAndSocialList = resData.data.list;
						//console.log("扩充信息-家庭成员及社会关系列表" + res)
					}else{
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}

				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			getEducationList() { //干部信息采集-学历信息
				this.$axios({
					method: 'get',
					url: this.API.findA08InformationPage,
					params: {
						a0100: this.selectDeceive.a0100,
						pageIndex: this.pageObj.pageIndex,
						pageSize: 1000,
						uIsValid:''+this.typeJudge,
					}
				}).then((res) => {
					if(res.data.code == "1") {
						let resData = res.data;
						this.educationList = resData.data.list;
						//console.log("扩充信息-学历信息查询列表页" + res)
					}else{
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}

				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			getJobChangeList() { //干部信息采集-职务变动
				this.$axios({
					method: 'get',
					url: this.API.findA52InformationPage,
					params: {
						a0100: this.selectDeceive.a0100,
						pageIndex: this.pageObj.pageIndex,
						pageSize: this.pageObj.pageSize,
						uIsValid:''+this.typeJudge,
					}
				}).then((res) => {
					if(res.data.code == "1") {
						let resData = res.data;
						this.jobChangeList = resData.data.list;
					}else{
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}

				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},

			getExamineList() { //干部信息采集-年度考核
				this.$axios({
					method: 'get',
					url: this.API.findAnnualAppraisalInformationPage,
					params: {
						a0100: this.selectDeceive.a0100,
						pageIndex: this.pageObj.pageIndex,
						pageSize: this.pageObj.pageSize,
						uIsValid:''+this.typeJudge,
					}
				}).then((res) => {
					if(res.data.code == "1") {
						let resData = res.data;
						this.annualAssessmentList = resData.data.list;
						//console.log("干部信息采集-年度考核" + res)
					}else{
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}

				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			getUtilizationOfArchives() { //档案利用情况-人员档案操作日志查询
				this.$axios({
					method: 'get',
					url: this.API.getArchivesLogByA0100,
					params: {
						a0100: this.selectDeceive.a0100
					}
				}).then((res) => {
					//console.log("档案利用情况-人员档案操作日志查询"+res);
					if(res.data.code == "1") {
						let resData = res.data;
						this.LogQueryList = resData.data;
					}else{
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}

				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			getWarehousing() { //浏览-档案利用情况-在库记录-入库
				this.$axios({
					method: 'get',
					url: this.API.getWarehouseInfo,
					params: {
						a0100: this.selectDeceive.a0100
					}
				}).then((res) => {
					//console.log("在库记录-入库"+res);
					if(res.data.code == "1") {
						let resData = res.data;
						this.WarehousingList = resData.data;
					}else{
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}

				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			getElectronicAccess() { //浏览-档案利用情况-在库记录-查阅(电子)
				this.$axios({
					method: 'get',
					url: this.API.getConsultElectronInfo,
					params: {
						a0100: this.selectDeceive.a0100
					}
				}).then((res) => {
					//console.log("在库记录-入库"+res);
					if(res.data.code == "1") {
						let resData = res.data;
						this.ElectronicAccessList = resData.data;
					}else{
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}

				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			getPhysicalInspection() { //浏览-档案利用情况-在库记录-查阅(实物)
				this.$axios({
					method: 'get',
					url: this.API.getConsultKindInfo,
					params: {
						a0100: this.selectDeceive.a0100
					}
				}).then((res) => {
					//console.log("在库记录-入库"+res);
					if(res.data.code == "1") {
						let resData = res.data;
						this.PhysicalInspectionList = resData.data;
					}else{
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}

				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			getBorrowing() { //浏览-档案利用情况-在库记录-借阅
				this.$axios({
					method: 'get',
					url: this.API.getBorrowingInfo,
					params: {
						a0100: this.selectDeceive.a0100
					}
				}).then((res) => {
					//console.log("在库记录-入库"+res);
					if(res.data.code == "1") {
						let resData = res.data;
						this.BorrowingList = resData.data;
					}else{
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}

				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			ArchivesDetail(archtype) { //当前档案查借阅状态-详情
				this.chioceObj = this.selectDeceive;
				this.archtypeId = archtype;
				this.archives_detail = true;

			},

		}
	}
</script>

<style lang="scss" scoped>
	.div-none {
		width: 500px;
		height: 100px;
		line-height: 100px;
		text-align: center;
		border: 1px solid #657fee;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		background: #657fee;
		color: white;
		border-radius: 5px;
		font-size: 26px;
	}
	
	.container {
		border: none;
		width: 824px;
		margin: 0 auto;
		.title {
			margin: 0;
			display: flex;
			justify-content: center;
			letter-spacing: 16px;
			font-size: 36px;
			font-family: '宋体';
			height: 30px;
			line-height: 30px;
			margin-top: 20px;
			color: black;
			font-weight: bold;
		}
		.basicInformatiion {
			width: 824px;
			box-sizing: border-box;
			margin-top: 20px;
			border: 2px solid black;
			tbody {
				tr {
					height: 54px;
					td {
						text-align: center;
						font-size: 18px;
						.second-table {
							tr {
								height: 30px;
								td {
									text-align: left;
									padding: 0 5px;
								}
							}
						}
					}
				}
			}
		}
	}
	
	.container-second {
		height: 82vh;
		overflow: auto;
	}
	
	.collection-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		.left-tab {
			width: 14%
		}
		.right-main {
			width: 86%;
			height: 82vh;
			overflow: auto;
			.container {
				border: none;
				width: 824px;
				margin: 0 auto;
				.title {
					margin: 0;
					display: flex;
					justify-content: center;
					letter-spacing: 16px;
					font-size: 36px;
					font-family: '宋体';
					height: 30px;
					line-height: 30px;
					margin-top: 20px;
					color: black;
					font-weight: bold;
				}
				.basicInformatiion {
					width: 824px;
					box-sizing: border-box;
					margin-top: 20px;
					border: 2px solid black;
				}
				.job-information-table {
					min-height: 270px
				}
				.name-tr {
					height: 49px;
					td {
						border: 1px solid black;
						box-sizing: border-box;
					}
					.name-td {
						width: 99px;
						.must-fill {
							color: red;
							font-weight: bold;
						}
						.status-explain {
							height: 200px;
							display: flex;
							justify-content: center;
							align-items: center;
						}
						.education-type {
							height: 100px;
							border-bottom: 1px solid black;
							display: flex;
							justify-content: center;
							align-items: center;
						}
						.add-photo-div {
							width: 48%;
							height: 100%;
							display: inline-block;
							text-align: center;
							border-right: 1px solid black;
							line-height: 50px;
							font-size: 18px;
							color: blue;
							box-sizing: border-box;
						}
						.copy-num {
							width: 48%;
							height: 100%;
							text-align: center;
							border-right: 1px solid black;
							line-height: 50px;
							font-size: 18px;
							box-sizing: border-box;
							display: inline-block;
							input[type=text] {
								width: 100%;
								background: none;
								outline: none;
								border: 0px;
							}
						}
						.noBorder {
							border: none !important
						}
					}
					.name-td-fill {
						width: 116px;
						.position-div {
							width: 100%
						}
						.nopadding {
							padding: 0
						}
						.education-type {
							width: 100%;
							height: 100px;
							border-bottom: 1px dashed #3f3f3f;
						}
						.noBorder {
							border: none !important
						}
					}
					.photo-img {
						width: 164px
					}
				}
				.education-box {
					height: 200px
				}
			}
		}
	}
</style>