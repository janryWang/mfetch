var base = require('./karma.base.js')

module.exports = function(config) {
    config.set(Object.assign(base, {
        frameworks: ['benchmark'],
        files: ['../../benchmark/index.js'],
        preprocessors: {
            '../../benchmark/index.js': ['webpack', 'sourcemap']
        },
        browsers: ['Chrome'],
        reporters: ['benchmark'],
        singleRun: true
    }))
}