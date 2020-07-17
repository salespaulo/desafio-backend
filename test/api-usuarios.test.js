'use strict'

const chai = require('chai')
const { v4 } = require('uuid')

const app = require('../app/start')

const API_URL = '/api/usuarios'

describe(`Testing API ${API_URL}`, () => {
    const uuid = v4()

    let ctx = null
    let usuario = null

    before(async () => (ctx = await app()))

    after(async () => {
        return await ctx.close()
    })

    beforeEach(() => {
        usuario = { id: uuid }
    })

})
