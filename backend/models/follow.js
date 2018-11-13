'use strict';
module.exports = (sequelize, DataTypes) => {
  const follow = sequelize.define('follow', {
    follow_by: DataTypes.BIGINT,
    follow_to: DataTypes.BIGINT
  }, {});
  follow.associate = function (models) {
    follow.belongsToMany(models.User, { foreignKey: 'follow_by'});
    follow.hasMany(models.User, {foreignKey: 'follow_to'})
  };
  follow.prototype.toJSON = function() {
    let data = this.dataValues;
    return data;
  }
  return follow;
};