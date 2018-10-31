const cloudinary = require('cloudinary');
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require('multer');
const router = require("./user");
const {Photo, Tag} = require("../models");
const {extractTags} = require("../utils");

// const storage = cloudinaryStorage({
//     cloudinary: cloudinary,
//     folder: 'photos',
//     allowedFormats: ['jpg', 'png', 'jpeg'],
//     params: {
//         categorization: "google_tagging",
//         auto_tagging: 0.6
//     }
// });

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
            req.user.createPost({
                caption: req.body.caption,
                Photos: photos,
            }, {
                include: [{
                    model: Photo,
                }],
            }).then((post) => {
                post.getPhotos().then((db_photos) => {
                    for (let photo of db_photos) {
                        let publicId = photo.publicId;
                        cloudinary.api.update(publicId, function (cPhoto) {
                            let tags = cPhoto.tags;
                            Promise.all(tags.map(tag => {
                                return Tag.findOrCreate({
                                    where: {
                                        name: tag
                                    }
                                })
                            })).then(tags => {
                                photo.setTags(tags.map(tag => tag[0]));
                            });
                        }, AUTO_TAGGING_OPTION);
                    }
                });
                res.json({success: true, post});
            }).catch(err => {
                console.log(err);
                res.json({success: false});
            });
        } else {
            res.json({success: false});
        }
    });

module.exports = router;