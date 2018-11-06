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

module.exports = {generateHash, comparePassword};