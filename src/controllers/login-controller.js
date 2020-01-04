'use strict'

const repository = require('../repositories/login-repository');
const authService = require('../services/auth-service');
const md5 = require('md5');

exports.authenticate = async (req, res, next) => {
    const getEmail = req.body.email_login;
    const getPassword = req.body.password_login;
    try {
        const user = await repository.authenticate({
            email: getEmail,
            password: md5(getPassword + global.SALT_KEY)
        });

        if(!user) {
            res.status(400).send({
                message: "Invalid email or password"
            })
            return res;
        }

        const token = await authService.generateToken({
            id: user._id,
            name: user.name,
            email: user.email,
            roles: user.roles
        });
        console.log(token + ' token login contrler');
                
        //await res.redirect('profile');

    } catch (e) {
        console.log(e + 'outro problem')
        res.status(500).send({
            message: "Login fail"
        });
    };   

};
