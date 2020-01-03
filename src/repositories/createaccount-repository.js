'use strict'

const mongoose = require('mongoose');
const User = require('../models/user-model')

exports.create = async (data) => {
    const user = new User.User(data);
    await user.save();
};

/* exports.update = async (id, data) => {
    await User.User
        .findByIdAndUpdate(id, {
            $set: {
                name: data.name,
                email: data.email,
                password: data.password
            }
        });
}; */