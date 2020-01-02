'use strict'

const crypto = require('crypto');

/* 
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
const genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

/* 
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated. */

const sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

/*  generate the hash that should be stored in the database as user’s password.*/
const saltHashPassword = (userpassword) => {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
   return passwordData.passwordHash + passwordData.salt 
}

module.exports = saltHashPassword;