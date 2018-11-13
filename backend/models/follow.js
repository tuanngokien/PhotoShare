'use strict';
module.exports = (sequelize, DataTypes) => {
    const follow = sequelize.define('follow', {}, {});
    follow.associate = function (models) {
        follow.belongsTo(models.User, {as: 'follow_by_user', foreignKey: 'follow_by'});
        follow.belongsTo(models.User, {as: 'follow_to_user', foreignKey: 'follow_to',})
    };
    return follow;
};