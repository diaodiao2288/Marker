const sendMessageToRendererUtil = require('./sendMessageToRendererUtil');

const sendMessageToRenderer = sendMessageToRendererUtil.sendMessageToRenderer;

exports.expandLine = () => {
  sendMessageToRenderer('SE', 'expandLine');
};
