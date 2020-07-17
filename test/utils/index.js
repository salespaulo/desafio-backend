'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')

const { inspect } = require('fvi-node-utils/app/objects')

chai.use(chaiHttp)
chai.should()

const verifyResponseStatusEquals = (res, status) => {
    if (status instanceof Array) {
        chai.assert.exists(
            status.find(s => s === res.status),
            `response.status != ${inspect(status)}`
        )
    } else {
        chai.assert.equal(status, res.status, `response.status != ${status}`)
    }
}

const verifyResponseStatusDiff = (res, status) => {
    chai.assert.notEqual(status, res.status, `response.status == ${status}`)
}

const verifyResponseBodyEquals = (res, equalsBody) => {
    verifyResponseStatusEquals(res, 200)
    chai.assert.deepEqual(equalsBody, res.body, `response.body != ${inspect(equalsBody)}`)
}

module.exports = {
    verifyResponseBodyEquals,
    verifyResponseStatusDiff,
    verifyResponseStatusEquals,
}
