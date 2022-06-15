const UserModel = require('../models/user.model');
var mongoose = require('mongoose');
const user_data = require('../db/user.data');

const get_user = async (user_email) => {
    return await user_data (user_email);
};

const register_user = async(req_body) => {
    try{
        if(req_body.login_type === 'mobile'){
            let user = await user_data.get_user(null, req_body.login_type, req_body.mobile);
            if(user.length > 0){
                return user;
            } else {
                let user = new UserModel({
                    mobile:  req_body.mobile,
                    // imageurl:  req_body.imageurl,
                    login_type: req_body.login_type ,
                    password: req_body.password
                    // is_active: is_active
                });
                return await user.save();
            }
        }
        if(req_body.login_type === 'email'){
            let user = await user_data.get_user(req_body.email, req_body.login_type, null);
            if(user.length > 0){
                console.log('empty');
                return {
                    success: true,
                    data: user
                };
            } else {
                let user = new UserModel({
                    email:  req_body.email,
                    // imageurl:  req_body.imageurl,
                    login_type: req_body.login_type,
                    password: req_body.password 
                    // is_active: is_active
                });
                return await user.save();
            }
        }
        
    } catch (err) {
        console.log('ERR : ', err);
    }  
};

const login = async(req_body) => {
    let user = await user_data.get_user({ email: req_body.email});
    if(user.length > 0) {
        if(req_body.login_type === 'email') {
            if(req_body.email === user[0].email){
            let user = await user_data.get_user(req_body.email);
                return {
                    success: true,
                    data: user
                };
            } else {
                let create_user = await user_data.create_users(req_body) (
                    req_body.name,
                    req_body.email,
                    req_body.password,
                    req_body.is_active,
                    req_body.imageurl,
                    req_body.login_type
                );
                let user = await user_data.get_user(req_body.email);
                return {
                    success: true,
                    data: user
                };
            }
        } 
        else if(req_body.login_type === 'mobile') {
            console.log(req_body.login_type);
            if(req_body.mobile === user[0].mobile){
                let user = await user_data.get_user(req_body.mobile);
                return {
                    success: true,
                    data: user
                };
            } else {
                console.log('res', req_body)
                let create_user = await user_data.create_users(req_body) (
                    req_body.name,
                    req_body.mobile,
                    req_body.password,
                    req_body.imageurl,
                    req_body.login_type,
                    req_body.is_active
                );
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