const bcrypt = require('bcrypt');
const Joi = require('joi');
const Adminuser = require('../models/adminuser.model');

const adminuserSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email(),
    mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
    password: Joi.string().required(),
    repeatPassword: Joi.string().required().valid(Joi.ref('password'))
})


module.exports = {
    insert
}

async function insert(user) {
    user = await Joi.validate(user, adminuserSchema, { abortEarly: false });
    user.hashedPassword = bcrypt.hashSync(user.password, 10);
    delete user.password;
    return await new Adminuser(user).save();
}