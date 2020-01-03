'use strict';

const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d'});
};            

//Recive token and verify
exports.decodeToken = async (token) => {
    let data = await jwt.verify(token, global.SALT_KEY); 
    return data;
};


// Intercept rotes
exports.authorize = (req, res, next) => {

    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Restrict acess'
        });
    } else { 
        jwt.verify(token, global.SALT_KEY, (error, decoded) => {
            if (error) {
                res.status(401).json({
                    message: 'Invalid Token'
                });
            } else {
                next(); 
            }
        });
    }
};


exports.isAdmin = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token) {
        res.status(401).json({
            message: 'Invalid Token'
        });
    } else { //se um callback for fornecido, a função verify() atua assincorna. Neste caso o callback esta sendo passado como uma funcao (error, decoded). Acho que por isso nao precisa de async/await
        jwt.verify(token, global.SALT_KEY, (error, decoded) => {
            if (error) {                           // ^ esse é o nosso token decodificado pela função autehnticate no customer-controller
                res.status(401).json({
                    message: 'Invalid Token'
                });
            } else {
                if (decoded.roles.includes('admin')) { //verifica se a string "admin" ta dentro do array que foi gerado pela propriedade "roles" no schema do customer-model
                    next();
                } else {
                    res.status(403).json({
                        message: 'Restricted function for admins'
                    });
                }
            }
        });
    }
};

exports.isUser = (req, res, next) => {
    let token = req.body.token || req.body || req.body.acess_token || req.query.token || req.headers['x-access-token'];
    console.log(token)
    if(!token) {
        res.status(401).json({
            message: 'Invalid Token1'
        });
    } else { //se um callback for fornecido, a função verify() atua assincorna. Neste caso o callback esta sendo passado como uma funcao (error, decoded). Acho que por isso nao precisa de async/await
        jwt.verify(token, global.SALT_KEY, (error, decoded) => {
            if (error) {   
                console.log(error)                        // ^ esse é o nosso token decodificado pela função autehnticate no customer-controller
                res.status(401).json({
                    message: 'Invalid Token2'
                });
            } else {
                if (decoded.roles.includes('user')) { //verifica se a string "admin" ta dentro do array que foi gerado pela propriedade "roles" no schema do customer-model
                    next();
                } else {
                    res.status(403).json({
                        message: 'Restricted function for Users'
                    });
                }
            }
        });
    }
};