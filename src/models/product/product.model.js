const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    imageURL: String
});

module.exports = mongoose.model('Product', productSchema);
