const electron = require('electron');
const path = require('path');
const url = require('url');
const storageUtil = require('./app/js/storageUtil');
const menuTemplate = require('./app/js/menuTemplate');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const windowState = storageUtil.getWindowState();
const template = menuTemplate.template;
let mainWindow;

function createWindow() {
  const bounds = (windowState && windowState.bounds) || null;
  // 设置窗口的基本样式和信息
  mainWindow = new BrowserWindow({
    title: 'Marker',
    x: (bounds && bounds.x) || undefined,
    y: (bounds && bounds.y) || undefined,
    width: (bounds && bounds.width) || 800,
    height: (bounds && bounds.height) || 600,
    icon: '',
    // 在所有资源加载完成前隐藏窗口
    show: false,
  });

  // 当所有资源加载完成后
  // 显示窗口并聚焦
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
    console.log(mainWindow.isFocused());

    // 将窗口最大化
    if (windowState && windowState.isMaximized) {
      mainWindow.maximize();
    }
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // 打开终端
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // 这里函数调用的频率过高，以后考虑是否用函数节流的方式来降低频率
  // 及时保存窗口的有关信息
  ['resize', 'move', 'close'].forEach((e) => {
    mainWindow.on(e, () => {
      storageUtil.setWindowState(mainWindow.isMaximized(), mainWindow.getBounds());
    });
  });

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
  // 应用会保持活动状态
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // 在 OS X 上，当用户点击dock图标
  // 而没有打开的窗口时
  // 将会自动创建一个窗口
  if (mainWindow === null) {
    createWindow();
  }
});
