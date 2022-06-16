const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema(
    {
        // uuid: { type: String, required: true },
        name: { type: String, required: false },
        mobile: { type: String, required: false },
        email: { type: String, required: false },
        password: { type: String, required: false },
        otp: { type: String, required: false },
        login_type: { type: String, required: false },
        imageurl: { type: String, required: false },
        isactive: { type: Boolean, default: true }
        
    },{ versionKey: false }, {timestamps: true});

    UsersSchema.set('toJSON', {
        virtuals: true,
        versionKey:false,
        transform: function (doc, ret) {   delete ret._id  }
      });
      
const User = mongoose.model('Users', UsersSchema);
module.exports = User;