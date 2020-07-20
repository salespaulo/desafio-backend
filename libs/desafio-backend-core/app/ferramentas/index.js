'use strict'

const { debug, objects } = require('fvi-node-utils')
const { ferramentas, tags, ferramentastags } = require('desafio-backend-repo')

const schema = require('./schema')
const { APP_PREFIX } = require('../utils')

const validarFerramenta = obj => {
    const { value, error } = schema.validate(obj)

    if (error != null) {
        throw new Error(`Invalid input schema error=${objects.inspect(error)}`)
    }

    return value
}

const buscarPorId = id => {
    debug.here(`${APP_PREFIX}: Buscando Ferramenta Por id=${id}`)
    return ferramentas.findByPk(id, { include: 'tags' })
}

const criar = async obj => {
    const value = validarFerramenta(obj)
    debug.here(`${APP_PREFIX}: Criando ferramenta=${objects.inspect(value)}`)

    const data = await ferramentas.create(value)
    const promises = value.tags.map(async id => {
        const dataTag = await tags.findByPk(id)

        if (dataTag == null) {
            return tags.create({ id })
        }

        return dataTag
    })

    const dataTags = await Promise.all(promises)
    await data.setTags(dataTags.map(tag => tag.id))

    return buscarPorId(data.id)
}

const excluirPorId = async id => {
    const data = await ferramentas.findByPk(id)
    debug.here(`${APP_PREFIX}: Excluindo ferramenta=${objects.inspect(data)}`)

    await data.setTags([])
    await ferramentas.destroy({ where: { id } })
    return data
}

const listarPorTag = async tagId => {
    debug.here(`${APP_PREFIX}: Listar Ferramentas Por tag=${tagId}`)
    const data = await ferramentastags.findAll({ where: { tagId } })
    const ferramentaIds = data.map(d => d.ferramentaId)
    return listarPor({ id: ferramentaIds })
}

const listarTodos = () => {
    debug.here(`${APP_PREFIX}: Listando Todas Ferramentas`)
    return ferramentas.findAll()
}

const listarPor = query => {
    debug.here(`${APP_PREFIX}: Listar Ferramenta Por query=${objects.inspect(query)}`)
    return ferramentas.findAll({ where: query }, { include: 'tags' })
}

module.exports = {
    criar,
    excluirPorId,
    buscarPorId,
    listarPorTag,
    listarTodos,
    listarPor,
}
