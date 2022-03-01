const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    }, 
    active:{
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    precio:{
        type: Number,
        dafault: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        dafault: true
    }
});

ProductSchema.methods.toJSON = function() {
    const {__v, estado, ...product} = this.toObject();
    return product;
}

module.exports = model('Product', ProductSchema);