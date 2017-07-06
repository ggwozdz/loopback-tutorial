const log = require('log4js').getLogger('boot.userAuth');
const jwt = require('jwt-simple');
const Promise = require('bluebird');

function missingAccessToken(callback) {
  let err = new Error('JWT token is required to access this endpoint');
  err.name = 'MISSING_ACCESS_TOKEN';
  err.status = 401;
  callback(err);
}

function newError(name, status, message) {
  let error = new Error(message);
  error.status = status;
  error.name = name;
  return error;
}

function auth(jwtToken, authConfig) {
  try {
    let jwtSignature = authConfig.jwtSignature;
    let payload = jwt.decode(jwtToken, jwtSignature);
    log.debug('auth ok', payload);

    return Promise.resolve(payload);
  } catch (err) {
    let error;
    switch (err.message) {
      case 'Signature verification failed':
        error = newError('INVALID_TOKEN_SIGN', 403, err.message);
        break;
      case 'Token not yet active':
        error = newError('TOKEN_NOT_ACTIVATE', 403, err.message);
        break;
      case 'Algorithm not supported':
        error = newError('INVALID_TOKEN_ALGO', 403, err.message);
        break;
      case 'Token expired':
        error = newError('TOKEN_EXPIRED', 401, err.message);
        break;
      default:
        error = newError('INVALID_TOKEN', 403, err.message);
        break;
    }
    return Promise.reject(error);
  }
};

module.exports = function(app) {
  app.remotes().phases
    .addBefore('invoke', 'options-from-request')
    .use(function(ctx, next) {
      const acl = app.acl;
      const methodName = ctx.methodString;

      if (acl.isPublic(methodName)) {
        return next();
      }

      let accessToken = ctx.req.query.access_token || ctx.req.headers.authorization;
      let authConfig  = app.get('authConfig');

      if (!accessToken) return missingAccessToken(next);
      auth(accessToken, authConfig)
        .then(payload => {
          ctx.args.options.userInfo = payload;
          ctx.args.options.accessToken = accessToken;
          next();
        })
        .catch(error => {
          next(error);
        });
    });
};
