const electron = require('electron');
const toolUtil = require('./toolUtil').toolUtil;
const cursorUtil = require('./cursorUtil');
const reload = require('./reload').reload;

const ipcRenderer = electron.ipcRenderer;

$('.outer-header').delegate('img', 'click', function click() {
  const index = $(this).attr('data');
  if (index === 'bold') {
    toolUtil.addBold();
  } else if (index === 'italic') {
    toolUtil.addItalic();
  } else if (index === 'link') {
    toolUtil.addLink();
  } else if (index === 'quotation') {
    toolUtil.addQuotation();
  } else if (index === 'code') {
    toolUtil.addCode();
  } else if (index === 'img') {
    toolUtil.addImage();
  } else if (index === 'orderlist') {
    toolUtil.addOrderList();
  } else if (index === 'list') {
    toolUtil.addList();
  } else if (index === 'title') {
    toolUtil.addTitle();
  } else if (index === 'line') {
    toolUtil.addLine();
  }
});

$('#editor').on('input propertychange', () => {
  reload();
});

ipcRenderer.on('SC', (event, args) => {
  toolUtil[args]();
});

ipcRenderer.on('SE', (event, args) => {
  cursorUtil[args]();
});
