'use strict'

const saltHashPassword = require('../services/hash-password');
const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    return jwt.sign(data, { expiresIn: '1d'});
};            // ^ gera o token                ^ tempo de expiraçã 1 dia

//Recebe um token e cria uma variavel e verifica o token com a salt key
exports.decodeToken = async (token) => {
    let data = await jwt.verify(token, global.SALT_KEY); //aqui ta dizendo que o await nao tem efeito
    return data;
};


// Intercept rotes
exports.authorize = (req, res, next) => {

    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {//se nao achou o token da acesso restrito
        res.status(401).json({
            message: 'Restrict acess'
        });
    } else { // se achou entra no processo de verificar o token
        jwt.verify(token, global.SALT_KEY, (error, decoded) => {
            if (error) {//se nao conseguir, seja pq inspirou ou é invalido
                res.status(401).json({
                    message: 'Invalid Token'
                });
            } else {
                next(); //vai dar vazão na requisição, vai continuar
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