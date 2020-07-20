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
    chai.assert.exists(res.description)
    chai.assert.equal(ferramenta.description, res.description)
}

describe(`Testing app.ferramentas`, () => {
    const ferramentas = app.ferramentas
    const title = `hotel-${v4()}`
    const link = 'https://github.com/typicode/hotel'
    const description =
        'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.'
    const tags = ['node', 'organizing', 'webapps', 'domain', 'developer', 'https', 'proxy']

    let createdId = null
    let ferramenta = null

    beforeEach(() => {
        ferramenta = {
            title,
            link,
            description,
            tags,
        }
    })

    it(`Initialization`, done => {
        chai.assert.exists(ferramentas.criar)
        chai.assert.isFunction(ferramentas.criar)
        chai.assert.exists(ferramentas.excluirPorId)
        chai.assert.isFunction(ferramentas.excluirPorId)
        chai.assert.exists(ferramentas.buscarPorId)
        chai.assert.isFunction(ferramentas.buscarPorId)
        chai.assert.exists(ferramentas.listarTodos)
        chai.assert.isFunction(ferramentas.listarTodos)
        chai.assert.exists(ferramentas.listarPor)
        chai.assert.isFunction(ferramentas.listarPor)
        done()
    })

    it(`Criar - Validation - without title`, done => {
        delete ferramenta.title
        ferramentas
            .criar(ferramenta)
            .then(_res => done(`Should be throws an error!`))
            .catch(e => {
                chai.assert.isTrue(e.message.indexOf(`"title"`) > 0)
                done()
            })
            .catch(done)
    })

    it(`Criar - Validation - without tags`, done => {
        delete ferramenta.tags
        ferramentas
            .criar(ferramenta)
            .then(_res => done(`Should be throws an error!`))
            .catch(e => {
                chai.assert.isTrue(e.message.indexOf(`"tags"`) > 0)
                done()
            })
            .catch(done)
    })

    it(`Criar - Validation - without link`, done => {
        delete ferramenta.link
        ferramentas
            .criar(ferramenta)
            .then(_res => done(`Should be throws an error!`))
            .catch(e => {
                chai.assert.isTrue(e.message.indexOf(`"link"`) > 0)
                done()
            })
            .catch(done)
    })

    it(`Criar - Validation - invalid link`, done => {
        ferramenta.link = 'INVALID'
        ferramentas
            .criar(ferramenta)
            .then(_res => done(`Should be throws an error!`))
            .catch(e => {
                chai.assert.isTrue(e.message.indexOf(`"link"`) > 0)
                done()
            })
            .catch(done)
    })

    it(`Criar - OK`, done => {
        ferramentas
            .criar(ferramenta)
            .then(res => {
                createdId = res.id
                checkOne(res, ferramenta)
                done()
            })
            .catch(done)
    })

    it(`Buscar Por Id - OK`, done => {
        ferramentas
            .buscarPorId(createdId)
            .then(res => {
                checkOne(res, ferramenta)
                done()
            })
            .catch(done)
    })

    it(`Listar Todos - OK`, done => {
        ferramentas
            .listarTodos()
            .then(res => {
                chai.assert.exists(res)
                chai.assert.isArray(res)
                chai.assert.isNotEmpty(res)
                done()
            })
            .catch(done)
    })

    it(`Listar Por query - OK`, done => {
        ferramentas
            .listarPor({ title: ferramenta.title })
            .then(res => {
                chai.assert.exists(res)
                chai.assert.isArray(res)
                chai.assert.isNotEmpty(res)
                done()
            })
            .catch(done)
    })

    it(`Listar Por tag - OK`, done => {
        ferramentas
            .listarPorTag(ferramenta.tags[0])
            .then(res => {
                chai.assert.exists(res)
                chai.assert.isArray(res)
                chai.assert.isNotEmpty(res)
                done()
            })
            .catch(done)
    })

    it(`Excluir Por Id - OK`, done => {
        ferramentas
            .excluirPorId(createdId)
            .then(res => {
                chai.assert.equal(createdId, res.id)
                done()
            })
            .catch(done)
    })
})
