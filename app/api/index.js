'use strict'

const ferramentas = require('./ferramentas')

const URI = '/api'

module.exports = actor => {
    const router = new actor.Router()

    ferramentas(URI, router)

    return router
}
