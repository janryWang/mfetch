var alias = require('../alias')
var pkg = require('../../package.json')
var _ = require('lodash')

// NOTE: 下文中的`pkg.name`会本作为文本直接替换到代码中，因而不符合js变量命名规则的name需要做额外的处理。

function moduleName() {
    return _.capitalize(_.camelCase(pkg.name))
}

module.exports = {
    'prod': {
        entry: 'src/index.js',
        dest: 'dist/index.min.js',
        format: 'umd',
        moduleName: moduleName()
    },
    'docs': {
        entry: 'src/index.js',
        dest: 'docs/index.js',
        format: 'umd',
        moduleName: moduleName()
    },
    'defaults': {
        plugins: {
            buble: {
                transforms: {
                    dangerousForOf: true
                }
            },
            alias: alias(),
            'node-resolve': {
                module: true, // Default: true
                jsnext: true, // Default: false
                main: true, // Default: true
                skip: [], // Default: []
                browser: true, // Default: false
                extensions: [
                    '.js', '.json'
                ],
                preferBuiltins: false // Default: true
            },
            'commonjs': true
        }
    }
}
