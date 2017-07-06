const log = require('log4js').getLogger('mailer');

module.exports = {
  send : function(verifyOptions, options, handleAfterSend){
    log.debug('sending verification email ', verifyOptions);
    handleAfterSend();
  }
};
