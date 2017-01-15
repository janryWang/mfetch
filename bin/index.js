var _ = require('lodash')
var argv = require('optimist').argv

/**
 * register glbal vars
 */

Object.assign(global,_)

global.getArgv = function(name){ return argv[name]}

global.def = function(fn){
    var targets = argv._
    var params = Object.assign(argv)
    delete params['_']
    if(isFunction(fn)){
        fn(targets,params)
    }
}

var module = getArgv('script')

if(module){
    require(module)
}
