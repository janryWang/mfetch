'use strict'
const fs = require('fs-extra')
const path = require('path')
const zlib = require('zlib')
const rollup = require('rollup')
const uglify = require('uglify-js')

//define the build script


def(function(argv, params) {
    var config = require(path.resolve(__dirname, '../config', params.config))
    var tag = params.tag
    var filter = (params.filter || '').split(',') //filter builds by dest path
    var tasks = []
    var defaults = config.defaults
    delete config.defaults
    if (config) {
        if (tag) {
            tasks.push(processConifg(config[tag], defaults))
        } else {
            tasks = keys(config).filter(
                (key) => filter.some(path => (config[key].dest || '').indexOf(path) > -1)
            ).map(key => processConifg(config[key], defaults))
        }
        build(tasks)
    }

})

function processConifg(config, defaults) {
    const plugins = extend({}, defaults.plugins, config.plugins)
    config = extend(defaults, config, {
        entry: config.entry ? path.resolve(process.cwd(), config.entry) : '',
        dest: config.dest ? path.resolve(process.cwd(), config.dest) : '',
        plugins: reduce(keys(plugins), (buf, key) => {
            if (plugins[key]) {
                return buf.concat(require('rollup-plugin-' + key)(isObject(plugins[key]) ? plugins[key] : undefined))
            }
            return buf
        }, [])
    })
    return config
}


function build(tasks) {
    let built = 0
    const total = tasks.length
    const next = () => {
        buildEntry(tasks[built]).then(() => {
            built++
            if (built < total) {
                next()
            }
        }).catch(logError)
    }

    next()
}


function buildEntry(config) {
    const isProd = /min\.js$/.test(config.dest)
    return rollup.rollup(config).then(bundle => {
        const code = bundle.generate(config).code
        if (isProd) {
            var minified = (config.banner ? config.banner + '\n' : '') + uglify.minify(code, {
                fromString: true,
                output: {
                    screw_ie8: true,
                    ascii_only: true
                }
            }).code
            return write(config.dest, minified).then(zip(config.dest))
        } else {
            return write(config.dest, code)
        }
    })
}

function write(dest, code) {
    return new Promise(function(resolve, reject) {
        fs.ensureFile(dest, function(err) {
            if (err) return reject(err)
            fs.writeFile(dest, code, function(err) {
                if (err) return reject(err)
                console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code))
                resolve()
            })
        })
    })
}

function zip(file) {
    return function() {
        return new Promise(function(resolve, reject) {
            fs.readFile(file, function(err, buf) {
                if (err) return reject(err)
                zlib.gzip(buf, function(err, buf) {
                    if (err) return reject(err)
                    write(file + '.gz', buf).then(resolve)
                })
            })
        })
    }
}


function getSize(code) {
    return (code.length / 1024).toFixed(2) + 'kb'
}

function logError(e) {
    console.log(e)
}

function blue(str) {
    return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}