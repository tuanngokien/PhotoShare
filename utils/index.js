const bcrypt = require("bcrypt");

const generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

const comparePassword = function (password = "", hash) {
    return bcrypt.compare(password, hash).then(function (result) {
        return result
    }).catch(err => {
        console.log(err);
        return false;
    });
};

const TAGGING_MIN_SCORE = 0.6;
const extractTags = function (data) {
    let tags = [];
    if (data.status === "complete") {
        let tagsData = data.data;
        for (let d of tagsData) {
            if (d.confidence >= TAGGING_MIN_SCORE) {
                tags.push(d.tag)
            }
        }
    }
    return tags;
};

module.exports = {generateHash, comparePassword, extractTags};