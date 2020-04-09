import api from "../api/api.js" //引入mock测试接口 ；  生产模式时  需要改为api.js
var self = this;
/**
 * 公共方法
 */
const commonFun = {
	/**
	 * 日期格式转换
	 * @param {String} dateStr 日期字符串
	 * @param {String} fmt 转换的格式 如:"yyyy-MM-dd"
	 * @return {String} fmt 转换后的数据  如:"yyyy-MM-dd"
	 */
	dateFormat: function(dateStr, fmt) {
		if(dateStr.length == 0) {
			return "";
		}
		if(dateStr.length === 8) dateStr = dateStr.slice(0, 4) + '-' + dateStr.slice(4, 6) + '-' + dateStr.slice(6, 8);
		var dateObj = new Date(dateStr);
		var o = {
			"M+": dateObj.getMonth() + 1, //月份 
			"d+": dateObj.getDate(), //日 
			"H+": dateObj.getHours(), //小时 
			"m+": dateObj.getMinutes(), //分 
			"s+": dateObj.getSeconds(), //秒 
			"q+": Math.floor((dateObj.getMonth() + 3) / 3), //季度 
			"S": dateObj.getMilliseconds() //毫秒 
		};
		if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
	/**
	 * 平级数据递归转换为tree形数据--标准接口(关联Id的key为pId:即父子对应字段对:id==pId)
	 * @param {Array} data 转换前数据
	 * @param {Object} childToFatherObj 父子对应字段
	 * @param {Object} childToFatherObj.childKey 数据字段名
	 * @param {Object} childToFatherObj.fatherKey 父子映射字段名
	 * @param {Boolean} hasNotFile 是否显示文件层级
	 * @return {Array} val 返回转换后的数据
	 */
	toTreeDataNormal: function(data, childToFatherObj,hasNotFile) {
		// 删除 所有 children,以防止多次调用
		data.forEach(function(item) {
			delete item.children;
		});
		// 将数据存储为 以 childToFatherObj.childKey 为 KEY 的 map 索引数据列
		var map = {};
		data.forEach(function(item) {
			map[item[childToFatherObj.childKey]] = item;
		});
		var val = [];
		data.forEach(function(item) {
			// 以当前遍历项的childToFatherObj.fatherKey,去map对象中找到索引的childToFatherObj.childKey
			var parent = map[item[childToFatherObj.fatherKey]];
			//如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
			if(hasNotFile){
				
				if(item.type !== '文件'){
					if(parent){
						(parent.children || (parent.children = [])).push(item);
					}else{
						val.push(item);
					}
				}
			}else{
				if(parent){
					(parent.children || (parent.children = [])).push(item);	
				}else{
					//如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
					val.push(item);
				}
			}
		});
		return val;
	},
	/**
	 * 平级数据递归转换为tree形数据(关联Id的key为pId:即父子对应字段对:id==pId)
	 * @param {Array} data 转换前数据
	 * @return {Array} val 返回转换后的数据
	 */
	toTreeData: function(data) {
		// 删除 所有 children,以防止多次调用
		data.forEach(function(item) {
			delete item.children;
		});
		// 将数据存储为 以 id 为 KEY 的 map 索引数据列
		var map = {};
		data.forEach(function(item) {
			map[item.id] = item;
		});
		var val = [];
		data.forEach(function(item) {
			// 以当前遍历项的pId,去map对象中找到索引的id
			var parent = map[item.pId];
			//如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
			if(parent) {
				(parent.children || (parent.children = [])).push(item);
			} else {
				//如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
				val.push(item);
			}
		});
		return val;
	},
	/**
	 * 平级数据递归转换为tree形数据--档案十大类材料专用(关联Id的key为parentcode:即父子对应字段对:code==parentcode)
	 * @param {Array} data 转换前数据
	 * @return {Array} val 返回转换后的数据
	 */
	toTreeData2: function(data) {
		// 删除 所有 children,以防止多次调用
		data.forEach(function(item) {
			delete item.children;
		});
		// 将数据存储为 以 id 为 KEY 的 map 索引数据列
		var map = {};
		data.forEach(function(item) {
			map[item.code] = item;
		});
		var val = [];
		data.forEach(function(item) {
			// 以当前遍历项的parentcode,去map对象中找到索引的id
			var parent = map[item.parentcode];
			//如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
			if(parent) {
				(parent.children || (parent.children = [])).push(item);
			} else {
				//如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
				val.push(item);
			}
		});
		return val;
	},
	/**
	 * 平级数据递归转换为tree形数据--档案十大类材料专用(关联Id的key为parentid:即父子对应字段对:id==parentid)
	 * @param {Array} data 转换前数据
	 * @return {Array} val 返回转换后的数据
	 */
	toTreeData3: function(data) {
		// 删除 所有 children,以防止多次调用
		data.forEach(function(item) {
			delete item.children;
		});
		// 将数据存储为 以 id 为 KEY 的 map 索引数据列
		var map = {};
		data.forEach(function(item) {
			map[item.id] = item;
		});
		var val = [];
		data.forEach(function(item) {
			// 以当前遍历项的parentcode,去map对象中找到索引的id
			var parent = map[item.parentid];
			//如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
			if(parent) {
				(parent.children || (parent.children = [])).push(item);
			} else {
				//如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
				val.push(item);
			}
		});
		return val;
	},
	/**
	 * 合并多个数组并去除重复项（对象组成的数组）[{},{}]
	 * @param {Array} arr1 数组1
	 * @param {Array} arr2 数组2
	 * @param {String} primaryKey 数组对象主键字段名
	 * @return {Array} 合并后的数组
	 */
	concatArray: function(arr1, arr2, primaryKey) {
		let arr3 = arr1.concat(arr2); //两个数组对象合并
		let newArr = []; //盛放去重后数据的新数组
		for(let item1 of arr3) { //循环json数组对象的内容
			let flag = true; //建立标记，判断数据是否重复，true为不重复
			for(let item2 of newArr) { //循环新数组的内容
				if(item1[primaryKey] == item2[primaryKey]) { //让json数组对象的内容与新数组的内容作比较，相同的话，改变标记为false
					flag = false;
				}
			}
			if(flag) { //判断是否重复
				newArr.push(item1); //不重复的放入新数组。  新数组的内容会继续进行上边的循环。
			}
		}
		return newArr;
	},
	/**
	 * 合并多个简单数组并去除重复项
	 * @return {Array} 合并后的数组
	 */
	concatSimpleArray: function() {
		let newArr = Array.prototype.concat.apply([], arguments) //没有去重复的新数组
		return Array.from(new Set(newArr))
	},
	/**
	 * 区分档案类型
	 * @param {Object} fileTypeId
	 * @return {Number} fileType 纸质  =1;  电子=2
	 */
	recognitionFileType: function(fileTypeId) {
		let fileType = 1; //
		if(fileTypeId == api.constObj.fileTypeList[0].id) {
			fileType = 2;
		}
		return fileType;
	},
	/**
	 * 根据id查找到所有父节点对象(平级tree结构数据)
	 * @param {Array} arr 数据源
	 * @param {String} nodeId 节点id值
	 * @param {Object} childToFatherObj 父子对应字段
	 * @param {Object} childToFatherObj.childKey 子字段名
	 * @param {Object} childToFatherObj.fatherKey 父字段名
	 * @return {Array} findNodeArray 查找到的节点数组
	 */
	findTreeNodeById: function(arr, nodeId, childToFatherObj) {
		var findNodeArray = [];
		var forFn = function(arr, pid) {
			for(var i = 0; i < arr.length; i++) {
				var item = arr[i];
				if(item[childToFatherObj.childKey] == pid) {
					findNodeArray.push(item);
					forFn(arr, item[childToFatherObj.fatherKey]);
				}
			}
		};
		forFn(arr, nodeId);
		return findNodeArray;
	},
	/**
	 * 生成id数组，并反转id数组
	 * @param {Object} arr 源数据
	 * @param {Object} idKey 需要生成数组的字段名
	 */
	createArrIdAndReverse: function(arr, idKey) {
		let returnArray = [];
		if(arr.length > 0) {
			arr.forEach(function(row, index) {
				returnArray.push(row[idKey]);
			})
			returnArray = returnArray.reverse();
		}
		return returnArray;
	},
	/**
	 * 清除token信息并跳转到登录页面
	 * @param {Boolean} isRedirect 是否重定向 
	 */
	againLogin(isRedirect) {
		window.vm.$store.commit('removeAllInfo');
//		if(isRedirect) {
			window.vm.$router.push({
				path: '/login',
				//query: {redirect: window.vm.$router.currentRoute.fullPath}
			})
//		} else {
//			window.vm.$router.push({
//				path: '/login'
//			})
//		}

	},
	/**
	 * 本地分页函数
	 * @param {Array} totalList 总数据
	 * @param {String} pageIndex 当前页下标
	 * @param {String} pageSize 当前页大小
	 */
	localPaging(totalList, pageIndex, pageSize) {
		let showList = totalList.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
		return showList;
	},
	/**
	 * 根据传入的集合，拼接需要的字段，用逗号隔开
	 * @param {list} list 数据集合
	 * @param {ids} 拼接后的字段
	 */
	joinTgetherId(list, ids, keyVal) {
		if(list == "") return ids = "";
		let arr = [];
		let keyStr = '';
		list.forEach(el => {
			for(let m in el) {
				if(m == keyVal) {
					keyStr += el[m] + ','
					arr.push(el[m])
				}
			}
		})
		return keyStr.substring(0, keyStr.length - 1);
	},
	/**
	 * vue数据转换器
	 * @desc 将vue数据转换为纯粹的json数据
	 * @param {Object||Array} vueData 数据源
	 * @return {Object||Array} result 转换后的纯粹数据
	 */
	vueDataConverter(vueData) {
		var result = null;
		var type = Object.prototype.toString.call(vueData);

		switch(type) {
			case '[object Array]':
				result = toArray(vueData);
				break;

			case '[object Object]':
				result = toObject(vueData);
				break;

			default:
				result = vueData;
				break;
		}

		function toArray(vueArray) {
			var array = [];
			for(var index in vueArray) {
				var item = vueDataConverter(vueArray[index]);
				array.push(item);
			}
			return array;
		}

		function toObject(vueData) {
			var obj = new Object();
			for(var index in vueData) {
				var item = vueDataConverter(vueData[index]);
				obj[index] = item;
			}
			return obj;
		}
		return result;
	},
	/**
	 * 验证身份证号
	 * @param {String} val 身份证号
	 */
	checkIdCard(val){
		var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
		var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
		var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
		var code = val.substring(17);
		if(p.test(val)) {
			var sum = 0;
			for(var i = 0; i < 17; i++) {
				sum += val[i] * factor[i];
			}
			if(parity[sum % 11] == code.toUpperCase()) {
				return true;
			}
		}
		return false;
	}
};

export default commonFun;