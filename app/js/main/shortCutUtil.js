const electron = require('electron');

const webContents = electron.webContents;
const globalShortcut = electron.globalShortcut;

let webContent;

const getWebContent = () => {
  webContent = webContents.getAllWebContents()[0];
};

// 添加全局快捷键
// 因为主进程无法直接调用渲染进程的代码
// 所以这里采用进程间通信的方式
// 主进程通过一个房间来发送该信息
// 而渲染进程根据信息的不同来调用不同的方法
const addBoldSC = () => {
  globalShortcut.register('CommandOrControl+B', () => {
    webContent.send('SC', 'addBold');
  });
};

const addItalicSC = () => {
  globalShortcut.register('CommandOrControl+I', () => {
    webContent.send('SC', 'addItalic');
  });
};

const addLinkSC = () => {
  globalShortcut.register('CommandOrControl+L', () => {
    webContent.send('SC', 'addLink');
  });
};

const addQuotationSC = () => {
  globalShortcut.register('CommandOrControl+Q', () => {
    webContent.send('SC', 'addQuotation');
  });
};

const addCodeSC = () => {
  globalShortcut.register('CommandOrControl+K', () => {
    webContent.send('SC', 'addCode');
  });
};

const addImageSC = () => {
  globalShortcut.register('CommandOrControl+G', () => {
    webContent.send('SC', 'addImage');
  });
};

const addOrderListSC = () => {
  globalShortcut.register('CommandOrControl+O', () => {
    webContent.send('SC', 'addOrderList');
  });
};

const addListSC = () => {
  globalShortcut.register('CommandOrControl+U', () => {
    webContent.send('SC', 'addList');
  });
};

const addTitleSC = () => {
  globalShortcut.register('CommandOrControl+H', () => {
    webContent.send('SC', 'addTitle');
  });
};

const addLineSC = () => {
  globalShortcut.register('CommandOrControl+R', () => {
    webContent.send('SC', 'addLine');
  });
};

const registerSC = () => {
  getWebContent();
  addBoldSC();
  addItalicSC();
  addLinkSC();
  addQuotationSC();
  addCodeSC();
  addImageSC();
  addOrderListSC();
  addListSC();
  addTitleSC();
  addLineSC();
};

const unregisterSC = () => {
  globalShortcut.unregisterAll();
};

exports.registerSC = registerSC;
exports.unregisterSC = unregisterSC;
