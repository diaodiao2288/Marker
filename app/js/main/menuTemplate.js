const electron = require('electron');
const fileUtil = require('./fileUtil');

const shell = electron.shell;

// 定义菜单栏
const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New File',
        accelerator: 'CommandOrControl+N',
        click() { fileUtil.newFile(); },
      },
      {
        label: 'Open...',
      },
      {
        label: 'Save',
      },
      {
        label: 'Save As...',
      },
      {
        label: 'Save All',
      },
      {
        label: 'Close File',
      },
      {
        label: 'Close All',
      },
      {
        label: 'New Tab',
      },
      {
        label: 'ToPdf',
      },
    ],
  },
  {
    label: 'Edit',
    submenu: [
      {
        role: 'undo',
      },
      {
        role: 'redo',
      },
      {
        role: 'cut',
      },
      {
        role: 'copy',
      },
      {
        role: 'paste',
      },
      {
        role: 'selectall',
      },
      {
        role: 'delete',
      },
    ],
  },
  {
    label: 'View',
    submenu: [
      {
        role: 'reload',
      },
      {
        role: 'resetzoom',
      },
      {
        role: 'zoomin',
      },
      {
        role: 'zoomout',
      },
      {
        role: 'togglefullscreen',
      },
      {
        label: 'Increase Font Size',
      },
      {
        label: 'Decrease Font Size',
      },
      {
        label: 'Reset Font Size',
      },
    ],
  },
  {
    label: 'Setting',
    submenu: [
      {
        label: 'Theme',
      },
      {
        label: 'Font Family',
      },
      {
        label: 'lineWrapping',
        type: 'checkbox',
        checked: true,
      },
      {
        label: 'lineNumbers',
        type: 'checkbox',
        checked: true,
      },
    ],
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'About Marker',
        click() { shell.openExternal('https://github.com/Abraham9511/Marker'); },
      },
    ],
  },
];

exports.template = template;
