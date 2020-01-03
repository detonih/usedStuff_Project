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
            email: user.email,
            name: user.name,
            id: user._id,
            roles: user.roles
        });

        
        await res.redirect('profile')
        
        console.log(token)
        //return res.render(token)
        
        await res.status(200).send({
            token: token,
            data: {
                email: user.email,
                name: user.name,
                id: user.id
            }
        });
        

    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: "Login fail"
        });
    };   

};
