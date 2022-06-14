const UserModel = require('../models/user.model');
var mongoose = require('mongoose');
// const user_data = require('../db/user.data');

const get_user = async (user_email) => {
    return await user_data (user_email);
};

const register_user = async(req_body) => {
    // console.log('register', req_body);
    try{
        var user = new UserModel({
            firstname: req_body.firstname, 
            lastname:  req_body.lastname, 
            // phone:  phone,
            email:  req_body.email,
            password: req_body.password, 
            otp: req_body.otp,
            // is_active: is_active
        });
        return await user.save();
    } catch (err) {
        console.log('ERR : ', err);
    }  
};

const login = async(req_body) => {
    let user = await user_data.get_user(req_body.email);
    if(user.length > 0) {
        if(req_body.login_type === 'email' && req_body.password === user[0].password) {
            let create_user = await user_data.create_users(req_body) (
                req_body.firstname,
                req_body.lastname,
                req_body.email,
                req_body.password,
                req_body.is_active
            );
            if (!create_user) {
                return { data: 'unable to create users' };
            } else {
                let user = await user_data.get_user(req_body.email);
                return {
                    success: true,
                    data: user
                };
            }    
        } else if(req_body.login_type === 'mobile' && req_body.otp === user[0].otp) {
            let create_user = await user_data.create_users(req_body) (
                req_body.firstname,
                req_body.lastname,
                req_body.phone,
                req_body.password,
                req_body.otp,
                req_body.is_active
            );
            if (!create_user) {
                return { data: 'unable to create users' };
            } else {
                let user = await user_data.get_user(req_body.otp);
                return {
                    success: true,
                    data: user
                };
            }    
        } else {
            return {
                success: false,
                data: 'Wrong Password / Otp. Please Try Again !'
            };
        }
    } else {
        return {
            success: false,
            data: 'Wrong Email. Please Try Again !'
        };
    }
};

module.exports = {
    register_user,
    get_user,
    login
}