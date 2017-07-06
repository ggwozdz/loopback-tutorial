const jwt = require('jwt-simple');
const _ = require('lodash');
const mailer = require('./mailer');

module.exports = function(Couple) {
  /**
   * genrates auth token
   * @param {object} credentials
   * @param {Function(Error, object)} callback
   */

  Couple.token = function(credentials, callback) {
    let authConfig  = Couple.app.get('authConfig');
    let jwtSignature = authConfig.jwtSignature;

    return Couple.login(credentials)
      .then(loginResult  => {
        return _.merge(loginResult, {iss: 'myapp',  sub: loginResult.userId});
      })
      .then(tokenContent => {
        return {
          token_type: 'bearer',
          access_token: jwt.encode(tokenContent, jwtSignature),
          expires_in: tokenContent.ttl
        };
      });
  };

  Couple.afterRemote('create', function(context, userInstance, next) {
    console.log('> user.afterRemote triggered');

    var options = {
      type: 'email',
      to: userInstance.email,
      from: 'noreply@loopback.com',
      subject: 'Thanks for registering.',
      redirect: '/verified',
      mailer: mailer,
      user: Couple
    };
    userInstance.verify(options).then(result => next(false, result));
  });
};

