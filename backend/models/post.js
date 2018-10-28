'use strict';
module.exports = function (sequelize, DataTypes) {
    const Post = sequelize.define('Post', {
        caption: {
            type: DataTypes.TEXT,
            defaultValue: "",
        }
    });

    Post.associate = function (models) {
        Post.belongsTo(models.User, { foreignKey: { allowNull: false }});
        Post.hasMany(models.Photo);
        Post.belongsToMany(models.User, {through: 'UserPostLikes', as: 'Likes'});
        Post.hasMany(models.Comment);
    };
    return Post;
};