describe('test get method', () => {
  fancy('/aa/bb/ccc', fetch => {
    fetch(
      {
        url: '/aa/bb/ccc',
        params: {
          aa: '123',
          mm: 321
        }
      },
      {
        'method should be exist': options => {
          should.exist(options.method)
        },
        'method should be "get"': options => {
          options.method.should.be.equal('get')
        },
        'content-type should not be exist': options => {
          const res = /content-type/ig.test(JSON.stringify(options.headers))
          res.should.be.false()
        }
      }
    )
  })
})
