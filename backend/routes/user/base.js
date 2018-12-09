const express = require('express');
const {authMiddleware} = require("../../middleware");


const getNewRouter = () => {
    return express.Router();
};

const getBaseAuthRouter = () => {
    const router = express.Router();
    router.use(authMiddleware);
    return router;
};

module.exports = {getNewRouter, getBaseAuthRouter};