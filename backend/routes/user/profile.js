const {getNewRouter} = require("./base");
const router = getNewRouter();

const cloudinary = require('cloudinary');
const {User} = require("../../models");

router.patch("/avatar", function (req, res) {
    let avatarPublicId = req.body.public_id;
    if (avatarPublicId) {
        let avatar = cloudinary.url(avatarPublicId, {
            secure: true,
            width: 350,
            height: 350,
            gravity: "face",
            crop: "thumb"
        });
        req.user.update({avatar}).then(user => {
            res.json({user});
        });
    } else {
        res.json({success: false});
    }
});

router.patch("/basic", function (req, res) {
    let {email, first_name: firstName, last_name: lastName} = req.body;
    let updateFields = {};
    if (email) {
        updateFields.email = email
    }
    if (firstName) {
        updateFields.firstName = firstName
    }
    if (lastName) {
        updateFields.lastName = lastName
    }
    req.user.update(updateFields).then(user => {
        res.json({user})
    }).catch(validationErrors => {
        let errors = {};
        for (let e of validationErrors["errors"]) {
            errors[e.path] = e.message;
        }
        res.json({errors});
    });
});

router.patch("/password", function (req, res) {
    let {current_password: currentPassword, new_password: newPassword, re_new_password: reNewPassword} = req.body;
    if (!newPassword || !reNewPassword || !currentPassword) {
        res.json({errors: {fields: "Some required fields are missing"}});
    } else if (newPassword !== reNewPassword) {
        res.json({errors: {new_password: "New password didn't match"}})
    } else {
        req.user.validatePassword(currentPassword).then(result => {
            if (result === true) {
                req.user.update({
                    password: newPassword
                }).then(() => {
                    res.json({success: true})
                }).catch(validationErrors => {
                    let errors = {};
                    for (let e of validationErrors["errors"]) {
                        errors[e.path] = e.message;
                    }
                    res.json({errors});
                });
            } else {
                res.json({errors: {current_password: "Current password is invalid"}})
            }
        })
    }
});

module.exports = router;