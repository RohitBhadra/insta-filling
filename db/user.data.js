const UserModel = require('../models/user.model');
var mongoose = require('mongoose');
// mongoose.set('userFindndModify', false);

const get_user = async (email) => {
    return await UserModel.find({ email: email });
}

const create_users = async(firstname, lastname, phone, email,
                        password, otp, is_active) => {
    try {
        var user = new UserModel({
            firstname: firstname, 
            lastname:  lastname, 
            phone:  phone,
            email:  email,
            password: password, 
            otp: otp, 
            is_active: is_active
        });
        return await user.save();
    } catch (err) {
        console.log('ERR : ', err);
    }
}

module.exports = {
    create_users,
    get_user
}