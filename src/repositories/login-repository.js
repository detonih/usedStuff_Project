'use strict'

const User = require('../models/createaccount-model');

//Find the data on the DB
exports.authenticate = async (data) => {
    const res = await User.User.findOne({
        email: data.email,
        password: data.password
    });
    console.log(res)
    return res;
};
