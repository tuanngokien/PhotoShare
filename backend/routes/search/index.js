const {getNewRouter} = require("../post/base");
const router = getNewRouter();
const {Op} = require("sequelize");
const {Post, Photo, Tag} = require("../../models");

const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    hosts: ['http://localhost:9200']
});

router.route("/search/users")
    .get(function (req, res) {
        let body = {
            query: {
                match: {
                    name: req.query['q']
                }
            }
        };
        client.search({index: 'photoshare_users', body: body, type: 'users'})
            .then(results => {
                const response_results = results.hits.hits.map(r => r._source);
                res.json({users: response_results});
            })
    });

router.route("/search/photos")
    .get(function (req, res) {
        let body = {
            query: {
                match: {
                    name: req.query['q']
                }
            }
        };
        client.search({index: 'photoshare_tags', body: body, type: 'tags'})
            .then(results => {
                const tag_ids = results.hits.hits.map(r => r._source.id);
                Photo.findAll({
                    include: [
                        {
                            model: Tag, where: {id: {[Op.in]: tag_ids}}
                        },
                        {model: Post}
                    ],
                    order: [
                        [Post, "createdAt", "DESC"]
                    ]
                }).then(photos => {
                    res.json({photos})
                })
            })
    });

module.exports = router;