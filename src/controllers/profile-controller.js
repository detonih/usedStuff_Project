'use strict';

const repository = require('../repositories/profile-repository');

exports.get = async(req, res, next) => {
    try {
        const data = await repository.get();
            res.status(200).send(data);
            console.log(data)
    } catch (e) {
        res.status(500).send({
            message: 'Fail while requisition process'
        });
    };
}