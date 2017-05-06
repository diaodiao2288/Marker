const electron = require('electron');
const toolUtil = require('./toolUtil').toolUtil;

const globalShortcut = electron.globalShortcut;

const addBoldSC = () => {
  globalShortcut.register('CommandOrControl+B', () => {
    toolUtil.addBold();
  });
}
