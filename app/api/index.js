'use strict'

const usuarios = require('./usuarios')
const ferramentas = require('./ferramentas')

const URI = '/api'

module.exports = actor => {
    const router = new actor.Router()

    usuarios(URI, router)
    ferramentas(URI, router)

    return router
}
