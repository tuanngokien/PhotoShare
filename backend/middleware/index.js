const authMiddleware = require("./auth");
const {postDetailMiddleware, PostDetailOwnerCheckerMiddleware} = require("./post");

module.exports = {authMiddleware, postDetailMiddleware, PostDetailOwnerCheckerMiddleware};