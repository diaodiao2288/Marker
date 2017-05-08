const electron = require('electron');

const webContents = electron.webContents;
let webContent;

// 因为webContent只能在窗口ready时才能得到
// 所以将其封装在一个函数中调用
exports.getWebContent = () => {
  webContent = webContents.getAllWebContents()[0];
};

/**
 * 将消息从主进程发送到渲染进程
 * @param  {[string]} channel [事件名称]
 * @param  {[string]} args    [参数]
 */
exports.sendMessageToRenderer = (channel, args) => {
  webContent.send(channel, args);
};
