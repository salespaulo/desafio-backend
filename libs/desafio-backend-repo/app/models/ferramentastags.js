'use strict'

module.exports = (sequelize, DataTypes) => {
    const tags = sequelize.define(
        'ferramentastags',
        {
            ferramentaId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            tagId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {}
    )
    tags.associate = function (models) {
        models.ferramentastags.belongsTo(models.ferramentas)
        models.ferramentastags.belongsTo(models.tags)
    }
    return tags
}
