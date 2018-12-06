'use strict';

const {generateHash, comparePassword} = require("../utils");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Invalid email"
                },
                len: {
                    args: [5, 30],
                    msg: "Invalid email"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [8, 20],
                    msg: "Password must be between 8 and 20 characters"
                }
            }
        },
        firstName: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                is: {
                    args: ["^[a-zA-Z ]+$", 'i'],
                    msg: "Invalid first name, must contain only alpha characters"
                }
            }
        },
        lastName: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                is: {
                    args: ["^[a-zA-Z ]+$", 'i'],
                    msg: "Invalid first name, must contain only alpha characters"
                }
            }
        },
    }, {
        hooks: {
            beforeCreate: (user, options) => {
                user.password = generateHash(user.password);
            }
        },
    });

    User.associate = function (models) {
        User.hasMany(models.Post);
        User.belongsToMany(models.Post, {through: 'UserPostLikes', as: 'Likes'});
        User.hasMany(models.follow, {foreignKey: "follow_by", as: "FollowBy"});
        User.hasMany(models.follow, {foreignKey: "follow_to", as: "FollowTo"});
        User.hasMany(models.Bookmark, {foreignKey: 'bookmark_by', as: 'BookmarkBy'});
    };

    User.prototype.validatePassword = function (password) {
        return comparePassword(password, this.password);
    };

    User.prototype.fullName = function () {
        return this.firstName + " " + this.lastName
    };

    User.prototype.toJSON = function () {
        let {id, email, firstName, lastName, createdAt} = this.dataValues;
        return {id, email, firstName, lastName, joined: createdAt.getFullYear()};
    };

    return User;
};