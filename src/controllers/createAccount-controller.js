'use strict'

const repository = require('../repositories/createAccount-repository');

exports.post = async (req, res, next) => {
    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            passaword: req.body.passaword,
            roles: ['user']
        });
    } catch (e) {
        res.status(500).send({
            message: 'Fail while user registration'
        });
    }
};