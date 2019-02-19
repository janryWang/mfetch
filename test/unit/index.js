import { fetch, interceptor, resource, extension } from 'mfetch'


const fancy = (message, callback) => {
    describe(message, () => {
        callback((url, cases) => {
            Object.keys(cases).forEach((key) => {
                it(key, function() {
                     return fetch(url).then(cases[key])
                })
            })
        })
    })
}

global.fancy = fancy


// import all helpers
const helpersContext = require.context('../helpers', true)
helpersContext.keys().forEach(helpersContext)

// require all test files
const testsContext = require.context('./', true, /\.spec$/)
testsContext.keys().forEach(testsContext)
