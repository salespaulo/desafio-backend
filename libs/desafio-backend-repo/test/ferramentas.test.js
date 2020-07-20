'use strict'

const chai = require('chai')
const { v4 } = require('uuid')

const app = require('../app')

const checkOne = (res, ferramenta) => {
    chai.assert.exists(res)
    chai.assert.exists(res.id)
    chai.assert.exists(res.title)
    chai.assert.equal(ferramenta.title, res.title)

    chai.assert.exists(res.link)
    chai.assert.equal(ferramenta.link, res.link)
    chai.assert.exists(res.title)
    chai.assert.equal(ferramenta.link, res.link)
    chai.assert.exists(res.description)
    chai.assert.equal(ferramenta.description, res.description)
}

describe(`Testing ferramentas`, () => {
    const ferramentas = app.ferramentas
    const title = `hotel-${v4()}`
    const link = 'https://github.com/typicode/hotel'
    const description =
        'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.'
    let tags = [`node-${v4()}`, `java-${v4()}`, `python-${v4()}`]
    let createdId = null
    let ferramenta = null

    before(async () => {
        await app.tags.bulkCreate(tags.map(id => ({ id })))
    })

    beforeEach(() => {
        ferramenta = {
            title,
            link,
            description,
        }
    })

    it(`Create one - Validation - without title`, done => {
        delete ferramenta.title
        ferramentas
            .create(ferramenta)
            .then(_res => done(`Should be throws an error!`))
            .catch(e => {
                chai.assert.isTrue(e.message.indexOf('ferramentas.title cannot be null') > 0)
                done()
            })
            .catch(done)
    })

    it(`Create one - Validation - without link`, done => {
        delete ferramenta.link
        ferramentas
            .create(ferramenta)
            .then(_res => done(`Should be throws an error!`))
            .catch(e => {
                chai.assert.isTrue(e.message.indexOf('ferramentas.link cannot be null') > 0)
                done()
            })
            .catch(done)
    })

    it(`Create one - OK`, done => {
        ferramentas
            .create(ferramenta)
            .then(res => {
                createdId = res.id
                checkOne(res.get(), ferramenta)
                done()
            })
            .catch(done)
    })

    it(`Find by PK - OK`, done => {
        ferramentas
            .findByPk(createdId)
            .then(res => {
                checkOne(res.get(), ferramenta)
                done()
            })
            .catch(done)
    })

    it(`Find All - OK`, done => {
        ferramentas
            .findAll()
            .then(res => {
                chai.assert.exists(res)
                chai.assert.isArray(res)
                chai.assert.isNotEmpty(res)
                done()
            })
            .catch(done)
    })

    it(`Insert Tags - OK`, done => {
        ferramentas
            .findByPk(createdId)
            .then(res => res.addTags(tags))
            .then(res => {
                chai.assert.exists(res)
                done()
            })
            .catch(done)
    })

    it(`Find by PK with Tags - OK`, done => {
        ferramentas
            .findByPk(createdId, { include: 'tags' })
            .then(res => {
                const data = res.get()
                checkOne(data, ferramenta)
                chai.assert.exists(data.tags)
                chai.assert.isTrue(data.tags.length > 0)
                done()
            })
            .catch(done)
    })

    it(`Update one - OK`, done => {
        ferramenta.title = `Updated-${v4()}`
        ferramentas
            .update(ferramenta, { where: { id: createdId } })
            .then(res => {
                chai.assert.exists(res)
                chai.assert.isArray(res)
                chai.assert.isNotEmpty(res)
                chai.assert.equal(1, res[0])
                done()
            })
            .catch(done)
    })
})
