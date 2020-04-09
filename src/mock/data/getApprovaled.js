const GetApprovaled = {
	"flows": [{
			"approvedate": "2018-8-15 15:28:10",
			"approver": "档案管理员",
			"approvestep": "",
			"borrowandreadsplitid": "1A2BC457-EB5A-43A3-9775-10F42363B256",
			"gw": "管档人员",
			"id": "8E4037C0-4A45-40B4-BEFB-33B26B1FF7DE",
			"name": "",
			"operatorstation": "8E0AC793-6F38-407E-A48D-71AA1AC904B8",
			"operatortype": "00000000-0000-0000-0000-000000000000",
			"reason": "",
			"result": "85A51253-A4D4-49DF-B10D-4975721F64E8",
			"sResult": "已通过",
			"sStatue": "已完成",
			"statue": "B36B43F2-6317-41BC-ADC8-E74B7774F8FC",
			"uAreacode": "130000",
			"uCreatedate": "2018-8-1 17:45:47",
			"uCreator": "查档用户",
			"uCreatororgid": "",
			"uIssystem": false,
			"uIsvalid": true,
			"uLastmodifieddate": "2018-8-15 15:28:10",
			"uLastmodifieder": "档案管理员",
			"uLastmodifiederorgid": "",
			"uSortno": 1050,
			"workflowstage": "授权"
		},
		{
			"approvedate": "",
			"approver": "",
			"approvestep": "提出申请",
			"borrowandreadsplitid": "1A2BC457-EB5A-43A3-9775-10F42363B256",
			"gw": "查档人员",
			"id": "ACD7AE0C-014C-4517-A36D-1316FE4633B6",
			"name": "流程申请人",
			"operatorstation": "0AE24763-3872-4D87-AE31-02065A799997",
			"operatortype": "B25FDDFD-0B11-475D-A53F-9FFC6F5DAC73",
			"reason": "",
			"result": "",
			"sResult": "",
			"sStatue": "已完成",
			"statue": "B36B43F2-6317-41BC-ADC8-E74B7774F8FC",
			"uAreacode": "130000",
			"uCreatedate": "2018-8-1 17:45:47",
			"uCreator": "查档用户",
			"uCreatororgid": "",
			"uIssystem": false,
			"uIsvalid": true,
			"uLastmodifieddate": "",
			"uLastmodifieder": "",
			"uLastmodifiederorgid": "",
			"uSortno": 1049,
			"workflowstage": "提出申请"
		}
	],
	"flow": [
		{
			"gw": "查档人员",
			"name": "流程申请人"
		},
		{
			"gw": "管档人员",
			"name": "档案管理员"
		}
	]
};
export {
	GetApprovaled
};