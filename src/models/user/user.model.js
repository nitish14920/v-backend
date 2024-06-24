const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    street: String,
    city: String,
    state: String,
    zipCode: String
});

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    phoneNumber: String,
    address: addressSchema,
    role: { type: String, default: 'Customer' }
});

module.exports = mongoose.model('User', userSchema);
