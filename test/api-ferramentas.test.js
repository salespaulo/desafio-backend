'use strict'

const chai = require('chai')
const { v4 } = require('uuid')

const app = require('../app/start')

const utils = require('./utils')

const API_URL = '/api/tools'

describe(`Testing API ${API_URL}`, () => {
    const title = `hotel-${v4()}`
    const link = 'https://github.com/typicode/hotel'
    const description =
        'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.'
    const tags = ['node', 'organizing', 'webapps', 'domain', 'developer', 'https', 'proxy']

    let ctx = null
    let createdId = null
    let ferramenta = null

    before(async () => (ctx = await app()))

    after(async () => {
        return await ctx.close()
    })

    beforeEach(() => {
        ferramenta = {
            title,
            link,
            description,
            tags,
        }
    })

    it(`Criar - OK`, done => {
        chai.request(ctx.server.instance)
            .post(`${API_URL}`)
            .send(ferramenta)
            .then(res => {
                createdId = res.body.id
                utils.verifyResponseStatusEquals(res, 201)
                chai.assert.exists(res.body.id)
                done()
            })
            .catch(done)
    })

    it(`Testing GET ${API_URL}`, done => {
        chai.request(ctx.server.instance)
            .get(`${API_URL}`)
            .then(res => {
                utils.verifyResponseStatusEquals(res, 200)
                chai.assert.isTrue(res.body.length > 0, 'res.body.length is not > "0"')
                done()
            })
            .catch(done)
    })

    it(`Testing GET ${API_URL}?tag=`, done => {
        chai.request(ctx.server.instance)
            .get(`${API_URL}?tag=${ferramenta.tags[0]}`)
            .then(res => {
                utils.verifyResponseStatusEquals(res, 200)
                chai.assert.isTrue(res.body.length > 0, 'res.body.length is not > "0"')
                done()
            })
            .catch(done)
    })

    it(`Testing GET ${API_URL}/:id`, done => {
        chai.request(ctx.server.instance)
            .get(`${API_URL}/${createdId}`)
            .then(res => {
                utils.verifyResponseStatusEquals(res, 200)
                chai.assert.exists(res.body.id)
                done()
            })
            .catch(done)
    })

    it(`Testing DELETE ${API_URL}/:id`, done => {
        chai.request(ctx.server.instance)
            .delete(`${API_URL}/${createdId}`)
            .then(res => {
                utils.verifyResponseStatusEquals(res, 204)
                done()
            })
            .catch(done)
    })
})
