const {postDetailMiddleware, PostDetailOwnerCheckerMiddleware} = require("../../middleware");
const {getNewRouter} = require("../user/base");
const getPostDetailRouter = () => {
    const router = getNewRouter();
    router.use("/:postID/", postDetailMiddleware);
    return router;
};

const getOwnPostDetailRouter = () => {
    const router = getPostDetailRouter();
    router.use("/:postID/", PostDetailOwnerCheckerMiddleware);
    return router;
};

module.exports = {getNewRouter, getPostDetailRouter, getOwnPostDetailRouter};