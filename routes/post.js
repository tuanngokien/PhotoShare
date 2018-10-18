const express = require('express');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require('multer');
const router = require("./user");
const {Post, Photo, Comment} = require("../models");

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'photos',
    allowedFormats: ['jpg', 'png', 'jpeg'],
});

const parser = multer({storage: storage});

router.route("/")
    .post(parser.array('images', 10), function (req, res) {
        if (req.files) {
            let photos = [];
            for (let img of req.files.filter(img => img.hasOwnProperty("public_id"))) {
                let public_id = img.public_id;
                let originalImage = img.url;
                let postImage = cloudinary.url(public_id, {width: 600, height: 600, crop: 'fill'});
                let thumbnail = cloudinary.url(public_id, {width: 500, height: 500, crop: 'thumb'});
                photos.push({originalImage, postImage, thumbnail});
            }
            req.user.createPost({
                caption: req.body.caption,
                Photos: photos,
            }, {
                include: [{
                    model: Photo,
                    as: "Photos"
                }],
            }).then((post) => {
                res.json({success: true});
            });
        } else {
            res.json({success: false});
        }
    });

router.route("/:userID")
    .get(function (req, res) {
        let userId = req.params.userID
        Post.findAll({
            where: {userId: userId},
            include: [
                {model: Photo},
                {model: Comment},
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        })
            .then(posts => {
                Promise.all(posts.map(function (post) {
                    return post.countLikes();
                })).then(function (reactions) {
                    let postsWithLikes = posts.map(function (post, index) {
                        post.dataValues.likes = reactions[index];
                        return post;
                    });
                    res.json({userId, posts: postsWithLikes});
                })
            });
    });

module.exports = router;