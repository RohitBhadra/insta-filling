const user_service = require('../services/user.service');
const api_response = require('../helpers/apiResponse');
var ObjectId = require('mongoose').Types.ObjectId;

exports.register = [
    (req, res, next) => {
        try {
            user_service.register_user(req.body).then(function(create_res){
                if(create_res.status == -1){
                    return api_response.errorReponse(res, create_res.data);
                } else {
                    return api_response.sucessReponseWithData(res, "Registration Success", create_res.data);
                }
            });
        } catch (err) {
            return api_response.errorReponse(res, err);
        }
    }
];


exports.login = [
   
    (req, res, next) => {
        try {
            user_service.register_user(req.body).then(function(create_res){
                if(create_res == undefined){
                    return api_response.errorReponse(res, create_res);
                } else {
                    return api_response.sucessReponseWithData(res, "Login Success", create_res);
                }
            });
        } catch (err) {
            return api_response.errorReponse(res, err);
        }
    }
]


exports.verifyOtp = [
   
    (req, res, next) => {
        try {
            user_service.verify_otp(req.body).then(function(fetch_res){
                if(fetch_res == undefined){
                    return api_response.errorReponse(res, fetch_res);
                } else {
                    return api_response.sucessReponseWithData(res, "Fetch Users", fetch_res);
                }
            });
        } catch (err) {
            return api_response.errorReponse(res, err);
        }
    }
]