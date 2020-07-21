'use strict'

const { debug, objects } = require('fvi-node-utils')
const { sequelize, ferramentas, tags, ferramentastags } = require('desafio-backend-repo')

const schema = require('./schema')
const { APP_PREFIX } = require('../utils')

const validarFerramenta = obj => {
    const { value, error } = schema.validate(obj)

    if (error != null) {
        throw new Error(`Invalid input schema error=${objects.inspect(error)}`)
    }

    return value
}

const buscarPorId = async id => {
    debug.here(`${APP_PREFIX}: Buscando Ferramenta Por id=${id}`)
    const data = await ferramentas.findByPk(id, { include: 'tags' })
    data.tags = data.tags.map(t => t.id)
    return data
}

const criar = async obj => {
    const value = validarFerramenta(obj)
    debug.here(`${APP_PREFIX}: Criando ferramenta=${objects.inspect(value)}`)

    const transaction = await sequelize.transaction()

    try {
        const tagsExist = await tags.findAll({ where: { id: value.tags } })
        const tagsNExist = value.tags.filter(id => !tagsExist.map(t => t.id).includes(id))

        if (tagsNExist.length > 0) {
            await tags.bulkCreate(
                tagsNExist.map(id => ({ id })),
                { transaction }
            )
        }

        const data = await ferramentas.create(value, { transaction })
        await data.setTags(value.tags, { transaction })

        await transaction.commit()
        return buscarPorId(data.id)
    } catch (e) {
        await transaction.rollback()
        throw e
    }
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

const listarPor = async query => {
    debug.here(`${APP_PREFIX}: Listar Ferramenta Por query=${objects.inspect(query)}`)
    const data = await ferramentas.findAll({ where: query }, { include: 'tags' })
    data.tags = data.tags.map(t => t.id)
    return data
}

module.exports = {
    criar,
    excluirPorId,
    buscarPorId,
    listarPorTag,
    listarTodos,
    listarPor,
}
