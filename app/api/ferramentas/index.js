'use strict'

const { ferramentas } = require('desafio-backend-core')

const { doApiError } = require('../../utils')

module.exports = (uriBase, router) => {
    const endpoint = `/${uriBase}/tools`

    router.post(`${endpoint}`, async ctx => {
        const ferramenta = ctx.request.body

        try {
            return await ferramentas.criar(ferramenta)
        } catch (e) {
            doApiError(`post ${endpoint}`, ctx, e)
        }
    })

    router.delete(`${endpoint}/:id`, async ctx => {
        const id = ctx.params.id

        try {
            return await ferramentas.excluirPorId(id)
        } catch (e) {
            doApiError(`delete ${endpoint}`, ctx, e)
        }
    })

    router.get(`${endpoint}?`, async ctx => {
        const tagId = ctx.query.tagId

        try {
            return await ferramentas.listarPorTag(tagId)
        } catch (e) {
            doApiError(`get ${endpoint} by tag=${tagId}`, ctx, e)
        }
    })

    router.get(`${endpoint}`, async _ctx => {
        try {
            return await ferramentas.listarTodos()
        } catch (e) {
            doApiError(`get ${endpoint}`, ctx, e)
        }
    })

    return router
}
