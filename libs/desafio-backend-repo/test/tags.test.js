'use strict'

const chai = require('chai')

const app = require('../app')

const checkOne = (res, tag) => {
    chai.assert.exists(res)
    chai.assert.exists(res.id)
    chai.assert.equal(tag.id, res.id)
}

describe(`Testing tags`, () => {
    const tags = app.tags
    const id = 'test'

    let createdId = null
    let tag = null

    beforeEach(() => {
        tag = { id }
    })

    it(`Create one - OK`, done => {
        tags.create(tag)
            .then(res => {
                checkOne(res, tag)
                done()
            })
            .catch(done)
    })

    it(`Find by PK - OK`, done => {
        tags.findByPk(id)
            .then(res => {
                checkOne(res, tag)
                done()
            })
            .catch(done)
    })

    it(`Find All - OK`, done => {
        tags.findAll()
            .then(res => {
                chai.assert.exists(res)
                chai.assert.isArray(res)
                chai.assert.isNotEmpty(res)
                done()
            })
            .catch(done)
    })

    it(`Delete one - OK`, done => {
        tags.destroy({ where: { id } })
            .then(res => {
                chai.assert.exists(res)
                chai.assert.equal(1, res)
                done()
            })
            .catch(done)
    })
})
