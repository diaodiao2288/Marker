const toolUtil = require('./toolUtil').toolUtil;

$('.outer-header').delegate('img', 'click', function () {
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

$('#editor').on('input propertychange', function () {
  $('#preview').html($(this).val());
});
