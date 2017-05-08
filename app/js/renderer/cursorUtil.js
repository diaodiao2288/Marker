const reload = require('./reload').reload;

/**
 * 用于光标的显示
 * @param  {[number]} start [起始位置]
 * @param  {[number]} end   [结束位置]
 */
const setSelection = (start, end) => {
  const editor = $('#editor')[0];

  editor.setSelectionRange(start, end);
  $('#editor').focus();

  // 因为这样改变输入内容时，
  // 并不会触发input和propertyChange事件
  // 所以这里需要自行待用该事件
  reload();
};

/**
 * 用于点击图标进行文字的快捷输入
 * @param  {[string]} content [文字内容]
 * @param  {[number]} start   [选择区的开始]
 * @param  {[number]} end     [选择区的结束]
 */
exports.addContent = (content, start, end) => {
  let cursor = 0;
  const editor = $('#editor')[0];

  // 获取光标的位置
  if (editor.selectionEnd) {
    cursor = editor.selectionEnd;
  }
  const oldValue = $('#editor').val();
  const oldValue1 = oldValue.substring(0, cursor);
  const oldValue2 = oldValue.substring(cursor, oldValue.length);

  // 因为插入行时，不需要提示文字
  // 所以这里将光标至于最后
  if (start === -1 && end === -1) {
    $('#editor').val(oldValue + content);
    const len = oldValue.length + content.length;
    setSelection(len, len);
  } else {
    $('#editor').val(oldValue1 + content + oldValue2);
    setSelection(oldValue1.length + start, oldValue1.length + end);
  }
};

// 将光标移到尾部
exports.moveCursorEnd = () => {
  const editor = $('#editor')[0];
  const value = $('#editor').val();
  const cursor = editor.selectionEnd;
  let index = value.indexOf('\n', cursor);

  // 如果没有找到，说明这是最后一行
  if (index === -1) {
    index = value.length;
  }

  editor.setSelectionRange(index, index);
};

exports.moveCursorThisLineStart = () => {
  const editor = $('#editor')[0];
  const value = $('#editor').val();
  const cursor = editor.selectionEnd;
  let index = value.lastIndexOf('\n', cursor);

  // 当不存在换行符时，说明这是在第一行
  // 直接将光标移到第一行起始位置
  if (index === -1) {
    index = 0;
  } else {
    // 不加1的话，就是将光标移到上一行的末尾
    index += 1;
  }

  editor.setSelectionRange(index, index);
};
