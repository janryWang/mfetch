var webpack = require('webpack')
var alias = require('../alias')
var pkg = require('../../package.json')

var webpackConfig = {
    resolve: {
        alias: alias()
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            },
            'VERSION': JSON.stringify(pkg.version)
        })
    ],
    devtool: '#inline-source-map'
}

// shared config for all unit tests
module.exports = {
    frameworks: ['jasmine', 'should'],
    files: [
        '../../test/unit/index.js'
    ],
    preprocessors: {
        '../../test/unit/index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
        noInfo: true
    }
}
