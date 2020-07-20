'use strict'

const chai = require('chai')

const app = require('../app')

describe(`Testing app`, () => {
    it(`Initialization`, done => {
        chai.assert.exists(app)
        chai.assert.isObject(app)
        chai.assert.exists(app.ferramentas)
        chai.assert.isObject(app.ferramentas)
        done()
    })
})
