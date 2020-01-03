'use strict'

const mongoose = require('mongoose');
const User = require('../models/createaccount-model')


exports.getById = async (id) => {
    const res = await User.User.findById(id);
    console.log(res)
    return res;
}