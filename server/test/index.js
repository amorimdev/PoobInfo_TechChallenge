/* eslint-env mocha */

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const expect = chai.expect
const server = require('../index')
const httpStatusOK = 200
const httpStatusError = 500

let companyId
const companyCreateMock = require('./mock/company/create')
const companyUpdateMock = require('./mock/company/update')

let customerId
const customerCreateMock = require('./mock/customer/create')
const customerUpdateMock = require('./mock/customer/update')

describe('Application tests', () => {
  describe('Company tests', () => {
    it('Expect to not create company with invalid payload', (done) => {
      chai.request(server)
        .post('/companies')
        .send(companyCreateMock.invalidPayload)
        .type('json')
        .end((err, res) => {
          expect(err).to.be.equal(null)
          expect(res).to.have.status(httpStatusError)
          expect(res.body).to.be.have.property('status')
          expect(res.body.status).to.be.equal(false)
          expect(res.body).to.be.have.property('message')
          done()
        })
    })

    it('Expect to create company', (done) => {
      chai.request(server)
        .post('/companies')
        .send(companyCreateMock.payload)
        .type('json')
        .end((err, res) => {
          expect(err).to.be.equal(null)
          expect(res).to.have.status(httpStatusOK)
          expect(res.body).to.be.have.property('status')
          expect(res.body.status).to.be.equal(true)
          expect(res.body).to.be.have.property('result')
          expect(res.body.result).to.be.an('object')
          companyId = res.body.result._id
          done()
        })
    })

    it('Expect to not update company with invalid id', (done) => {
      chai.request(server)
        .put('/companies/invalid')
        .send(companyUpdateMock.payload)
        .type('json')
        .end((err, res) => {
          expect(err).to.be.equal(null)
          expect(res).to.have.status(httpStatusError)
          expect(res.body).to.be.have.property('status')
          expect(res.body.status).to.be.equal(false)
          expect(res.body).to.be.have.property('message')
          done()
        })
    })

    it('Expect to update company', (done) => {
      chai.request(server)
        .put(`/companies/${companyId}`)
        .send(companyUpdateMock.payload)
        .type('json')
        .end((err, res) => {
          expect(err).to.be.equal(null)
          expect(res).to.have.status(httpStatusOK)
          expect(res.body).to.be.have.property('status')
          expect(res.body.status).to.be.equal(true)
          expect(res.body).to.be.have.property('result')
          expect(res.body.result).to.be.an('object')
          done()
        })
    })

    it('Expect to find all company', (done) => {
      chai.request(server)
        .get(`/companies`)
        .type('json')
        .end((err, res) => {
          expect(err).to.be.equal(null)
          expect(res).to.have.status(httpStatusOK)
          expect(res.body).to.be.have.property('status')
          expect(res.body.status).to.be.equal(true)
          expect(res.body).to.be.have.property('result')
          expect(res.body.result).to.be.an('array')
          done()
        })
    })

    it('Expect to not find one company with invalid id', (done) => {
      chai.request(server)
        .get('/companies/invalid')
        .type('json')
        .end((err, res) => {
          expect(err).to.be.equal(null)
          expect(res).to.have.status(httpStatusError)
          expect(res.body).to.be.have.property('status')
          expect(res.body.status).to.be.equal(false)
          expect(res.body).to.be.have.property('message')
          done()
        })
    })

    it('Expect to find one company', (done) => {
      chai.request(server)
        .get(`/companies/${companyId}`)
        .type('json')
        .end((err, res) => {
          expect(err).to.be.equal(null)
          expect(res).to.have.status(httpStatusOK)
          expect(res.body).to.be.have.property('status')
          expect(res.body.status).to.be.equal(true)
          expect(res.body).to.be.have.property('result')
          expect(res.body.result).to.be.an('object')
          done()
        })
    })

    it('Expect to not delete company with invalid id', (done) => {
      chai.request(server)
        .delete('/companies/invalid')
        .type('json')
        .end((err, res) => {
          expect(err).to.be.equal(null)
          expect(res).to.have.status(httpStatusError)
          expect(res.body).to.be.have.property('status')
          expect(res.body.status).to.be.equal(false)
          expect(res.body).to.be.have.property('message')
          done()
        })
    })

    it('Expect to delete company', (done) => {
      chai.request(server)
        .delete(`/companies/${companyId}`)
        .end((err, res) => {
          expect(err).to.be.equal(null)
          expect(res).to.have.status(httpStatusOK)
          expect(res.body).to.be.have.property('status')
          expect(res.body.status).to.be.equal(true)
          done()
        })
    })
  })

  describe('Customer tests', () => {
    it('Expect to not create customer with invalid payload', (done) => {
      chai.request(server)
        .post('/customers')
        .send(customerCreateMock.invalidPayload)
        .type('json')
        .end((err, res) => {
          expect(err).to.be.equal(null)
          expect(res).to.have.status(httpStatusError)
          expect(res.body).to.be.have.property('status')
          expect(res.body.status).to.be.equal(false)
          expect(res.body).to.be.have.property('message')
          done()
        })
    })

    it('Expect to create customer', (done) => {
      chai.request(server)
        .post('/customers')
        .send(Object.assign(customerCreateMock.payload, { companyId }))
        .type('json')
        .end((err, res) => {
          expect(err).to.be.equal(null)
          expect(res).to.have.status(httpStatusOK)
          expect(res.body).to.be.have.property('status')
          expect(res.body.status).to.be.equal(true)
          expect(res.body).to.be.have.property('result')
          expect(res.body.result).to.be.an('object')
          customerId = res.body.result._id
          done()
        })
    })

    it('Expect to not update customer with invalid id', (done) => {
      chai.request(server)
        .put('/customers/invalid')
        .send(customerUpdateMock.payload)
        .type('json')
        .end((err, res) => {
          expect(err).to.be.equal(null)
          expect(res).to.have.status(httpStatusError)
          expect(res.body).to.be.have.property('status')
          expect(res.body.status).to.be.equal(false)
          expect(res.body).to.be.have.property('message')
          done()
        })
    })

    it('Expect to update customer', (done) => {
      chai.request(server)
        .put(`/customers/${customerId}`)
        .send(customerUpdateMock.payload)
        .type('json')
        .end((err, res) => {
          expect(err).to.be.equal(null)
          expect(res).to.have.status(httpStatusOK)
          expect(res.body).to.be.have.property('status')
          expect(res.body.status).to.be.equal(true)
          expect(res.body).to.be.have.property('result')
          expect(res.body.result).to.be.an('object')
          done()
        })
    })

    it('Expect to find all customer', (done) => {
      chai.request(server)
        .get(`/customers`)
        .type('json')
        .end((err, res) => {
          expect(err).to.be.equal(null)
          expect(res).to.have.status(httpStatusOK)
          expect(res.body).to.be.have.property('status')
          expect(res.body.status).to.be.equal(true)
          expect(res.body).to.be.have.property('result')
          expect(res.body.result).to.be.an('array')
          done()
        })
    })

    it('Expect to not find one customer with invalid id', (done) => {
      chai.request(server)
        .get('/customers/invalid')
        .type('json')
        .end((err, res) => {
          expect(err).to.be.equal(null)
          expect(res).to.have.status(httpStatusError)
          expect(res.body).to.be.have.property('status')
          expect(res.body.status).to.be.equal(false)
          expect(res.body).to.be.have.property('message')
          done()
        })
    })

    it('Expect to find one customer', (done) => {
      chai.request(server)
        .get(`/customers/${customerId}`)
        .type('json')
        .end((err, res) => {
          expect(err).to.be.equal(null)
          expect(res).to.have.status(httpStatusOK)
          expect(res.body).to.be.have.property('status')
          expect(res.body.status).to.be.equal(true)
          expect(res.body).to.be.have.property('result')
          expect(res.body.result).to.be.an('object')
          done()
        })
    })

    it('Expect to not delete customer with invalid id', (done) => {
      chai.request(server)
        .delete('/customers/invalid')
        .type('json')
        .end((err, res) => {
          expect(err).to.be.equal(null)
          expect(res).to.have.status(httpStatusError)
          expect(res.body).to.be.have.property('status')
          expect(res.body.status).to.be.equal(false)
          expect(res.body).to.be.have.property('message')
          done()
        })
    })

    it('Expect to delete customer', (done) => {
      chai.request(server)
        .delete(`/customers/${customerId}`)
        .end((err, res) => {
          expect(err).to.be.equal(null)
          expect(res).to.have.status(httpStatusOK)
          expect(res.body).to.be.have.property('status')
          expect(res.body.status).to.be.equal(true)
          done()
        })
    })
  })

  after(() => server.stop())
})
