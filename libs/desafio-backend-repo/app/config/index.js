'use strict'

const path = require('path')
const { config } = require('fvi-node-utils')

const instance = config({
    database: {
        name: {
            doc: 'Sequelize database name.',
            format: String,
            default: 'database',
            env: 'DATABASE_NAME',
            arg: 'database-name',
        },
        username: {
            doc: 'Sequelize database username.',
            format: String,
            default: 'admin',
            env: 'DATABASE_USER',
            arg: 'database-user',
        },
        password: {
            doc: 'Sequelize database password.',
            format: String,
            default: 'admin',
            env: 'DATABASE_PASSWORD',
            arg: 'database-password',
        },
        dialect: {
            doc: 'Sequelize dialect.',
            format: ['sqlite', 'postgres'],
            default: 'sqlite',
            env: 'DATABASE_DIALECT',
            arg: 'database-dialect',
        },
    },
})

const getCfg = database => {
    switch (database.dialect) {
        case 'sqlite': {
            database.storage = path.join(path.resolve(), database.storage)
            return database
        }
        default:
            return database
    }
}

module.exports = getCfg(instance.get('database'))
