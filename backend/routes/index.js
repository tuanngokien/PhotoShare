const express = require('express');
const router = express.Router();
const authRouter = require("./auth");
const newPostRouter = require("./new_post");
const postsRouter = require("./posts");
const postReactionRouter = require("./reaction");
const followRouter = require('./follow');
const bookmarkRouter = require('./bookmark');

router.get('/', function (req, res) {
    res.send("OK");
});

router.use("/", [authRouter]);
router.use("/bookmark", bookmarkRouter)
router.use("/posts", [newPostRouter, postReactionRouter]);
router.use("/", [postsRouter, followRouter]);

module.exports = router;
