'use strict';
module.exports = (sequelize, DataTypes) => {
  const follow = sequelize.define('follow', {
    follow_by: DataTypes.INTEGER,
    follow_to: DataTypes.INTEGER
  }, {});
  follow.associate = function (models) {
    follow.belongsTo(models.User, { foreignKey: { allowNull: false }});
  };
  follow.prototype.toJSON = function() {
    let data = this.dataValues;
    return data;
  }
  return follow;
};