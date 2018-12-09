'use strict';

const postPrivacy = {
    PRIVATE: "1",
    FRIEND: "2",
    PUBLIC: "3"
};

module.exports = function (sequelize, DataTypes) {
    const Post = sequelize.define('Post', {
        privacy: {
            type: DataTypes.ENUM,
            values: Object.values(postPrivacy),
            allowNull: false,
            defaultValue: postPrivacy.PRIVATE,
        },
        viewCount: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0,
        }
    });

    Post.associate = function (models) {
        Post.belongsTo(models.User, {foreignKey: {allowNull: false}});
        Post.hasMany(models.Photo);
        Post.belongsToMany(models.User, {through: 'UserPostLikes', as: 'Likes'});
        Post.hasMany(models.Comment);
        Post.hasMany(models.Bookmark, {foreignKey: 'post_id', as: 'postId'})
    };

    Post.postPrivacy = postPrivacy;
    return Post;
};