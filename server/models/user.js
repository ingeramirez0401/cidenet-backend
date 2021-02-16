const mongoose = require('mongoose');

let validRoles = {
    values: ['ADMIN_ROLE', 'EMPLOYEE_ROLE'],
    message: '{VALUE} is not a valid user role.'
}

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required.']
    },
    phone: {
        type: String,
        required: [true, 'Phone is required.']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        default: 'EMPLOYEE_ROLE',
        enum: validRoles
    },
    state: {
        type: Boolean,
        default: true
    }
});

/* Method to delete password field */
userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

module.exports = mongoose.model('Users', userSchema);