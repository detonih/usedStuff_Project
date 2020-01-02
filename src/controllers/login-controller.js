'use strict'

const repository = require('../repositories/login-repository');
const saltHashPassword = require('../services/hash-password');
const authService = require('../services/auth-service');

exports.authenticate = async (req, res, next) => {
    const getEmail = req.body.email_login;
    const getPassword = req.body.password_login;
    console.log(getEmail, getPassword)
    try {
        const user = await repository.authenticate({
            email: getEmail,
            password: saltHashPassword(getPassword)
        });

        if(!user) {
            res.status(400).send({
                message: "Invalid email or password"
            })
            return res;
        }

        const token = await authService.generateToken({
            email: user.email_login,
        });

        res.status(200).send({
            token: token,
            data: {
            email: user.email_login,
            }
        });

    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: "Login fail"
        });
    };
};