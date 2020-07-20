'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config')

const byFileJS = file => {
    const basename = path.basename(__filename)
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
}

const sequelize = new Sequelize(config.name, config.username, config.password, config)

const reduceToDB = (db, file) => {
    const model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
    return db
}

const db = fs.readdirSync(__dirname).filter(byFileJS).reduce(reduceToDB, {})

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
