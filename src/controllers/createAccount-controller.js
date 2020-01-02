'use strict'

const repository = require('../repositories/createAccount-repository');

exports.post = async (req, res, next) => {
    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            roles: ['user']
        });

        res.status(200).send({
            message: 'User registered sucessfully!'
        });
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: 'Fail while user registration'
        });
    }
};