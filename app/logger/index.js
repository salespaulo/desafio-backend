'use strict'

const { logger } = require('fvi-node-utils')

const config = require('../config')

const instance = logger(config.get('logger'))

module.exports = instance
