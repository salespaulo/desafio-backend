'use strict'

const { config } = require('fvi-node-utils')

module.exports = config({
    logger: {
        level: {
            doc: 'Logger level.',
            format: String,
            default: 'info',
            env: 'LOGGER_LEVEL',
            arg: 'logger-level',
        },
    },
})
