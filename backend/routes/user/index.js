const {getNewRouter, getBaseAuthRouter} = require("./base");
const router = getNewRouter();
const authRouter = require("./auth");
const followRouter = require('./follow');
const userRouter = require("./user");
const profileRouter = require("./profile");


router.use("/", authRouter);
router.use(getBaseAuthRouter());
router.use("/", userRouter, followRouter);
router.use("/profile", profileRouter);

module.exports = router;


