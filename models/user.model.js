const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema(
    {
        // uuid: { type: String, required: true },
        firstname: { type: String, required: false },
        lastname: { type: String },
        phone: { type: Number, required: false },
        email: { type: String, required: false },
        password: { type: String, required: false },
        otp: { type: String, required: false },
        isactive: { type: Boolean, default: true }
        
    }, {timestamps: true});

const User = mongoose.model('Users', UsersSchema);
module.exports = User;