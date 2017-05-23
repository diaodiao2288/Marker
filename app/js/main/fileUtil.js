const dialog = require('electron').dialog;
const sendMessageToRendererUtil = require('./sendMessageToRendererUtil');
const ipcMain = require('electron').ipcMain;
const sendMessageToRenderer = sendMessageToRendererUtil.sendMessageToRenderer;
//文件的列表，存储文件的路径和保存状态
//初始为一个空文件
var file_list = new Array({
	path: '',
	// 默认为已保存
	saved: true
});
//当前聚焦的文件索引
var index = 0;

const newFile = () => {
	//当前没有任何文件
	if (file_list[index]['path'].length == 0) {
		file_list[index]['path'] = 'untitled';
		//添加文件标签
		sendMessageToRenderer('file', ['newFile', {index: index}]);
	}
	else {
		// 插入文件
		file_list.splice(index, 0, {
			path: 'untitled',
			saved: true
		});
		index++;
		sendMessageToRenderer('file', ['newFile', {index: index}]);
	}
};

const save = (i) => {
	console.log('save...');
	i = i ? i : index;
	// 文件是否保存过
	if (file_list[i]['saved'] == false) {
		//文件路径为空或者untitled时，文件未被保存过，需另存为
		if(file_list[i]['path'].length == 0 || file_list[i]['path'] == 'untitled') {
			saveAs(i);
		}
		else {
			sendMessageToRenderer('file', ['save', {
				path: file_list[i]['path'],
				index: i
			}]);
		}
		file_list[i]['saved'] = true;
	}
};

const saveAs = (i) => {
	console.log('saveAs...');
	i = i ? i : index;
	dialog.showSaveDialog({
		title: 'saveAs',
		defaultPath: './',
		filters: [
			{name: 'Markdown', extensions: ['md']}
		]
  	}, function(filename){
  		//选择文件时点击取消会导致undifined
	if (typeof(filename) != 'undefined') {
  		file_list[index]['path'] = filename;
  		if (file_list[index]['path'].length == 0) {
  			//添加文件标签
  			sendMessageToRenderer('file', ['newFile', {index: index}]);
  		}
  		sendMessageToRenderer('file', ['save', {
  			path: filename,
  			index: index
  		}]);
  		file_list[i]['saved'] = true;
  	}
    });
};

const saveAll = () => {
	console.log('saveAll...');
	var i;
	for (i = 0; i < file_list.length; i++) {
		save(i);
	}
};

const closeFile = (i) => {
	i = arguments[0] ? arguments[0] : index;
	console.log('closeFile...');
	if (file_list.length != 0) {
		
	}
};

const clossAll = () => {
  console.log('clossAll...');
};

const newTab = () => {
  console.log('newTab...');
};

const toPdf = () => {
  console.log('toPdf...');
};


const open = () => {
	console.log('open...');
	dialog.showOpenDialog({
		title: 'open file',
		//默认打开当前目录的文件
		defaultPath: './',
		filters: [
		  {name: 'text', extensions: ['txt']},
		  {name: 'markdown', extensions: ['md']},
		  {name: 'all files', extensions: ['*']}
		],
		properties: [
		  'openFile'
		]
	}, function(filePaths){
		//将对文件的操作和文件路径发送到render进程
    if (typeof(filePaths) != 'undefined') {
    	var args = {
    		path: filePaths[0],
    		index: index
    	}
    	//如果当前标签是空文件，替换当前标签，否则打开新的标签
    	if (file_list[index]['path'].length != 0) {
    		args['index']++;
    	}
    	file_list[index]['path'] = filePaths[0];
		sendMessageToRenderer('file', ['read', args]);
	  }
  });
};

exports.newFile = newFile;

exports.changeFocusedFile = (i) => {
	index = i;
};
exports.open = open;
exports.save = save;
exports.saveAs = saveAs;
exports.saveAll = saveAll;
exports.closeFile = closeFile;
exports.clossAll = clossAll;
exports.newTab = newTab;
exports.toPdf = () => {
  console.log('toPdf...');
};

//监听文件修改的信息
ipcMain.on('statusChanged', (event, arg) => {
	console.log('statusChanged');
	file_list[arg]['saved'] = false;
})
