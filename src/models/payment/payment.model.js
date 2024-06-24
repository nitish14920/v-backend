const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    paymentDate: { type: Date, default: Date.now },
    paymentAmount: { type: Number, required: true },
    paymentMethod: String,
    paymentStatus: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Payment', paymentSchema);
