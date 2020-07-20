'use strict'

const { ferramentas } = require('desafio-backend-core')

const logger = require('../../logger')
const { APP_PREFIX, doApiError } = require('../../utils')

module.exports = (uriBase, router) => {
    const endpoint = `${uriBase}/tools`

    router.post(`${endpoint}`, async ctx => {
        const ferramenta = ctx.request.body
        logger.info(`${APP_PREFIX}: Criando ferramenta=${ferramenta.title}`)

        try {
            const data = await ferramentas.criar(ferramenta)

            ctx.status = 201
            ctx.body = data
        } catch (e) {
            doApiError(`post ${endpoint}`, ctx, e)
        }
    })

    router.delete(`${endpoint}/:id`, async ctx => {
        const id = ctx.params.id
        logger.info(`${APP_PREFIX}: Excluindo Ferramenta Por id=${id}`)

        try {
            await ferramentas.excluirPorId(id)

            ctx.status = 204
            ctx.body = null
        } catch (e) {
            doApiError(`delete ${endpoint}`, ctx, e)
        }
    })

    router.get(`${endpoint}/:id`, async ctx => {
        const id = ctx.params.id
        logger.info(`${APP_PREFIX}: Buscando Ferramenta Por id=${id}`)

        try {
            const data = await ferramentas.buscarPorId(id)

            ctx.status = 200
            ctx.body = data
        } catch (e) {
            doApiError(`get ${endpoint} by tag=${tagId}`, ctx, e)
        }
    })

    router.get(`${endpoint}`, async ctx => {
        const tagId = ctx.query.tagId

        try {
            let data = null

            if (tagId == null) {
                logger.info(`${APP_PREFIX}: Buscando Todas Ferramentas`)
                data = await ferramentas.listarTodos()
            } else {
                logger.info(`${APP_PREFIX}: Buscando Ferramentas Por tagId=${tagId}`)
                data = await ferramentas.listarPorTag(tagId)
            }

            ctx.status = 200
            ctx.body = data
        } catch (e) {
            doApiError(`get ${endpoint} by tag=${tagId}`, ctx, e)
        }
    })

    return router
}
