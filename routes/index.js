const express = require('express');
const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user")

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use("/", authRouter);
router.use("/", userRouter);

module.exports = router;
