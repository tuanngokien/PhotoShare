'use strict';
module.exports = function (sequelize, DataTypes) {
    const PhotoTag = sequelize.define('PhotoTag', {}, {
        timestamps: false,
    });

    PhotoTag.associate = function (models) {
        PhotoTag.belongsTo(models.Tag, {foreignKey: {allowNull: false}});
    };

    return PhotoTag;
};