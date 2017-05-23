// 实时渲染
// 控制行号的显示与消失
// bug
// bug
// bug
// 当某行因输入过长而显示换行时，行号的显示位置有问题
exports.reload = (fileIndex) => {
  const value = $('.editor').eq(fileIndex).val();
  $('.preview').eq(fileIndex).html(value);
  const result = $('.editor').eq(fileIndex).val().match(new RegExp('\n', 'g')); // eslint-disable-line
  const countOfReturn = !result ? 0 : result.length;
  let countOfChildren = $('#lineNumber').children().length;

  // 根据行号的增减来增加或者减少行号元素
  // 如果当前没有内容，则不显示行号
  if (value.length === 0) {
    $('#lineNumber').children().remove();
    return;
  }

  while (countOfChildren !== countOfReturn + 1) {
    if (countOfChildren < countOfReturn + 1) {
      $('<div></div>').html(countOfChildren + 1).appendTo($('#lineNumber'));
      countOfChildren += 1;
    } else if (countOfChildren > countOfReturn + 1) {
      $('#lineNumber').children(':last').remove();
      countOfChildren -= 1;
    }
  }
};
