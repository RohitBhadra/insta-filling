const UserModel = require('../models/user.model');
var mongoose = require('mongoose');
// mongoose.set('userFindndModify', false);

const get_user = async (email, login_type, mobile) => {
    if(login_type === 'email'){
        return await UserModel.find({ email: email });
    } else if (login_type === 'mobile') {
        return await UserModel.find({ mobile: mobile });
    } else {
        return 'login type is empty !'
    }
}

const create_users = async(name, mobile, email, password, otp, 
                            imageurl, login_type, is_active) => {
    try {
        var user = new UserModel({
            name: name, 
            mobile:  mobile,
            email:  email,
            password: password, 
            otp: otp, 
            imageurl: imageurl,
            login_type: login_type, 
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