const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    street: String,
    city: String,
    state: String,
    zipCode: String
});

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderDate: { type: Date, default: Date.now },
    totalAmount: { type: Number, required: true },
    shippingAddress: addressSchema,
    orderStatus: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Order', orderSchema);
