'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('ferramentastags', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            ferramentaId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'ferramentas',
                    key: 'id',
                },
            },
            tagId: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'tags',
                    key: 'id',
                },
            },
            createdAt: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false,
            },
            updatedAt: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false,
            },
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('ferramentastags')
    },
}
