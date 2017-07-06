'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const requestId = require('express-request-id');
const log4js = require('log4js');

log4js.configure(__dirname + '/log4js-config.json');

const log = log4js.getLogger('server');
let app = module.exports = loopback();

app.use(requestId());

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    log.info('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      log.info('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
