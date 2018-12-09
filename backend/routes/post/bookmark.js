const {getNewRouter} = require("./base");
const router = getNewRouter();
const { Bookmark, User, Post } = require('../../models');

router.get('/', (req, res) => {
  let userId = req.user.id;
  Bookmark.findAll({
    where: { bookmark_by: userId },
    include: [
      { model: User, as: "bookmark_by_user" },
      { model: Post, as: "postId" }
    ]
  }).then(bookmarks => {
    let postSave = [];
    bookmarks.forEach(bookmark => {
      postSave.push(bookmark.postId.toJSON())
    });
    res.status(200).json({ name: "Success", result: postSave })
  }).catch(err => {
    console.log(err);
    res.json({ success: false });
  })
});

router.route("/:postId")
  .post((req, res) => {
    let postId = req.params.postId;
    let userId = req.user.id;
    Bookmark.findOrCreate({
      where: {
        bookmark_by: userId,
        post_id: postId
      },
    }).spread((bookmark) => {
      res.json({ success: true });
    }).catch(err => {
      res.json({ success: false });
    })
  })
  .delete((req, res) => {
    let postId = req.params.postId;

    Bookmark.destroy({
      where: {
        bookmark_by: req.user.id,
        post_id: postId
      }
    }).then(isDelete => {
      if (isDelete) {
        res.json({ success: true })
      } else {
        res.json({ success: false })
      }
    }).catch(err => {
      console.log(err);
      res.json({ success: false });
    })
  });


module.exports = router;