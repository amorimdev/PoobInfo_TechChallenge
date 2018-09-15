/* eslint-env mocha */

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const expect = chai.expect
const server = require('../index')
const request = chai.request(server)

describe('Generate tests', () => {
  it('Expect to get hello world message', (done) => {
    request
      .get('/api')
      .end((err, res) => {
        expect(err).to.be.equal(null)
        expect(res).to.have.status(200)
        expect(res.body).to.be.have.property('message')
        expect(res.body.message).to.be.equal('Hello world!')
        done(null)
      })
  })

  after(() => server.close())
})
