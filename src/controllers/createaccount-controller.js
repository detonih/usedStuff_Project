'use strict'

const repository = require('../repositories/createaccount-repository');

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: 'Fail while searching users'
        });
    }
};

exports.post = async (req, res, next) => {
        const getName = req.body.name_register;
        const getEmail = req.body.email_register;
        const getPassword = req.body.password_register;
        console.log(getName)
    try {
        
        await repository.create({
            name: getName,
            email: getEmail,
            password: getPassword,
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
/* 
exports.put = async (req, res, next) => {
    try {
        await respository.update(req.params.is, req.body);
        res.status(200).send({
            message: 'Account updated sucessfully'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Error while update account'
        });
    }
}; */