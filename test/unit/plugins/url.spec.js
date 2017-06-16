import { fetch, interceptor, resource, extension } from 'mfetch'

const fancy = (message, callback) => {
    describe(message, () => {
        callback((url, cases) => {
            Object.keys(cases).forEach((key) => {
                it(key, () => {
                    fetch(url).then(cases[key])
                })
            })
        })
    })
}


describe('sample url', () => {
    fancy('//aa.bb.cc', (fetch) => {

        fetch('//aa.bb.cc', {
            'should be exist': (options) => {
                should.exist(options.url)
            },
            'should be equal //aa.bb.cc': (options) => {
                options.url.should.be.equal('//aa.bb.cc')
            }
        })
    })

    fancy('//aa.bb.cc', (fetch) => {

        fetch('//aa.bb.cc', {
            'should be exist': (options) => {
                should.exist(options.url)
            },
            'should be equal //aa.bb.cc': (options) => {
                options.url.should.be.equal('//aa.bb.cc')
            }
        })
    })

    fancy('/aa/bb/cc', (fetch) => {

        fetch('/aa/bb/cc', {
            'should be exist': (options) => {
                should.exist(options.url)
            },
            'should be equal /aa/bb/cc': (options) => {
                options.url.should.be.equal('/aa/bb/cc')
            }
        })
    })
})

describe('sample url with params', () => {
    fancy('//aa.bb.cc?p1=v1&p2=v2&p3=v3', (fetch) => {
        fetch('//aa.bb.cc?p1=v1&p2=v2&p3=v3', {
            'should have params': (options) => {
                (options.url.indexOf('?p1=v1&p2=v2&p3=v3') > -1).should.be.true
            }
        })

        fetch({
            url: '//aa.bb.cc?p1=v1&p2=v2&p3=v3',
            params: {
                p4: 'v4',
                p5: 'v5'
            }
        }, {
                'should have params': (options) => {
                    (options.url.indexOf('?p1=v1&p2=v2&p3=v3&p4=v4&p5=v5') > -1).should.be.true()
                }
            })

        fetch({
            url: '//aa.bb.cc?p1=v1&p2=v2&p3=v3&p8={"p9":"v9"}',
            params: {
                p4: 'v4',
                p5: 'v5'
            }
        }, {
                'should have params': (options) => {
                    should(options.url.indexOf('?p1=v1&p2=v2&p3=v3&p4=v4&p5=v5&p8=' + encodeURIComponent('{"p9":"v9"}')) > -1).be.true()
                }
            })

    })
})

describe('sample url with hash', () => {
    fancy('//aa.bb.cc?aa=bb&cc=dd#/asdd/bb/mmm', (fetch) => {
        fetch('//aa.bb.cc?aa=bb&cc=dd#/asdd/bb/mmm', {
            'should be exist': (options) => {
                should.exist(options.url)
            },
            'should be equal //aa.bb.cc?aa=bb&cc=dd#/asdd/bb/mmm': (options) => {
                options.url.should.be.equal('//aa.bb.cc?aa=bb&cc=dd#/asdd/bb/mmm')
            }
        })
    })

    fancy('/aa/bb/cc?aa=bb&cc=dd#/asdd/bb/mmm', (fetch) => {
        fetch({
            url:'/aa/bb/cc?aa=bb&cc=dd#/asdd/bb/mmm',
            params:{
                aa:123,
                bb:321
            }
        }, {
            'should be exist': (options) => {
                should.exist(options.url)
            },
            'should be equal /aa/bb/cc?aa=123&bb=321&cc=dd#/asdd/bb/mmm': (options) => {
                options.url.should.be.containEql('/aa/bb/cc?aa=123&bb=321&cc=dd#/asdd/bb/mmm')
            }
        })
    })
})

describe('template url', () => {
    fancy('//xxx', () => {

    })
})

describe('template url with params', () => {
    fancy('//xxx', () => {

    })
})

describe('template url with hash', () => {
    fancy('//xxx', () => {

    })
})