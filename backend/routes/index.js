const express = require('express');
const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const newPostRouter = require("./new_post");
const postsRouter = require("./posts");
const postReactionRouter = require("./reaction");

router.get('/', function (req, res) {
    res.send("OK");
});

router.use("/", authRouter);
router.use("/posts", [newPostRouter, postReactionRouter]);
router.use("/", [postsRouter]);
router.use("/", userRouter);

module.exports = router;
