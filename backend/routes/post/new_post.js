const cloudinary = require('cloudinary');
const {getNewRouter} = require("./base");
const router = getNewRouter();
const {sequelize, Photo, Tag} = require("../../models");

let secure = true;

const PHOTO_PROPERTIES = {
    POST: {secure, height: 600, crop: "scale"},
    THUMBNAIL: {secure, height: 400, crop: 'thumb'}
};

const AUTO_TAGGING_OPTION = {
    categorization: "google_tagging",
    auto_tagging: 0.6
};


router.route("/")
    .post(function (req, res) {
        let reqPhotos = req.body.photos || [];
        if (reqPhotos.length > 0) {
            let photos = [];
            for (let photo of reqPhotos) {
                const {publicId, width, height} = photo;
                let originalImage = cloudinary.url(publicId, {secure});
                let postImage = cloudinary.url(publicId, PHOTO_PROPERTIES.POST);
                let thumbnail = cloudinary.url(publicId, PHOTO_PROPERTIES.THUMBNAIL);
                photos.push({publicId, width, height, originalImage, postImage, thumbnail});
            }
            sequelize.transaction({autocommit: false}).then(t => {
                return req.user.createPost({
                    Photos: photos,
                }, {
                    include: [{
                        model: Photo,
                    }],
                    transaction: t
                }).then((post) => {
                    t.commit().then(() => {
                        post.getPhotos().then((db_photos) => {
                            for (let photo of db_photos) {
                                let publicId = photo.publicId;
                                cloudinary.api.update(publicId, function (cPhoto) {
                                    let tags = cPhoto.tags;
                                    if (tags) {
                                        Promise.all(tags.map(tag => {
                                            return Tag.findOrCreate({
                                                where: {
                                                    name: tag
                                                }
                                            })
                                        })).then(tags => {
                                            photo.setTags(tags.map(tag => tag[0]));
                                            return null;
                                        }).catch(error => {
                                            console.log(error);
                                        });
                                    }
                                }, AUTO_TAGGING_OPTION);
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                        res.json({success: true, post});
                        return null;
                    });
                }).catch(err => {
                    // console.log(err);
                    t.rollback().then(() => {
                        res.json({success: false});
                    });
                    return null;
                });
            });
        } else {
            res.json({success: false});
        }
    });

module.exports = router;