const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const passwordHashSaltRounds = 10;

const decrypt = token => jwt.verify(token, "secret");

const encrypt = data => jwt.sign(data, "secret");

const hashPassword = password => bcrypt.hashSync(password, passwordHashSaltRounds);

const comparePasswords = (plainPass, encrypted) => bcrypt.compare(plainPass, encrypted);

module.exports = {
    decrypt,
    encrypt,
    comparePasswords,
    hashPassword,
};