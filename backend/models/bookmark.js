module.exports = function (sequelize, DataType) {
  const Bookmark = sequelize.define('Bookmark', {}, {});

  Bookmark.associate = function (models) {
    Bookmark.belongsTo(models.User, { as: 'bookmark_by_user', foreignKey: 'bookmark_by' });
    Bookmark.belongsTo(models.Post, { as: 'postId', foreignKey: 'post_id' })
  };

  return Bookmark;
};