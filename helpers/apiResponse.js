exports.sucessReponse = function(res, msg) {
    var data = {
        status: 1,
        message: msg
    };
    return res.status(200).json(data);
};

exports.sucessReponseWithData = function(res, msg, data) {
    var resData = {
        status: 1,
        message: msg,
        data: data
    };
    return res.status(200).json(resData);
};

exports.errorReponse = function(res, msg) {
    var data = {
        status: 0,
        message: msg
    };
    return res.status(200).json(data);
};

exports.validationErrorWithData = function(res, msg) {
    var resData = {
        status: 0,
        message: msg,
        data: data
    };
    return res.status(200).json(resData);
};