const cloudinary = require('cloudinary');
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require('multer');
const router = require("./user");
const {Photo, Tag} = require("../models");
const {extractTags} = require("../utils");

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'photos',
    allowedFormats: ['jpg', 'png', 'jpeg'],
    params: {
        categorization: "google_tagging",
        auto_tagging: 0.6
    }
});

const PHOTO_PROPERTIES = {
    POST: {height: 600, crop: "scale"},
    THUMBNAIL: {height: 400, crop: 'thumb'}
};

const parser = multer({storage: storage});

router.route("/")
    .post(parser.array('images', 10), function (req, res) {
        if (req.files.length > 0) {
            let photos = [];
            for (let img of req.files.filter(img => img.hasOwnProperty("public_id"))) {
                let publicId = img.public_id;
                let originalImage = img.url;
                let postImage = cloudinary.url(publicId, PHOTO_PROPERTIES.POST);
                let thumbnail = cloudinary.url(publicId, PHOTO_PROPERTIES.THUMBNAIL);
                let photoTags = new Set();
                try {
                    let categorization = img.info.categorization;
                    for (let taggingService in categorization) {
                        let currentTags = extractTags(categorization[taggingService]);
                        photoTags = new Set([...photoTags, ...currentTags]);
                    }
                } catch (e) {
                    console.log(e);
                }
                photoTags = Array.from(photoTags);
                photos.push({originalImage, postImage, thumbnail, photoTags});
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
                    for (let i in photos) {
                        let photo = photos[i];
                        Promise.all(photo.photoTags.map(tag => {
                            return Tag.findOrCreate({
                                where: {
                                    name: tag
                                }
                            })
                        })).then(tags => {
                            db_photos[i].setTags(tags.map(tag => tag[0]));
                        })
                    }
                });
                res.json({success: true, post});
            });
        } else {
            res.json({success: false});
        }
    });

module.exports = router;