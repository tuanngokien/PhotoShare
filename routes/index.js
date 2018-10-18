const express = require('express');
const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const postRouter = require("./post");
const postReactionRouter = require("./reaction");

router.get('/', function (req, res, next) {
    res.send("OK");
});

router.use("/", authRouter);
router.use("/posts", [postRouter, postReactionRouter]);
router.use("/", userRouter);

module.exports = router;
