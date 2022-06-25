const UserModel = require('../models/user.model');
var mongoose = require('mongoose');
const user_data = require('../db/user.data');

const get_user = async (user_email) => {
    return await user_data (user_email);
};

function random(min,max) {
    return Math.floor((Math.random())*(max-min+1))+min;
}

const register_user = async(req_body) => {
    try{
        let user = await user_data.get_user(req_body.email_mobile);
        if(user.length > 0){
            if(req_body.login_type === 'email_mobile'){
                let user = await user_data.get_user(req_body.email_mobile, req_body.login_type);
                if(user.length > 0){
                    return user;
                } else {
                    let user = new UserModel({
                        email_mobile:  req_body.email_mobile,
                        // imageurl:  req_body.imageurl,
                        login_type: req_body.login_type,
                        password: req_body.password,
                        otp: random(1000, 9999)
                        // is_active: is_active
                    });
                    return await user.save();
                }
            }
            if(req_body.login_type === 'google_auth'){
                let user = await user_data.get_user(req_body.email_mobile, req_body.login_type);
                if(user.length > 0){
                    return user;
                } else {
                    let user = new UserModel({
                        displayName: req_body.displayName,
                        email_mobile: req_body.email_mobile,
                        imageurl:  req_body.imageurl,
                        login_type: req_body.login_type,
                        // is_active: is_active
                    });
                    return await user.save();
                }
            }

        } else {
            return 'User Not Found';
        }
        
        // } else {
        //     let user = new UserModel({
        //         email_mobile: req_body.email_mobile,
        //         // imageurl:  req_body.imageurl,
        //         // login_type: req_body.login_type ,
        //         password: req_body.password,
        //         otp: random(1000,9999)
        //         // is_active: is_active
        //     });
        //     return await user.save();
        // }
        
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

const verify_otp = async(req_body) => {
    try{
       
        let user = await user_data.get_otp(req_body.otp);
        if(user.length > 0){
            return user;
        } else {
            return 'User Not Found';
        }
        
        
    } catch (err) {
        console.log('ERR : ', err);
    }  
};

module.exports = {
    register_user,
    get_user,
    login,
    verify_otp
}