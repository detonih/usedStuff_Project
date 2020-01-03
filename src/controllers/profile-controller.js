'use strict';

const repository = require('../repositories/profile-repository');

exports.getById = async (req, res, next) => {
    //const getId = req.params.id;
    try {
        const data = await repository
            .getById(req.params.id)
            /* .then((data) => {
                if(data != undefined) {
                    res.render('profile', {
                        data: data
                    });
                }
            }); */
            
        res.status(200).send(data);
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: 'Fail while searching users'
        });
    };
};