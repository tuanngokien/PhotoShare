const {getNewRouter, getBaseAuthRouter} = require("./base");
const router = getNewRouter();
const authRouter = require("./auth");
const followRouter = require('./follow');
const userRouter = require("./user");

router.use("/", authRouter);
router.use(getBaseAuthRouter());
router.use("/", userRouter, followRouter);

module.exports = router;


