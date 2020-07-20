'use strict'

const chai = require('chai')

const app = require('../app')

const checkCrud = modelName => {
    chai.assert.exists(app[modelName])
    chai.assert.isFunction(app[modelName])
    chai.assert.exists(app[modelName].create)
    chai.assert.isFunction(app[modelName].create)
    chai.assert.exists(app[modelName].update)
    chai.assert.isFunction(app[modelName].update)
    chai.assert.exists(app[modelName].destroy)
    chai.assert.isFunction(app[modelName].destroy)
    chai.assert.exists(app[modelName].findByPk)
    chai.assert.isFunction(app[modelName].findByPk)
    chai.assert.exists(app[modelName].findAll)
    chai.assert.isFunction(app[modelName].findAll)
}

describe(`Testing app`, () => {
    it(`Initialization`, done => {
        checkCrud('ferramentas')
        done()
    })
})
