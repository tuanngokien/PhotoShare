const express = require('express');
const router = express.Router();

const userRouter = require("./user");
const postRouter = require("./post");

router.get('/', function (req, res) {
    res.send("OK");
});

router.use('/', [userRouter, postRouter]);

module.exports = router;
