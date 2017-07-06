const _ = require('lodash');

function arrayContains(array, item) {
  return array.indexOf(item) >= 0;
}

module.exports = function(config) {
  this.config = config;
  var self = this;

  this.isPublic = function(methodName) {
    //return arrayContains(self.config.publicMethods, methodName);
    return true;
  };

  this.isAllowed = function(userType, methodName) {
    if (self.isPublic(methodName)) {
      return true;
    } else {
      let allowedMethods = self.config[userType] || [];
      return _.some(allowedMethods, allowedMethod => {
        return allowedMethod.test(methodName);
      });
    }
  };
};
