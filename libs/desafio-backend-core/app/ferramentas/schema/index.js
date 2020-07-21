'use strict'

const { joi } = require('fvi-node-utils/app/objects')

const schema = joi.object({
    title: joi.string().required(),
    link: joi.string().uri().required(),
    description: joi.string().optional(),
    tags: joi.array().required(),
})

module.exports = schema
