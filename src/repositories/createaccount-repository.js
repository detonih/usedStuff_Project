'use strict'

const mongoose = require('mongoose');
const User = require('../models/createaccount-model')

//Find all users
exports.get = async (req) => {
    const res = await User.User.find();
    console.log(res)
    return res;
}

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