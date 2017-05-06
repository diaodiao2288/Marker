const electron = require('electron');
const toolUtil = require('./toolUtil').toolUtil;

const globalShortcut = electron.globalShortcut;
//添加全局快捷键
const addBoldSC = () => {
  globalShortcut.register('CommandOrControl+B', () => {
    toolUtil.addBold();
  });
}

const addItalicSC = () => {
  globalShortcut.register('CommandOrControl+I', () => {
    toolUtil.addItalic();
  });
}

const addLinkSC = () => {
  globalShortcut.register('CommandOrControl+L', () => {
    toolUtil.addLink();
  });
}

const addQuotationSC = () => {
  globalShortcut.register('CommandOrControl+Q', () => {
    toolUtil.addQuotation();
  });
}

const addCodeSC = () => {
  globalShortcut.register('CommandOrControl+K', () => {
    toolUtil.addCode();
  });
}

const addImageSC = () => {
  globalShortcut.register('CommandOrControl+G', () => {
    toolUtil.addImage();
  });
}

const addOrderListSC = () => {
  globalShortcut.register('CommandOrControl+O', () => {
    toolUtil.addOrderList();
  });
}

const addListSC = () => {
  globalShortcut.register('CommandOrControl+U', () => {
    toolUtil.addList();
  });
}

const addTitleSC = () => {
  globalShortcut.register('CommandOrControl+H', () => {
    toolUtil.addTitle();
  });
}

const addLineSC = () => {
  globalShortcut.register('CommandOrControl+R', () => {
    toolUtil.addLine();
  });
}

const initSC = () => {
	addBoldSC();
	addItalicSC();
	addLineSC();
	addQuotationSC();
	addCodeSC();
	addImageSC();
	addOrderListSC();
	addListSC();
	addTitleSC();
	addLineSC();
}

exports.initSC = initSC;
