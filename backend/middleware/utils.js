const camelcaseKeys = require('camelcase-keys');

const jsonKeysToCamelMiddleware = (req, res, next) => {
    let json = res.json;
    res.json = function(obj) {
        let res_json = camelcaseKeys(JSON.parse(JSON.stringify(obj)), {deep: true});
        // let res_json = toCamel(JSON.stringify(toCamel(JSON.parse(JSON.stringify(obj)))));
        json.call(this, res_json);
    };
    next();
};

module.exports = {jsonKeysToCamelMiddleware};