var path = require('path')
var _ = require('lodash')
var pkg = require(path.resolve(__dirname, '../../package.json'))

module.exports = function(alias) {
    alias = _.extend({}, pkg.alias, alias)
    _.each(alias, (_path, key) => {
        alias[key] = path.resolve(__dirname, '../../src')
    })
    return alias
}
