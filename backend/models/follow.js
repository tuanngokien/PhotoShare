'use strict';
module.exports = (sequelize, DataTypes) => {
  const follow = sequelize.define('follow', {
    follow_by: DataTypes.BIGINT,
    follow_to: DataTypes.BIGINT
  }, {});
  follow.associate = function (models) {
    follow.belongsTo(models.User, { foreignKey: { allowNull: false }});
  };
  return follow;
};