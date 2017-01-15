var base = require('./karma.base.js')

module.exports = function (config) {
  var options = Object.assign(base, {
    browsers: ['PhantomJS'],
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      reporters: [
        { type: 'lcov', dir: '../../coverage', subdir: '.' },
        { type: 'text-summary', dir: '../../coverage', subdir: '.' }
      ]
    },
    singleRun: true
  })

  // add babel-plugin-coverage for code intrumentation
  options.webpack.babel = {
    plugins: [['__coverage__', {
      ignore: [
        '../../test/'
      ]
    }]]
  }

  config.set(options)
}