const cursorUtil = require('./cursorUtil');

const addContent = cursorUtil.addContent;
const moveCursorEnd = cursorUtil.moveCursorEnd;
const moveCursorThisLineStart = cursorUtil.moveCursorThisLineStart;

const toolUtil = {
  addBold: () => {
    addContent('**粗体文字**', 2, 6);
  },
  addItalic: () => {
    addContent('*斜体文字*', 1, 5);
  },
  addLink: () => {
    addContent('[](此处插入链接)', 3, 9);
  },
  addQuotation: () => {
    addContent('> 段落引用', 2, 6);
  },
  addCode: () => {
    addContent('    代码块', 4, 7);
  },
  addImage: () => {
    addContent('![](此处插入图片路径)', 4, 12);
  },
  addOrderList: () => {
    addContent('1. 列表项', 3, 6);
  },
  addList: () => {
    addContent('* 列表项', 2, 5);
  },
  addTitle: () => {
    addContent('# 标题', 2, 4);
  },
  addLine: () => {
    addContent('***\n', -1, -1);
  },
  addLineNext: () => {
    // 先将光标移到当前行尾部
    // 然后在尾部插入一个换行
    // 最后再将光标移到换行符后面
    moveCursorEnd();
    addContent('\n', 1, 1);
  },
  addLineThis: () => {
    moveCursorThisLineStart();
    addContent('\n', 0, 0);
  },
};

exports.toolUtil = toolUtil;
