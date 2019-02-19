var base = require('./karma.base.js')

module.exports = function (config) {
  config.set(Object.assign(base, {
    browsers: ['Chrome'],
    reporters: ['progress'],
    singleRun: true
  }))
}
