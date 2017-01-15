var base = require('./karma.base.js')

module.exports = function (config) {
  config.set(Object.assign(base, {
    browsers: ['PhantomJS'],
    reporters: ['progress'],
    singleRun: false
  }))
}
