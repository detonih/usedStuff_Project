'use strict'

const mongoose = require('mongoose');
const User = require('../models/createAccount-model')

exports.create = async (data) => {
    const user = new User.User(data);
    await user.save();
};