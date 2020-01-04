'use strict';

const User = require('../models/user-model');

exports.get = async (data) => {
    const res = await User.User.find({}, 'name email')
        .populate('name', 'name')
        .populate('email', 'email');
        console.log(res)
    return res;
}

