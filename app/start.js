'use strict'

const actors = require('fvi-actor-system')

const ServerActor = require('fvi-koa-server-actor')
const {debug, objects} = require('fvi-node-utils')

const config = require('./config')
const logger = require('./logger')

const Api = require('./api')

const setApis = (actor, server) => {
    const api = Api(actor)
    server.use(actor.mount('/', actor.serve(actor.STATIC_DIR)))
    return server.use(api.routes()).use(api.allowedMethods())
}

const load = async sys => {
    const root = await sys.rootActor()
    const serverActor = await ServerActor(root, config)

    return { sys, root, serverActor }
}

const run = async ctx => {
    const server = await ctx.serverActor.start()

    return {
        ...ctx,
        server: setApis(ctx.serverActor, server),
        close: () => {
            // Destroy all actors
            ctx.sys.destroy()
        },
    }
}

const log = ctx => {
    logger.debug(
        `[${ctx.server.info.name}][${
            ctx.server.info.version
        }]: Application server=${objects.inspect(ctx.server.env)}`
    )
    logger.info(
        `[${ctx.server.info.name}][${ctx.server.info.version}]: Listening on ${ctx.server.env.ip}:${ctx.server.env.port}`
    )

    return ctx
}

const throwsError = e => {
    // Always print error
    debug.here(`[error][faltal] info=${objects.inspect(e)}`)

    const error = objects.toErrorStack(e, log => {
        logger.error(`Stack Error: ${log}`)
    })

    objects
        .toErrorTrace(e)
        .then(trace => logger.error(`Trace Error: ${objects.inspect(trace)}`))
        .catch(e => debug.here(`[error][fatal] info=${objects.inspect(e)}`))

    throw error
}

const newActorSystem = () => {
    return actors(config.get('logger'))
}

const start = (sys = null) =>
    load(sys || newActorSystem())
        .then(run)
        .then(log)
        .catch(throwsError)

module.exports = start
