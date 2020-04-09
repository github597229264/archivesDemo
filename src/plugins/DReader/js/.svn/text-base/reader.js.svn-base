var appname = 'arch';
var token = 'c179b71f839643899bce954235b0e394';
var hostname = 'www.vvhome.com';
var port = 8999;
hostname = '192.168.1.189';
var _umsp_reader_baseuri = "";

function getNowtime() {
	var date = new Date();
	return date.getYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

var wmalpha = 0.2;
var wmdata = [];
var wmdata1 = [{
		text: '页号: 00001 档号: 418-1-011 利用人: 郭鑫  打印日期: ' + getNowtime() + '\\n题名: 关于XXXX的通知',
		linespace: 0.3,
		multi: true,
		degree: 0,
		position: 'left_top', //left_top, right_top, left_bottom, right_bottom, center
		alpha: wmalpha,
		font: {
			name: '方正',
			size: 20,
			style: 'normal', //normal, bold
			color: 0x555555 //red
		}
	}
	/*,{
				        marker: 'wm/wwm-all1.png',
				        alpha: wmalpha,
				        position: 'repeat'
				    }*/
	, {
		text: '                       复印件                                                             ',
		degree: 315,
		position: 'repeat',
		alpha: wmalpha,
		font: {
			name: '方正',
			size: 100,
			style: 'bold',
			color: 0xff0000
		}
	}
];

var R_ZOOM = 0x01;
//var R_DOWNLOAD = 0x01 << 3;//下载 暂不支持下载
var R_PRINT = 0x01 << 2; //打印
var R_SHENQING = 0x01 << 4; //打印申请
var R_VIEW_WORDS = 0x01 << 5; //查看文字
var R_FIT_WIDTH = 0x01 << 6; //横向适应
var R_FIT_HEIGHT = 0x01 << 7; //纵向适应
var R_REGION = 0x01 << 8; //区域授权
var mask = R_ZOOM | R_PRINT | R_SHENQING | R_VIEW_WORDS | R_FIT_WIDTH | R_FIT_HEIGHT | R_REGION;
var parameters = {
	tmask: mask,
	token: token, //授权码
	appname: appname, //应用ID
	host: hostname, //主机地址，注意，没有端口号
	port: port, //服务端口
	wmdata: wmdata //水印数据
};

function loadFile(docfile, displayName) {
	debugger;
	if(window.reader) {
		var docnames = new Array();
		docnames.push("001.JPG");
		docnames.push("002.JPG");
		docnames.push("003.JPG");
		var _archArea = new Array();
		var regionData = new Array();
		regionData.push("238,346,1218,282");
		regionData.push("238,1783,1323,875");
		var archArea = {};
		archArea.fileName = "001.JPG";
		archArea.fileArea = regionData;
		_archArea.push(archArea);

		regionData = new Array();
		regionData.push("625,396,796,216");
		regionData.push("24,715,1969,1021");
		archArea = {};
		archArea.fileName = "002.JPG";
		archArea.fileArea = regionData;
		_archArea.push(archArea);

		regionData = new Array();
		regionData.push("169,99,305,935");
		regionData.push("173,1044,652,1622");
		regionData.push("1106,705,875,342");
		regionData.push("763,111,346,483");
		regionData.push("1102,115,181,115");
		regionData.push("1523,127,454,578");
		archArea = {};
		archArea.fileName = "003.JPG";
		archArea.fileArea = regionData;
		_archArea.push(archArea);

		regionData = new Array();
		regionData.push("169,99,305,935");
		regionData.push("173,1044,652,1622");
		archArea = {};
		archArea.fileName = "004c4ab98422a69a95a36f93443d80de";
		archArea.fileArea = regionData;
		_archArea.push(archArea);

		//新干档
		var ysArr = new Array();
		ysArr.push("004c4ab98422a69a95a36f93443d80de");
		ysArr.push("006e1b5669f179cf5fff59a5607e1c55");
		ysArr.push("00640610fa3a56f88e3d673a050f7787");
		ysArr.push("00b6c38ea0bebaaef826e7a6e78b2335");
		ysArr.push("00d265f87845c4fe64f1026700606a23");
		var gqArr = new Array();
		gqArr.push("00640610fa3a56f88e3d673a050f7787");
		//路径规则： umsp主路径   原始/高清图像文件夹路径    parameters.file文件位置
		//parameters.imgtype_YS = "scan/PT";//原始图像文件夹名称
		//parameters.imgtype_GQ = "scan/GQ"; //高清图像文件夹名称
		parameters.imgtype_YS_Arr = ysArr; //版本为V2时，该参数为原始图像文件MD5值列表
		parameters.imgtype_GQ_Arr = gqArr; //版本为V2时，该参数为高清图像文件MD5值列表
		//parameters.names = docnames, //文件名称Array 不写默认就是文件路径下全部文件,仅适用于版本V1
		parameters.file = docfile; //文件位置
		parameters.displayName = displayName; //默认打开的文件 ，不写默认是第一个文件 如：默认打开002.JPG
		parameters.defaultimgtype = 0; //0代表原始图像 1代表高清图像 不赋值默认是0

		parameters.viewIndexVisiable = true; //是否显示索引，注意，只有多页文件有效，如：pdf/tiff（未来支持的doc、docx）
		parameters.fit = 1; //0代表页面适应宽度，1代表页面适应高度  在有区域授权的情况下，必须为1，否则区域授权无效
		parameters.archArea = _archArea, //文件显示区域 注意：region=true 会在右侧显示区域的内容，否则只加载区域内的图片
			parameters.region = true; //是否开启区域授权功能，不写默认不开启
		//parameters.pagesize = 5;// 双页浏览每页显示的页数，不写默认当前容器的最大条数
		parameters.archByName = "郭鑫"; //双页浏览的查阅人名字

		//parameters.regionDisplay = false;//区域显示 默认为true true的情况下，用户只能查看授权的区域。 false ：用户不能查看授权的区域

		//版本号
		parameters.edition = "V2";

		//reader.loadData(parameters); //请求加载
		reader.load(parameters); //请求加载
	} else {
		alert('阅读器正在加载中，请稍后...');
	}
}

function loadFile1(docfile, displayName) {
	if(window.reader) {
		//路径规则： umsp主路径   原始/高清图像文件夹路径    parameters.file文件位置
		parameters.imgtype_YS = "scan/PT"; //原始图像文件夹名称
		parameters.imgtype_GQ = "scan/GQ"; //高清图像文件夹名称
		//parameters.names = docnames; //文件名称Array 不写默认就是文件路径下全部文件,仅适用于版本V1
		parameters.file = docfile; //文件位置
		parameters.displayName = displayName; //默认打开的文件 ，不写默认是第一个文件 如：默认打开002.JPG
		parameters.defaultimgtype = 0; //0代表原始图像 1代表高清图像 不赋值默认是0

		parameters.viewIndexVisiable = true; //是否显示索引，注意，只有多页文件有效，如：pdf/tiff（未来支持的doc、docx）
		parameters.fit = 1; //0代表页面适应宽度，1代表页面适应高度  在有区域授权的情况下，必须为1，否则区域授权无效
		//parameters.archArea = _archArea; //文件显示区域 注意：region=true 会在右侧显示区域的内容，否则只加载区域内的图片
		//parameters.region = true;//是否开启区域授权功能，不写默认不开启
		//parameters.pagesize = 5;// 双页浏览每页显示的页数，不写默认当前容器的最大条数
		parameters.archByName = "郭鑫"; //双页浏览的查阅人名字
		//parameters.regionDisplay = false;//区域显示 默认为true true的情况下，用户只能查看授权的区域。 false ：用户不能查看授权的区域
		//版本号
		parameters.edition = "V1";
		//reader.loadData(parameters); //请求加载
		reader.load(parameters); //请求加载
	} else {
		alert('阅读器正在加载中，请稍后...');
	}
}

//生成打印记录，点击打印按钮后调用此方法
function sendPrintRecord(page) {
	//page ： 打印的页次 如区间 1-10  或者单页 2
}
//生成浏览记录，每浏览图片时候自动调用此方法，
function sendViewRecord(pageIndex) {
	//pageIndex ： 打印的序号 
}

//打印申请 ，点击打印申请按钮后调用此方法
function sendCheckPages(page) {
	//page ： 打印的页次 如区间 1-10  或者单页 2
}

//多页浏览 需要加载的文件名称(中组部)
function getPageNames() {
	return ["001.JPG", "002.JPG", "003.JPG", "004.JPG", "005.JPG"];
	//return ["001.JPG"];
}

//提交区域 多页浏览
function getRegionData(parameters) {
	//返回的parameters为数组对象
	var regionData = parameters[0]; //regionData为数组对象
	var fileName = parameters[1]; //fileName为当前显示的图片名称
	console.info(parameters);
}

//下面边距
function loadSWF() {
	_umsp_reader_baseuri = "umsp";
	window.reader = UMSPHelper.createReader('#flashContainer');

	loadFile('/.cadremultip', '干档双页模式');
	//loadFile('00000002/01/4/.cadremultip', '干档多页模式');
}
export {
	loadSWF
};