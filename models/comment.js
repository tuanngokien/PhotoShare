'use strict';
module.exports = function (sequelize, DataTypes) {
    const Comment = sequelize.define('Comment', {
        text: DataTypes.STRING,
    });
    Comment.associate = function (models) {
        Comment.belongsTo(models.User, { foreignKey: { allowNull: false }});
        Comment.belongsTo(models.Post, { foreignKey: { allowNull: false }});
    };
    return Comment;
};