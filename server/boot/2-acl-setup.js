const log = require('log4js').getLogger('boot.acl');
const ACL = require('../service/acl');

module.exports = function(app) {
  log.info('Setting up ACL');

  var aclConfig = app.get('aclConfig');
  if (!aclConfig) {
    throw 'Missing config parameter: \'aclConfig\'';
  }

  app.acl = new ACL(aclConfig);
};
