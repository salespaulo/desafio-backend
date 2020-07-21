'use strict'

const path = require('path')
const { inspect, toErrorStack } = require('fvi-node-utils/app/objects')

const logger = require('../logger')

const APP_PREFIX = `[${path.basename(path.resolve())}]`

const logAndReturnError = (execId, error) => {
    return toErrorStack(error, log =>
        logger.error(`${APP_PREFIX}${execId}${log}: ${inspect(error)}`)
    )
}

const doApiError = (execId, ctx, e) => {
    const error = logAndReturnError(execId, e)
    const indexOf = error.message.indexOf('!')
    const msg = indexOf > 0 ? error.message.substr(0, indexOf) : error.message

    ctx.status = error.code
    ctx.body = msg
}

module.exports = {
    APP_PREFIX,
    doApiError,
}
