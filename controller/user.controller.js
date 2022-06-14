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
                console.log('create_res', typeof(create_res));
                if(create_res == undefined){
                    return api_response.errorReponse(res, create_res.data);
                } else {
                    return api_response.sucessReponseWithData(res, "Login Success", create_res);
                }
            });
        } catch (err) {
            return api_response.errorReponse(res, err);
        }
    }
]