'use strict';
module.exports = function (sequelize, DataTypes) {
    const Tag = sequelize.define('Tag', {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },{
        timestamps: false,
    });

    Tag.associate = function (models) {
        Tag.belongsToMany(models.Photo, {through: models.PhotoTag, timestamps: false});
    };
    return Tag;
};