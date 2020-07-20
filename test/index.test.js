'use strict'

const chai = require('chai')

const start = require('../app/start')

describe('Testing ./start.js', () => {
    it('Testing Init - OK', done => {
        start()
            .then(ctx => {
                chai.assert.exists(ctx)
                done()
            })
            .catch(done)
    })
})
