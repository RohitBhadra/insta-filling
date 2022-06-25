const UserModel = require('../models/user.model');
var mongoose = require('mongoose');
// mongoose.set('userFindndModify', false);

const get_user = async (email_mobile, login_type) => {
    if(login_type === 'email_mobile' || login_type === 'google_auth'){
        return await UserModel.find({ email_mobile: email_mobile });
    } else {
        return 'login type is empty !'
    }
}

const get_otp = async (otp) => {
    return await UserModel.find({ otp: otp });
}

const create_users = async(displayName, mobile, email, password, otp, 
                            imageurl, login_type, is_active) => {
    try {
        var user = new UserModel({
            displayName: displayName, 
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
    get_user,
    get_otp
}