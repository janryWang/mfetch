

window.shouldHaveApis = function shouldHaveApis(target, apis) {
    apis = apis.split(',')
    apis.forEach((key) => {
        should.exist(target[key])
    })
}