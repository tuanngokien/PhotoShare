'use strict';
module.exports = function (sequelize, DataTypes) {
    const Photo = sequelize.define('Photo', {
        publicId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        width: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        originalImage: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            }
        },
        postImage: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            }
        },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            }
        },
    }, {
        timestamps: false,
    });

    Photo.associate = function (models) {
        Photo.belongsTo(models.Post);
        Photo.belongsToMany(models.Tag, {through: 'PhotoTags', timestamps: false});
    };
    return Photo;
};