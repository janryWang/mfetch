module.exports = {
    scripts: {
        build: {
            default: "NODE_ENV=development babel ./src --out-dir ./lib --copy-files",
            prod: "NODE_ENV=production node bin --script ./build --config ./build --tag prod",
            docs: "NODE_ENV=development node bin --script ./build --config ./build --tag docs"
        },
        lint: {

        },
        test: {
            default: 'karma start ./bin/config/karma.unit.js',
            dev: 'karma start ./bin/config/karma.dev.js',
            unit: 'karma start ./bin/config/karma.unit.js',
            perf: 'karma start ./bin/config/karma.benchmark.js',
            cover: 'karma start ./bin/config/karma.cover.js',
            e2e: ''
        }
    }
}