'use strict'

module.exports = (sequelize, DataTypes) => {
    const tags = sequelize.define(
        'tags',
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
            },
        },
        {}
    )
    tags.associate = function (models) {
        models.tags.belongsToMany(models.ferramentas, {
            through: models.ferramentastags,
            as: 'ferramentas',
        })
    }
    return tags
}
