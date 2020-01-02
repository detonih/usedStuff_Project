'use strict'

const mongoose = require('mongoose');
const User = mongoose.Module('User');

exports.create = async (data) => {
    const user = new User(data);
    await user.save();
};