const log = require('log4js').getLogger('model.Task');

module.exports = function(Task) {
  Task.observe('access', (ctx, next) => {
    log.debug('userInfo', ctx.options.userInfo);


    const token = ctx.options && ctx.options.accessToken;
    const userId = ctx.options.userInfo.userId;
    const user = userId ? 'user#' + userId : '<anonymous>';

    const modelName = ctx.Model.modelName;
    const scope = ctx.where ? JSON.stringify(ctx.where) : '<all records>';
    console.log('%s: %s accessed %s:%s', new Date(), user, modelName, scope);
    next();
  });

  Task.observe('before save', (ctx, next) => {
    if(ctx.isNewInstance && ctx.options){
      let user = ctx.options.userInfo;
      ctx.instance.coupleId = user.userId;
    }
    next();
  });
};
