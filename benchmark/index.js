// require all test files
const testsContext = require.context('./', true, /\.bench$/)
testsContext.keys().forEach(testsContext)